import fastapi

from internal import schemas, core

router = fastapi.APIRouter()


@router.put('/api/chat', response_model=schemas.ChatOut)
async def create_propagation_task(chat_in: schemas.ChatIn):
    response = core.get_ai_response(chat_in.question)
    return schemas.ChatOut(
        question=chat_in.question,
        response=response,
    )