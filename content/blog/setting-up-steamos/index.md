---
title: Setting up SteamOS
date: 2014-10-25 10:27 +0800
description: My experiences setting up SteamOS  # Add post description (optional)
img: ./steam-os.jpg # Add image post (optional)
# fig-caption: # Add figcaption (optional)
tags: [gaming, steam-os, linux] # add tag
---

On Tuesday, I took the plunge and setup [SteamOS beta][] on my HTPC -
dual booting into Windows

I had to use the ISO, as my mainboard doesn’t appear to support UEFI. It
is a faily old beast.

Processor: Intel Duo 
Memory: xGB 
Hard Drive: 40GB space allocated 
Video Card: AMD RADEON 
Joystick: XBOX 360 controller

Although, my main goal was to Steam Stream games from my desktop, which
has way more power behind it.

The installation did run smoothly, nice hints of debian. I did have to
run an expert install so I could dual boot. I was running Ubuntu on the
drive, but I had to make sure it reformatted the partition

I did run into a few problems, after installation though, which is
understandable since SteamOS is -in beta-.

### Black screen after installation

It looks like the Radeon card doesn’t work straight out of “the box”

I had to follow these steps in order to get the video card working, from
Reddit [Working suggestions for black screen after][]

After getting that all sorted, the next problem I ran into

### Network problems

I had some interesting networking problems. My RealTech network card was
not installed by default. I had to insmod the device, then manually
setup the network card.

It began to install Steam, and in the Steam installation, the network
card lost connectivity, for some odd reason, I had to fix it in the
network manager conf file, and set it to managed. From [AskUbuntu][]

``` bash
$ sudo nano /etc/NetworkManager/NetworkManager.conf 
```
and set managed to
true

Steam began to continue the installation after that.

### In-house streaming world problems

I had a problem with In-house streaming. It appears that having
VirtualBox installed messes with the network metric[4]

Workaround - 
1. Open up Network and Sharing Center 
2. Click ‘Change Adapter Settings’ 
3. Right click ‘VirtualBox Host-Only Network’, go to Properties 
4. Double click “Internet Protocol Version 4 (TCP/IPv4)‘under ’This connection uses the following items’. 
5. In the Properties page, click ”Advanced…" 
6. In the “Advanced TCP/IP Settings”, tab “IP Settings”, uncheck the box marked “Automatic Metic” and type in 800 or higher.

OK all dialogs and run whatever software could not Recieve multicast.

The problem stems from Microsoft assigning interface Metrics based on
the driver’s own reported Link speed in Windows 7. Since that’s all 1GB,
there is a clash on metric. From [VirtualBox tickets][]

### Installing XBMC

I didn’t bother installing XBMC, because it doesn’t support hardware
rendering on my Radeon, but it should work fine if you have a nVidia
based video card.

[Setting up XBMC][]

  [SteamOS beta]: http://store.steampowered.com/steamos/buildyourown
  [Working suggestions for black screen after]: http://www.reddit.com/r/SteamOS/comments/22pgp3/working_suggestions_for_black_screen_after/
  [AskUbuntu]: http://askubuntu.com/questions/71159/network-manager-says-device-not-managed/
  [VirtualBox tickets]: https://www.virtualbox.org/ticket/8698/
  [Setting up XBMC]: http://steamcommunity.com/groups/steamuniverse/discussions/1/648816742742587380/

