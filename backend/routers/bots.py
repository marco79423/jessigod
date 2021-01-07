from typing import Optional

import fastapi
import linebot
import linebot.models
from fastapi import Header, Request
from starlette.background import BackgroundTasks

from config import conf
from internal import core

router = fastapi.APIRouter()


@router.post('/api/bots/line-webhook')
async def create_propagation_task(
        request: Request,
        background_tasks: BackgroundTasks,
        x_line_signature: Optional[str] = Header(None)):
    body = await request.body()

    parser = linebot.WebhookParser(conf.bots.line_bot.channel_secret)
    events = parser.parse(body.decode(), x_line_signature)
    if events:
        background_tasks.add_task(core.handle_line_events, events)

    return 'ok'
