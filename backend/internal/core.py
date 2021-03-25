import linebot
import slack_sdk
import telegram
from fastapi.exceptions import HTTPException
from linebot.exceptions import LineBotApiError
from linebot.models import TextSendMessage
from sqlalchemy import func
from sqlalchemy.orm import Session

from config import conf
from internal import database
from internal import models
from internal import schemas
from internal import utils


def get_or_create_editor(db: Session, token: str):
    editor = db.query(models.Editor).filter_by(token=token).first()
    if not editor:
        editor = models.Editor(
            id=utils.generate_id(),
            token=token,
        )
        db.add(editor)
        db.commit()
        db.refresh(editor)

    return editor


def get_or_create_line_group(db: Session, group_id: str):
    line_group = db.query(models.LineGroup).filter_by(group_id=group_id).first()
    if not line_group:
        line_group = models.LineGroup(
            id=utils.generate_id(),
            group_id=group_id,
        )
        db.add(line_group)
        db.commit()
        db.refresh(line_group)

    return line_group


def delete_line_group(db: Session, group_id: str):
    db.query(models.LineGroup).filter_by(group_id=group_id).delete()
    db.commit()


def get_line_groups(db: Session):
    return db.query(models.LineGroup).all()


def get_or_create_telegram_group(db: Session, chat_id: str):
    telegram_group = db.query(models.TelegramGroup).filter_by(chat_id=chat_id).first()
    if not telegram_group:
        telegram_group = models.TelegramGroup(
            id=utils.generate_id(),
            chat_id=chat_id,
        )
        db.add(telegram_group)
        db.commit()
        db.refresh(telegram_group)

    return telegram_group


def delete_telegram_group(db: Session, chat_id):
    db.query(models.TelegramGroup).filter_by(chat_id=chat_id).delete()
    db.commit()


def get_telegram_groups(db: Session):
    return db.query(models.TelegramGroup).all()


def get_or_create_origin(db: Session, name: str):
    origin = db.query(models.Origin).filter_by(name=name).first()
    if not origin:
        origin = models.Origin(
            id=utils.generate_id(),
            name=name,
        )
        db.add(origin)
        db.commit()
        db.refresh(origin)
    return origin


def get_origins(db: Session):
    return db.query(models.Origin).all()


def create_saying(db: Session, token, saying_in: schemas.SayingIn):
    editor = get_or_create_editor(db, token)
    origin = get_or_create_origin(db, saying_in.origin)

    saying = models.Saying(
        id=utils.generate_id(),
        editor_id=editor.id,
        origin_id=origin.id,
        content=saying_in.content
    )
    db.add(saying)
    db.commit()
    db.refresh(saying)

    return saying


def get_sayings(db: Session, token: str, origin: str, editor_only: bool):
    q = db.query(models.Saying)

    if token and editor_only:
        editor = get_or_create_editor(db, token)
        q = q.filter_by(editor_id=editor.id)

    if origin:
        q = q.join(models.Saying.origin).filter(models.Origin.name == origin)

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
    db.commit()

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

    if not saying:
        return

    if conf.bots.line_bot:
        try:
            line_bot_api = linebot.LineBotApi(conf.bots.line_bot.channel_access_token)
            line_bot_api.broadcast(TextSendMessage(text=f'{saying.content} - {saying.origin.name}'))
            for line_group in get_line_groups(db):
                line_bot_api.push_message(line_group.group_id,
                                          TextSendMessage(text=f'{saying.content} - {saying.origin.name}'))
        except LineBotApiError as e:
            print('Line Bot 出錯：', e)

    if conf.bots.telegram_bot:
        bot = telegram.Bot(conf.bots.telegram_bot.token)

        for telegram_group in get_telegram_groups(db):
            bot.send_message(chat_id=telegram_group.chat_id, text=f'{saying.content} - {saying.origin.name}')

    if conf.bots.slack_bot:
        client = slack_sdk.webhook.WebhookClient(conf.bots.slack_bot.webhook_url)
        client.send(text=f'{saying.content} - {saying.origin.name}')

    print(f'任務 {task_id} 完成！')


def handle_schedule_task():
    task_id = utils.generate_id(),

    db = database.SessionLocal()
    try:
        handle_propagation_task(task_id, schemas.TaskIn(
            mode='random',
        ), db)
    finally:
        db.close()


def handle_line_events(events):
    db = database.SessionLocal()

    for event in events:
        print('line event', event)
        if event.type == 'join':
            if event.source.type == 'group':
                line_group = get_or_create_line_group(db, event.source.group_id)
                line_bot_api = linebot.LineBotApi(conf.bots.line_bot.channel_access_token)
                line_bot_api.push_message(line_group.group_id, TextSendMessage(text='西卡神降臨，快恭迎！'))

        if event.type == 'leave':
            if event.source.type == 'group':
                delete_line_group(db, event.source.group_id)


def handle_telegram_update(json_body):
    db = database.SessionLocal()
    bot = telegram.Bot(conf.bots.telegram_bot.token)

    update = telegram.Update.de_json(json_body, bot)
    print('telegram update', update)

    if update.message.new_chat_members:
        for member in update.message.new_chat_members:
            if member.username == conf.bots.telegram_bot.bot_username:
                telegram_group = get_or_create_telegram_group(db, str(update.message.chat_id))
                bot.send_message(chat_id=telegram_group.chat_id, text='西卡神降臨，快恭迎！')

    if update.message.left_chat_member:
        if update.message.left_chat_member.username == conf.bots.telegram_bot.bot_username:
            delete_telegram_group(db, chat_id=str(update.message.chat_id))
