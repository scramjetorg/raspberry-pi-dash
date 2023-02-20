from scramjet.utils import TopicProducer
import asyncio
import random


async def get_internals(stream, interval=1):
    pi_topic = TopicProducer('pi')
    while True:
        cpu_temp = round(random.uniform(20,90), 2)
        disk_usage = round(random.uniform(5,95), 2)
        load_avg = round(random.uniform(0,100), 2)

        await asyncio.sleep(interval)
        pi_topic.publish(cpu_temp, disk_usage, load_avg)

