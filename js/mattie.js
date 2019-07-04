// Just some javascript magics


	 
	 function show_fofix() {
		var furl = 'http://home.mattie.id.au/fofsb/feed.php?s=json&callback=?';
		var data;
 	    if($('.fofixrecent ul').length <= 0) { $('.fofixrecent').append('<ul />'); }
		$('.fofixrecent').hide();
		var json = $.getJSON(furl, function(data){
			var i=0;
			$.each(data.fofixscores, function(index, item){
				if (i < 11) {
					var ts = tc(item.uts);
					$('.fofixrecent ul').append('<li><small>'+ts+'</small>: <cite>'+item.artist+' - '+item.title+'</cite> <br /> <span title="Notes hit:'+item.notehit+'/'+item.notetotal+' Streak:'+item.notestreak+'">'+item.player+' - '+item.diff+ ' ' +item.songpart+' - '+item.score+'</span><br /></li>');
				}
				i++;
			});
			$('.fofixrecent').fadeIn();
		});
		
	 }
	 
	 function show_trakt() {
		var user = 'spyn';
		var akey = '2bd5e55495cdcb4ff4042e44e8cd1267';
		var data;
        var last_movie;
        var last_show;
		var turl = 'http://api.trakt.tv/activity/user.json/'+akey+'/'+user+'/all/?callback=?';
 	    if($('.traktrecent ul').length <= 0) { $('.traktrecent').append('<ul />'); }
		$('.traktrecent').hide();
		$.getJSON(turl, function(data){
			var i=0;
			$.each(data.activity, function(index, item){
				if (i < 11) {
					var ts = tc(item.timestamp);
					if (item.type == "movie") {
						$('.traktrecent ul').append('<li><small>'+ts+'</small>: <a class="lP" href="'+item.movie.url+'" target="_blank">'+item.movie.title+'</a> - <cite>'+item.movie.tagline+'</cite> (movie)</li>');
                        if (!last_movie) {
                            last_movie = item;
                            $('#trakt_data').append('The last movie I watched was <a class="lP" href="'+item.movie.url+'" target="_blank">'+item.movie.title+'</a>. ');
                        }
					} else if(item.type == "episode") {
						$('.traktrecent ul').append('<li><small>'+ts+'</small>: <a class="lP" href="'+item.show.url+'" target="_blank">'+item.show.title+'</a> - <cite>'+item.episode.title+'</cite></li>');
                        if (!last_show) {
                            last_show = item;
                            $('#trakt_data').append('The last TV show I watched was <a class="lP" href="'+item.show.url+'" target="_blank">'+item.show.title+'</a>. ');
                        }
					} else {
					}
					
				}
				i++;
			});
//			$('.traktrecent').fadeIn();
		});
	 }
	 
	function show_lastfm() { 	 // Set some vars
		var user = 'spyn'; //the user you want to follow
		var akey = '0a54e8fd93b4697284106c7296ae8cd0'; //your api key
		var data;
		var ts;
		var first;
		var second;
        var lfmurl = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+user+'&api_key='+akey+'&format=json';
		$('#lastfm_data').hide();
		if($('.lastfmrt ul').length <= 0) { $('.lastfmrt').append('<ul />'); }
		$('.lastfmrt').hide();
		$.getJSON(lfmurl, function(data){
	 	 	 $.each(data.recenttracks.track, function(index, item){
				 if (item.date === undefined ) { 
				 	first = item;
				 	ts = 'Now Playing:';
				 }
	 	 	 	 else if ( second === undefined ) { 
	 	 	 	 	second = item;
	 	 	 	 	ts = tc(item.date.uts);	 	 	 	 	
	 	 	 	} 
	 	 	 	else {
	 	 	 	 	ts = tc(item.date.uts);
	 	 	 	}
                $('.lastfmrt ul').append('<li><small>'+ts+'</small>: <a class="lP" href="'+item.url+'" target="_blank">'+item.artist['#text']+'</a> - <cite>'+item.name+'</cite></li>');
	 	 	 });
	
	 	 	 if (first) {
                $('#lastfm_data').append("I'm currently listening to "+first.name+" by <a class='lP' href='"+first.url+"' target='_blank'>"+first.artist['#text']+"</a>. ");
	 	 	 }
	 	 	 if (second) {
                if (first) { $('#lastfm_data').append("But, "); }
                $('#lastfm_data').append("I was listening to "+second.name+" by <a class='lP' href='"+second.url+"' target='_blank'>"+second.artist['#text']+"</a>. ");
	 	 	 }

			 $('#lastfm_data').fadeIn();
//			 $('.lastfmrt').fadeIn();
		});
	}

	function tc(uts){
		var a = new Date(uts*1000);
		var mon = pad(a.getMonth()+1);
		var d = pad(a.getDate());
		var h = pad(a.getHours());
		var min = pad(a.getMinutes());
		var time = d+'/'+mon+' '+h+':'+min;
		return time;
	}
	
	function pad(number) {
   		return (number < 10 ? '0' : '') + number
	}

show_lastfm();