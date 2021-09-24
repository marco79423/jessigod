import pytz
import telegram
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from config import conf
from internal import core
from internal import models
from internal.database import engine


def bootstrap():
    # 設定資料庫
    _setup_db()

    # 設定機器人
    _setup_telegram_bot()

    # 設定排程器
    _setup_scheduler()


def _setup_db():
    models.Base.metadata.create_all(bind=engine)


def _setup_telegram_bot():
    if conf.bots.telegram_bot:
        bot = telegram.Bot(conf.bots.telegram_bot.token)
        bot.set_webhook(conf.bots.telegram_bot.url)


def _setup_scheduler():
    scheduler = AsyncIOScheduler()
    scheduler.start()

    for schedule in conf.preacher.schedules:
        scheduler.add_job(
            core.handle_schedule_task,
            CronTrigger.from_crontab(schedule, timezone=pytz.timezone(conf.server.timezone))
        )
