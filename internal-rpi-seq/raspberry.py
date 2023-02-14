import asyncio
# from gpiozero import CPUTemperature, DiskUsage, LoadAverage, PingServer


async def run(context, input, interval=1):
    while True:
        cpu_temp = 37.234
        disk_usage = 7.456
        load_avg = 11.4645
        # cpu = CPUTemperature()
        # cpu_temp = cpu.temperature
        # disk = DiskUsage()
        # disk_usage = disk.usage
        # load = LoadAverage()
        # load_avg = load.load_average()
        # google = PingServer('google.com')
        # print(google)
        # print(f'Current disk usage: {disk_usage:.2f}%')
        # print(f'CPU Temperature: {cpu_temp:.2f}C')
        # print(f'CPU Load: {load_avg}%')
        print(f'------------------------')
        await asyncio.sleep(interval)
        yield cpu_temp, disk_usage, load_avg
