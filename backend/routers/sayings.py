from typing import Optional

import fastapi
from fastapi import Depends, Query, Security
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security.http import HTTPBase
from sqlalchemy.orm import Session

from dependencies import get_db
from internal import core, schemas

router = fastapi.APIRouter()

security = HTTPBase(scheme='Jessi')


@router.get('/api/origins', response_model=schemas.OriginsOut)
async def get_origins(db: Session = Depends(get_db)):
    origins = core.get_origins(db)
    return schemas.OriginsOut(
        data=[
            schemas.Origin(
                id=origin.id,
                name=origin.name,
            ) for origin in origins
        ],
    )


@router.get('/api/sayings', response_model=schemas.SayingsOut)
async def get_sayings(
        page_index: int = Query(
            0,
            title='頁數索引',
            description='頁數索引，起始為 0',
            ge=0,
            alias='pageIndex',
        ),
        page_size: int = Query(
            20,
            title='單頁數量',
            description='單頁數量，預設為 20，最大為 100',
            ge=0,
            alias='pageSize',
        ),
        origin: Optional[str] = Query(
            None,
            title='來源',
            description='篩選指定來源的名言',
        ),
        editor_only: Optional[bool] = Query(
            None,
            title='是否可編輯',
            description='是否只顯示可編輯的名言',
            alias='editorOnly',
        ),
        credentials: HTTPAuthorizationCredentials = Security(security),
        db: Session = Depends(get_db)):
    token = credentials.credentials
    sayings = core.get_sayings(
        db,
        token=credentials.credentials,
        origin=origin,
        editor_only=editor_only,
    )

    return schemas.SayingsOut(
        data=[
            schemas.Saying(
                id=saying.id,
                origin=saying.origin.name,
                editable=saying.editor.token == token,
                content=saying.content,
            ) for saying in sayings.offset(page_index * page_size).limit(page_size)
        ],
        pagination=schemas.Pagination(
            page_index=page_index,
            page_size=page_size,
            total_size=sayings.count(),
        ),
    )


@router.get('/api/random-saying', response_model=schemas.SayingOut)
async def get_sayings(
        origin: Optional[str] = Query(
            None,
            title='來源',
            description='篩選指定來源的名言',
        ),
        credentials: HTTPAuthorizationCredentials = Security(security),
        db: Session = Depends(get_db)):
    token = credentials.credentials

    saying = core.get_random_saying(
        db,
        token=credentials.credentials,
        origin=origin,
    )

    return schemas.SayingOut(
        data=schemas.Saying(
            id=saying.id,
            origin=saying.origin.name,
            editable=saying.editor.token == token,
            content=saying.content,
        ),
    )


@router.post('/api/sayings', status_code=201, response_model=schemas.SayingOut)
async def create_saying(
        saying_in: schemas.SayingIn,
        credentials: HTTPAuthorizationCredentials = Security(security),
        db: Session = Depends(get_db)):
    token = credentials.credentials
    saying = core.create_saying(
        db,
        token=token,
        saying_in=saying_in,
    )

    return schemas.SayingOut(
        data=schemas.Saying(
            id=saying.id,
            origin=saying.origin.name,
            editable=saying.editor.token == token,
            content=saying.content,
        )
    )


@router.put('/api/sayings/{saying_id}', response_model=schemas.SayingOut)
async def modify_saying(
        saying_id: str,
        saying_in: schemas.SayingIn,
        credentials: HTTPAuthorizationCredentials = Security(security),
        db: Session = Depends(get_db)):
    token = credentials.credentials
    saying = core.modify_saying(
        db,
        token=token,
        saying_id=saying_id,
        saying_in=saying_in,
    )

    return schemas.SayingOut(
        data=schemas.Saying(
            id=saying.id,
            origin=saying.origin.name,
            editable=saying.editor.token == token,
            content=saying.content,
        )
    )


@router.delete('/api/sayings/{saying_id}', response_model=None)
async def delete_saying(
        saying_id: str,
        credentials: HTTPAuthorizationCredentials = Security(security),
        db: Session = Depends(get_db)):
    token = credentials.credentials

    core.delete_saying(
        db,
        token=token,
        saying_id=saying_id,
    )
    return fastapi.Response(status_code=204)
