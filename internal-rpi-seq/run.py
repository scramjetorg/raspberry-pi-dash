import asyncio
from raspberry import run


async def main():
    async for i in run(None, None):
        print(i)

if __name__ == "__main__":
    asyncio.run(main())
