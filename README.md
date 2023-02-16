# Running STH on Raspberry Pi

 🚀 + <img width="2%" src="https://user-images.githubusercontent.com/81818614/219020422-56b87af7-fb08-4de3-9a92-b95c550fc834.svg"> ? Why not!
 
 ## Introduction

The following configuration was tested on Raspberry Pi Zero 2 W booted in headless mode with 64-bit image.

How to set up headless rPi? ---FUTURE LINK---

xyz

## Installation :clamp:

First You should install node.js:
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```
```
sudo apt-get install -y nodejs
```
then install our STH and CLI:

```
sudo npm i -g @scramjet/sth @scramjet/cli
```

Verify installation:
```
node -v
si -v
```

## Start STH :checkered_flag:

Create rpi_config.json (you can also use yaml file):
```
{
"runtimeAdapter": "process",
"safeOperationLimit": 128,
"instanceRequirements": { "freeMem": 64 }
}
```

and launch Scramjet Transform Hub 
```
sth --config /path/to/config/rpi_config.json
```
:bulb: Note: As default hub reserves 512MB of RAM, if your raspberry has 1GB+ you can try run sth without custom memory limits

# Troubleshooting :collision:
