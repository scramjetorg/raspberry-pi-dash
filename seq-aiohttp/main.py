from aiohttp import web
import asyncio
from scramjet.streams import Stream
from random import randint
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

async def websocket_handler(request, input):
    ws = web.WebSocketResponse()
    connected.add(ws)
    await ws.prepare(request)
    async for msg in ws:
        for connection in connected:
            if msg.type == web.WSMsgType.TEXT:
                if msg.data == 'close':
                    await ws.close()
                else:
                    await connection.send_str(f'ok, data from topic:{await get_from_topic(input)}')
            elif msg.type == web.WSMsgType.ERROR:
                print(f'ws connection closed with exception {ws.exception()}')

    print('websocket connection closed')
    return ws
    

bound_handler = functools.partial(websocket_handler, input='input')

async def get_from_topic(input):
    await asyncio.sleep(1)
    topic_data = input.map(lambda s: f'consumer got: {s}').each(print)
    return topic_data

async def run(context, input):
    nest_asyncio.apply()
    app = web.Application()
    app.add_routes([web.get('/', root)])
    app.add_routes([web.get('/ws', bound_handler)])
    app.add_routes([web.static('/files', './', show_index=True)])
    # web.run_app(app)
    asyncio.gather(web.run_app(app), return_exceptions=True)


