var Tabs = (function(){
	function Tab(node){
		this.$head = node.find('.head');
		this.$ct = node.find('.ct');
	}
	Tab.prototype.init = function(){
		var self = this;
		this.$head.on('click', 'li', function(){
			$(this).addClass('active').siblings().removeClass('active');
			var index = $(this).index();
			self.$ct.find('li').eq(index).addClass('active').siblings().removeClass('active');
		})
	}
	function creat($parent, num){
		var html = '';
		html += '<div class="tabs">';
		html += '</div>';
		$parent.append(html);

		for (var i = 0; i < num; i++){
			var html = '';
			html += '<div class="tab">';
			html +=		'<ul class="head clearfix">';
			html +=			'<li class="active">tab1</li>';
			html +=			'<li>tab2</li>';
			html +=			'<li>tab3</li>';
			html +=		'</ul>';
			html +=		'<ul class="ct">';
			html +=			'<li class="active">ct1</li>';
			html +=			'<li>ct2</li>';
			html +=			'<li>ct3</li>';
			html +=		'</ul>';
			html += '</div>';

			$('.tabs').append(html);
		}

		$('.tab').each(function(){
			var tab = new Tab($(this));
			tab.init();
		})

	}
	
	return {
		creat: creat,
	};
	
})();

