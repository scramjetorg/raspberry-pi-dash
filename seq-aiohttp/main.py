import aiohttp
import nest_asyncio
from aiohttp import web
from client.host_client import HostClient


api_base ='http://127.0.0.1:8000' 
host = HostClient(f'{api_base}/api/v1/')
topic_gen = host.get_named_data('pi')

async def handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    async for chunk in await topic_gen:
        await ws.send_str(str(chunk))
    async for msg in ws:
        if msg.type == aiohttp.WSMsgType.TEXT:
            if msg.data == 'close':
                await ws.close()
            else:
                await ws.send_str(f'{msg.data} /answer')
        elif msg.type == aiohttp.WSMsgType.ERROR:
            print(f'ws connection closed with exception {ws.exception()}')
    print('websocket connection closed')
    return ws

async def run(context, input):
    nest_asyncio.apply()
    app = web.Application()
    app.add_routes([web.static('/files', './', show_index=True)])
    app.add_routes([web.get('/ws', handler)])
    await web.run_app(app, port=8020)


