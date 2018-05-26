var lazyLoad = (function(){

	function lazyRender($list){
		$list.each(function(){
			if( checkShow($(this)) && !isLoaded($(this)) ){
				loadImg($(this));
			}
		}) 
	}
	function checkShow($img){
		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		var offsetTop = $img.offset().top;

		if (((scrollTop + windowHeight) > offsetTop) && (scrollTop < offsetTop)){
			return true;
		}

		return false;
	}

	function isLoaded($img){
		return $img.attr('data-src') === $img.attr('src');
	}

	function loadImg($img){
		$img.attr('src', $img.attr('data-src'));
	}

	return {
		lazyRender: lazyRender,
		checkShow: checkShow
	};
})();
