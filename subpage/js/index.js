$(function(){
//메인화면 리사이즈 이미지변경
function mainResize(){
  var width = $(window).width();
  
  var cnt = $(".main-wrap li").length + 1;
  var a = 0;
  for(i = 0; i < cnt; i++){
    if(width > 1280){   
        $(".main-wrap li.main"+i+"").find("img").attr("src", "./image/main/main0"+i+"-bg.jpg");
    }else if(width > 768) {
        $(".main-wrap li.main"+i+"").find("img").attr("src", "./image/main/main0"+i+"t-bg.jpg");
    }else if(width > 0) {
        $(".main-wrap li.main"+i+"").find("img").attr("src", "./image/main/main0"+i+"m-bg.jpg");
    }
  }
}//mainResize
mainResize()

// sns 이미지 정사각형
function snsResize(){
  var snsWidth = $(".sns-list li").width();
  var snsMargin = $(".sns-list li").css("margin-right");
  $(".sns-list li").css({"height":snsWidth, "margin-bottom": snsMargin});
}//snsResize


$(window).resize(function(){
  mainResize(); //메인화면 리사이즈 이미지변경
  snsResize();  //sns 이미지 정사각형
});


  //인스타그램 데이터 가져오기
  var additemCount = 6;
  var added = 0;
  var allData = [];
  $.getJSON("./data/sns.json", itemList);

  function itemList(data){
      allData = data.reverse();
      addItem()//로딩되자마자 6개
      $(".sns-wrap .read-more").click(addItem)
  }//itemList
  function addItem(){
      var elements =[];
      var slicedData = allData.slice(added, added+additemCount);
      $.each(slicedData,function(idx, item){
          var itemHTML = 
                  "<li>" +
                      "<a href='#n'>" +
                          "<div class='overlay'>" +
                                  "<div class='hover-txt'>" +
                                      "<span>View details</span>"+ 
                                      "<div class='insta-icon'></div>"+ 
                                  "</div>"+
                          "</div>"+
                          "<img src='"+item.thumbnail+"' alt=''>" +
                      "</a>"+
                  "</li>";
                  elements.push($(itemHTML).get(0));
      })
      $(".sns-list").append(elements);
      added += slicedData.length;
      snsResize() //로딩되자마자 사이즈 
      if(added < allData.length){
          $(".sns-wrap .read-more").show();
      }else {
          $(".sns-wrap .read-more").hide();
      }
  }//addItem
  //index.html의 bxslider 중 mainslider
  var mainSlider = $(".main-slider").bxSlider({
      auto: true,
      autoControls: true,
      autoHover: true,   
      nextSelector: '.main-wrap .btn-next',
      prevSelector: '.main-wrap .btn-prev',
      autoControlsSelector: '.main-wrap .btn-auto',
      pager: false,
      onSlideBefore:  function($slideElement, oldIndex, newIndex){
          var current_index = parseInt(newIndex + 1);
              current_index = zeroFill(current_index, '2') //숫자 한자리인 경우 0붙이기 
          $slideElement.parents(".slider-wrap").find(".current").text(current_index);
      }
  });
  $('.main-wrap').find(".total").text(zeroFill(mainSlider.getSlideCount(), '2'));


  //index.html의 bxslider 중 menuslider
  var menuSlider = $(".menu-slider").bxSlider({
      auto: true,
      autoControls: true,
      autoHover: true, 
      nextSelector: '.menu-wrap .btn-next',
      prevSelector: '.menu-wrap .btn-prev',
      autoControlsSelector: '.menu-wrap .btn-auto',
      pager: false,
      mode: 'fade',
      onSlideBefore:  function($slideElement, oldIndex, newIndex){
        var current_index = parseInt(newIndex + 1);
            current_index = zeroFill(current_index, '2') //숫자 한자리인 경우 0붙이기 
        $slideElement.parents(".slider-wrap").find(".current").text(current_index);
      }
  });
  
  $('.menu-wrap').find(".total").text(zeroFill(menuSlider.getSlideCount(), '2'));
  //index.html의 bxslider 중 newsslider
  var newsSlider = $(".news-slider").bxSlider({
      auto: true,
      autoControls: true,
      autoHover: true, 
      nextSelector: '.news-wrap .btn-next',
      prevSelector: '.news-wrap .btn-prev',
      autoControlsSelector: '.news-wrap .btn-auto',
      pager: false,
      mode: 'vertical',
      onSlideBefore:  function($slideElement, oldIndex, newIndex){
          var current_index = parseInt(newIndex + 1);
          var Totaltxt = zeroFill(current_index, '2') //숫자 한자리인 경우 0붙이기 
         // $slideElement.parents(".slider-wrap").find(".current").text(Totaltxt);
      }
  });
  $('.news-wrap').find(".total").text(zeroFill(newsSlider.getSlideCount(), '2'));
  //index.html의 bxslider 중 reviewslider
  var reviewSlider = $(".review-slider").bxSlider({
      auto: true,
      autoControls: true,
      autoHover: true, 
      nextSelector: '.review-wrap .btn-next',
      prevSelector: '.review-wrap .btn-prev',
      autoControlsSelector: '.review-wrap .btn-auto',
      pager: false,
      mode: 'fade',
      onSlideBefore:  function($slideElement, oldIndex, newIndex){
        var current_index = parseInt(newIndex + 1);
            current_index = zeroFill(current_index, '2') //숫자 한자리인 경우 0붙이기 
       $slideElement.parents(".slider-wrap").find(".current").text(current_index);
      }
  });
  $('.review-wrap').find(".total").text(zeroFill(reviewSlider.getSlideCount(), '2'));
  //index.html의 bxslider 중 storeslider
  var storeSlider = $(".store-slider").bxSlider({
      auto: true,
      autoControls: true,
      autoHover: true, 
      nextSelector: '.store-wrap .btn-next',
      prevSelector: '.store-wrap .btn-prev',
      autoControlsSelector: '.store-wrap .btn-auto',
      pager: false,
      mode: 'fade',
      onSlideBefore:  function($slideElement, oldIndex, newIndex){
        var current_index = parseInt(newIndex + 1);
            current_index = zeroFill(current_index, '2') //숫자 한자리인 경우 0붙이기 
        $slideElement.parents(".slider-wrap").find(".current").text(current_index);
      }
  });
  $('.store-wrap').find(".total").text(zeroFill(storeSlider.getSlideCount(), '2'));


  //반응형 메인 이벤트 리스트 갯수 보이기 
  var $eventSlider;
  function eventBxSlider(){
      var width = window.innerWidth;
      /* 반응형으로 설정할 옵션 정의 */
      var slideNum;  
      if( width < 540 ){
          slideNum = 1;
      }else if (width < 767){
          slideNum = 2;
      }else if ( width < 1023){
          slideNum = 2;
      }else if (width < 1280){
          slideNum = 1;
      }
      return {
          slideWidth: 1000,
          minSlides: slideNum,     /*반응형 옵션*/
          maxSlides: slideNum,   /*반응형 옵션*/
          moveSlides:1,
          slideMargin : 20,
          moveSlides: 1,
          auto: true,
          autoControls: true,
          autoHover: true, 
          nextSelector: '.event-wrap .btn-next',
          prevSelector: '.event-wrap .btn-prev',
          autoControlsSelector: '.event-wrap .btn-auto',
          pager: false,
          onSlideBefore:  function($slideElement, oldIndex, newIndex){
            var current_index = parseInt(newIndex + 1);
                current_index = zeroFill(current_index, '2') //숫자 한자리인 경우 0붙이기 
            $slideElement.parents(".slider-wrap").find(".current").text(current_index);
          }
      };
  }//eventBxSlider
  function configureSlider() {
      var config = eventBxSlider();
      if ($eventSlider && $eventSlider.reloadSlider) {
          $eventSlider.reloadSlider(config);
      } else {
          $eventSlider = $(".event-slider").bxSlider(config); 
      }
      $('.event-wrap').find(".total").text(zeroFill($eventSlider.getSlideCount(), '2'));
  }//configureSlider
 
  configureSlider();
  $(window).resize(function(){
      configureSlider();
  })


})//function.ready