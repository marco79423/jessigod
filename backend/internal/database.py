from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from config import conf

SQLALCHEMY_DATABASE_URL = conf.server.database_url

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_recycle=100,  # 多少時間自動重連 (MySQL 預設會 8 小時踢人)
)
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()
