import telegram
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

from config import conf
from internal import core
from internal import models
from internal.database import engine


def bootstrap():
    models.Base.metadata.create_all(bind=engine)

    bot = telegram.Bot(conf.bots.telegram_bot.token)
    bot.set_webhook(conf.bots.telegram_bot.url)

    scheduler = AsyncIOScheduler()
    scheduler.start()

    for schedule in conf.preacher.schedules:
        scheduler.add_job(core.handle_schedule_task, CronTrigger.from_crontab(schedule))
