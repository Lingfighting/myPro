define(['jquery', 'lunbo'], function(jq, lb){
	var $ = jq;
	lb.playLunBo($('.imgLi'), $('.imgLi li'), $('.next'), $('.prev'), $('.bullet li'), false);
});