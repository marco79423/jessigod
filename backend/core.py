import uuid

import linebot
from fastapi.exceptions import HTTPException
from linebot.models import TextSendMessage
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

import database
import models
import schemas
from config import conf


def generate_id():
    return str(uuid.uuid4())


def get_or_create_editor(db: Session, token: str):
    editor = db.query(models.Editor).filter_by(token=token).first()
    if not editor:
        editor = models.Editor(
            id=generate_id(),
            token=token,
        )
        db.add(editor)
        db.commit()
        db.refresh(editor)

    return editor


def get_or_create_origin(db: Session, name: str):
    origin = db.query(models.Origin).filter_by(name=name).first()
    if not origin:
        origin = models.Origin(
            id=generate_id(),
            name=name,
        )
        db.add(origin)
        db.commit()
        db.refresh(origin)
    return origin


def create_saying(db: Session, token, saying_in: schemas.SayingIn):
    editor = get_or_create_editor(db, token)
    origin = get_or_create_origin(db, saying_in.origin)

    saying = models.Saying(
        id=generate_id(),
        editor_id=editor.id,
        origin_id=origin.id,
        content=saying_in.content
    )
    db.add(saying)

    try:
        db.commit()
    except IntegrityError as e:
        raise HTTPException(status_code=400, detail='不能新增重復的內容')
    db.refresh(saying)

    return saying


def get_sayings(db: Session, token: str, editor_only: bool):
    q = db.query(models.Saying)

    if token and editor_only:
        editor = get_or_create_editor(db, token)
        q = q.filter_by(editor_id=editor.id)

    q = q.order_by(models.Saying.created_at.desc())

    return q


def modify_saying(db: Session, token: str, saying_id: str, saying_in: schemas.SayingIn):
    saying = db.query(models.Saying).filter_by(id=saying_id).first()
    if not token:
        raise HTTPException(status_code=404, detail='該名言不存在')

    if saying.editor.token != token:
        raise HTTPException(status_code=403, detail='不能修改別人新增的名言')

    origin = get_or_create_origin(db, saying_in.origin)

    saying.origin_id = origin.id
    saying.content = saying_in.content
    db.add(saying)
    try:
        db.commit()
    except IntegrityError as e:
        raise HTTPException(status_code=400, detail='不能新增重復的內容')

    db.refresh(saying)

    return saying


def delete_saying(db: Session, token: str, saying_id: str):
    saying = db.query(models.Saying).filter_by(id=saying_id).first()
    if not token:
        raise HTTPException(status_code=404, detail='該名言不存在')

    if saying.editor.token != token:
        raise HTTPException(status_code=403, detail='不能刪除別人新增的名言')

    db.delete(saying)
    db.commit()


def handle_propagation_task(task_id, task_in: schemas.TaskIn, db: Session):
    mode = task_in.mode if task_in.mode else 'random'
    if mode == 'random':
        saying = db.query(models.Saying).order_by(func.random()).first()
    else:
        print('尚不支援別的模式...')
        return

    for receiver in conf.preacher.receivers:
        if receiver.type == 'line-channel':
            line_bot_api = linebot.LineBotApi(receiver.secret)
            line_bot_api.broadcast(TextSendMessage(text=f'{saying.content} - {saying.origin.name}'))

    print(f'任務 {task_id} 完成！')


def handle_schedule_task():
    task_id = generate_id()

    db = database.SessionLocal()
    try:
        handle_propagation_task(task_id, schemas.TaskIn(
            mode='random',
        ), db)
    finally:
        db.close()
