import asyncio
from scramjet.streams import Stream
from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer


provides = {
   'provides': 'pi',
   'contentType': 'text/plain'
}

async def set_internals(stream, interval=3):
    while True:
        cpu_temp = round(CPUTemperature().temperature, 2)
        disk_usage = round(DiskUsage().usage, 2)
        load_avg = round(LoadAverage().load_average, 2)
        stream.write([cpu_temp, disk_usage, load_avg])
        await asyncio.sleep(interval)

async def run(context, input):
    stream = Stream()
    asyncio.gather(set_internals(stream), return_exceptions=True)
    return stream.map(lambda x : x + "\n")


