from aiohttp import web
import asyncio
import functools
from random import randint
from pyee.base import EventEmitter
from pyee.asyncio import AsyncIOEventEmitter
import nest_asyncio

# ee = EventEmitter()
ee = AsyncIOEventEmitter()
connected = set()

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

async def websocket_handler(request, input):
    ws = web.WebSocketResponse()
    connected.add(ws)
    await ws.prepare(request)
    # await get_from_topic(ws=ws, input=input)

    print('connected')
    async for msg in ws:
        # ws.disconnect() # any messages here should kill the connection
        print("websocket connection started sending data we dont accept")  
    print('websocket connection closed')
    return ws

async def mock_from_topic(ws):
    while True:
        ee.emit('event', randint(0,20), ws)
        await asyncio.sleep(1)

async def get_from_topic(input, ws):
    print(ws)
    print(input)
    # return input.map(lambda s: f'consumer got: {s}').each(print)
    return input.each(lambda s: ee.emit("event", s, ws))

async def run(context, input):
    nest_asyncio.apply()
    app = web.Application()
    bound_handler = functools.partial(websocket_handler, input=input)
    app.add_routes([web.get('/ws', bound_handler)])
    app.add_routes([web.static('/files', './', show_index=True)])
    asyncio.gather(get_from_topic(input, ws=bound_handler), web.run_app(app))




