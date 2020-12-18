from typing import List, Any, Optional

from pydantic import BaseModel, Field


def to_camel(string: str) -> str:
    return ''.join(word.capitalize() if idx != 0 else word for idx, word in enumerate(string.split('_')))


# Base


class RequestBase(BaseModel):
    pass


class Pagination(BaseModel):
    page_index: int
    page_size: int
    total_size: int

    class Config:
        alias_generator = to_camel


class ResponseBase(BaseModel):
    data: Optional[Any]
    pagination: Optional[Pagination]
    error: Optional[Any]

    class Config:
        alias_generator = to_camel


# Saying


class SayingIn(RequestBase):
    origin: str = Field(min_length=1)
    content: str = Field(min_length=1)


class Saying(BaseModel):
    id: str
    origin: str
    editable: bool
    content: str

    class Config:
        alias_generator = to_camel


class SayingsOut(ResponseBase):
    data: List[Saying]


class SayingOut(ResponseBase):
    data: Saying
