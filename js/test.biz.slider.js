/**
 * 图片幻灯片
 * Last Update:2012-8-2
 */
 (function($) {
	$.fn.slider = function(voptions){
	    var defaults = {
			auto:			false, 	//　自动播放			
			speed: 			500, 	//　速度; 越小越快
			pause:			3000, 	//　间隔时间，越小越快
			style:			1, 		//　1为显示分页按钮，2为只显示前后两个按钮
			width :			0, 		//　必须
			hegiht :		0 		//　必须
		},
		voptions = $.extend(defaults, voptions),
		
		obj = $(this),
		len = $("li", obj).length, //获取焦点图个数
		
		//显示图片函数，根据接收的index值显示相应的内容
		showPics = function (index) { 
			var nowLeft = -index * voptions.width; 
			$("ul", obj).stop(true,false).animate({"left":nowLeft}, voptions.speed);
			if (voptions.style != 1) { return; }	
			$(".btn span", obj).removeClass("on").eq(index).addClass('on');
		};
		
		obj.width(voptions.width);
		obj.height(voptions.height);
		$("ul, li", obj).width(voptions.width);
		
		this.each(function() { 
			var index = 0;
			var picTimer;
			
			//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
			var btn = "<div class='btnBg'></div><div class='btn'>";
			for(var i=0; i < len; i++) {
				btn += "<span></span>";
			}
			btn += "</div><div class='pre'></div><div class='next'></div>";
			obj.append(btn);
			//$(".btnBg", obj).css({"opacity":0.5, "width": options.width + 'px'});
		
			//为小按钮添加鼠标滑入事件，以显示相应的内容
			$(".btn span", obj).mouseenter(function() {
				index = $(".btn span", obj).index(this);
				showPics(index);				
			});
		
			//上一页、下一页按钮透明度处理
			$(".pre, .next", obj).css("opacity",0.2).hover(function() {
				$(this).stop(true,false).animate({"opacity":"0.5"},300);
			},function() {
				$(this).stop(true,false).animate({"opacity":"0.2"},300);
			});
		
			//上一页按钮
			$(".pre", obj).click(function() {
				index -= 1;
				if(index == -1) {index = len - 1;}
				showPics(index);
			});
		
			//下一页按钮
			$(".next", obj).click(function() {
				index += 1;
				if(index == len) {index = 0;}
				showPics(index);
			});
		
			//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
			$("ul", obj).css("width",voptions.width * (len));
			
			//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
			obj.hover(function() {
				clearInterval(picTimer);
			},function() {
				
				picTimer = setInterval(function() {	
					index += 1;
					if(index == (len)) {index = 0;}
					showPics(index);
				}, voptions.pause); //此4000代表自动播放的间隔，单位：毫秒
			});
			showPics(index);
			
			
			if(voptions.auto) { //是否自动播放
				obj.trigger("mouseleave");
				//$(".btn span", obj).eq(0).trigger("mouseenter");
			}
			
			if(voptions.style == 1) {
				$(".pre, .next", obj).hide();
			} else {
				$(".btn", obj).hide();
			}
			
		});
	}
})(jQuery);