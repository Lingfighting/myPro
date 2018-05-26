//设计模式中的模块模式
var waterfull_layout = (function(){
	var itemArr = [];

	var $itemCt;//记录父容器$itemCt，


	function init($parentNode, $node){
		// console.log('init------------');
		//记录父容器$itemCt,用于后面设置父容器的高度
		$itemCt = $parentNode;
		var collength = parseInt($itemCt.outerWidth(true)/$node.outerWidth(true));
		
		for(var i = 0; i < collength; i++){
			itemArr[i] = 0;
		}
	}

	function waterfull($item){
		
		// console.log('waterfull------------');

		var minValue = Math.min.apply(null, itemArr);

		var minindex = itemArr.indexOf(minValue);

		$item.css({
			top: itemArr[minindex],
			left: $item.outerWidth(true) * minindex,
		})

		itemArr[minindex] += $item.outerHeight(true);
		//设置父容器的高度，item设置为绝对定位，不对父容器设置高度，父容器高度为0
		$itemCt.height(Math.max.apply(null,itemArr));
	}

	return {
		init: init,
		waterfull: waterfull,
	};
})();