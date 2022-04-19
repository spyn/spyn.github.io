---
title: Sitecore: Migrating from TDS to SCS
date: 2022-04-18 19:23 +0800
description: When looking at the daunting amount of TDS projects that our Sitecore solution has, I decided to whip up a quick migration command line application that parses each TDS project and item in the solution
img: ./tds2scs-screenshot1.png # Add image post (optional)
# fig-caption: # Add figcaption (optional)
tags: [sitecore] # add tag
---

## Migrating to SCS from TDS!

CLI to convert TDS projects to CSC modules

When looking at the daunting amount of TDS projects that our Sitecore solution has, I decided to whip up a quick migration command line application that parses each TDS project and item in the solution
It generates basic module skeletons based off the TDS project, it also takes into account for any Helix modules that exist in the solution. 
It will require some manual intervention after the module files have been created, to tease out the additional items you would like synchronised.

![Terminal running tds2scs command line tool](./tds2scs-screenshot1.png)

Obviously the script isn't 100%, and you will need to still create additional modules for the edge cases, eg /sitecore/system but it'll give you a good start!

The code can be found on my [Github](https://github.com/spyn/tds2scs)