# Running STH (Scramjet Transform Hub) on Raspberry Pi

 🚀 + <img width="2%" src="https://user-images.githubusercontent.com/81818614/219020422-56b87af7-fb08-4de3-9a92-b95c550fc834.svg"> ? Why not!
 
 
 # Table of contents <!-- omit in toc -->

- [Introduction :handshake:](#introduction)
- [Installation :clamp:](#installation-clamp)
- [Start STH :checkered_flag:](#start-sth-checkered_flag)
- [Set up the Sequence 🔨](#set-up-the-sequence)
- [FAQ | Troubleshooting :collision:](#faq-troubleshooting-collision)
 
 ## Introduction

Scramjet Sequences don't require high hardware requirements. You can run it also on cheap single-board computers for example Raspberry Pi <img width="1.2%" src="https://user-images.githubusercontent.com/81818614/219020422-56b87af7-fb08-4de3-9a92-b95c550fc834.svg"> The following configuration was tested on Raspberry Pi Zero 2 W booted in headless mode with 64-bit image (5.15 kernel). In this example we will capture some internal parameters of RPi in real time.

How to boot rPi? -> [official video](https://www.youtube.com/watch?v=ntaXWS8Lk34&feature=youtu.be)


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

Create sth_rpi_config.json:
```
{
"runtimeAdapter": "process",
"safeOperationLimit": 128,
"instanceRequirements": { "freeMem": 64 }
}
```
**or** sth_rpi_config.yml:
```
safeOperationLimit: 128
runtimeAdapter: process
instanceRequirements:
    freeMem: 64
```

and launch Scramjet Transform Hub 
```
sth --config /path/to/config/sth_rpi_config.json
```
:bulb: Note: As default hub reserves 512MB of RAM, if your raspberry has 1GB or more, you can try run sth without custom memory limits


## Set up the Sequence

clone this git repository:

```bash
git clone git@github.com:scramjetorg/raspberry-pi-dash.git
```

cd inside sequence directory:

```bash
cd seq-internal-rpi
```

now you have to build dist directory:

```bash
npm run build
```
and deploy the sequence! :rocket: :

```bash
si seq deploy dist
```
now the Instance of your Sequence is running and producing to "pi" topic, you can verify that by launching topic listener :ear: via CLI:

```bash
si topic get pi
```
you should see similar output:
```
[38.63, 8.35, 0.25]
[39.17, 8.35, 0.24]
[38.63, 8.35, 0.24]
[38.63, 8.35, 0.24]
```
these values are respectively: chip temperature in Celcius degrees, disk usage and average CPU load.

## FAQ Troubleshooting :collision:
### Why my computer doesn't see the Raspberry?

Raspberry Team have removed deafault user. If you created image with non official imager (eg. balenaEtcher), you need to create userconf.txt (in the boot root directory) and add the following line:
```
pi:$6$/XOZsG1X0IAbhXB0$wYZHRkvib0SUKQA3KVAxofPR.JsFAbI2NCue2znGvhRsQobVdllFXyQZ7fMSvAoyEj8MfHtkMeSZT7IRIixg01

```
this step will enable deafault user (user: pi, password: raspberry).

### I made some changes in my code, how to rebuild the sequence?

There are two ways, you can force rebuld with `npm run build --upgrade` or manually remove `/dist` directory and do simple `npm run build`.

## Dictionary:

- STH - Scramjet Transform Hub
- Sequence - program adapted to run in STH environment
- Instance - running Sequence
- Topics - are named buses over which Instances exchange messages
- si - Scramjet Command Line Interface
