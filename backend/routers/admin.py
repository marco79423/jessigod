import fastapi
from fastapi import Depends, Security, BackgroundTasks, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security.http import HTTPBase
from sqlalchemy.orm import Session

from config import conf
from dependencies import get_db
from internal import schemas, core, utils

router = fastapi.APIRouter()

admin_security = HTTPBase(scheme='Jessigod')


@router.post('/api/propagation-tasks', response_model=schemas.TaskOut)
async def create_propagation_task(
        task_in: schemas.TaskIn,
        background_tasks: BackgroundTasks,
        credentials: HTTPAuthorizationCredentials = Security(admin_security),
        db: Session = Depends(get_db)):
    if credentials.credentials != conf.server.admin_token:
        raise HTTPException(status_code=403, detail='你沒有管理員權限')

    task_id = utils.generate_id()
    background_tasks.add_task(core.handle_propagation_task, task_id, task_in, db)

    return schemas.TaskOut(
        data=task_id,
    )
