//새소식 11개 / 위드동아 18개 / 사회공헌 14개 / 홍보영상 12개 / 동아공고 23개
var tabPanel = $(".tab-panel");
var resultUi = $(".result-list");
var totalCount = $(".total .num");
var pageFirstBtn = $(".first-page");
var pagePrevBtn = $(".prev-page");
var pageNextBtn = $(".next-page");
var pageLastBtn = $(".last-page");
var showPageCnt = 5; // 화면에 보일 페이지 번호 개수
var countPerPage; // 페이지당 데이터 건수
var currIdx; //현재 탭에 hasClass("on")의 index번호 
var currData; //현재 탭의 데이터 
var schInput = $(".schInput");
var schSelTarget = $(".sel-d");




$.getJSON("./data/news.json", catList);   //제품리스트.json

//json파일 데이터 
function catList(data){
    
    setData(data); //초기화
    setTable(currData,1) //setTable초기화
    setPage(currData,1) //setPage초기화

    $(".cat-list li").click(function(){
        tabPanel.eq(currIdx).find(schInput).val(""); //검색창 초기화 
        tabPanel.eq(currIdx).find(schSelTarget).find('option:first').prop("selected", true);//검색옵션 초기화 
        setData(data)
        setTable(currData,1) //setTable초기화
        setPage(currData,1) //setPage초기화
    })//cat-list>li.click

    //keyup시 찾는 키워드에 맞는 데이터 넘기기 
    schInput.keyup(function(){
        if(event.keyCode == 13) {
            keyupData(currData)
        }//엔터
    })//schInput.keyup
}//catList

function setData(data){
  //초기화 - cat-list>li에("on")이 있으면
  var thisIdx =  $(".cat-list li.on").index();
  var thisName = $(".cat-list li.on").text();
  var DateName = $(".cat-list li.on").find("a").attr("href").split('#').pop();

  currIdx = thisIdx; //현재 탭에 hasClass("on")의 index번호 

  if(thisName == "새소식"||thisName =="사회공헌 소식"||thisName =="동아공고"){
      //새소식, 사회공헌소식, 동아공고의 페이지당 10개의 리스트 개수
      var perPage = 10;
      countPerPage = perPage
  }else if(thisName =="위드동아"||thisName =="홍보영상"){
      //위드동아, 홍보영상의 페이지당 10개의 리스트 개수
      var perPage = 12;
      countPerPage = perPage
  }
  //초기화 데이터 - 해당 카테고리(새소식/위드동아/사회공헌 소식/홍보영상/동아공고) 별로  데이터 나누기 
  var currList =[];
  $.each(data, function(key, value){
      if(DateName == key){
          $.each(value, function(idx, item){
              var itemArr = item;
              currList.push(itemArr);
          })
      }
  })
  var DateArr = sortDate(currList); //내림차순으로 데이터 정리하기 
  currData = DateArr; //데이터 넘기기
  
}

function keyupData(currData){
  var keywords = tabPanel.eq(currIdx).find(schInput).val();
  var whichTarget = tabPanel.eq(currIdx).find(schSelTarget).val();
 
  var filteredArray = currData.filter(function(item){ //필터 후 데이터 넘기기
      if(whichTarget == "1"){//전체(제목+내용)에서 찾기
          if(item.content){
              var onlytitle = item.title.includes(keywords)
              var onlytxt = item.content.includes(keywords)
              return onlytitle + onlytxt
          }else {
              var onlytitle = item.title.includes(keywords)
              return onlytitle
          }
      }else if(whichTarget == "title"){//제목에서만 찾기
          var onlytitle = item.title.includes(keywords)
          return onlytitle
      }else if(whichTarget == "content"){//내용에서만 찾기
          var onlytxt = item.content.includes(keywords)
          return onlytxt
      }
  })
  currData = filteredArray; //데이터 넘기기

  searchKeyup(currData,1)//리스트 보여주기
 
}


//리스트 보여주기
function setTable(currData, pageNum){
  var added = (pageNum -1) * countPerPage;
  var filteredData = currData.slice(added, pageNum * countPerPage); //각페이지에 맞는 countPerPage만큼 
  var elements = [];

  // 제품 검색 건수 
  var dataCount = currData.length;
  if(dataCount){
      totalCount.text(dataCount)
      $(".prdt-txt-info").remove();//초기화
  }else {
      $(".prdt-txt-info").remove();//초기화
      resultUi.after("<div class='prdt-txt-info'>찾으시는 내용이 없습니다.</div>");
      totalCount.text(dataCount)
  }
  
  // 새소식,위드동아,사회공헌 소식,홍보영상,동아공고 별로 맞는 HTML 만들기
  $.each(filteredData, function(idx, item){
      if(item.category.category == "새소식"){ //새소식
          var itemContent = item.content.replace(/(<([^>]+)>)/ig,"") //태그제거 내용만 남기기
          var itemHTML = 
              "<li>" +
                  "<a href='javascript:;'onclick='move(\""+item.uid+"\",\""+item.category.category+"\")'>" +
                      "<div class='news-img'>" +
                          "<img src='"+item.thumbnail+"' alt='"+item.title+"'>" +
                      "</div>" +
                      "<div class='news-txt'>" +
                          "<b class='sub-tit-b'>"+item.title+"</b> "+
                          "<p class='txt'>"+itemContent+"</p>" +
                          "<p class='date'>"+item.date+"</p>" +
                      "</div>" +
                  "</a>"+
              "</li>";
              elements.push($(itemHTML).get(0));
      }else if(item.category.category == "위드동아"){//위드동아
          var itemContent = item.content.replace(/(<([^>]+)>)/ig,"")//태그제거 내용만 남기기
          var itemHTML = 
          "<li>" +
              "<a href='javascript:;'onclick='move(\""+item.uid+"\",\""+item.category.category+"\")'>" +
                  "<p class='cate'>"+item.category.item+"</p>"+
                  "<div class='img'>"+
                      "<img src='"+item.thumbnail+"' alt='"+item.title+"'>"+
                  " </div>"+
                  "<div class='story-tit-box'>"+
                      "<p class='tit'>"+item.title+"</p>"+
                      "<p class='date'>"+item.date+"</p>"+
                  " </div>"+
              "</a>"+
          "</li>";
          elements.push($(itemHTML).get(0));
      }else if(item.category.category == "사회공헌 소식"){//사회공헌 소식
          var reverse = (currData.length-added)-( elements.length); //테이블 순번 역순
          var itemHTML = 
              "<tr>" +
                  "<td>"+reverse+"</td>" +
                  "<td>" +
                      "<a href='javascript:;'onclick='move(\""+item.uid+"\",\""+item.category.category+"\")'>"+item.title+"</a>" +
                  "</td>" +
                  "<td>"+item.date+"</td>" +
              " </tr>";
          elements.push($(itemHTML).get(0));
      }else if(item.category.category == "홍보영상"){//홍보영상
          var itemHTML = 
              "<li>" +
                  "<a href='"+item.url+"' target='_blank'>" +
                      "<div class='img'>" +
                          "<img src='"+item.thumbnail+"' alt='"+item.title+"'>" +
                      "</div>" +
                      "<div class='txt-box'>" +
                          " <b class='tit'>"+item.title+"</b>" +
                          "<p class='date'>"+item.date+"</p>" +
                      " </div>" +
                  "</a>" +
              "</li>";
          elements.push($(itemHTML).get(0));
      }else if(item.category.category == "동아공고"){//동아공고
          var reverse = (currData.length-added)-( elements.length); //테이블 순번 역순
          var itemHTML = 
              "<tr>" +
                  "<td>"+reverse +"</td>" +
                  "<td>"+item.title+"</td>" +
                  "<td>"+item.date+"</td>" +
                  "<td>" +
                      "<a href='"+item.file+"'  title='"+item.title+"' class='affix-down' download=''></a>" +
                  "</td>" +
              "</tr>";
              elements.push($(itemHTML).get(0));
      }
  })//each.filteredData
  added += filteredData.length; //added 값 업데이트
  tabPanel.find(".result-list").children().remove(); //초기화 
  tabPanel.eq(currIdx).find(".result-list").append(elements); //해당 카테고리에 리스트 추가하기 

}

//해당 데이터에 맞게 페이징 세팅하기 
function setPage(currData, pageNum){
  var currentPage = pageNum;
  var totalPage = Math.floor(currData.length/ countPerPage)+(currData.length % countPerPage == 0 ? 0 : 1);

  showAllIcon();//초기화 

  //현재 페이지가 5(보여질 페이지 번호 개수)보다 작은 경우
  //첫 페이지와 이전 페이지로 이동하는 icon을 보여줄 필요가 없기 때문에 숨김
  if(currentPage <= showPageCnt){
      tabPanel.eq(currIdx).find(pageFirstBtn).hide();
      tabPanel.eq(currIdx).find(pagePrevBtn).hide();
  }
  //총 페이지 번호가5(보여질 페이지 번호 개수)보다 작거나   
  //페이징 영역에 마지막 페이지 번호를 보여 주고 있으면  
  //마지막 페이지와 다음페이지로 이동하는 icon을 숨긴다.   
  var toPlusOne =  Math.floor((currentPage -1 )/ showPageCnt) * showPageCnt + showPageCnt + 1;
  if(totalPage <= showPageCnt || toPlusOne > totalPage){
      tabPanel.eq(currIdx).find(pageNextBtn).hide();
      tabPanel.eq(currIdx).find(pageLastBtn).hide();
  }
  //pages 영역에 페이지 번호를 세팅
  var start = Math.floor((currentPage-1)/ showPageCnt) * showPageCnt + 1;
  var pagesHtml = "";
  for(var end = start + showPageCnt; start < end &&  start <= totalPage; start++){
      //첫번째 리스트에만 active클래스 걸고, 나머지는에는 클래스명 없이 나타나기
      pagesHtml +=  "<li class='"+(start == currentPage ? 'active' : '')+"'><a href='#n'>"+start+"</a></li>"
  }
  tabPanel.find(".pages").children().remove(); //초기화
  tabPanel.eq(currIdx).find(".pages").append($(pagesHtml)); //페이지 번호 추가하여 세팅하기

}

//페이지 초기화 - 첫,이전,다음,마지막버튼 모두 보여주기
function showAllIcon(){
  tabPanel.eq(currIdx).find(pageFirstBtn).show();
  tabPanel.eq(currIdx).find(pagePrevBtn).show();
  tabPanel.eq(currIdx).find(pageNextBtn).show();
  tabPanel.eq(currIdx).find(pageLastBtn).show();
}

//해당 카테고리의 input[text]의 value값 가져와 리스트 추가하기
function searchKeyup(currData, pageNum){
  
 // 제품 검색 건수 
 var dataCount = currData.length;
  if(dataCount){
      totalCount.text(dataCount)
      $(".prdt-txt-info").remove();//초기화
  }else {
      $(".prdt-txt-info").remove();//초기화
      resultUi.after("<div class='prdt-txt-info'>찾으시는 내용이 없습니다.</div>");
      totalCount.text(dataCount)
  }

  setPage(currData,pageNum) //페이징 데이터값 키워드에 맞는 데이터로 바꾸기

  var filteredData = currData.slice(added, pageNum * countPerPage);//각페이지에 맞는 countPerPage만큼 
  var added = (pageNum -1) * countPerPage;
  var elements=[];
  
  // 새소식,위드동아,사회공헌 소식,홍보영상,동아공고 별로 맞는 HTML 만들기
  $.each(filteredData, function(idx, item){
      
      if(item.category.category == "새소식"){// 새소식
          var itemContent = item.content.replace(/(<([^>]+)>)/ig,"")//태그제거 내용만 남기기
          var itemHTML = 
              "<li>" +
                  "<a href='javascript:;'onclick='move(\""+item.uid+"\",\""+item.category.category+"\")'>" +
                      "<div class='news-img'>" +
                          "<img src='"+item.thumbnail+"' alt='"+item.title+"'>" +
                      "</div>" +
                      "<div class='news-txt'>" +
                          "<b class='sub-tit-b'>"+item.title+"</b> "+
                          "<p class='txt'>"+itemContent+"</p>" +
                          "<p class='date'>"+item.date+"</p>" +
                      "</div>" +
                  "</a>"+
              "</li>";
              elements.push($(itemHTML).get(0));
      }else if(item.category.category == "위드동아"){//위드동아
          var itemContent = item.content.replace(/(<([^>]+)>)/ig,"")//태그제거 내용만 남기기
          var itemHTML = 
          "<li>" +
              "<a href='javascript:;'onclick='move(\""+item.uid+"\",\""+item.category.category+"\")'>" +
                  "<p class='cate'>"+item.category.item+"</p>"+
                  "<div class='img'>"+
                      "<img src='"+item.thumbnail+"' alt='"+item.title+"'>"+
                  " </div>"+
                  "<div class='story-tit-box'>"+
                      "<p class='tit'>"+item.title+"</p>"+
                      "<p class='date'>"+item.date+"</p>"+
                  " </div>"+
              "</a>"+
          "</li>";
          elements.push($(itemHTML).get(0));
      }else if(item.category.category == "사회공헌 소식"){//사회공헌 소식
          var reverse = (currData.length-added)-( elements.length); //테이블 순번 역순
          var itemHTML = 
              "<tr>" +
                  "<td>"+reverse+"</td>" +
                  "<td>" +
                      "<a href='javascript:;'onclick='move(\""+item.uid+"\",\""+item.category.category+"\")'>"+item.title+"</a>" +
                  "</td>" +
                  "<td>"+item.date+"</td>" +
              " </tr>";
          elements.push($(itemHTML).get(0));
      }else if(item.category.category == "홍보영상"){//홍보영상
          var itemHTML = 
              "<li>" +
                  "<a href='"+item.url+"' target='_blank'>" +
                      "<div class='img'>" +
                          "<img src='"+item.thumbnail+"' alt='"+item.title+"'>" +
                      "</div>" +
                      "<div class='txt-box'>" +
                          " <b class='tit'>"+item.title+"</b>" +
                          "<p class='date'>"+item.date+"</p>" +
                      " </div>" +
                  "</a>" +
              "</li>";
          elements.push($(itemHTML).get(0));
      }else if(item.category.category == "동아공고"){//동아공고
          var reverse = (currData.length-added)-( elements.length); //테이블 순번 역순
          var itemHTML = 
              "<tr>" +
                  "<td>"+reverse +"</td>" +
                  "<td>"+item.title+"</td>" +
                  "<td>"+item.date+"</td>" +
                  "<td>" +
                      "<a href='"+item.file+"' title='"+item.title+"' class='affix-down' download=''></a>" +
                  "</td>" +
              "</tr>";
              elements.push($(itemHTML).get(0));
      }
  })//each.filteredData

  tabPanel.find(".result-list").children().remove();//초기화 
  tabPanel.eq(currIdx).find(".result-list").append(elements);//해당 카테고리에 리스트 추가하기 
 
}//searchKeyup


$(".pages").on("click", "li", function(){
  //해당 페이지 클릭 [1,2,3,4,5]
      $(".pages").find("li").removeClass("active");
      $(this).addClass("active");
      var pageNum = Number($(this).text());
      setTable(currData,pageNum)
      $(this).parents(".tab-panel").find(".result-list").find("a").eq(0).focus();
  })//pages.click

  $(".paging").on("click", "i", function(){
      //첫 번째 페이지, 이전 페이지, 다음 페이지, 마지막 페이지 클릭
      var totalPage = Math.floor(currData.length/ countPerPage)+(currData.length % countPerPage == 0 ? 0 : 1); 
      var thisclass = $(this).attr("class");
      if(thisclass == "first-page"){//첫 번째 페이지
          setTable(currData,1)
          setPage(currData,1)
      }else if( thisclass == "prev-page"){//이전 페이지
          var arrPages=[];
          $(".pages").find("li").each(function(idx, item){
              arrPages.push(Number($(this).text()));
          });
          var prevPage =  Math .min.apply(Math, arrPages)- showPageCnt;
          setTable(currData,prevPage)
          setPage(currData,prevPage)
      }else if(thisclass == "next-page"){//다음 페이지
          var arrPages=[];
          $(".pages").find("li").each(function(idx, item){
              arrPages.push(Number($(this).text()));
          });
          var nextPage =  Math.max.apply(Math, arrPages) + 1;
          setTable(currData,nextPage)
          setPage(currData,nextPage)

      }else if( thisclass == "last-page"){//마지막 페이지
          var lastPage = Math.floor((totalPage - 1) / showPageCnt) * showPageCnt + 1;
          setTable(currData,lastPage)
          setPage(currData,lastPage)
      }
      $(this).parents(".tab-panel").find(".result-list").find("a").eq(0).focus();
  })//paging.click