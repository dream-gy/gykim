$(function(){
  alert("본 페이지는 상업 목적이 아닌 개인 포트폴리오용으로 만들어진 사이트입니다. 이미지와 자료 출처는 이엘치과병원, 스탠다드치과, 이편한세상치과에서 가져왔습니다. ");

  const swiper_visual = new Swiper('.visual',{
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
   
  }); 
  const swiper_staff = new Swiper('.staff',{
    slidesPerView: 2.1,
    spaceBetween: 10
    
  }); 

  const swiper_case = new Swiper('.case',{
    slidesPerView: 1.3,
    spaceBetween: 10,
  }); 
 
  const swiper_dentalThumb = new Swiper('.tour .gallery-thumb-swiper',{
    loop: true,
    slidesPerView: 4.3, // 4.3
    spaceBetween: 10,
    slideToClickedSlide: true, // 해당 슬라이드 클릭시 슬라이드 위치로 이동
    breakpoints: {
      480: {
        slidesPerView: 4.3,
        loopedSlides: 4.3
      }
    }
  }); 
  

  //dentalThumb.click하면 tourMainVisual Change
  function tourMainChange(){
    var mainVisual =  $(".gallery-main-box");
    var i = swiper_dentalThumb.activeIndex;
      var currImag =  $(".gallery-thumb-swiper").find("li").eq(i).find("img").attr("src");
      var currAlt =  $(".gallery-thumb-swiper").find("li").eq(i).find("img").attr("alt");
      var html = "<img src='"+currImag+"' alt='"+currAlt+"'>";
      mainVisual.find("img").remove();
     mainVisual.append(html);
   
  }//tourMainChange

  tourMainChange()

  $(".dental .gallery-thumb-swiper").on("click",function(){
    tourMainChange()//
  });



  //맵 처음 나타는 위도 경도 셋팅
  var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(37.5125585, 127.1025353), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };
 
  // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption); 
    
  //스크롤시 텍스트 움직이기
  var txt = $(".deco");
  var count = 0;

  function marqueeText(count, ele, direction){
    if(count > Math.ceil(ele.width()/2)){
      ele.css("transform", "translateX(0)")
      count = 0;
    }
    ele.css("transform","translateX("+ count * direction + "px)")
    return count;
  }

  function animate(){
    count++;
    count = marqueeText(count,txt,-1);
    window.requestAnimationFrame(animate)
  }
  animate();

  $(window).on("scroll", function(){
    count += 15;
  })



  //팝업창 쿠키 
  var cookiedata = document.cookie;
  var cookieCheck = document.cookie.indexOf("event01=Y");
    if(cookieCheck > -1 ){
      $(".popup").removeClass("active")
      bodyOverflowY()
    }else{
      $(".popup").addClass("active");
      bodyOverflowH()
     
    }
   
    $(".popup .today-close").on("click", function(){
      setCookie("event01","Y",1);   //기간( ex. 1은 하루, 7은 일주일)
      $(".popup").removeClass("active");
      bodyOverflowY()
    })
    $(".popup .close").on("click", function(e){
      $(".popup").removeClass("active")
      bodyOverflowY()
      e.preventDefault();
      
    })
  
  // 쿠키 가져오기
  var getCookie = function (CookieName) {
    var name = CookieName + "=";

    for(var i=0; i<cookiedata.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
  }
  // 24시간 기준 쿠키 설정하기  
  var setCookie = function (CookieName, value, exdays) {
    var today = new Date();
    today.setDate(today.getDate() + exdays);

    document.cookie = CookieName + "="+ escape(value) + "; path=/; expires=" + today.toGMTString() + ";";
  }


// if($(".popup.active")){
//   bodyOverflowH();
// }else {
//   bodyOverflowY();
// }

function bodyOverflowH(){
  $("body").css("overflow", "hidden");
}
function bodyOverflowY(){
  $("body").css("overflow-y","visible");
}




$(".menu>li").on("click", function(){
  $(".menu>li").not(this).removeClass("active");
  $(this).toggleClass("active");

  var target = $(this).find(".depth");
  var other =  $(".menu>li").not(this).find(".depth");
  target.slideToggle(500);
  other.slideUp(500);

});

$(".menu-btn").on("click", function(){
    $(this).addClass("on");
    $(".mobile-menu").addClass("active");
    bodyOverflowH();
})
$(".mobile-menu .close").on("click", function(){
  $(".mobile-menu").removeClass("active")
  $(".menu-btn").removeClass("on");
  bodyOverflowY();
})





})



