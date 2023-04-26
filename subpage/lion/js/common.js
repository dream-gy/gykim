
//스크롤시 header on 
$(window).scroll(function(){
  if($(window).scrollTop() > 1 ){
      $("header").addClass("on");
  }else {
      $("header").removeClass("on");
  }
});

//햄버거 메뉴 클릭
$(".m-btn").click(function(){
  $(this).toggleClass("active");
  $(".m-gnb").toggleClass("active");
})//$(".m-btn").click


//숫자 한자리인 경우 0붙이기 
function zeroFill(value, fillCount){
  var result = value;
  if(typeof value === "number") result = value.toString()
  return result.padStart(fillCount, '0')
}//zeroFill


// 아이디 *로 가리기
function solution(identity){
    var frontstr = identity.slice(0, identity.length-4);
    var backstr = identity.slice(-4);
    backstr = '*'.repeat(backstr.length);
    return frontstr+backstr;
}//solution

//날짜 계산(몇일전, 몇시간전, 몇분전)
function timeForToday(value){
    var timeValue = new Date(value);
    var milliSeconds = new Date() - timeValue
    var seconds = milliSeconds / 1000
    if (seconds < 60) return `방금 전`
    var minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    var hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    var days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`
    var weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 전`
    var months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 전`
    var years = days / 365
    return `${Math.floor(years)}년 전`
}//timeForToday


//day와 year&month 분리하기 
//day만 추출하기
function splitDay(num){
    var date =  new Date(num)
    num = ('0' + date.getDate()).slice(-2);
    return num;
}//splitDay

//Year&Month만 추출하기
function splitYear(num){
    var date =  new Date(num)
    num =  date.getFullYear() +"-"+('0' + (date.getMonth() + 1)).slice(-2);
    return num;
}//splitYear

//Year&Month&day만 추출하기
function splitDate(num){
    var date =  new Date(num)
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    num = year + '-' + month  + '-' + day;
    return num;
}//splitDate

//내림차순
function sortDate(list) {
    var sorted_list = list.sort(function(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }).reverse();
    return sorted_list;
}//sortDate

//2주 14일 동안 class=new 띄우기
function newTime(num){
    var today = new Date();
    var date =  new Date(num);
    var year = today.getFullYear();   // 연도
    var month = today.getMonth()+1;   // 월    
    var day = today.getDate();        // 일

    var stDate = new Date(year, month, day);
    var endDate = new Date(date.getFullYear(), date.getMonth()+1, date.getDate());

    var btMs =stDate.getTime() - endDate.getTime();
    var btDay = btMs / (1000*60*60*24);

    if(btDay < 14){
        num = true;
    }else {
        num = false;
    }
    return num;
}//newTime

//주소창 파라미터 값 가져오기
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.href);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}//getParameterByName





