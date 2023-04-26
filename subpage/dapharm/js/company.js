//////////////////

// 서브페이지 - company 

//숫자 카운트 애니메이션
var executed = false; //애니메이션 한번만
$(window).scroll(function(){
  var threshold = $(".company-detail").offset().top - 800;
  if(!executed){
    if($(window).scrollTop() >= threshold){ //threshold양보다 스크롤이 크면
      $(".company-detail li .num").each(function(){
        var thisNum = $(this).text();
        var thisTxt = $(this);
        $({counter : 0}).animate({counter:thisNum},{
          duration: 1000,
          progress: function(){
            var now = this.counter;
            thisTxt.text(Math.floor(now));
          }
        })//counter.animate
      })//num.each
      executed = true; //애니메이션 한번만
    }//if 조건문 
  }//if executed
})//window.scroll




//office-list Accordions 
$(".office-list>li ").click(function () {
    if ($(this).hasClass("on")) {
    } else {
        $(".office-list>li.on").find(".team-list").slideUp('fast');
        $(".office-list>li.on").removeClass("on");
        $(this).addClass("on").find(".team-list").slideDown('slow');
    }
    return false;
})

// history-navigation
$(".history-years li").click(function () {
  $(this).each(function () {
    var thisIndex = $(this).index();
    if (thisIndex == 0) {
      var aoffsetTop = $(".2020s").position().top;
      $(".history-content").animate({ scrollTop: aoffsetTop + 40 }, 400);
    } else if (thisIndex == 1) {
      var aoffsetTop = $(".2010s").position().top;
      $(".history-content").animate({ scrollTop: aoffsetTop - 100 }, 400);
    } else if (thisIndex == 2) {
      var aoffsetTop = $(".2000s").position().top;
      $(".history-content").animate({ scrollTop: aoffsetTop - 100 }, 400);
    } else if (thisIndex == 3) {
      var aoffsetTop = $(".1990s").position().top;
      $(".history-content").animate({ scrollTop: aoffsetTop - 100 }, 400);
    } else if (thisIndex == 4) {
      var aoffsetTop = $(".1970s").position().top;
      $(".history-content").animate({ scrollTop: aoffsetTop - 100 }, 400);
    }
  })
});

// 연혁 스크롤 
var aaa = $(".history-item").eq(0).position().top;
aaa = aaa + 40;
$(".history-content").scrollTop(aaa);
$(".history-content").scroll(function () {
  $(".history-item").each(function (i) {
    var itemIdex = $(".history-item").eq(i);
    var itemTop = itemIdex.position().top;
    var contTop = $(".history-content").scrollTop();
    var contentHeight = $(".history-content").innerHeight();
    var scrollHeight = $(".history-content").prop('scrollHeight');

    if (contTop >= itemTop - 350) {
      $(".history-item").eq(i).addClass("active");
      if (itemIdex.hasClass("2020s") == true) {
        $(".history-bar").css("width", "10%")
      } else if (itemIdex.hasClass("2010s") == true) {
        $(".history-bar").css("width", "30%")
      } else if (itemIdex.hasClass("2000s") == true) {
        $(".history-bar").css("width", "50%")
      } else if (itemIdex.hasClass("1990s") == true) {
        $(".history-bar").css("width", "70%")
      } else if (itemIdex.hasClass("1970s") == true) {
        $(".history-bar").css("width", "90%")
      }
    } else {
      $(".history-item").eq(i).removeClass("active");
    }
    //스크롤 맨 아래 감지
    if (contTop + contentHeight >= scrollHeight) {
      $(".history-bar").css("width", "100%")
    }
  });
});


// company-ci
// ci-Download
$(".ci-btn").on("click", function () {
  if ($(this).hasClass("ci-png")) {
    window.location.href = "./image/ci-logo.png";
  } else if ($(this).hasClass("ci-png")) {
    window.location.href = "./image/ci-logo.ai";
  }
});


