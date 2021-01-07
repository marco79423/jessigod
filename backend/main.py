import fastapi
import uvicorn

from routers import admin, sayings, bots

app = fastapi.FastAPI()
app.include_router(admin.router)
app.include_router(sayings.router)
app.include_router(bots.router)

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000)
