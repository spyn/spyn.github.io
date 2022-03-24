---
title: Playing around with Net::Twitter in PERL
date: 2012-07-07 13:29 +0800
description: Here are some perl recipes that I've written to help interface with Twitter # Add post description (optional)
img: ./twitter-perl.png # Add image post (optional)
# fig-caption: # Add figcaption (optional)
tags: [twitter, code, perl] # add tag
---

Here are some perl recipes that I’ve written that helps interface with
Twitter and run some basic tasks. You will need to create a Twitter
application, generate a consumer key and twitter tokens (with read/write
access).

This first piece of code needs to be on all the scripts below. It sets
up the [Net::Twitter][] object and authenticates.

### Authentication

``` perl
#!/usr/bin/perl
use Net::Twitter;
use Net::Twitter::Core;
use Scalar::Util 'blessed';
use List::Util;
my $nt = Net::Twitter->new(legacy => 0);
my $ntc = Net::Twitter::Core->new(); #\_with\_traits(traits => [qw/API::Search/]);
my $consumer\_key = "CONSUMER KEY";
my $consumer\_secret = "CONSUMER SECRET";
my $token = "TWITTER TOKEN";
my $token\_secret = "TWITTER TOKEN SECRET";
my $nt = Net::Twitter->new(
    traits => [qw/OAuth API::REST API::Search/],
    consumer\_key => $consumer\_key,
    consumer\_secret => $consumer\_secret,
    access\_token => $token,
    access\_token\_secret => $token\_secret,
);
```

### Unfollow users that do not follow you back

The first one, will unfollow Twitter users that do not follow you back.
Keep in mind that you have a limit of 350 API calls an hour, in able to
do these actions. The script has been adjusted to end when it reaches
less than 50 calls left.

``` perl
my $user = $nt->show\_user({ screen\_name => 'YOUR USERNAME'});
my $uid = $user->{'id'};
my $r = $nt->friends\_ids($uid);
my $apicalls;
# Do this, so we don't always get the same IDs, mix it up a bit.
my @friends = (sort {int(rand(3))-1} @{$r->{ids}});
foreach my $id ( @friends ) {
    my $fs = $nt->follows($id, $uid);
    if ($fs) {
        print "[\*] " . $id;
    } else {
        print "[!] " . $id;
        $nt->unfollow($id);
    }
    $apicalls = $nt->rate\_limit\_status();
    print " [API:" . $apicalls->{'remaining\_hits'} . "]\\n";
    if ($apicalls->{'remaining\_hits'} < 50) { last; } 
} 
print "Remember, you can only run this every hour. $apicalls-> {'remaining\_hits'} API calls left.\\n";
```

### Follower check

The following piece of code keeps a hash of people who are currently
following you and checks if they still are following you. If they’re
not, it will send a notification to my phone that a person has
unfollowed me. I’m using NotifyMyAndroid for notifications. I have a
cronjob that runs this script every hour.

``` perl
my $f;
my $follower\_file = './followers.hash';
my $unfollow\_file = './unfollow.hash';
if (-e $follower\_file) {
    $f = retrieve($follower\_file);
}
my @ids;
for ( my $cursor = -1, my $r; $cursor; $cursor = $r->{next\_cursor} ) {
    $r = $nt->followers\_ids({ screen\_name => 'YOUR TWITTER USERNAME',
    cursor => $cursor });
    push @ids, @{$r->{ids}};
}
my $flw = 0;
my $cnt = 0;
my $uinfo;
my $unfollowers;
foreach $fid (@{$f}) {
    foreach $tid (@ids) {
        if ($tid eq $fid) {
            $flw = $tid;
            next;
        }
    }
    if (!$flw) {
        try {
            $uinfo = $nt->show\_user($fid);
            if ($uinfo) {
                if (!$nt->friendship\_exists({ screen\_name\_a => $uinfo->{'screen\_name'}, screen\_name\_b => 'YOUR TWITTER USERNAME'})) {
                    $unfollowers->{$fid} = $uinfo;
                    print "U: " . $uinfo->{'screen\_name'} . " ($fid)\\n"; nma\_notify($uinfo);
                    $cnt++;
                } else {
                    print "F: " . $uinfo->{'screen\_name'} . " ($fid)\\n";
                }
            } else {
                print "X: Error?";
            }
        }
        catch {
            print "$fid has been deleted.\\n";
            $unfollowers->{$fid} = $fid;
        }
    }
    store \\@ids, $follower\_file;
    if ($cnt) {
        print "- Found $cnt unfollowers.\\n";
        store $unfollowers, $unfollow\_file;
    }
    else {
        #print "- No unfollows\\n";
    }

    sub nma\_notify {
    my $user = shift;
    my $userAgent = LWP::UserAgent->new;
    $userAgent->agent("NMAScript/1.0");
    $userAgent->env\_proxy();
    my $requestURL = sprintf("https://nma.usk.bz/publicapi/notify?apikey=%s&application=%s&event=%s&description=%s&priority=%d",
        "NMA API KEY",
        "Twitter", "Unfollowed on YOUR USERNAME by " . $user->{'screen\_name'},
        "You were unfollowed by " . $user->{'name'} . " \\nTheir last status: " . $user->{'status'}->{'text'}, -1);
    my $request = HTTP::Request->new(GET => $requestURL);
    my $response = $userAgent->request($request);
    return $response;
}
```

### Hashtag Followback

There’s a thing on Twitter called “FOLLOWBACK” or “TEAMFOLLOWBACK”,
where Twitter users follow back when you follow them. They don’t always
follow back so there is a bit of risk involved, if you are inclined to
grow your follower count (it matters for some people, I guess?)

``` perl
my $count;
do {
    my $sleep = 120+rand(120);
    my $search\_term = "TEAMFOLLOWBACK OR FOLLOWBACK";
    my $r = $nt->search($search\_term);
    for my $status ( @{$r->{results}} ) {
        my $tweeter = $status->{from\_user};
        # Don't bother if we're already following them
        if (!$nt->friendship\_exists('YOUR TWITTER NAME', $tweeter)) {
            my $cf = $nt->create\_friend($tweeter);
            $count++;
            print "+ " . $tweeter . "\\n";
        }
    }
    print "Added $count ...sleeping\\n";
    sleep ($sleep);
} while (1 == 1);
```

  [Net::Twitter]: http://search.cpan.org/dist/Net-Twitter/lib/Net/Twitter.pod


