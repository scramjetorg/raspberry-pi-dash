from aiohttp import web
import asyncio
import functools
from random import randint
from pyee.asyncio import AsyncIOEventEmitter
import nest_asyncio
import sys

ee = AsyncIOEventEmitter()
connected = set()

print(f'PATH SEQ: {sys.path}')


requires = {
   'requires': 'pi',
   'contentType': 'text/plain'
}

# @ee.on('event')
# async def event_handler(ws, data):
#     print(f'TRIGGERED, {data}, {ws}')
#     await ws.send_str(f'ok, data {data}')

async def push_to_socket(socket, data):
    await socket.send_str(f'pushed: {data}')

async def root(request):
    return web.Response(text="working..")

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    connected.add(ws)
    await ws.prepare(request)
    # await get_from_topic(ws=ws, input=input)
    ee.on('event', lambda s: ws.send_str(f'ok, data {s}'))

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

async def get_from_topic(input):
    print('enter func')
    # print(input)
    async for x in input:
        ee.emit("event", x)
        print(x)
    print('exit func')
    
    # # return input.each(print)
    # # return input.each(lambda s: ee.emit("event", s))
    # return input.map(lambda s: f'consumer got: {s}').each(print)

async def run(context, input):
    nest_asyncio.apply()
    app = web.Application()
    bound_handler = functools.partial(websocket_handler)
    print('hi')
    app.add_routes([web.get('/ws', bound_handler)])
    app.add_routes([web.static('/files', './', show_index=True)])



    loop = asyncio.get_event_loop()
    print(loop)
    loop.set_debug(True)
    loop.create_task(web.run_app(app))
    loop.create_task(get_from_topic(input=input))
    loop.run_forever()

    # await get_from_topic(input=input)
    # loop = asyncio.get_running_loop()
    # print('before topic register')
    # await loop.run_in_executor(web.run_app(app))
    # print('after')



