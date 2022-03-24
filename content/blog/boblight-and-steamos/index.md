---
title: boblightd and SteamOS
date: 2014-11-01 20:35 +0800
description: Setting up boblightd with SteamOS # Add post description (optional)
img: ./steamos-boblight.png # Add image post (optional)
# fig-caption: # Add figcaption (optional)
tags: [steamos, gaming, linux, ambi-light] # add tag
---
Having some spare time, I thought I would see if it is possible to setup boblightd with SteamOS. 

It looks like it's possible, with X11 at least.

https://code.google.com/p/boblight/wiki/Compiling

Firstly, I added the wheezy distro to apt sources. 

It doesn't look like the libraries that are required, so I'm going to have to add some apt repos
http://steamcommunity.com/groups/steamuniverse/discussions/1/648816742742587380/

Also, openssh-server, because I'm lazy and don't want to do it via the keyboard.

``` bash
$ sudo apt-get install libx11-dev libgl1-mesa-dev libxrender-dev libxext-dev portaudio19-dev libavcodec-dev libavformat-dev libavdevice-dev
```

I ommited libswscale-dev, as it appears another version is installed. Let's hope that it'll compile ok!

It appears to be missing libusb too!
``` bash
$ apt-get install libusb-1.0.0-dev
```
$ ffmpeg - because I think we want v4l support, for boblight

but we need to install libswscale2 in order for it to compile --with-ffmpeg

``` bash
$ apt-get remove ffmpeg libav-tools libavfilter2 libavfilter4 libswscale2 xbmc xbmc-bin
```

let's install XBMC again, because it's a nice to have
``` bash
$ apt-get install xbmc
```
It's compling okay, let's build!

oops, apt-get install libtool g++ (no g++ was found)

Looks like boblight doesn't come with support for lightpack, so use this one 

> https://github.com/timsat/boblight-lightpack

let's try that again... that worked
``` bash
./configure --with-ffmpeg
```
You will have to open boblight-v4l.cpp and videogabber.cpp and add the unistd header to the code, for some reason this will cause errors when you try to compile boblight

``` bash
$ vim src/clients/boblight-v4l/boblight-v4l.cpp
(some where with the rest of the headers)
#include <unistd.h>
```

``` bash
$ vim src/clients/boblight-v4l/videograbber.cpp
(some where with the rest of the headers)
#include <unistd.h>
```

``` bash
$ ./configure --with-ffmpeg
$ make clean && make
$ sudo make install
```

Hooray, we have a build. Now, we need to edit /etc/boblight.conf

First, let's find the USB device
``` bash
desktop@steamos:/usr/src/boblight-read-only/arduino$ lsusb
Bus 001 Device 003: ID 1d50:6022 OpenMoko, Inc.
```
While we're playing with USB devices, we need to make the usb port readable by the steam user, so...
``` bash
  idVendor           0x1d50 OpenMoko, Inc.
  idProduct          0x6022
```
``` bash
$ sudo vim /etc/udev/rules.d/69-persistent-usb.rules
and add
ATTRS{idVendor}=="1d50",ATTRS{idProduct}=="6022",MODE="0666",GROUP="video"
```

Here is my version of boblight.conf that I pulled from my XBMC media centre

``` bash
$ sudo vim /etc/boblight.conf
```
``` editorconfig
[global]
interface 127.0.0.1
port 19333

[device]
name ambilight
channels 30
type lightpack
output /dev/usb/hiddev0
interval 20000
debug on
#bus 1
#address 6
#debug true

[color]
name red
rgb FF0000

[color]
name green
rgb 00FF00

[color]
name blue
rgb 0000FF

[light]
name 1
color red ambilight 28
color green ambilight 29
color blue ambilight 30
hscan 0 16.67
vscan 75 100

[light]
name 2
color red ambilight 19
color green ambilight 20
color blue ambilight 21
hscan 0 16.67
vscan 50 75

[light]
name 3
color red ambilight 16
color green ambilight 17
color blue ambilight 18
hscan 0 16.67
vscan 25 50

[light]
name 4
color red ambilight 22
color green ambilight 23
color blue ambilight 24
hscan 0 16.67
vscan 0 25

[light]
name 5
color red ambilight 25
color green ambilight 26
color blue ambilight 27
hscan 0 16.67
vscan 0 16.67


[light]
name 6
color red ambilight 1
color green ambilight 2
color blue ambilight 3
hscan 50 66.67
vscan 0 16.67

[light]
name 7
color red ambilight 10
color green ambilight 11
color blue ambilight 12
hscan 66.67 83.33
vscan 0 16.67

[light]
name 8
color red ambilight 7
color green ambilight 8
color blue ambilight 9
hscan 83.33 100
vscan 0 16.67

[light]
name 9
color red ambilight 13
color green ambilight 14
color blue ambilight 15
hscan 83.33 100
vscan 0 25

[light]
name 10
color red ambilight 4
color green ambilight 5
color blue ambilight 6
hscan 0 0
vscan 0 0

```

We now need the daemon and the client to launch when lightvm loads

``` bash
$ sudo vim /etc/X11/Xsession.d/91boblight
```
``` bash
#!/bin/bash
export DISPLAY=:0
boblightd -f
sleep 2
boblight-X11 -x -i 0.03 -o value=5.0 -o saturation=2.0 -o speed=60.0 &
```

And we need to add it to Xsession.options
```bash
$ sudo vim /etc/X11/Xsession.options
```
``` bash
$ boblight
```

Reboot, and you should have a working ambilight. I've found it to be completely slow and unuseable, but it was an experience.

### These things FAILED

Now I tried doing this, but I could never get it to work. Appears SteamOS doesn't run through SysV? I don't know. I spent hours on this.

Create a startup script in /etc/init.d
``` bash
$ vim /etc/init.d/boblightd.sh
```
``` bash
#!/bin/sh
### BEGIN INIT INFO
# Provides:          boblightd
# Required-Start:    $all
# Required-Stop:
# Should-Start:
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Starts boblightd
### END INIT INFO
# OK GO

prog="BoblightD"

case "$1" in
  start)
        boblightd -f > /dev/null 2>&1
        echo "Starting boblightd..."
        ;;
  stop)
        # No-op
        sudo -S killall boblightd
        echo "Stopping boblightd..."
        ;;
  *)
        echo "Usage: boblightd.sh [start|stop]" >&2
        exit 3
        ;;
esac
:

```

Needs to run BEFORE lightdm
``` bash
$ desktop@steamos:~$ sudo update-rc.d boblightd.sh defaults
```
