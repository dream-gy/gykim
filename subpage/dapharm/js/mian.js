

//video 비율 유지하기
$(window).resize(function(){
  videoResize()
})//window.resize
videoResize()
function videoResize(){
  var video = $(".video-wrap video");
  var main = $("main");
  var mainwWidth = main.width();
  var mainHeight = main.height();
  var mainRatio = mainwWidth / mainHeight; //메인의 비율
  var videoRatio = 1920 / 1080; //비디오의 비율
  if(videoRatio > mainRatio){ 
    video.css({
      width: mainHeight * videoRatio,
      height: "100%"
    })
  }else {
    video.css({
      width: "100%",
      height: mainwWidth/videoRatio,
  })
  }
}//videoResize




//새상품 슬라이드
var slideCount = $(".np-slide-list>li").length;
var slide = $(".np-slide-list>li");
var currentIndex = 0;
var timer = undefined;

autoPlay();  //자동 슬라이드 시작
setSlideCtrl(currentIndex); //슬라이드 컨트롤세팅

function setSlideCtrl(currentIndex) {
  //슬라이드 번호 매기기
  var totalTxt = String(slideCount).padStart(2, "0");
  var currentTxt = String(currentIndex + 1).padStart(2, "0");
  $(".slide-ctrl .total").text(totalTxt);
  $(".slide-ctrl .press").text(currentTxt);
  //진행바 animation
  $(".np-progress-bar").css(
      "width",
      (100 / slideCount) * (currentIndex + 1) + "%"
  );
}
$(".slide-ctrl button").on("click", function () {
  if ($(this).hasClass("btn-next")) {
      next(); // 다음실행
  } else if ($(this).hasClass("btn-prev")) {
      prev(); //이전실행
  }
});

$(".slide-ctrl .np-btn").on("click", function () {
    $(this).siblings(".np-btn").addClass("on")
    $(this).removeClass("on")
    if ($(".slide-ctrl .btn-stop").hasClass("on")) {
      stopSlide(); //일시멈춤
  } else if ($(".slide-ctrl .btn-Play").hasClass("on")) {
      autoPlay(); // 자동재생
  }
});

//슬라이드 마우스호버&포커스 
slide.hover(function(){ //마우스 오버시 슬라이드 멈춤
  stopSlide();
},function (){
  autoPlay();
});
slide.bind("focusin", function(){
  stopSlide();
  next();
});
slide.bind("focusout", function(){
  autoPlay()
});

function next() {
  stopSlide();autoPlay(); //초기화
    slide.siblings().removeClass('on');
    var slideNext = (currentIndex + 1) % slideCount; // 다음순서
    slide.eq(slideNext) .addClass("on");
    currentIndex = slideNext;
    setSlideCtrl(currentIndex);
}
function prev() {
  stopSlide();autoPlay(); //초기화
    slide.siblings().removeClass('on');
    var slideNext = (currentIndex - 1) % slideCount; // 이전순서
    slide.eq(slideNext).addClass("on");
    currentIndex = slideNext;
    var prevTxt = slide.index($(".on"));
    setSlideCtrl(prevTxt);
}
function autoPlay() {
  if (timer == undefined) {
    timer = setInterval(function () {
        next();
    }, 3000)
  }
  $(".slide-ctrl .btn-Play").removeClass("on")
  $(".slide-ctrl .btn-stop").addClass("on")
}
function stopSlide() {
  $(".slide-ctrl .btn-stop").removeClass("on")
  $(".slide-ctrl .btn-Play").addClass("on")
    clearInterval(timer);
    timer = undefined;
}



//인기검색구현
var topKeyword = $(".sch-keyword"); //인기검색어
var prdtArr;

$.getJSON("./data/item.json", itemList); //제품리스트.json
$.getJSON("./data/news.json", catList); //제품리스트.json

function itemList(data) {
    $.each(data, function (idx, item) {
        //인기검색어
        if (item.topSearched) {
            var elements = [];
            var keyword = 
            "<a href='brand-info.html?itemID=" + item.id + "&itemType=" + item.itemCategory + "'>" + 
              item.itemName.itemTitle +
            "</a>";
            elements.push($(keyword).get(0));
            topKeyword.append(elements);
        }
    });
    $("#search-prd").keyup(function () {
        if (event.keyCode == 13) {
            PrdSetPar();
            $(this).val("");
        }
    });
    $("#prdSearch").click(function () {
        PrdSetPar();
        $("#search-prd").val("");
    });
    $("#MainSearch").click(function (e) {
        e.preventDefault();
        var btnName = $(this).attr("id");
        PharmSetPar(btnName);
    });
} //itemList


$("#search-pharm").keyup(function () {
    var btnName = $(this).attr("class");
    if (event.keyCode == 13) {
        PharmSetPar(btnName);
       
    }
    console.log($("#search-prd").val())
});
function PrdSetPar() {
  var inputText = $("#search-prd").val(); //검색한 내용가져오기
  location.href = "brand.html#product-search?query=" + inputText + "";
  
}


var newsArr;
var storyArr;
var newsShowCnt = 3;
var storyShowCnt = 4;
var start = 0;
var newsRsultUl = $(".news .result-list");
var storyRsultUl = $(".story .result-list");
function catList(data) {
    var newsList = [];
    var storyList = [];
    $.each(data, function (key, value) {
        if (key == "newsList") {
            $.each(value, function (idx, item) {
                var itemArr = item;
                newsList.push(itemArr);
            });
        } else if (key == "storyList") {
            $.each(value, function (idx, item) {
                var itemArr = item;
                storyList.push(itemArr);
            });
        }
    });
    //제품 날짜 내림차순 정리하기
    var newsDate = sortDate(newsList);
    var storyDate = sortDate(storyList);

    var newsSlice = newsDate.slice(0, newsShowCnt);
    var storySlice = storyDate.slice(0, storyShowCnt);

    newsArr = newsSlice;
    storyArr = storySlice;
    //보내야할 갯수 정해서 보내기

    newsCenterShow();
} //catList

function newsCenterShow() {
    var newsElements = [];
    $.each(newsArr, function (idx, item) {
        var itemContent = item
            .content
            .replace(/(<([^>]+)>)/gi, "");
        var itemHTML = "<li class='" + ( idx == start ? "new" : "" ) + "'><a href='promotion-view.html?itemID=" + item.uid + "&itemType=" + item.category.category +
                "'><div class='news-txt'><div class='news-tit'><span>" + item.title + "</span> </div>" +
                " <div class='date '>" + item.date + "</div></div><p class='news-desc'>" + ( idx == start? itemContent : "" ) + "</p></a></li>";
        newsElements.push($(itemHTML).get(0));
    });
    var storyElements = [];
    $.each(storyArr, function (idx, item) {
        var itemHTML = "<li><a href='promotion-view.html?itemID=" + item.uid + "&itemTy" +
                "pe=" + item.category.category + "'><p class='cate'>" + item.category.item + "</p>" +
                "<div class='img'><img src='" + item.thumbnail + "'  alt='" + item.title + "'></div><div class='story-tit-box'><p class='tit'>" +
                item.title + "</p><p class='date'>" + item.date + "</p></div></a></li>";
        storyElements.push($(itemHTML).get(0));
    });

    newsRsultUl.append(newsElements);
    storyRsultUl.append(storyElements);
}