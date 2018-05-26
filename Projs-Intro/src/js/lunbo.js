define(['jquery'], function(jquery){
	var $ = jquery;

	function playLunBo(ct, list, next, prev,bulletLi, isAuto){
		var playLb = new lunBo(ct, list, next, prev,bulletLi);

		playLb.init();
		playLb.bind();

		if (isAuto){
			playLb.playAuto();
		}
	}

	//lunbo构造函数
	function lunBo($ct, $list, $next, $prev,$bulletLi){
		this.$imgCt = $ct;
		this.$imgs = $list;
		this.$nextPlay = $next;
		this.$prevPlay = $prev;
		this.$btnList = $bulletLi;
		this.imgLeft = 0;
		this.lock = false;

	};

	lunBo.prototype = {

		init: function(){
			this.$imgs.first().clone().appendTo('.imgLi');
			this.$imgs.last().clone().prependTo('.imgLi');
			this.$imgCt.width((this.$imgs.length + 2) * this.$imgs.width());
			this.$imgCt.css({left: -this.$imgs.width()});
			this.imgLeft = this.$imgs.width();
		},

		bind: function(){
			var self = this;

			self.$nextPlay.click(function(){
				if (self.lock){
					return;
				}
				self.lock = true;

				self.imgLeft += self.$imgs.width();
				self.play0(self.imgLeft);

				self.lock = false;
			});

			self.$prevPlay.click(function(){
				if (self.lock){
					return;
				}
				self.lock = true;

				self.imgLeft -= self.$imgs.width();
				self.play0(self.imgLeft);

				self.lock = false;
			});
			
			self.$btnList.click(function(){
				var index = $(this).index();
				self.imgLeft = (index + 1) * self.$imgs.width();
				self.play1(self.imgLeft);
			});
		},

		//综合轮播，上下为动画，跳转为无动画
		play0: function(imgMove){
			// console.log('play---------');
			// console.log(imgMove);
			if (imgMove >= this.$imgs.width() * (this.$imgs.length + 1)){
				this.imgLeft = this.$imgs.width();
			}else if(imgMove <= 0){
				this.imgLeft = this.$imgs.width() * this.$imgs.length;
			}
			// console.log(this.imgLeft);

			if (Math.abs(this.imgLeft - imgMove) > this.$imgs.width())
			{
				this.$imgCt.css({left: -this.imgLeft});
			}else{
				this.$imgCt.animate({left: -this.imgLeft});
			}
			
			this.setBullet();
		},

		//无动画轮播
		play1: function(imgMove){

			console.log(imgMove);
			if (imgMove >= this.$imgs.width() *(this.$imgs.length+1)){
				this.imgLeft = this.$imgs.width();
			}else if(imgMove <= 0){
				this.imgLeft = this.$imgs.width() * this.$imgs.length;
			}

			console.log(this.imgLeft);
			$('.imgLi').css({left: -this.imgLeft});
			this.setBullet();
		},
		setBullet: function(){
			this.$btnList.removeClass('active');
			this.$btnList.eq(this.imgLeft/this.$imgs.width() - 1).addClass('active');
		},

		playAuto: function(){
			var self = this;
			//自动轮播
			setInterval(function(){
				self.imgLeft += self.$imgs.width();
				self.play0(self.imgLeft);
			}, 2000);
		},
		

	}


	return	{
		playLunBo:playLunBo,
	}

})


