import asyncio
import uvicorn
import json
import random
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse

app = FastAPI()

STREAM_DELAY = 1  # second
RETRY_TIMEOUT = 15000  # milisecond

origins = ["*"]

ENTITYS = [{
    'id': i, 
    'name': str(i * random.randint(2,800)), 
    'position': {
        'top': random.randint(200,800),
        'left': random.randint(200,800),
    }} for i in range(1, 100)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/entitys")
async def entitys():
    entitys = list(ENTITYS)
    
    return entitys


@app.get('/realtime-name')
async def position_stream(request: Request):
    def new_messages():
        # Add logic here to check for new messages
        yield 'Hello World'
    
    async def event_generator():
        while True:
            # If client closes connection, stop sending events
            if await request.is_disconnected():
                break

            # Checks for new messages and return them to client if any
            if new_messages():
                for entity in ENTITYS:
                    entity['position']['top'] = random.randint(0,600)
                    entity['position']['left'] = random.randint(0,600)
                data = json.dumps({
                    "event": "update",
                    "retry": 1,
                    "data": list(ENTITYS)
                    })
                yield data

            await asyncio.sleep(1)

    return EventSourceResponse(event_generator())