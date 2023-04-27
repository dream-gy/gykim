
$.ajax({
  url : "./data/item.json",
  dataType : "json",
  success : function(data){
    var itemId = getParameterByName('itemId'); //주소창 파라미터값
    var mainImg,
        type,
        title,
        info,
        preiod,
        page,
        size,
        html,
        linkhtm;
    var elements =[];




    $.each(data,function(index, item){
      if(itemId == item.id){
          mainImg = item.mainImage;
          type = item.type;
          title = item.title;
          info = item.info;
          preiod = item.preiod;
          size = item.size.replace(/,/g,"<br>");
          page = item.page;

          $.each(item.content,function(key, list){
            arrlinke = [];
            if(list.link) {
              $.each(list.link,function(i,el){
                  linkhtml ="<li><a href='"+el.linkId+"'>"+el.name +"</a></li>";
                  arrlinke.push(linkhtml);
              });
              arrlinke = arrlinke.join(""); 
              html = 
                "<li id='"+key+"'>"+
                  "<h4>"+list.subtitle+"</h4>"+
                  "<div class='desc'>" + list.subcont +  
                    "<p>관련링크</p>" +
                    "<ul class='related-links'>"+arrlinke+"</ul>"+
                  "</div>"+
                  "<div class='cont'>"+
                    "<div class='img'><img src='"+list.image.url01+"' alt=''></div>"+
                    "<div class='code'><img src='"+list.image.url02+"' alt=''></div>"+
                  "</div>"
                "</li>";
              elements.push($(html).get(0));
            }else {
              html = 
                "<li id='"+key+"'>"+
                  "<h4>"+list.subtitle+"</h4>"+
                  "<div class='desc'>"+ list.subcont+ "</div>"+
                  "<div class='cont'>"+
                    "<div class='img'><img src='"+list.image.url01+"' alt=''></div>"+
                    "<div class='code'><img src='"+list.image.url02+"' alt=''></div>"+
                  "</div>"
                "</li>";
            elements.push($(html).get(0));
            }//list.link
          });//(item.content).each
      }//if(itemId == item.itemid)
    });//data.each
      
    var mainHtml = "<img src='"+mainImg+"' alt=''>";
    $(".visual .img").find("img").remove();
    $(".visual .img").html(mainHtml);
    //$(".visual .deco h2").find(".num").html(number);
    $(".info .tit").find("p").html(type);
    $(".info .tit").find("h3").html(title);
    $(".info-list li").eq(0).find(".cont").html(info);
    $(".info-list li").eq(2).find(".cont").html(preiod);
    $(".info-list li").eq(3).find(".cont").html(size);
    $(".info-list li").eq(4).find(".cont").html(page);
    $(".detail-list").append(elements);

   
    var tit = $(".detail-list h4");
    var skillUl = $(".skills .cont");
    //skills리스트로 나타내기
    tit.each(function(idx){
      var titName = $(this).text();
      var skillList = "<li>"+titName +"</li>";
      skillUl.append(skillList);

    });//tit.each

    //형광펜 스크롤 이벤트
    $(window).scroll(function(){
      for(let i = 0; i < tit.length; i++){
        var offsetTop =  tit.eq(i).offset().top;
        var offsetBottom = offsetTop + tit.eq(i).outerHeight();
        console.log(offsetTop)
        if( $(this).scrollTop() >= offsetTop - 400  ){
          tit.eq(i).addClass("on");
        }else {
          tit.eq(i).removeClass("on");
        }
      }
    })//window.scroll
    

    //skills.click 해당 부분 스크롤 이벤트
    skillUl.on("click","li",function(){
      var thisidx = $(this).index();
      var offsetTop = tit.eq(thisidx).offset().top;
      $("html,body").animate({
        scrollTop: offsetTop - 150,
      },500);
    }) //skills.click


    //반응형에 맞게 spliiter변경하기
    var tablet = 768;
    var timer = null;
    var spliiter;

    function splitterResize(){
      var sptHeight;
      var sptOri;
      if($(window).width() > tablet ){
        sptHeight = 500;
        sptOri = "vertical";
        splitterChange(sptHeight,sptOri);
      }else {
        sptHeight = 600;
        sptOri = "horizontal";
        splitterChange(sptHeight,sptOri);
      }
    }//splitterResize
    splitterResize();

    function splitterChange(sptHeight, sptOri){
      $(".detail-list>li").each(function(){
        var contId = $(this).attr("id");
        spliiter = $("#"+contId+"").find(".cont").height(sptHeight).split({
          orientation: sptOri,
          limit: 100
        });
      });
    }//splitterChange

    $(window).resize(function(){
      splitterResize();
      clearTimeout(timer);
      timer = setTimeout(function() {
      location.reload(); //리로드하기
      sizeLayout() //size 레아이웃 바꾸기
      }, 250);
    });

    //파라미터에 cont문자열이 포함되면 해당레이어로 이동하기
    var PageId = getPageId();
 
    if(PageId.indexOf("cont") != -1){
      // moveCont()
       
    }//if(PageId.indexOf("cont") != -1)

     //related-links(관련링크) 클릭 이벤트 
  $(".related-links a").on("click", function(e){
    //  e.preventDefault();
    var linkValue = $(this).attr("href");
        linkValue = linkValue.replace( /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,"");
   
      console.log(linkValue.indexOf("itemId")) 
      if(linkValue.indexOf("itemId") == -1){
        e.preventDefault();
          aniCont(linkValue);
      }else {
        location.href = linkValue;
      }
  })//$(".related-links a").click

  var PageId = getPageId();
  if(PageId.indexOf("cont") != -1){
    console.log(PageId)
      aniCont(PageId)
    
    }//if(PageId.indexOf("cont") != -1)
  }//data.success
});//ajax




//주소창 파라미터 값 가져오기
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.href);
  return results == null ? "": decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getPageId() {
  var pageUrl = window.location.href;
  var CurrentPageId = pageUrl.substring(pageUrl.lastIndexOf("#") + 1);
  return CurrentPageId;
}
function moveCont(linkValue){
 

}




function aniCont(Value){
  var cont = $(".detail-list").find("#"+Value).offset().top;
  var headerH = $("header").height();
  $("html,body").animate({
     scrollTop: cont - headerH,
   },500);

}




$(function(){

 
  //header addClass & removeClass
  $(window).scroll(function(){
    var hegiht = $("main").height()/4;
    if($(window).scrollTop() > 1){
      $("header").addClass("affix")
    }else {
      $("header").removeClass("affix")
    }
  })//window.scroll


  //scrollTop 애니메이션
  $(".scroll-top").click(function(){
    $("html,body").animate({
      scrollTop: 0,
    },500);
  })//scroll-top.click


  //size 레아이웃 바꾸기
  var tablet = 768;
  var ogLayout = $(".info-list>li").eq(3).find(".cont").html();
  var chgLayout = ogLayout.replace(/:/g,":<br>");

  function sizeLayout(){
    if($(window).width() < tablet ){
        $(".info-list>li").eq(3).find(".cont").html(chgLayout);
    }
  }//sizeLayout
  sizeLayout() 


 
 

})//function.ready

