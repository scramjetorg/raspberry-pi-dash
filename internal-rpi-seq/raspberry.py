import asyncio
import random
from scramjet.streams import Stream
# from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer


provides = {
   'provides': 'pi',
   'contentType': 'text/plain'
}

async def set_internals(stream, intervals=3):
    while True:
        cpu_temp = round(random.uniform(20,90), 2)
        disk_usage = round(random.uniform(5,95), 2)
        load_avg = round(random.uniform(0,100), 2)
        stream.write([cpu_temp, disk_usage, load_avg])
        await asyncio.sleep(intervals)

async def run(context, input):
    stream = Stream()
    asyncio.gather(set_internals(stream), return_exceptions=True)
    return stream.map(lambda x : str(x) + "\n")


