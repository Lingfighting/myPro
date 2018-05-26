define(['jquery', 'lunbo'], function(jq, lb){
	var $ = jq;
	lb.playLunBo($('.lunbo .imgLi'), 
		$('.lunbo .imgLi li'), 
		$('.lunbo .next'), 
		$('.lunbo .prev'), 
		$('.lunbo .bullet li'), true);
})