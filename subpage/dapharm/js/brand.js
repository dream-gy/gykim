//////////////////


// 서브페이지 - brand 

//product-faq tab 초기화
$("#product-faq .tab-content").eq(0).addClass("on"); //초기화
$("#product-faq .tab-content .tab-content2").eq(0).addClass("on"); //초기화
var tabLength = $(".tab-content.on").children("label").length;  //초기화
$(".tab-content label").css("width",100/tabLength+"%");  //초기화

/* Checkbox change event */
$("#product-faq input[name='ParentTab']").change(function() {
  var thisIdx = $(this).index("input[name='ParentTab']");
  $(".tab-content").removeClass("on");
  $(".tab-content").eq(thisIdx).addClass("on");
  $(".tab-content").eq(thisIdx).find(".tab-content2").removeClass("on"); //초기화
  $(".tab-content").eq(thisIdx).find(".tab-content2").eq(0).addClass("on"); //초기화
  $(".tab-content").eq(thisIdx).find("input").eq(0).prop('checked', true);//초기화


  $(".tab-content").eq(thisIdx).find("input").change(function(){
    var tabName = $(this).attr("name"); 
    var tabIdx = $("input[name='"+tabName+"']:checked").index("input[name='"+tabName+"']");
    $(".tab-content").eq(thisIdx).find(".tab-content2").removeClass("on");
    $(".tab-content").eq(thisIdx).find(".tab-content2").eq(tabIdx).addClass("on");
  })
});
$(".tab-content").find("input").change(function(){
  var tabName = $(this).attr("name"); 
  var tabIdx = $("input[name='"+tabName+"']:checked").index("input[name='"+tabName+"']");
   $(this).parents(".tab-content").find(".tab-content2").removeClass("on");
   $(this).parents(".tab-content").find(".tab-content2").eq(tabIdx).addClass("on");
})












// tab-nav
$(".job-tab li").click(function () {
    $(this).each(function () {
        var thisIndex = $(this).index();
        $(this).siblings().removeClass("on")
        $(this).addClass("on")
       
    });
    
});



 //신제품슬라이드
 function newPrdtSlide(data){
    //제품 나타나기
    $.each(data, function(idx, item){
        var elements = [];
        var itemHTML = 
            "<li class='prdt-item'>" +
            "<a href='javascript:;' onclick='move(\""+item.id+"\",\""+item.itemCategory+"\")'>"+
                "<div class='item-img'>" +
                        "<img src='"+item.itemImage.thumb1 +"'  alt='"+ item.itemCategory +","+item.itemName.itemTitle +"'>"+
                    "</div>"+
                    "<div class='item-info'>"+
                        "<p>"+item.itemCategory+"</p>" +
                        "<b>"+item.itemName.itemTitle +"</b>  " +
                    "</div>" +
                "</a>"+
            "</li>";
        elements.push($(itemHTML).get(0));
        newPrtUi.append(elements);
    })

    var newPrtli = newPrtUi.find("li");
    var newPrtliCount = newPrtli.length; 
    var liWidth = $(".new-product-wrap").width();
    var showIi = 3;
    var gutter = 20;
    var currentIndex = 0;
   
    newPrtUi.css("width", 100 * newPrtliCount/showIi + "%");
    newPrtli.css({"width" : "calc("+100/newPrtliCount+"% - "+gutter+"px)", "padding-right" : gutter});
   
    var newPrtliCount = (newPrtliCount/showIi)-1;
    
    //sl-btn 이전&다음버튼 클릭시
    $(".sl-btn").off().on("click", function () {
        var prevBtn = $(".sl-prev");
        var nextBtn = $(".sl-next");

        if ($(this).hasClass("sl-prev")) { // 이전버튼 클릭시
            if( 0 < currentIndex){ 
                newPrtUi.animate({ "left": "+="+liWidth});  //이전실행
                currentIndex--;
                //다음버튼 활성화
                if(nextBtn.hasClass("off")){
                    nextBtn.removeClass("off");
                }
            }
        } else if ($(this).hasClass("sl-next")) {// 다음실행
            if(newPrtliCount > currentIndex){
                newPrtUi.animate({ "left": "-="+liWidth});
                currentIndex++;
                //이전버튼 활성화
                if(prevBtn.hasClass("off")){
                    prevBtn.removeClass("off");
                }
            }
        }
        //리스트 첫 시작 화면일때 - 이전버튼 비활성화
        if(0 == currentIndex){ 
            prevBtn.addClass("off");
        }
        //리스트 끝에 도달할때 - 다음버튼 비활성화
        if(currentIndex == newPrtliCount ){
            nextBtn.addClass("off");
        }
    });//sl-btn click

    //첫화면에 prev버튼 없애기 
    if(0 == currentIndex){
        $(".sl-prev").addClass("off");
    }

}

//제품검색 나타나기
function schInput(data){
    var inputText = schInputText.val(); //검색한 내용가져오기
     //페이지 갱신 실행!
    var changeURL = "brand.html?query="+inputText+"";
    history.pushState(null, null, changeURL);
  
    var elements = [];
   
    //검색한 내용과 일치한 제품찾기
    var filteredArray = data.filter(function(item){
        return item.itemName.itemTitle.includes(inputText)
    })
      
    
    //제품 리스트 만들기
    $.each(filteredArray, function(idx, item){
        var itemHTML = 
        "<li class='prdt-item'>" +
        "<a href='javascript:;' onclick='move(\""+item.id+"\",\""+item.itemCategory+"\")'>"+
            "<div class='item-img'>" +
                    "<img src='"+item.itemImage.thumb1 +"'  alt='"+ item.itemCategory +","+item.itemName.itemTitle +"'>"+
                "</div>"+
                "<div class='item-info'>"+
                    "<p>"+item.itemCategory+"</p>" +
                    "<b>"+item.itemName.itemTitle +"</b>  " +
                "</div>" +
            "</a>"+
        "</li>";
        elements.push($(itemHTML).get(0));
    })//each.filteredArray
    
     // 제품 검색 건수 
    var dataCount = elements.length;
    if(dataCount){
        srchTotal.text(dataCount)
        $(".prdt-txt-info").remove();//초기화
    }else {
        $(".prdt-txt-info").remove();//초기화
        prtRsultUl.after("<div class='prdt-txt-info'>등록된 제품이 없습니다.</div>");
        srchTotal.text(dataCount)
    }
    
    prtRsultUl.find("li").remove();
    prtRsultUl.append(elements);  //찾은제품 나타나기
    //loadMoreBtn 비활성화
    loadMoreBtn.removeClass("on")
}//schInput



function ChoMatch(data,cho){
    var elements = [];
  
    $.each(data, function(idx, item){
        var title = item.itemName.itemTitle; //제품명
        var titleCho = choHangul(title) //제품 첫글자 가져오기
        //첫글자와 같은 제품 가져오기
        if(cho == titleCho){
            var itemHTML = 
                "<li class='prdt-item'>" +
                "<a href='javascript:;' onclick='move(\""+item.id+"\",\""+item.itemCategory+"\")'>"+
                    "<div class='item-img'>" +
                            "<img src='"+item.itemImage.thumb1 +"'  alt='"+ item.itemCategory +","+item.itemName.itemTitle +"'>"+
                        "</div>"+
                        "<div class='item-info'>"+
                            "<p>"+item.itemCategory+"</p>" +
                            "<b>"+item.itemName.itemTitle +"</b>  " +
                        "</div>" +
                    "</a>"+
                "</li>";
            elements.push($(itemHTML).get(0));
        }//if(cho == titleCho)
        // 제품 검색 건수 
        var dataCount = elements.length;
        if(dataCount){
            srchTotal.text(dataCount)
            $(".prdt-txt-info").remove();//초기화
        }else {
            $(".prdt-txt-info").remove();//초기화
           prtRsultUl.after("<div class='prdt-txt-info'>등록된 제품이 없습니다.</div>");
            srchTotal.text(dataCount)
        }
      
       
        prtRsultUl.find("li").remove();//초기화
        prtRsultUl.append(elements);

    })//each data
   loadMoreBtn.removeClass("on")   //loadMoreBtn 비활성화

}//ChoMatch

//choHangul 타이틀 첫 초성 찾기
function choHangul(str){
    chochk = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    result = "";
    code = str.charCodeAt(0)-44032;
    if(code>-1 && code<11172) result += chochk[Math.floor(code/588)];
    return result;
}//choHangul

//효능별 구분 select 변경시 결과값 가져오기
function effectBtn(data, value){
    var elements = [];

    //제품 리스트 만들기
    $.each(data, function(idx, item){
        var effectSel = item.itemClassify;

        if(effectSel == value){
            var itemHTML = 
            "<li class='prdt-item'>" +
                "<a href='javascript:;' onclick='move(\""+item.id+"\",\""+item.itemCategory+"\")'>"+
                "<div class='item-img'>" +
                        "<img src='"+item.itemImage.thumb1 +"'  alt='"+ item.itemCategory +","+item.itemName.itemTitle +"'>"+
                    "</div>"+
                    "<div class='item-info'>"+
                        "<p>"+item.itemCategory+"</p>" +
                        "<b>"+item.itemName.itemTitle +"</b>  " +
                    "</div>" +
                "</a>"+
            "</li>";
            elements.push($(itemHTML).get(0));
        }
    })//each data
   
     // 제품 검색 건수 
     var dataCount = elements.length;
     if(dataCount){
        srchTotal.text(dataCount)
        $(".prdt-txt-info").remove();//초기화
    }else {
        $(".prdt-txt-info").remove();//초기화
       prtRsultUl.after("<div class='prdt-txt-info'>등록된 제품이 없습니다.</div>");
        srchTotal.text(dataCount)
    }
    prtRsultUl.find("li").remove();//초기화
    prtRsultUl.append(elements); //결과 나타나기 
    loadMoreBtn.removeClass("on")//loadMoreBtn 비활성화
}

//효능별 구분 option만들기
function effectOption(data){
    var setArr = [];
    // 중복배열 요소 제거
    $.each(data, function(key, value){
       if($.inArray(value, setArr) === -1){
            setArr.push(value);
        };
     })//each data

    var resultArr = [];
    var setArr = setArr.sort(); //문자열 오름차순 (가나다)

    $.each(setArr, function(idx, item){
           var itemHTML = "<option value='"+item+"'>"+ item +"</option>";
           resultArr.push($(itemHTML).get(0));
    })//each setArr
  
   effectSelect.append(resultArr); //결과 나타나기
}

//catData 카테고리별로 데이터 나누기
function catData(data,catName){
    var catArr = []; //초기화
    var crumbleTxt = catName;
    $.each(data, function(idx, item){
        if(catName == item.itemCategory){
            catArr.push(item);
        }else if(catName == "전체제품보기") {
            catArr.push(item);
        }
    })
    // 제품 검색 건수 
    var dataCount = catArr.length;
    if(dataCount){
        srchTotal.text(dataCount)
        $(".prdt-txt-info").remove();//초기화
    }else {
        $(".prdt-txt-info").remove();//초기화
        prtRsultUl.after("<div class='prdt-txt-info'>등록된 제품이 없습니다.</div>");
        srchTotal.text(dataCount)
    }
    $(".location-link li:last-child a").text(crumbleTxt);
    $(".location-link li:last-child a").attr("href", "brand-category.html?itemType="+crumbleTxt);
    itemCat = catArr; //해당 카테고리 itemCat에 담기
}//catData

//catListChunk 해당 카테고리 12개씩 묶어 화면에 보여지기
function catListChunk(){
    var setArr = []; //초기화

    for(var i = 0; i < itemCat.length; i += addItemCount){
        //12개씩 묶기
        setArr.push(itemCat.slice(i, i + addItemCount));
    }

    var slicedData = setArr.slice(0, 1); //처음화면 12개만 보여지도록
    var resultArr =[]; //초기화

    //제품 리스트 만들기
    $.each(slicedData, function(idx, prdt){
        $.each(prdt, function(idx, item){
            var itemHTML = 
            "<li class='prdt-item'>" +
            "<a href='brand-info.html?itemID="+item.id+"&itemType="+item.itemCategory+"'>"+
                "<div class='item-img'>" +
                        "<img src='"+item.itemImage.thumb1 +"'  alt='"+ item.itemCategory +","+item.itemName.itemTitle +"'>"+
                    "</div>"+
                    "<div class='item-info'>"+
                        "<p>"+item.itemCategory+"</p>" +
                        "<b>"+item.itemName.itemTitle +"</b>  " +
                    "</div>" +
                "</a>"+
            "</li>";
            resultArr.push($(itemHTML).get(0));
        })
    })
    prtRsultUl.append(resultArr); //결과 나타나기

    return setArr;
}//catListChunk

//addItem 더보기 클릭시 
function addItem(){
    var resultArr =[];//초기화 
    var slicedData = itemCat.slice(added, added+addItemCount);//12개씩 보여지기
    //제품 리스트 만들기
    $.each(slicedData, function(idx, item){
        var itemHTML = 
            "<li class='prdt-item'>" +
            "<a href='javascript:;' onclick='move(\""+item.id+"\",\""+item.itemCategory+"\")'>"+
                "<div class='item-img'>" +
                        "<img src='"+item.itemImage.thumb1 +"'  alt='"+ item.itemCategory +","+item.itemName.itemTitle +"'>"+
                    "</div>"+
                    "<div class='item-info'>"+
                        "<p>"+item.itemCategory+"</p>" +
                        "<b>"+item.itemName.itemTitle +"</b>  " +
                    "</div>" +
                "</a>"+
            "</li>";
            resultArr.push($(itemHTML).get(0));
    })//each slicedData

  
    prtRsultUl.append(resultArr);//결과 나타나기
    added += slicedData.length; //added 값 업데이트
    
    //loadMoreBtn 활성화&비활성화
    if(added < itemCat.length){ 
        loadMoreBtn.addClass("on")
    }else{
        loadMoreBtn.removeClass("on")
    }
}


    
//제품 이미지 마우스호버시 메인화면 체인지
function mainView(){
    // main-view
    var imgSrc = $(".prdt-thumb-list li:eq(0) img").attr("src");
    var imgAlt = $(".prdt-thumb-list li:eq(0) img").attr("alt");
    var prdtImg = $("<img>").attr({
                        "src": imgSrc,
                        "alt": imgAlt
                    });
    $(".main-view").append(prdtImg)
    $(".prdt-thumb-list li").mouseover(function () {
        var imgSrc = $(this).find("img").attr("src");
        var imgAlt = $(this).find("img").attr("alt");
        var prdtImg = $("<img>").attr({
                "src": imgSrc,
                "alt": imgAlt
            });
        $(".main-view img").remove();
        $(".main-view").append(prdtImg);
    });
}

