from aiohttp import web
import asyncio
from random import randint
# from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer


connected = set()

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
    await asyncio.sleep(3)
    return 'TOPIC DATA'


app = web.Application()

app.add_routes([web.get('/', root)])
app.add_routes([web.get('/file', serve)])

app.add_routes([web.get('/ws', websocket_handler)])
web.run_app(app)
print('hi')
