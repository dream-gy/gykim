$(function(){



  var allData = [];
  $.getJSON("./data/news.json", itemList);
  function itemList(data){
      allData = data;
      var elements = [];
      var catData =[];
      var itemID = getParameterByName('itemUid'); //주소창 파라미터값
      var itemType = getParameterByName('itemType'); //주소창 파라미터값
      
      $.each(data, function(key, value){
          if(itemType == "news"){
              itemType =  "newsList";
              $(".view h2").text("새소식");
             
              
          }else if(itemType == "event"){
              itemType =  "eventList";
              $(".view h2").text("이벤트");
            
          }else if(itemType == "review"){
              itemType =  "reviewList";
          }
          if(itemType == key){
              $.each(value, function(idx, item){
                  var itemArr = item;
                  catData.push(itemArr);
              })
          }
      })//each.data
      $.each(catData, function(idx, item){
          var dataIdx = catData.findIndex(e => e.uid === itemID);
          var PrevIdx = dataIdx -1;
          var NextIdx = dataIdx + 1;
          var lastDataIdx = catData.length - 1;
         if(PrevIdx == "-1"){
              var prevUid = ""
              var prevuCat = ""
              var prevTit = "다음글이 없습니다.";
              var prevDate = "";
              var nextTit = catData[NextIdx].title;
              var nextDate = catData[NextIdx].date;
              var nextUid = catData[NextIdx].uid;
              var nextuCat = catData[NextIdx].category.category;
              var prevLink = "#n";
              var nextLink = "view.html?itemType="+item.category+"&itemUid="+nextUid+"";
          }else if( dataIdx == lastDataIdx) {
              var prevUid = catData[PrevIdx].uid;
              var prevuCat = catData[PrevIdx].category.category;
              var prevTit = catData[PrevIdx].title;
              var prevDate = catData[PrevIdx].date;
              var nextTit = "다음글이 없습니다.";
              var nextDate = "";
              var nextUid = "";
              var nextuCat = "";
              var prevLink ="view.html?itemType="+item.category+"&itemUid="+prevUid+"";
              var nextLink =  "#n";
          }else {
              var prevUid = catData[PrevIdx].uid;
              var prevuCat = catData[PrevIdx].category.category;
              var prevTit = catData[PrevIdx].title;
              var prevDate = catData[PrevIdx].date;
              var nextTit = catData[NextIdx].title;
              var nextDate = catData[NextIdx].date;
              var nextUid = catData[NextIdx].uid;
              var nextuCat = catData[NextIdx].category.category;
              var prevLink ="view.html?itemType="+item.category+"&itemUid="+prevUid+"";
              var nextLink ="view.html?itemType="+item.category+"&itemUid="+nextUid+"";
          }
  
          if(itemID == item.uid){
              //$(".view-tit").html(item.category.category);   //카테고리명
              $(".view-tit").html(item.title);   //제목
              $(".view-info .date").html( splitDate(item.date));   //날짜
              $(".view-content .content").html(item.content);   //내용
              $(".prev .tit").html(prevTit);
              $(".next .tit").html(nextTit);
              $(".prev").attr("href", prevLink );
              $(".next").attr("href", nextLink);
          }
      })//each.catData
  
  }//itemList
  $(".comm-tab li").on("click", function () {
      var activeLi = $(this).text();
      console.log("asdas")
      //location.href = "community.html";
      if(activeLi == "새소식"){
          $(".view h2").text("새소식");
          location.href = "community.html?no=0";
         
      }else if(activeLi == "이벤트"){
          $(".view h2").text("이벤트");
          location.href =  "community.html?no=1";
          
      }else if(activeLi == "리뷰"){
          $(".view h2").text("리뷰");
          location.href =  "community.html?no=2";
      }
  });            



})//function.ready