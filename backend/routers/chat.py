import fastapi
import openai as openai

from config import conf
from internal import schemas

router = fastapi.APIRouter()


@router.put('/api/chat', response_model=schemas.ChatOut)
async def create_propagation_task(chat_in: schemas.ChatIn):
    openai.api_key = conf.chat.openai_token

    # https://beta.openai.com/docs/api-reference/completions/create?lang=python
    response = openai.Completion.create(
        # model="text-davinci-003",
        model="text-curie-001",
        prompt=chat_in.question,
        temperature=0.9,
        max_tokens=1000,
    )

    return schemas.ChatOut(
        question=chat_in.question,
        response=response["choices"][0]["text"]
    )