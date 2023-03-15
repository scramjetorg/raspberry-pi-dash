from aiohttp import web
import asyncio
from random import randint
# from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer
import functools


connected = set()

async def root(request):
    return web.Response(text="working..")

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
    
async def get_from_topic(input):
    await asyncio.sleep(3)
    return 'TOPIC DATA'



bound_handler = functools.partial(websocket_handler, input='input')

app = web.Application()

app.add_routes([web.get('/', root)])
app.add_routes([web.static('/files', './', show_index=True)])

app.add_routes([web.get('/ws', bound_handler)])
web.run_app(app)
print('hi')
