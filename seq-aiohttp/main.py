from aiohttp import web
import asyncio
from scramjet.streams import Stream
from random import randint
from pyee.base import EventEmitter

import nest_asyncio
# from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer
import functools

connected = set()

requires = {
   'requires': 'pi',
   'contentType': 'text/plain'
}

async def root(request):
    return web.Response(text="working..")

async def serve(request):
    return web.FileResponse('index.html')

async def websocket_handler(request, ee):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    handler = lambda data: await connection.send_str(f'ok, data from topic:{data}')

    ee.on('data', handler)
    
    async for msg in ws:
        ws.disconnect() # any messages here should kill the connection
        print("websocket connection started sending data we dont accept")
    
    await ee.off('data', handler)

    print('websocket connection closed')
    return ws

async def get_event_emitter(input):
    ee = EventEmitter()
    input.each(lambda s: ee.emit("data", ee))
    return ee

async def get_from_topic(input):
    await asyncio.sleep(1)
    topic_data = input.map(lambda s: f'consumer got: {s}') # here should be a JSON stringifier...
    return topic_data

async def run(context, input):
    nest_asyncio.apply()
    ee = get_event_emitter(input)
    bound_handler = functools.partial(websocket_handler, ee=ee)
    
    app = web.Application()
    app.add_routes([web.get('/', serve)])
    app.add_routes([web.get('/ws', bound_handler)])
    app.add_routes([web.static('/files', './', show_index=True)]) # this seems to be missing?
    # web.run_app(app)
    asyncio.gather(web.run_app(app), return_exceptions=True)


