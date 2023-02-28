import http.server
import socketserver
import asyncio
from functools import partial


async def run(context, input, port=8002):
    Handler = partial(http.server.SimpleHTTPRequestHandler, directory='../')
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"serving at port: {port}")
        httpd.serve_forever()
        await asyncio.sleep(1)