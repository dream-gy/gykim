
		$(function () {
			
			// 메뉴 
			
			
			$(".navMenu").mouseover(function(){

				var menuidx = $(".navMenu").index(this);
				$(".navMenu").removeClass("on");
				$(".navMenu").eq(menuidx).addClass("on");

				
				 $(".sub_bg").addClass("on");


			})
			
			  $(".nav_sub_menu").mouseout(function(){
			  	$(this).parent().removeClass("on");
			 	$(".sub_bg").removeClass("on");
			 })

			$(".menu>ul>li:nth-child(5)").mouseover(function(){
				$(this).removeClass("on");
				 $(".sub_bg").removeClass("on");

			})

			$(".sub2_menu li").mouseover(function(){
				
				$(this).find(".sub3_menu").show();
				$(this).siblings().find(".sub3_menu").hide();

			})
			



			$(".tab ul li").click(function(){
				var data = $(this).data("attr");

				if( data == "#i_kisti01"){
					$("#i_kisti01").fadeIn().addClass("show");
				}
				else if (data =="#i_kisti02"){
					$("#i_kisti02").fadeIn().addClass("show");
				}
				else if (data =="#i_kisti03"){
					$("#i_kisti03").fadeIn().addClass("show");
				}
				else {
					$(".modal").removeClass("show");
				}

			})
			$(".modal .btn_close").click(function(){
				$(this).parent().parent().parent().fadeOut().removeClass("show");
			})
			
		 //   var mySwiper = new Swiper('.swiper-container',{     
			// 	 slidesPerView: 4,
			// 	 width:$('.kisti_news .news_list_box ').outerWidth(),
			// 	 //slidesOffsetBefore: $('.kisti_news .news_title').outerWidth(),
			// 	// allowTouchMove:false,             
			// 	navigation : {
			// 		nextEl : '.swiper-next', // 다음 버튼 클래스명
			// 		prevEl : '.swiper-prev', // 이번 버튼 클래스명
			// 	},  
			// }).   
			

			$('.newsSlide ul').bxSlider({
			 			
			 		

						 maxSlides: 3,						
						infiniteLoop: true,
						touchEnabled: false,
						pager: false,
						
			});

			
		
			
			
			
			
		   $('.bxslider ul').bxSlider({
				 		auto: true,
		   				autoControls: true,
						infiniteLoop:false,
						pager:false,
						touchEnabled:false
			});
		 
		  $('.services_slider ul').bxSlider({
		  				mode: 'fade',
						speed:700,
				 		auto: false,
		   				autoControls: false,
						infiniteLoop:false,
						pager:false,
						touchEnabled:false,
						onSliderLoad: function (idx) {
							var $slide = $('.services_slider').find('li').get(idx);
							
						},
						onSlideBefore:function($slide){
							
							$('.main_content .kisti_services .text_wrap').css({'transform':'translate(0,-30px)','opacity':'0'});
							$('.main_content .kisti_services .img_wrap').css({ 'opacity':'0'});
							// $('.main_content .kisti_services .img_wrap img').css({'transform':'translate(0,-30px)', 'opacity':'0'});
						},
						onSlideAfter:function($slide){
							
							$('.main_content .kisti_services .text_wrap').css({'transform':'translate(0,0)','opacity':'1'});
							$('.main_content .kisti_services .img_wrap').css({'opacity':'1'});
							// $('.main_content .kisti_services .img_wrap img').css({'transform':'translate(0,0px)', 'opacity':'1'});
						},
					
			});
		  $('.history_slider').bxSlider({
				 		auto: false,
						autoControls: false,
						stopAutoOnClick: true,		
						infiniteLoop:true,
						pager:false,

						touchEnabled:false
			});

		  $(window).scroll(function(){
		  	 if($(this).scrollTop() >= 400){
		  	 	$('.btn_top').addClass("show");
		  	 }else {
		  	 	$('.btn_top').removeClass("show")
		  	 }
		  });

		  $('.popupzone ul').bxSlider({
		  				auto: true,
						autoControls: true,
						autoControlsCombine:false,
						stopAutoOnClick: true,
						pager:false,
						infiniteLoop:false,
						touchEnabled:false
			});



		  $(".right_quick .btn_open").click(function(){
				$(".right_quick").css("right","0");
				$(this).hide();
				$(".right_quick .btn_close").show();
			})

		  $(".right_quick .btn_close").click(function(){
				$(".right_quick").css("right","-266px");
				$(this).hide();
				$(".right_quick .btn_open").show();
			})

		  $(".right_quick .btn_open").focus(function(){
				$(".right_quick").css("right","0");
				$(this).hide();
				$(".right_quick .btn_close").show();
			})

		  $(".right_quick .btn_close").focusout(function(){
				$(".right_quick").css("right","-266px");
				$(this).hide();
				$(".right_quick .btn_open").show();
			})

		 
		

		// //버튼클릭후 재생
		$(".btn_video").click(function(){
	  		
			//onPlayerReady();
			$('.visual_wrap iframe').show();	
		})
		 //비디오 화면크기
		function rescaleMainVideo(){
		  	var videoWidth = $(document).width();
		  	var videoHeight = videoWidth * 9 / 16;
		  	var visualHeight = $(".visual_wrap").height();
		  	var videoTop = (visualHeight - videoHeight) / 2;
		  	$("#main-video").width(videoWidth).height(videoHeight).css("top", videoTop +"px");
		}
		rescaleMainVideo();

		//검색
		
		$("#search_box").keydown(function(e){
			
			 if (event.keyCode == 13) {
		      //this.form.submit();

		      var searchVal = $("#search_box").val();

		      	if(searchVal == ""){
		      	 	alert("입력요망");
		      	 	 return false;
		      	}
		      	alert(searchVal);
		      return false;
		      
		     
		    }
			
		
		})

		$("#search_btn").click(function(e){
			e.preventDefault(); 
			
			var searchVal = $("#search_box").val();
			//$("#search_box").form.submit();
			if(searchVal == ""){
		      	 	alert("입력요망");
		      	 	return false;
		     }
		    
			alert(searchVal);
			 return false;
		})	
			
		$(".search_btn").click(function(){
			$('.header_search').toggle();	
		})
		$('.header_search').mouseover(function(){
			$(this).show();
		})
		$('.header_search').mouseout(function(){
			$(this).hide();
		})

		
		$(".sitemap.pc .sitemap_btn").click(function(){
			$('.all_menu').toggle();	
		})
		$('.all_menu').mouseover(function(){
			$(this).show();
		})
		$('.all_menu').mouseout(function(){
			$(this).hide();
		})

		$(".sitemap.mobile .sitemap_btn").click(function(){
			$('.mobile_menu').fadeIn();
			$(".mobile_box").animate({
				"opacity" :"1",
				"right" :"0px"
			});
			
		})
		
		$(".mobileMain li").click(function(){
			
			$(this).siblings().removeClass("on");
			$(this).toggleClass("on");
		})
		$(".mobile_menu").click(function(){
			$(".mobile_box").animate({
				"right" :"-250px"
			});
			$(".mobile_box").animate({
				"opacity" :"0"
			});
			$(".mobile_menu").fadeOut();
		})
		




		
})
			
						  /**
         * Youtube API 로드
         */
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        /**
         * onYouTubeIframeAPIReady 함수는 필수로 구현해야 한다.
         * 플레이어 API에 대한 JavaScript 다운로드 완료 시 API가 이 함수 호출한다.
         * 페이지 로드 시 표시할 플레이어 개체를 만들어야 한다.
         */
        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('main-video', {
               
                videoId: 'HN8lzgMsv_8',   // <iframe> 태그 지정시 필요없음
                playerVars: {             // <iframe> 태그 지정시 필요없음
	                autoplay: 0,		// 자동재생, 0: 안함
					controls: 0,		// 재생컨트롤표시, 0: 안함
					disablekb: 1,		// 키보드컨트롤 비허용, 1: 비허용
					iv_load_policy: 3,	// 동영상 특수효과, 3: 미표시
					modestbranding: 1,	// 유튜브로고 미표시 플레이어 사용, 1: 사용
					rel: 0,				// 영상 종료후 관련 동영상 표시, 0: 미표시
					showinfo: 0,		// 영상정보 표시, 0: 미표시
                },
                events: {
                    'onReady': onPlayerReady,               // 플레이어 로드가 완료되고 API 호출을 받을 준비가 될 때마다 실행
                    'onStateChange': onPlayerStateChange    // 플레이어의 상태가 변경될 때마다 실행
                }
            });
        }
        function onPlayerReady(event) {
           // console.log('onPlayerReady 실행');
            // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
//            event.target.playVideo();
        }
       
        function onPlayerStateChange(event) {
          



            if (event.data == YT.PlayerState.PLAYING) {
				// 재생
				//console.log("재생");
				$(".video_control").removeClass("on");
			}  else if (event.data == YT.PlayerState.PAUSED) {
				// 일시정지 
				//console.log("일시정지");
				$(".video_control").addClass("on");
			}   else if (event.data == YT.PlayerState.ENDED) {
				// 종료
				//console.log("종료");
				$("#main-video").hide();
			}     

            
            // 재생여부를 통계로 쌓는다.
            collectPlayCount(event.data);
        }
		function onPlayerReady(event) {
           // console.log('onPlayerReady 실행');
            // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
//            event.target.playVideo();
        }
        function playYoutube() {
            // 플레이어 자동실행 (주의: 모바일에서는 자동실행되지 않음)
            player.playVideo();
           
        }
        function pauseYoutube() {
            player.pauseVideo();
        }
         function muteYoutube() {
            player.mute();
            if(player.isMuted()){
            	player.unMute();
            	$(".video_control .btn_mute").show();
            	$(".video_control .btn_volume").hide();
            }else {
            	player.mute();
            	$(".video_control .btn_mute").hide();
            	$(".video_control .btn_volume").show();
            }
        }
        function stopYoutube() {
            player.seekTo(0, true);     // 영상의 시간을 0초로 이동시킨다.
            player.stopVideo();
        }
        function closeYoutube(){
        	player.stopVideo();
        	$("#main-video").hide();
        	$(".video_control").removeClass("on");
        }
        var played = false;
        function collectPlayCount(data) {
            if (data == YT.PlayerState.PLAYING && played == false) {
                // todo statistics
                played = true;
                console.log('statistics');
            }
        }