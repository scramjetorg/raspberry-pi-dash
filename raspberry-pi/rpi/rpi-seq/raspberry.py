import asyncio
import newlinejson as nlj
from scramjet.streams import Stream
import json 
from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer

provides = {
    'provides': 'pi',
    'contentType': 'plain/text'
}

params = {"cpu_temp":0,'disk_usage':0,'load_avg':0}



async def run(context, input):
    while True:
        params['cpu_temp']=5
        params['disk_usage']  = 5
        params['load_avg']  = 5
        yield json.dumps(params)
        await asyncio.sleep(3) 

