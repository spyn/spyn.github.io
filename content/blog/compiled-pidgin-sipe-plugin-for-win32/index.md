---
title: Pidgin SIPE plugin for Win32
date: 2011-04-22 21:39 +0800
description: If you want to know how I built it # Add post description (optional)
img: ./pigin-sipe.png # Add image post (optional)
# fig-caption: # Add figcaption (optional)
tags: [pidgin, dev, ocs] # add tag
---

Update: You can now get builds off [sourceforge][].

If you want to know how I built it…

Since we use Microsoft Office Communicator (OCS) at work quite a bit, and recently we’ve updated to
Group Chat - I’ve manged to compile [libsipe.dll][] using the latest
trunk.

I’ll update it when there are updates to the project since I have it all
running nicely on my Ubuntu box![STRIKEOUT:I’m not sure how to get Group
Chat up and running as of yet, maybe someone could help me? I don’t know
what URI to put in. But at least the dialog is there in this plugin
version.]

Managed to sort that one out :) - was entering the wrong group chat
server URL. I’ve setup autobuilding for every week, you can check out
the DLLs here \<nope, lost everything in a server crash\>

If you come across any problems please let me know so I can investigate
:)

Enjoy!

Some notes on how I built this Firstly, you need to build Pidgin. I
followed [this guide][]. But specifically, this is what I did : I built
everything under /usr/src/pidgin Installed the following packages via
apt-get
``` bash
$ sudo apt-get install mingw32 mingw32-binutils mingw32-runtime
```
Followed Step 2 in the guide linked to the URL above Installed Pidgin’s
build dependencies as per the guide Followed the cross-compiling guide
Built pidgin using the mingw make file (using the Build Pidgin
instructions from the above guide) Once it built cleanly, I grabbed the
latest source for [libsipe via git][]Followed only the 1st step from the
libsipe website, just to get the code Grabbed the dependencies specified
in [this wiki article][] I then had to edit the Makefile.mingw (and
other occurrences of the file) to meet the pidgin version I was
compiling against Tried to compile it, it came back with a whole bunch
of errors and I manually went through all the error’ing related files
(from memory, usually a bunch of header files) and made sure they were
set

### Handy links

[OCSPedia][] -
Shows how to generate a group chat log file, pretty useful if you want
to check out what your URI is

### Update:

If you want to grab the latest release (1.12) you can get it from
[here][] (dropbox)

  [sourceforge]: http://sipe.sourceforge.net/
  [libsipe.dll]: http://sipe.sourceforge.net
  [this guide]: http://developer.pidgin.im/wiki/BuildingWinPidgin
  [libsipe via git]: http://sipe.sourceforge.net/git/
  [this wiki article]: http://sourceforge.net/apps/mediawiki/sipe/index.php?title=Windows_Build
  [OCSPedia]: http://www.ocspedia.com/GroupChat/Group\_Chat\_Logging.htm
  [here]: http://dl.dropbox.com/u/127493/libsipe_pidgin-sipe-1.12.0.zip
