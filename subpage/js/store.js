$(function(){
  $(".tabmenu-list li").click(function(){
    var activeIndex = $(this).index();
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    $(".tabcon-list li").siblings().removeClass("active");
    $(".tabcon-list li").eq(activeIndex).addClass("active");
  })

})//function.ready