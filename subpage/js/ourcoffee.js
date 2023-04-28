 //텍스트 롤링 배너
 var bannerWidth = 0;
 var listCnt = 0;
 var original = $(".animated-title .content"); //텍스트 오리지널
 var clone = original.clone().appendTo(".track");//텍스트 복제


  $(".animated-title li").each(function(){
    $(this).css("left", bannerWidth); // 리스트 width만큼 left
    bannerWidth += $(this).width() + 50; //각 리스트 with값 구하기
    $(this).attr("class","banner"+(++listCnt)); 
  });
  bannerWidth = bannerWidth/2; //복제값 포함이라서 나누기2
  original.addClass("original");
  clone.addClass("clone");
  original.css({"width":bannerWidth});
  clone.css({"width":bannerWidth});
