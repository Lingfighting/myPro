define(['jquery'], function(jquery){
	var $ = jquery;

	function player($title, $ct, $play, $next, $prev, $totalTime, $curTime, $bar){
		this.audioObject = new Audio();
		
		this.$totalTime = $totalTime;
		this.$curTime = $curTime;
		this.$bar = $bar;
		this.$play = $play;
		this.$next = $next;
		this.$prev = $prev;
		
		this.$title = $title;
		this.$ct = $ct;
		// this.$volume = $volume;
		// this.$volume_mark = $volume_mark;
		// this.$volume_bar = $volume_bar;

		this.musicList = [];
		this.index = 0;

		this.lyric = {};
		this.init();
	};


	player.prototype = {
		init: function(){
				var thisPlayer = this;

				thisPlayer.audioObject.autoplay = true;
				//获取总时间
				thisPlayer.audioObject.onloadeddata = function(){				
					var _this = this;
					// console.log(_this.duration);
					var total = thisPlayer.getTime(_this.duration);
					thisPlayer.$totalTime.text(total);
				}
				//如下代码设置 每1秒左右执行一次
				thisPlayer.audioObject.shouldUpdate = true;
				thisPlayer.audioObject.ontimeupdate = function(){
					var _this = this;

				  	if(_this.shouldUpdate) {
					     //do something
					    thisPlayer.updateProgress();
					    //判断是否播放结束
					    // if (thisPlayer.audioObject.currentTime === thisPlayer.audioObject.duration){
					    // 	console.log('update');
					    // 	thisPlayer.getData();
					    // }
					    if (thisPlayer.audioObject.ended){
					    	thisPlayer.getData();
					    }
					    // console.log('update');
					     _this.shouldUpdate = false;
					    setTimeout(function(){
					    	_this.shouldUpdate = true;
					    }, 500);
				  	}
				}

			},

		bind: function(){
			var _this = this;
			this.$play.on('click', function(){

				if ($(this).hasClass('play'))
				{
					// _this.play();
					_this.pause();	
				}else{
					// _this.pause();
					_this.play();
				}
				
				$(this).toggleClass('play');
				$(this).toggleClass('pause');
			});

			this.$prev.on('click', function(){
				_this.pause();
				_this.prevMusic();
			});

			this.$next.on('click', function(){
				_this.pause();
				_this.nextMusic();
			});

			// this.$volume_bar.on('click', function(e){
			// 	console.log(e.offsetX);
			// 	var percent = e.offsetX/parseInt($(this).outerWidth());
			// 	console.log(percent);
			// 	audioObject.volume = percent;

			// });

			this.$bar.parent().on('click', function(e){
				console.log(e.offsetX);
				var percent = e.offsetX/parseInt($(this).outerWidth());
				_this.audioObject.currentTime = percent * _this.audioObject.duration;
				_this.$bar.width(percent*100 + "%");

			});
		},

		start: function(){
				this.bind();
				this.getData();
			},

		getTime:function (time){
				var minutes = parseInt(time/60);
				var seconds = parseInt(time%60)+'';
				minutes = minutes.length == 2? minutes : '0' + minutes;
				seconds = seconds.length == 2? seconds : '0' + seconds;
				return minutes + ':' + seconds;
			},

		play: function(){
				this.audioObject.play();
			},

		pause: function(){
				this.audioObject.pause();
			},
		stop: function(){
				this.audioObject.stop();
			},

		updateProgress: function(){
				var _this = this;
				var percent = (this.audioObject.currentTime/this.audioObject.duration)*100+'%';
				this.$bar.width(percent);

				var time = this.getTime(this.audioObject.currentTime);
				// console.log(time);

				$.each(this.lyric, function(key,value){
					if(key === time){
						_this.$ct.find('.lyric p').text(value);
					}
				})
				
				this.$curTime.text(time);
			},

		nextMusic: function (){
				
				var musicNum = this.musicList.length - 1 - this.index;
				// console.log('nextMusic----------------');
				// console.log(this.musicList.length);
				// console.log(musicNum);
				// console.log(this.index);
				if (this.index === 0){
					this.getData();
					return;
				}
				this.setInfo(this.musicList[musicNum + 1]);
				this.index--;
			},

		prevMusic: function (){
				var musicNum = this.musicList.length - 1 - this.index - 1;
				// console.log('prevMusic----------------');
				// console.log(this.musicList.length);
				// console.log(musicNum);
				// console.log(this.index);
				if (musicNum < 0)
				{
					this.getData();
					return;
				}
				this.setInfo(this.musicList[musicNum]);
				this.index++;
				
			},

		getLyric: function (songId){
				var _this = this;
				$.post('http://api.jirengu.com/fm/getLyric.php',{sid:songId})
					.done(function(lyric){
						if (lyric){
							// console.log(lyric);
							_this.showLyric(lyric);
							// _this.$ct.text(lyric);
						}else{
							_this.$ct.text("获取歌词失败");
						}
						
					});
			},

		showLyric: function(data){
			var musicLyric = JSON.parse(data);
			// console.log(musicLyric.lyric);
			//将歌词字符串转化为时间开头的数组
			var words = musicLyric.lyric.split("[");
			// console.log(words);
			//清空存歌词的对象
			for(key in this.lyric){  
				// console.log(this.lyric[key]); 
		        delete (this.lyric[key]);  
		    } 

			for (i = 0; i < words.length; i++){
				 var item = words[i];
				 if (item.length >= 9){
				 	//获取时间
				 	var key = item.substr(0, 5); 
				 	// console.log(key);
				 	//获取当前时间的歌词
				 	this.lyric[key] = item.slice(9);
				 	// console.log(this.lyric[key]);
				 	// this.$ct.append("<p>"+ this.lyric[key] + "</p>");
				 }
			}

		},

		setInfo: function (songData){
				this.audioObject.src = songData.url;
				// console.log(songData.title);
				// console.log(songData.artist);
				// console.log(songData.sid);
				this.getLyric(songData.sid);
				// this.$author.text(songData.artist);
				this.$title.find('p').text(songData.title + ' - ' + songData.artist);
				// console.log(songData.picture);
				this.$ct.css("background-image", "url("+songData.picture+")");
			},		

		manageData:	function(data){
				// console.log('manageData-----------');
				// console.log(data.song);
				var musics = JSON.parse(data);
				// console.log(musics.song[0]);
				// console.log(musics.song[0].url);
				// this.setUrl(musics.song[0].url);
				this.setInfo(musics.song[0]);
				//将已播放歌曲存入列表
				this.musicList.push(musics.song[0]);
				// console.log(this.musicList.length);
			},

		getData: function(){
				// url里面不能有空格
				var _this = this;
				_this.$ct.find('.lyric p').text("Loading");
				$.ajax({
					url: 'http://api.jirengu.com/fm/getSong.php',
					type: 'GET',
					data: {
						channel: "public_tuijian_spring",
					}
				}).done(function(ret){
					if(ret){
						// console.log('get  data success----');
						_this.manageData(ret); 
					}else{
						console.log('get error data');
					}
				});		
			},
	};


	function init($title, $ct, $play, $next, $prev, $totalTime, $curTime, $bar, $volume_mark){
		var player0 = new player($title, $ct, $play, $next, $prev, $totalTime, $curTime, $bar);
		
		player0.start();
	}



	return {
		init: init,
	};
});


