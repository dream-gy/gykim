$(function(){

 
  //커뮤니티 tab .comm-tab>li
  var tab = $(".comm-tab>li");
  $(".comm-tab>li").click(function(){
    var idx = $(this).index();
    tabActive(idx);
    cateData();
    setTable(1)//setTable초기화
    setPage(1) //setPage초기화
    tabAnimation()
  })//$(".comm-tab>li").click

  function tabActive(idx){
    //removeClass&addClass
    tab.eq(idx).siblings().removeClass("active");
    tab.eq(idx).addClass("active");
    //tab content show 
    $(".tab-content").eq(idx).siblings().removeClass("on");
    $(".tab-content").eq(idx).addClass("on");
  }//tabActive

  function tabAnimation(){
     //active animation
     var widthActive = tab.siblings(".active").outerWidth();
     var activeLeft = tab.siblings(".active").position().left;
     $(".tab-bar").css({width:widthActive, left: activeLeft});
  }
  tabAnimation()
  //게시판 리스트
  var allData = [];
  var currData = [];
  var reviewData =[];
  var added = 0;
  var additemCount = 6;
  var perPage = 5;    // 한 페이지에 나타낼 데이터 수
  var pageCount = 5;  // 한 화면에 나타낼 페이지 수

  $.getJSON("./data/news.json", itemList);

  //해당 리스트 가져오기
  function itemList(data){
    allData = data;
    cateData()
    setTable(1) //새소식, 에빈트 setTable초기화
    setPage(1) //새소식, 에빈트 setPage초기화
    reviewAdded() //리뷰 addItem초기화
   
  }//itemList
  
  function cateData() {
   
    //tab에 Active된 데이터 가져오기
    var activeLi = tab.siblings(".active").text();
      
    if(activeLi == "새소식"){
        currCat = "newsList";
    }else if(activeLi == "이벤트"){
        currCat = "eventList";
    }else if(activeLi == "리뷰"){
        currCat = "reviewList";
    }

    currData = [];
    reviewData = [];
    $.each(allData,function(key, value){
      if(currCat == key){
        $.each(value, function(idx, item){
          var itemArr = item;
          currData.push(itemArr);
        })
      }//if(currCat == key)
      if("reviewList" == key){
        $.each(value, function(idx, item){
            var itemArr = item;
            reviewData.push(itemArr);
        });
    }
    })//data.each

    currData =  sortDate(currData); //내림차순으로 데이터 정리하기 
    currData = currData.filter((x) => x.fix === true).concat(currData.filter((x) => x.fix !== true)); //특정요소(fix)만 맨 
    
  }//cateData
 
  
  function setTable(currentPage){
    var elements = [];
    var added = (currentPage -1) * perPage;
    var filteredData = currData.slice(added, currentPage * perPage); //countPerPage만큼

    // 제품 검색 건수 
    var dataCount = currData.length;
    if(dataCount){
        $(".page-content .num").text(dataCount)
    }else {
        $(".page-content .num").remove();//초기화
    }
    
    $.each(filteredData, function(idx, item){
      var newFliter = "";
      if(item.fix == true && newTime(item.date) == true){
          newFliter = false;
      }else if(newTime(item.date) == true){
          newFliter = true;
      }
     
      var itemHTML = 
        "<tr "+(item.fix == true ? 'class=fix' : '')+">" +
          "<td>" +
            "<div class='date'>" +
              "<p class='day'>"+ splitDay(item.date)+"</p>" +
              "<p class='year'>"+splitYear(item.date)+"</p>" +
            "</div>" +
          "</td>" +
          "<td class='tit'>" +
            "<a href='view.html?itemType="+item.category+"&itemUid="+item.uid+"' "+(newFliter == true ? 'class=new' : '')+">"+item.title+"</a>" +
          "</td>" +
        " </tr> ";
        elements.push($(itemHTML).get(0));
    })
    added += filteredData.length; //added 값 업데이트
    $(".page-content tbody").children().remove();//초기화 
    $(".page-content tbody").append(elements); //해당 카테고리에 리스트 추가하기 
   
  }//setTable

  function setPage(currentPage){
    showAllIcon();//초기화 
    var totalPage = Math.floor(currData.length/ perPage)+(currData.length % perPage == 0 ? 0 : 1);
    //현재 페이지가 5(보여질 페이지 번호 개수)보다 작은 경우
    //첫 페이지와 이전 페이지로 이동하는 icon을 보여줄 필요가 없기 때문에 숨김
    if(currentPage <= pageCount){
      $(".page-content .pagelist").find(".first-page").hide();
      $(".page-content .pagelist").find(".prev-page").hide();
    }
    //총 페이지 번호가5(보여질 페이지 번호 개수)보다 작거나   
    //페이징 영역에 마지막 페이지 번호를 보여 주고 있으면  
    //마지막 페이지와 다음페이지로 이동하는 icon을 숨긴다.   
    var toPlusOne =  Math.floor((currentPage -1 )/ pageCount) * pageCount + pageCount + 1;
    if(totalPage <= pageCount || toPlusOne > totalPage){
      $(".page-content .pagelist").find(".next-page").hide();
      $(".page-content .pagelist").find(".last-page").hide();
    }
    //pages 영역에 페이지 번호를 세팅
    var start = Math.floor((currentPage-1)/ pageCount) * pageCount + 1;
    var pagesHtml = "";
    for(var end = start + pageCount; start < end &&  start <= totalPage; start++){
      //첫번째 리스트에만 active클래스 걸고, 나머지는에는 클래스명 없이 나타나기
      pagesHtml +=  "<li class='"+(start == currentPage ? 'active' : '')+"'>"+start+"</li>"
    }
    $(".page-content .pagelist").find(".pages").children().remove(); //초기화
    $(".page-content .pagelist").find(".pages").append($(pagesHtml)); //페이지 번호 추가하여 세팅하기 
  }//setPage






  //페이지 초기화 - 첫,이전,다음,마지막버튼 모두 보여주기
  function showAllIcon(){
    $(".page-content .pages").find(".first-page").show();
    $(".page-content .pages").find(".prev-page").show();
    $(".page-content .pages").find(".next-page").show();
    $(".page-content .pages").find(".last-page").show();
  }//showAllIcon


  //페이지[1,2,3,4,5] 클릭
  $(".pages").on("click", "li", function(){
      $(".pages").find("li").removeClass("active");
      $(this).addClass("active");
      var currentPage = Number($(this).text());
      setTable(currentPage)
  })//pages.click

  //페이지 첫 번째 페이지, 이전 페이지, 다음 페이지, 마지막 페이지 클릭
  $(".paging").on("click", "i", function(){
      var totalPage = Math.floor(currData.length/ perPage)+(currData.length % perPage == 0 ? 0 : 1); 
      var thisclass = $(this).attr("class");
      //첫 번째 페이지
      if(thisclass == "first-page"){//첫 번째 페이지
          setTable(1)
          setPage(1)
      }else if( thisclass == "prev-page"){//이전 페이지
          var arrPages=[];
          $(".pages").find("li").each(function(idx, item){
              arrPages.push(Number($(this).text()));
          });
          var prevPage =  Math .min.apply(Math, arrPages)- perPage;
          setTable(prevPage)
          setPage(prevPage)
      }else if(thisclass == "next-page"){//다음 페이지
          var arrPages=[];
          $(".pages").find("li").each(function(idx, item){
              arrPages.push(Number($(this).text()));
          });
          var nextPage =  Math.max.apply(Math, arrPages) + 1;
          setTable(cnextPage)
          setPage(nextPage)
      }else if( thisclass == "last-page"){//마지막 페이지
          var lastPage = Math.floor((totalPage - 1) / perPage) * perPage + 1;
          setTable(lastPage)
          setPage(lastPage)
      }
  })//paging.click


  //리뷰데이터 불오기 & 더보기 기능
  $(".review-content .read-more").click(reviewAdded);
  function reviewAdded(){
    var elements =[];
    var slicedData = reviewData.slice(added, added+additemCount);
    
    $.each(slicedData,function(idx, item){
        var itemContent = item.content.replace(/(<([^>]+)>)/ig,"") //태그제거 내용만 남기기
        
        var itemId = solution(item.userId);
        var itemTime = timeForToday(item.date);
        var itemHTML = 
                "<li>" +
                    "<a href='#n'>" +
                        "<div class='review-info'>" +
                                "<div class='review-hd'>" +
                                    "<p class='id'>"+itemId+"</p>" +
                                    "<p class='review-time'>"+itemTime+"</p>" +
                                "</div>"+ 
                                "<p class='tit'>"+item.title+"</p>" +
                                "<div class='star star-"+item.star+"'>" +
                                "</div>"+ 
                        "</div>"+
                        "<p class='txt'>"+itemContent+"</p>" +
                        "<p class='review-more'>READ MORE</p>" +
                    "</a>"+
                "</li>";
                elements.push($(itemHTML).get(0));
    })
    $(".review-list").append(elements);
    added += slicedData.length;
    if(added < reviewData.length){
        $(".review-content .read-more").show();
    }else {
        $(".review-content .read-more").hide();
    }
}//reviewAdded










  //반응형 메인 이벤트 리스트 갯수 보이기 
  var $eventSlider2;
  function eventBxSlider2(){
      var width = window.innerWidth;
      /* 반응형으로 설정할 옵션 정의 */
      var slideNum2;
      var autolock;  
      if( width < 540 ){
          slideNum2 = 1;
          autolock = true;
      }else if (width < 767){
          slideNum2 = 2;
          autolock = true;
      }else{
          slideNum2 = 3;
          autolock = false;
      }
      return {
          slideWidth: 1000,
          minSlides: slideNum2,     /*반응형 옵션*/
          maxSlides: slideNum2,   /*반응형 옵션*/
          moveSlides:1,
          slideMargin : 20,
          moveSlides: 1,
          auto: autolock,
          autoHover: true, 
          autoControls: autolock,
          touchEnabled: autolock,
          nextSelector: '.progress-event .btn-next',
          prevSelector: '.progress-event .btn-prev',
          autoControlsSelector: '.progress-event .btn-auto',
          pager: false,
          onSlideBefore:  function($slideElement, oldIndex, newIndex){
              var current_index = parseInt(newIndex + 1);
                  current_index  = zeroFill(current_index, '2') //숫자 한자리인 경우 0붙이기 
              $slideElement.parents(".progress-event").find(".current").text(current_index );
          }
      };
  }//eventBxSlider
  function configureSlider2() {
      var config2 = eventBxSlider2();
      if ($eventSlider2 && $eventSlider2.reloadSlider) {
          $eventSlider2.reloadSlider(config2);
      } else {
          $eventSlider2 = $(".event-list").bxSlider(config2); 
      }
      $('.progress-event').find(".total").text(zeroFill($eventSlider2.getSlideCount(), '2'));
      $(".comm-tab li").click(function(){
          if ($eventSlider2 && $eventSlider2.reloadSlider) {
              $eventSlider2.reloadSlider(config2);
          } else {
              $eventSlider2 = $(".event-list").bxSlider(config2); 
          } 
      })
  }//configureSlider
  configureSlider2();


  $(window).resize(function(){
    configureSlider2();
    tabAnimation();
  });





});//ready.function