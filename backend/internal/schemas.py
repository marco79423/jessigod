from typing import List, Any, Optional

from pydantic import BaseModel, Field

# Base
from internal import utils


class RequestBase(BaseModel):
    pass


class Pagination(BaseModel):
    page_index: int
    page_size: int
    total_size: int

    class Config:
        alias_generator = utils.to_camel
        allow_population_by_field_name = True


class ResponseBase(BaseModel):
    data: Optional[Any]
    pagination: Optional[Pagination]
    error: Optional[Any]

    class Config:
        alias_generator = utils.to_camel
        allow_population_by_field_name = True


# Origin
class Origin(BaseModel):
    id: str
    name: str


class OriginsOut(ResponseBase):
    data: List[Origin]


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
        alias_generator = utils.to_camel
        allow_population_by_field_name = True


class SayingsOut(ResponseBase):
    data: List[Saying]


class SayingOut(ResponseBase):
    data: Saying


# Task

class TaskIn(RequestBase):
    mode: str
    data: Optional[Any]


class TaskOut(ResponseBase):
    data: str
