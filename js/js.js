$(function(){
	/*动态响应轮播图*/
	banner();
	initTab();
	$('[data-toggle="tooltip"]').tooltip();
})
var banner = function(){
	/*按需加载 移动小图 pc大图*/

	/*1. 获取数据 模拟数据 模拟json数据*/
	/*2. 渲染页面*/
	/*2.1 判断当前屏幕的宽度 小于768px*/
	/*2.2 根据当前设备和数据生成HTNL结构代码*/
	/*1 */ 
	var getData = function(callback){
		if(window.data) {
			callback && callback(window.data);
			return false;
		}
		$.ajax({
			type:'get',
			url:'js/json.json',
			data:{},
			dataType:'json',
			success:function(res){
				// window.data = res;
				// callback && callback(window.data);
				console.log(res);
			}
		}) 
	};
	/*2 */ 
	var render = function(){
		getData(function(data){
			/*2.1 */ 
			var isMobile = $(window).width() < 768 ? 1 : 0;
			/*2.2 */
			var pointHtml = template('point',{list:data});
			var imageHtml = template('image',{list:data,isM:isMobile});
			$('.carousel-indicators').html(pointHtml);
			$('.carousel-inner').html(imageHtml);

		})
	};
	render();
	$(window).on('resize',function(){
		render();
	});

	//手势切换

	var startX = 0;
	var distanceX = 0;
	var isMove = false;
	$('.wjs_banner').on('touchstart',function(e){
		startX = e.originalEvent.touches[0].clientX;
	});
	$('.wjs_banner').on('touchmove',function(e){
		diatanceX = e.originalEvent.touches[0].clientX - startX;
		isMove = true;
	});
	$('.wjs_banner').on('touchend',function(){
		if(isMove && Math.abs(distanceX) > 50 ){
			if(distanceX > 0){
				$('.carousel').carousel('next');
			}
			else {
				$('.carousel').carousel('prev');
			}
		}
		startX = 0;
		distanceX = 0;
		isMove = false; 
	})
	
}

var initTab = function(){
	var $navBox = $('.nav-father');
	var $lis = $navBox.find('li');
	var $widths = 0;
	$lis.each(function(index,item){
		$widths += $(this).outerWidth(true);
	})
	// console.log($widths);
	$navBox.width($widths);
	new IScroll($('.tab-header')[0],{
		scrollX: true,
		scrollY: false
	})
}
	   
	  
