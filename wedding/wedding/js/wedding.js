$(document).ready(function(){
	
	//-----------------------------------------定义和初始化变量----------------------------------------
	var loadBox=$('aside.loadBox');
	var articleBox=$('article');
	var bubbleBox=$('.bubble');
	var circleBox=$(".circle");
	var circleChild = circleBox.children();
	var skyBox = $('#skyBox');
	var skyBox4= $('#skyBox4');
	var timer1,timer2;
	//----------------------------------------页面初始化----------------------------------------
	icom.orient(init);//屏幕翻转初始化
	icom.screenTo169(true,false);//把非16:9屏幕的article标签拉伸至16:9,第一个参数是iphone4，第二个参数是非物理系统按键的安卓
	
	function init(){
//		loadBox.show();
//		iuser.init(userGetted);
		load_handler();
		sound_handler();
	}//edn func
	
	//----------------------------------------微信用户登录验证----------------------------------------	
	function userGetted(data){
		console.log('用户头像：'+data.headimage);
		console.log('用户昵称：'+data.nickname);
		load_handler();
	}//end func
	
	//----------------------------------------加载声音----------------------------------------
	function sound_handler(){
		if(os.weixin) wx.ready(sound_creat);
		else sound_creat();
	}//edn func
	
	function sound_creat(){
		ibgm.init({src:'js/sound/bgm.mp3'});
	}//end func
	//----------------------------------------加载页面图片----------------------------------------
	function load_handler(){
		var loader = new PxLoader();
		loader.addImage('images/common/turn.png');
		loader.addImage('images/weddingimg/rosebtn.png');
		loader.addImage('images/weddingimg/bg.png');
		loader.addImage('images/weddingimg/invitation.png');
		loader.addImage('images/weddingimg/next.png');
		loader.addImage('images/weddingimg/prev.png');
		loader.addImage('images/weddingimg/cardmask.png');
		loader.addImage('images/weddingimg/heart.png');
		loader.addImage('images/weddingimg/wheel.png');
		loader.addImage('images/weddingimg/growheart.png');
		for(var i = 1;i<=14;i++){
			loader.addImage('images/weddingimg/wedding'+i+'.jpg');
		}
		for(var i = 1;i<=6;i++){
			loader.addImage('images/weddingimg/wedding_0'+i+'.jpg');
		}
		
//		实际加载进度
//		loader.addProgressListener(function(e) {
//			var per=Math.round(e.completedCount/e.totalCount*50);
////			console.log(per+"%");
//		});
		
		loader.addCompletionListener(function() {
			init_handler();
//			load_timer(50);//模拟加载进度
			loader=null;
		});
		loader.start();	
	}//end func
	
	//模拟加载进度
	function load_timer(per){
		per=per||0;
		per+=imath.randomRange(1,3);
		per=per>100?100:per;
		loadPer.html(per+'%');
		if(per==100) setTimeout(init_handler,200);
		else setTimeout(load_timer,33,per);
	}//edn func
	
	//----------------------------------------页面逻辑代码----------------------------------------
	function init_handler(){
		console.log('init handler');
//		page3();
		$(".arrow0").one("click",function(){
			page($(".scratchcard"),$(".page1"),Scratchcard_close,page1);
		})
		$(".arrow1").one("click",function(){
			page($(".page1"),$(".page2"),page1_close,page2);
		})
		$(".arrow2").one("click",function(){
			page($(".page2"),$(".page3"),page2_close,page3);
		})
		$(".arrow3").one("click",function(){
			page($(".page3"),$(".page4"),page3_close,page4);
		})
	}//end func
	function Scratchcard_close(){
//		console.log('scratchComplete');
	}//end func
	function  page1(){
   		bubbleBox.bubbleOn({num:33,x:$(window).width()*0.5,y:$(window).height()*0.5,roll2D:true,swing:true,swingMax:80,speed:2500,delay:1000});
	}
	function page1_close(){
		bubbleBox.bubbleOff();
		$(".arrow1 i").removeClass("heightfull");
		$(".roseheart").removeClass("rubberBand");
	}
	function page2(){
		circleChild.circleOn({rx:circleBox.width()*0.35,ry:circleBox.width()*0.45,speed:0.8,focus:false,scale:false,zIndex:false,onOff:onOff});
		var imgs = $(".circle").find("img");
		imgs.on("click",function(){
			var id = $(this).index()+1;
			clearTimeout(timer1);
			$(".imgbox").find("img").eq(0).attr("src","images/weddingimg/wedding_0"+id+".jpg").addClass("rotatebehind");
			
			icom.fadeIn($(".imgbox"),500,function(){
				timer1 = setTimeout(function(){
					$(".imgbox").find("img").addClass("z_souxiao");
				},2000)
			});
			$(".imgbox").on("click",function(){
				$(".imgbox").find("img").removeClass("z_souxiao");
				icom.fadeOut($(".imgbox"),200);
			})
		})
	}
	function onOff(){
//		console.log("off");
	}
	function page2_close(){
		circleBox.circleOff();
		$(".arrow2 i").removeClass("heightfull");
	}
	function page3(){
		skyBox.snowOn({num:50,offset:-$(window).width()*0.3,speed:1000,roll2D:true});
		var mySwiper = new Swiper ('.swiper-container', {
	    	direction: 'horizontal',
	    	loop:true,
	    	loopedSlides :3,
	    	// 如果需要前进后退按钮
	    	nextButton: '.swiper-button-next',
	   	 	prevButton: '.swiper-button-prev'
	  	})   
	  	
		var swiperimgs = $(".swiper-wrapper").find(".swiper-slide");
		swiperimgs.on("click",function(){
			var id = mySwiper.realIndex+1;
//			"+id+"
			clearTimeout(timer2);
			$(".swiperbox").find("img").attr("src","images/weddingimg/wedding"+id+".jpg").addClass("zoomIn");
			timer2 = setTimeout(function(){
				$(".swiperbox").find("img").eq(0).addClass("z_souxiao");
			},2900)
			icom.fadeIn($(".swiperbox"),500);
			$(".swiperbox").on("click",function(){
				$(".swiperbox").find("img").removeClass("z_souxiao");
				icom.fadeOut($(".swiperbox"),200);
			})
		})
	}
	function page3_close(){
		skyBox.snowOff();
		$(".arrow3 i").removeClass("heightfull");
	}	
	function page4(){
//		console.log("page4:start");	
   		//打开背景光晕
		skyBox4.shineOn({num:40});
	}
	//	页面切换函数
	function page(prev,next1,callback1,callback2){
		prev.css({y:0});
		callback1();
		prev.css('z-index', 11);
		next1.css({y:0});
		next1.css('z-index', 10);
		next1.show();
		prev.transition({y:"-100%"},800);
		callback2();
	}
	//----------------------------------------页面监测代码----------------------------------------
	function monitor_handler(){
//		imonitor.add({obj:$('a.btnTest'),action:'touchstart',index:'',category:'',label:'测试按钮'});
	}//end func
	
});//end ready
