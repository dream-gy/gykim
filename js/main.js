$(function(){
  
  //스크롤시 parallax효과
  // var parallax = $("#wrap .parallax");
  // var topInfo = []; //parallax offset 배열 담을 용도
  
  // function parallaxTop(){
  //   var mainHeight = $("main").height();
  //   $(".section-wrap").css("top",mainHeight);
  //   topInfo = []; //초기화
  //   parallax.each(function(){
  //     topInfo.push($(this).offset().top);
  //   })
  // }
  // $(window).resize(function(){
  //   parallaxTop()
  // })
  // parallaxTop()
  // parallax.css("postion","fixed");
  // $(window).scroll(function(){
  //   var sct = $(this).scrollTop()*0.99;
  //   parallax.each(function(idx){//
      
  //     var newtop1 = topInfo[0] + sct;
  //     var newtop2 = topInfo[1] - sct;
      
  //     parallax.eq(0).css("top",newtop1);
  //     parallax.eq(1).css("top",newtop2);
     
  //     if( $(window).scrollTop() > topInfo[1]){
  //       parallax.eq(0).css("display","none");
  //     }else{
  //       parallax.eq(0).css("display","block");
  //     }
      
  //   })
  // })//window.scroll



  //마우스방향에 따라 움직이기
  $("main").mousemove(function(e) { 
     var screenWidth = $(window).width();
     var screenHeight = $(window).height();
      $(".icon-light").css({
        transform: "translate(-" + e.pageX/screenWidth * 22 + "px, -" + e.pageY/screenHeight * 20 + "px)"
     });
      $(".icon-code").css({
       transform: "translate(-" + e.pageX/screenWidth * 17 + "px, -" + e.pageY/screenHeight * 20 + "px)"
      });
      $(".icon-notebook").css({
        transform: "translate(-" + e.pageX/screenWidth * 29 + "px, -" + e.pageY/screenHeight * 20 + "px)"
      });
      $(".icon-pencil").css({
       transform: "translate(-" + e.pageX/screenWidth * 10 + "px, -" + e.pageY/screenHeight * 20 + "px)"
      });
      $(".icon-coffee").css({
        transform: "translate(-" + e.pageX/screenWidth * 25 + "px, -" + e.pageY/screenHeight * 20 + "px)"
       });
       $(".visual img").css({
        transform: "translate(-" + e.pageX/screenWidth * 10 + "px, -" + e.pageY/screenHeight * 40 + "px)"
     });
     $(".visual-circle").css({
        transform: "translate(-" + e.pageX/screenWidth * 20 + "px, -" + e.pageY/screenHeight * 50 + "px)"
     });
  });//main.mousemove



  //header addClass & removeClass
  $(window).scroll(function(){
    var hegiht = $("main").height()/4;
    if($(window).scrollTop() > 1){
      $("header").addClass("affix")
    }else {
      $("header").removeClass("affix")
    }
  })//window.scroll

  //path 길이구해서 css속성설정하기
  var mainGroup = $("#sunlight");
  var mainPaths = mainGroup.find("path");
  mainPaths.each(function(idx,path){
   var length = path.getTotalLength();
   path.style.setProperty("--length",length);
  })//mainPaths.each
 

  //스크롤시 path 애니메이션 효과
  $(window).scroll(function(){
    var abouttit = $(".about-tit").offset().top;
    if($(window).scrollTop() > abouttit/2){
      $(".about-tit path").addClass("on");
    }else {
      $(".about-tit path").removeClass("on");
    }
  })//window.scroll

  //포트폴리오 리스트 불러오기
  $.ajax({
    url : "./data/item.json",
    dataType : "json",
    success : function(data){
      var portfolioList = [];
      $.each(data,function(index,item){
        html = 
          "<li>"+
            "<div class='img'><img src='"+item.thumbnail+"' alt=''></div>"+
            "<div class='cont'>"+
              "<div class='tit'>"+
                "<p class='point-tit'>"+item.type+"</p>"+
                "<h4>"+item.title+"</h4>"+
              "</div>"+
              "<div class='link'>"+
                "<a href='"+item.url+"' target='_blank'>Visit Website</a>"+
                "<a href='info.html?itemId="+item.id+"'>View Detailse</a>" + 
              "</div>"+
            "</div>"+
          "</li>";
          portfolioList.push($(html).get(0));
      });

      $(".works ul").append(portfolioList);       
    }
  });//ajax 


})//function.ready