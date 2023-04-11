import asyncio
from scramjet.streams import Stream
from random import randint

mock = False
try:
    from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer
except ImportError:
    mock = True
    print('gpiozero module not found, the script proceed with mocked values')


provides = {
   'provides': 'pi',
   'contentType': 'text/plain'
}

async def set_internals(stream, interval=3, mock=mock):
    while True:
        if mock:
            cpu_temp = randint(-20, 80)
            disk_usage = randint(0, 99)
            load_avg = randint(0, 99)
        else:   
            cpu_temp = round(CPUTemperature().temperature, 2)
            disk_usage = round(DiskUsage().usage, 2)
            load_avg = round(LoadAverage().load_average, 2)
        stream.write(['ok', cpu_temp, disk_usage, load_avg])
        await asyncio.sleep(interval)

async def run(context, input):
    stream = Stream()
    asyncio.gather(set_internals(stream), return_exceptions=True)
    return stream.map(lambda x : str(x) + "\n")



