import datetime as dt

from sqlalchemy import Column, String, ForeignKey, DateTime, Unicode
from sqlalchemy.orm import relationship

from internal.database import Base


class Editor(Base):
    __tablename__ = 'editor'

    id = Column(String(36), primary_key=True)
    token = Column(String(36), unique=True, index=True)
    sayings = relationship('Saying', back_populates='editor')
    created_at = Column(DateTime, default=dt.datetime.utcnow)


class Origin(Base):
    __tablename__ = 'origin'

    id = Column(String(36), primary_key=True)
    name = Column(String(64), unique=True, index=True)
    sayings = relationship('Saying', back_populates='origin')
    created_at = Column(DateTime, default=dt.datetime.utcnow)


class Saying(Base):
    __tablename__ = 'saying'

    id = Column(String(36), primary_key=True, index=True)
    editor_id = Column(String(36), ForeignKey('editor.id'))
    editor = relationship('Editor', back_populates='sayings')
    origin_id = Column(String(36), ForeignKey('origin.id'))
    origin = relationship('Origin', back_populates='sayings')
    content = Column(Unicode(2048))
    created_at = Column(DateTime, index=True, default=dt.datetime.utcnow)


class LineGroup(Base):
    __tablename__ = 'line_group'

    id = Column(String(36), primary_key=True, index=True)
    group_id = Column(String(36), index=True)
