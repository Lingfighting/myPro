define(['jquery', 'player'], function(jq, musicPlayer){
	var $ = jq;
	var $prev = $('.player .icon').eq(0);
	var $play = $('.player .icon').eq(1);
	var $next = $('.player .icon').eq(2);
	var $nowBar = $('.player .bar .now');
	var $nowTime = $('.player .time .now');
	var $totalTime = $('.player .time .total');
	// var $author = $('.player .author');
	// var $title = $('.player .music-name');
	var $title = $('.player .title');
	var $ct = $('.player .ct');

	// var $volume_mark = $('.player .title .volume .mark');
	// var $volume_bar = $('.player .title .volume .bar');


	// musicPlayer.init($title, $author, $ct, $play, $next, $prev, $totalTime, $nowTime, $nowBar);
	musicPlayer.init($title, $ct, $play, $next, $prev, $totalTime, $nowTime, $nowBar);

	

	

	

	
});
