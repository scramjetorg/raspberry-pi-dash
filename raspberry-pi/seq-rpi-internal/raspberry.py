import asyncio
import newlinejson as nlj
from scramjet.streams import Stream
from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer

provides = {
   'provides': 'pi',
   'contentType': 'application/x-ndjson'
}

params = {'cpu_temp':0,'disk_usage':0,'load_avg':0}



async def set_internals(stream, interval=5):
    while True:
        params['cpu_temp'] = round(CPUTemperature().temperature, 2)
        params['disk_usage'] = round(DiskUsage().usage, 2)
        params['load_avg'] = round(LoadAverage().load_average, 2)
        stream.write(params)
        await asyncio.sleep(interval) 

async def run(context, input):
    stream = Stream()
    asyncio.gather(set_internals(stream), return_exceptions=True)
    return stream.map(lambda x : str(x) + "\n")


