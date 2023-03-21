from aiohttp import web
import asyncio
import functools
from random import randint
from pyee.asyncio import AsyncIOEventEmitter


# ee = EventEmitter()
ee = AsyncIOEventEmitter()

requires = {
   'requires': 'pi',
   'contentType': 'text/plain'
}

@ee.on('event')
async def event_handler(ws, data):
    print(f'TRIGGERED, {data}, {ws}')
    await ws.send_str(f'ok, data {data}')

async def push_to_socket(socket, data):
    await socket.send_str(f'pushed: {data}')

async def root(request):
    return web.Response(text="working..")

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    print('connected')
    await mock_from_topic(ws=ws)
    async for msg in ws:
        # ws.disconnect() # any messages here should kill the connection
        print("websocket connection started sending data we dont accept")  
    print('websocket connection closed')
    return ws

async def mock_from_topic(ws):
    while True:
        ee.emit('event', ws, randint(0,20))
        await asyncio.sleep(randint(0,4))

app = web.Application()
app.add_routes([web.get('/', root)])
bound_handler = functools.partial(websocket_handler)
app.add_routes([web.get('/ws', bound_handler)])
app.add_routes([web.static('/files','./', show_index=True)])
web.run_app(app)



