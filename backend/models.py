import datetime as dt

from sqlalchemy import Column, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Editor(Base):
    __tablename__ = 'editor'

    id = Column(String, primary_key=True)
    token = Column(String, unique=True, index=True)
    sayings = relationship('Saying', back_populates='editor')
    created_at = Column(DateTime, default=dt.datetime.utcnow)


class Origin(Base):
    __tablename__ = 'origin'

    id = Column(String, primary_key=True)
    name = Column(String, unique=True, index=True)
    sayings = relationship('Saying', back_populates='origin')
    created_at = Column(DateTime, default=dt.datetime.utcnow)


class Saying(Base):
    __tablename__ = 'saying'

    id = Column(String, primary_key=True, index=True)
    editor_id = Column(String, ForeignKey('editor.id'))
    editor = relationship('Editor', back_populates='sayings')
    origin_id = Column(String, ForeignKey('origin.id'))
    origin = relationship('Origin', back_populates='sayings')
    content = Column(Text, unique=True)
    created_at = Column(DateTime, index=True, default=dt.datetime.utcnow)
