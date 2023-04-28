
//history 타임라인 스크롤 효과 
$(window).scroll(function(){
  $(".history-list li").each(function(i){
      var itemIdex = $(".history-list li").eq(i);
      var itemTop = itemIdex.offset().top;
      var scrollTop = $(window).scrollTop();
      if(scrollTop + 550 >= itemTop){
          $(".history-list li").eq(i).addClass("active");
      }else {
          $(".history-list li").eq(i).removeClass("active");
      }
      if(scrollTop <= $(".history-list li").eq(0).offset().top){
          $(".history-list li").eq(0).addClass("active");
      }
      var barHeight = $(".history-list li.active").eq(-1).position().top;
      $(".timeline").css("height", barHeight+"px" )
  })// $(".history-list li").each
})//$(window).scroll