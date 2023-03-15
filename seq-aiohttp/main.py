from aiohttp import web
import asyncio
from scramjet.streams import Stream
from random import randint
# from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer


connected = set()

requires = {
   'requires': 'pi',
   'contentType': 'text/plain'
}

async def root(request):
    return web.Response(text="working..")

async def serve(request):
    return web.FileResponse('index.html')

async def websocket_handler(request):
    ws = web.WebSocketResponse()
    connected.add(ws)
    await ws.prepare(request)
    async for msg in ws:
        for connection in connected:
            if msg.type == web.WSMsgType.TEXT:
                if msg.data == 'close':
                    await ws.close()
                else:
                    await connection.send_str(f'ok, data from topic:{await get_from_topic()}')
            elif msg.type == web.WSMsgType.ERROR:
                print(f'ws connection closed with exception {ws.exception()}')

    print('websocket connection closed')
    return ws
    
async def get_from_topic():
    await asyncio.sleep(1)
    return 'TOPIC DATA'


async def run(context, input):
    app = web.Application()
    app.add_routes([web.get('/', root)])
    app.add_routes([web.get('/file', serve)])
    app.add_routes([web.get('/ws', websocket_handler)])
    
    # web.run_app(app)
    asyncio.gather(web.run_app(app), get_from_topic(), return_exceptions=True)


