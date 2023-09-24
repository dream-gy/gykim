$(document).ready(function(){


			$("#mainVisual ul").bxSlider({
				auto:'auto',
				autoDelay:500,
				touchEnabled:false,	
				controls:false,
			});
			//이미지 슬라이드 효과 

			$("#mainVisual ul li").each(function(){
				var tag = '<div class="dot"></div>';
				$(".dotWrap").append(tag);
			});
			$(".dot").eq(0).addClass("on");
			$(".dot").click(function(){
				var dotIndex = $(".dot").index(this);
				var listIndex = $("#mainVisual ul li").index(dotIndex);
				var visualWidth = $("#mainVisual ul li").width();
				
				//console.log(visualWidth);
			});


			$(".familyBtn").click(function(e){
				e.preventDefault();
				console.log("d");
				$(".familyList").toggleClass("open");
				
			});
			$(".hamburger").click(function(e){
				e.preventDefault();
				console.log("d");
				$(this).toggleClass("active");
				$(".gnb").toggleClass("on");
			});
			$(".gnb .menu").click(function(){
				$(".gnb .menu").not(this).removeClass("active");
				$(this).toggleClass("active");
			});
			//메뉴 마우스오버 효과
			$(".gnb li.menu").mouseover(function(){
				$("header").addClass("on");
				console.log("addd")
			});
			$(".gnb li.menu").mouseout(function(){
				$("header").removeClass("on");
				console.log("removeeee")
			});



			$(window).resize(function(){
				if($(window).width() < 890) {
					$(".gnb li.menu").mouseover(function(){
						$("header").removeClass("on");
					})
				}
				else {
						$(".gnb li.menu").mouseover(function(){
							$("header").addClass("on");
							console.log("addd")
						});
						$(".gnb li.menu").mouseout(function(){
							$("header").removeClass("on");
							console.log("removeeee")
						});	
						$(".gnb").removeClass("on");
						$(".hamburger").removeClass("active");
						$(".gnb li").removeClass("active");

				}
				if($(window).width() < 1200){

				}





			});

			function menuRove(){
				var windowWidth = $(window).width();

				if(windowWidth < 890) {
					$(".gnb li.menu").mouseover(function(){
						$("header").removeClass("on");
						console.log("됨")
					});
				}else {
					$(".gnb li.menu").mouseover(function(){
						$("header").addClass("on");
						console.log("addd")
					});
					$(".gnb li.menu").mouseout(function(){
						$("header").removeClass("on");
						console.log("removeeee")
					});
				}

			}
			menuRove();


   	 
});

