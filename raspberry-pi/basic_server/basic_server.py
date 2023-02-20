import http.server
import socketserver
import asyncio


async def run(context, input, port=10000):
    Handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", port), Handler) as httpd:
        httpd.server_activate()
        print("serving at port", port)
    while True:
        await asyncio.sleep(100)


