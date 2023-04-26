//////////////////

// 스크롤 fade 효과
AOS.init();

// languages button
$(".lang-set, .lang").mouseover(function () {
  $(this).addClass("on");
});
$(".lang-set, .lang").mouseleave(function () {
  $(this).removeClass("on");
});

// nav mousevoer
$("nav.hdNav, .depth-bg ").mouseover(function () {
  $("header").addClass("over");
});
$("nav.hdNav, .depth-bg ").mouseleave(function () {
  $("header").removeClass("over");
});
//nav focus
$(".menu a").bind("focusin", function () {
  $("header").addClass("over");
});

$("nav.hdNav .menu a").bind("focusout", function () {
  $("header").removeClass("over");
});

//all-menu
$(".hamburger").on("click", function () {
  $(".all-menu").fadeIn("fast").addClass("on");
});
$(".all-close").on("click", function () {
  $(".all-menu").fadeOut("slow").removeClass("on");
});

// search-pharmacy btn
$(".opt-btn").on("click", function () {
  var pcSelect = $(this).next();
  var thisName = $(this).parent().attr("id");
  var thisValue = $(this).attr("current-value");
  
  //브랜드 선택되면 제품선택 toggleClass활성화
  if (thisName == "pcSelectItem") {
    chkValue = $("#pcSelectBrand").find(".opt-btn").attr("current-value");
    if (!chkValue) {
      alert("브랜드를 먼저 선택해 주세요.")
      $("#pcSelectBrand .opt-btn ").focus();
     
    }else {
      pcSelect.fadeToggle("fast").toggleClass("on");
    }
  } else {
    pcSelect.fadeToggle("fast").toggleClass("on");
  }
  
});

// search-pharmacy dropdown focusout
$(".dropdown a").bind("focusout", function () {
  $(this).fadeToggle("fast").removeClass("on");
});

$(".dropdown").on("click", "li", function () {
  var pcText = $(this).find("a").text();
  select = $(this).parent().siblings(".opt-btn");
  select.attr("current-value", pcText);
  select.text(pcText);
  $(this).parent().removeClass("on").fadeOut("fast'");
  var chkValue = $(this).parent().parent().attr("id");

  //브랜드 선택 클릭시 제품선택 초기화 된다.
  if (chkValue == "pcSelectBrand") {
    //초기화
    $(this)
      .parent()
      .parent()
      .siblings("#pcSelectItem")
      .find(".opt-btn ")
      .text("제품 선택");
    $(this)
      .parent()
      .parent()
      .siblings("#pcSelectItem")
      .find(".opt-btn ")
      .attr("current-value", "");
    selprd(pcText);
  }
});

function selprd(pcText) {
  var selArr;
  if (pcText == "노스카나") {
    var selectArr = ["노스카나"];
    selArr = selectArr;
  } else if (pcText == "노즈원큐") {
    var selectArr = ["노즈원큐(멘톨향)", "노즈원큐(무향)"];
    selArr = selectArr;
  } else if (pcText == "덴파사") {
    var selectArr = ["덴파사"];
    selArr = selectArr;
  } else if (pcText == "도다나") {
    var selectArr = ["도다나겔"];
    selArr = selectArr;
  } else if (pcText == "드라이문트") {
    var selectArr = ["드라이문트겔"];
    selArr = selectArr;
  } else if (pcText == "디오맥스") {
    var selectArr = ["디오맥스"];
    selArr = selectArr;
  } else if (pcText == "디판테놀") {
    var selectArr = ["D-판테놀"];
    selArr = selectArr;
  } else if (pcText == "리버만") {
    var selectArr = ["리버만"];
    selArr = selectArr;
  } else if (pcText == "마이보라") {
    var selectArr = ["마이보라"];
    selArr = selectArr;
  } else if (pcText == "멕시롱") {
    var selectArr = ["멕시롱"];
    selArr = selectArr;
  } else if (pcText == "멜라노사") {
    var selectArr = ["멜라노사"];
    selArr = selectArr;
  } else if (pcText == "멜라토닝") {
    var selectArr = ["멜라토닝"];
    selArr = selectArr;
  } else if (pcText == "멜리안") {
    var selectArr = ["멜리안"];
    selArr = selectArr;
  } else if (pcText == "모글원큐") {
    var selectArr = ["모글원큐 스프레이"];
    selArr = selectArr;
  } else if (pcText == "미니보라") {
    var selectArr = ["미니보라"];
    selArr = selectArr;
  } else if (pcText == "베나치오") {
    var selectArr = ["베나치오"];
    selArr = selectArr;
  } else if (pcText == "베스타제") {
    var selectArr = ["베스타제포르테"];
    selArr = selectArr;
  } else if (pcText == "비겐") {
    var selectArr = ["비겐크림톤", "비겐크림톤 빠른염색"];
    selArr = selectArr;
  } else if (pcText == "비사진") {
    var selectArr = ["비사진 나잘스프레이"];
    selArr = selectArr;
  } else if (pcText == "속이쿨") {
    var selectArr = ["속이쿨"];
    selArr = selectArr;
  } else if (pcText == "스카논") {
    var selectArr = ["스카논"];
    selArr = selectArr;
  } else if (pcText == "스카풀라") {
    var selectArr = ["스카풀라"];
    selArr = selectArr;
  } else if (pcText == "스킨가드") {
    var selectArr = ["스킨가드 습윤밴드", "스킨가드 일반밴드"];
    selArr = selectArr;
  } else if (pcText == "씨앤큐") {
    var selectArr = ["씨앤큐"];
    selArr = selectArr;
  } else if (pcText == "아이봉") {
    var selectArr = ["아이봉"];
    selArr = selectArr;
  } else if (pcText == "아이키커") {
    var selectArr = ["아이키커 비타골드"];
    selArr = selectArr;
  } else if (pcText == "암씨롱") {
    var selectArr = ["암씨롱"];
    selArr = selectArr;
  } else if (pcText == "애시컨") {
    var selectArr = ["애시컨"];
    selArr = selectArr;
  } else if (pcText == "애크논") {
    var selectArr = ["애크논"];
    selArr = selectArr;
  } else if (pcText == "오늘비타") {
    var selectArr = ["오늘비타고", "오늘비타더블골드"];
    selArr = selectArr;
  } else if (pcText == "옵티덤") {
    var selectArr = ["옵티덤"];
    selArr = selectArr;
  } else if (pcText == "원큐시리즈") {
    var selectArr = ["나프원큐", "덱스원큐", "이브원큐"];
    selArr = selectArr;
  } else if (pcText == "이치논") {
    var selectArr = ["이치논"];
    selArr = selectArr;
  } else if (pcText == "이치밴") {
    var selectArr = ["이치밴"];
    selArr = selectArr;
  } else if (pcText == "챔프") {
    var selectArr = [
      "챔프노즈시럽",
      "챔프시럽",
      "챔프이부펜액",
      "챔프코프시럽",
    ];
    selArr = selectArr;
  } else if (pcText == "카필러스") {
    var selectArr = ["카필러스 캡슐", "카필러스액"];
    selArr = selectArr;
  } else if (pcText == "클리덴트") {
    var selectArr = ["클리덴트"];
    selArr = selectArr;
  } else if (pcText == "타치온정") {
    var selectArr = ["타치온"];
    selArr = selectArr;
  } else if (pcText == "터비뉴") {
    var selectArr = ["터비뉴겔", "터비뉴더블액션겔", "터비뉴원스"];
    selArr = selectArr;
  } else if (pcText == "판텍") {
    var selectArr = ["판텍큐"];
    selArr = selectArr;
  } else if (pcText == "하노백") {
    var selectArr = ["하노백"];
    selArr = selectArr;
  }
  //초기화
  $("#pcSelectItem .dropdown li").remove();
  //브랜드 선택 후 그 브랜드 제품 나타나기
  $.each(selArr, function (idx, item) {
    var dropOpt = "<li><a href='#n'>" + item + "</a></li>";
    $("#pcSelectItem .dropdown").append($(dropOpt));
  });
}

//판매약국찾기 검색 버튼
$("#PcSearch ").on("click", function (e) {
  $(".search-result").addClass("on");
});

//  footer site
$(".btn-b").on("click", function () {
  $(this).parent().siblings().children().removeClass("on");
  $(this).parent().siblings().children().next().fadeOut("fast");
  $(this).toggleClass("on");
  $(this).next().fadeToggle("fast").toggleClass("on");
});
// 특정영역 제외
$("#wrap").click(function (e) {
  var ftBtn = $(e.target).hasClass("btn-b");
  var ftDropdown = $(e.target).hasClass("f-site");
  var schBtn = $(e.target).hasClass("opt-btn");
  var schSel = $(e.target).hasClass("dropdown");
  if (!ftBtn && !ftDropdown) {
    $(".btn-b").removeClass("on");
    $(".f-site").fadeOut("fast").removeClass("on");
  }
  if (!schBtn && !schSel) {
    $(".dropdown").fadeOut("fast").removeClass("on");
  }
});

// scroll 이벤트
$(window).scroll(function () {
  //header 스크롤
  if ($(window).scrollTop() > 1) {
    $("header").addClass("affix");
  } else {
    $("header").removeClass("affix");
  }
});

//주소창 파라미터 값 가져오기
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.href);
  return results == null ? "": decodeURIComponent(results[1].replace(/\+/g, " "));
}


// lnb 공동
var lnb = $(".lnb");
var articleTotal = $("article").length;
var prdtType = getParameterByName("prdtType"); //주소창 파라미터값
var pageFileName;
//페이지 구별하기
function pageName() {
  var CurrentFileUrl = document.URL.substring(
    document.URL.lastIndexOf("/") + 1,
    document.URL.lastIndexOf("/") + 30
  );
  var lastDot = CurrentFileUrl.lastIndexOf(".");
  var fileName = CurrentFileUrl.substring(0, lastDot);
  pageFileName = fileName;
}
pageName(); //페이지 이름&페이지 구별하기

// lnb 나타나기
$("article").each(function () {
  var LnbName = $(this).find("h3").text();
  var LnbLink = $(this).attr("id");
  var LnbOpt = "<li><a herf='#' class='link'>" + LnbName + "</a></li>";
  if (LnbLink == "others") {
  } else {
    if (pageFileName == "brand") {
      //브랜드페이지경우 before로 추가
      lnb.find("ul").before(LnbOpt);
      lnb.find("li").eq(0).addClass("on");
    } else if (
      pageFileName == "brand-info" ||
      pageFileName == "brand-category"
    ) {
      $(".lnb li").each(function () {
        var thisTxt = $(this).text();
        if (thisTxt == prdtType) {
          $(this).addClass("on");
        }
      });
    } else if (
      pageFileName == "news" ||
      pageFileName == "recruit" ||
      pageFileName == "audit" ||
      pageFileName == "service" ||
      pageFileName == "brand-pharmacy" ||
      pageFileName == "promotion-view"
    ) {
      //없음
    } else {
      //브랜드페이지아닌 경우 append로 추가
      lnb.find("ul").append(LnbOpt);
      lnb.find("li").eq(0).addClass("on");
    }
  }
});
// lnb 부드럽게 이동
lnb.on("click", ".link", function (e) {
  e.preventDefault();
  lnb.find("li").removeClass("on");
  $(this).parent().toggleClass("on");

  $(this).parent().each(function () {
      var thisIndex = $(this).index();
      var offsetTop = $("article").eq(thisIndex).offset().top;
      $("html,body").animate({
        scrollTop: offsetTop - 100,
      });
    });
});
//lnb scroll 이벤트
$(window).scroll(function () {
  //lnb 스크롤 따라다니기
  var visualHeight = $("#contents").offset().top;
  visualHeight = visualHeight - $("header").height();
  var footerTop = $("footer").offset().top;
  footerTop =
    footerTop -
    $(".lnb").height() -
    $("header").height() -
    $(".lnb li").height();
  var affixBottom = $("main").height() - lnb.height();

  if ($(window).scrollTop() < visualHeight) {
    //스크롤이 비쥬얼화면 넘기 전 고정
    lnb.css("top", "");
    lnb.removeClass("affix");
  } else if ($(window).scrollTop() < footerTop) {
    //스크롤이 비쥬얼화면 밑으로 내려가면 움직이기
    lnb.css("top", "");
    lnb.addClass("affix");
  } else {
    //lnb가 더 이상 footer 밑으로 내려가지 않게 하기
    lnb.removeClass("affix");
    lnb.css("top", affixBottom);
  }

  //lnb 스크롤 따라다니기 예외 상황
  // brand
  // brand-info
  // bramd-category

  //lnb 자동 addClass
  $("article").each(function (idx) {
    var offsetTop = $(this).offset().top;
    offsetTop = offsetTop - $("header").height() * 2;
    lastOffset =
      $("article")
        .eq(articleTotal - 1)
        .offset().top -
      $("header").height() * 2;

    if ($(window).scrollTop() > offsetTop) {
      if (pageFileName == "brand-info" || pageFileName == "brand-category") {
        $(".lnb li").each(function () {
          var thisTxt = $(this).text();
          if (thisTxt == prdtType) {
            $(this).addClass("on");
          }
        });
      } else {
        lnb.find("li").removeClass("on");
        lnb.find("li").eq(idx).addClass("on");
        if (pageFileName == "brand") {
          if ($(window).scrollTop() > lastOffset) {
            lnb.find("li").removeClass("on");
            lnb
              .find("li")
              .eq(articleTotal - 2)
              .addClass("on");
          }
        }
      }
    }
  });
});

//real-link
$(".real-link").on("click", function (e) {
  e.preventDefault();
  var thisSrc = $(this).attr("href");
  //alert('실제 페이지로 이동하겠습니다.');
  if (confirm("지금 보실 페이지는 \n실제 페이지로 이동하겠습니다.")) {
    window.location.href = thisSrc;
  }
});

//주소로 탭  활성화하기
//header의 서브 메뉴 클릭
var subMenu = $(".sub-menu li");
var tabMenu = $(".tab-nav-t li");
var currentUrl = location.href;
var crumbleTxt;
var crumbleLink;
subMenu.each(function () {
  var targetStr = $(this).find("a").attr("href");
  if (currentUrl.indexOf(targetStr) > -1) {
    //-1보다 크다 = targetStr가 있다면
    var targetIdx = $(this).index();
    var thisName = $(this).text();
    activeTab(targetIdx);
  }
  if (
    (currentUrl.indexOf("#") == -1 && currentUrl.indexOf("news.html")) ||
    (currentUrl.indexOf("#") == -1 && currentUrl.indexOf("recruit.html")) ||
    (currentUrl.indexOf("#") == -1 && currentUrl.indexOf("audit.html"))
  ) {
    //-1과 같다 = #이없을 때 && news.html/recruit.html/audit.html있을때 (둘 다 참일때)
    activeTab(0);
  }
});
subMenu.click(function (e) {
  activeTab($(this).index());
});
tabMenu.click(function (e) {
  activeTab($(this).index());
  crumble();
});
tabMenu.each(function () {
  crumble();
});

function activeTab(idx) {
  {
    tabMenu.siblings().removeClass("on");
    tabMenu.eq(idx).addClass("on");
    tabMenu.parent().parent().parent().siblings(".tab-panel").removeClass("on");
    tabMenu
      .parent()
      .parent()
      .parent()
      .siblings(".tab-panel")
      .eq(idx)
      .addClass("on");
  }
}
function crumble() {
  crumbleTxt = $(".tab-nav-t li.on").find("a").text();
  crumbleLink = $(".tab-nav-t li.on").find("a").attr("href");
  $(".location-link li:last-child a").text(crumbleTxt);
  $(".location-link li:last-child a").attr("href", crumbleLink);
}
//문자열 오름차순 (가나다 순)
function sortName(list) {
  var sorted_list = list.sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    //return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  return sorted_list;
}
//내림차순
function sortDate(list) {
  var sorted_list = list
    .sort(function (a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .reverse();
  return sorted_list;
}

function PharmSetPar(btnName, event) {
  var selBrand = $("#pcSelectBrand").find("button").attr("current-value"); //
  var selPrd = $("#pcSelectItem").find("button").attr("current-value");
  var selDistrict = $("#pcSelectCityName").find("button").attr("current-value");
  var inputText = $("#search-pharm").val(); //검색한 내용가져오기
   
  if (!selBrand) {
    alert("검색할 브랜드를 선택하세요.");
    $("#pcSelectBrand").find("button").addClass("focus");
  } else if (!selPrd) {
    alert("검색할 제품을 선택하세요.");
    $("#pcSelectItem").find("button").addClass("focus");
  } else if (!selDistrict) {
    alert("검색할 시/도를 선택하세요.");
    $("#pcSelectCityName").find("button").addClass("focus");
  } else {
    //메인화면에서 검색하느냐 검색페이지에서 검색하느냐 확인하기
    if (btnName == "MainSearch" || btnName == "MainSearchText") {
     
      location.href = "brand-pharmacy.html#product-pharmacy?query=" + inputText + "&selBrand=" +selBrand + "&selPrd=" +selPrd + "&selDistrict=" +selDistrict + "";
     
    } else if (btnName == "pharmSearch" || btnName == "SubSearchText") {
      var changeURL = "brand-pharmacy.html";
      history.pushState(null, null, changeURL);
      var districtVal = $("#pcSelectCityName")
        .find("button")
        .attr("current-value");
      var inputVal = $("#search-pharm").val();
      var schKeword = [districtVal, inputVal];
      added = 10;
      show(schKeword);
      $("#search-prd").val("");
    }
  }
  $("#search-pharm").val("");
}

function getPageId() {
  var pageUrl = window.location.href;
  var CurrentPageId = pageUrl.substring(pageUrl.lastIndexOf("#") + 1);
  var lastCon = CurrentPageId.lastIndexOf("?");
  var fileName = CurrentPageId.substring(0, lastCon);
  return fileName;
}
function getPageId2() {
  var pageUrl = window.location.href;
  var CurrentPageId = pageUrl.substring(pageUrl.lastIndexOf("#") + 1);
  return CurrentPageId;
}

/* product-inquiry 제품문의&온라인 상담 */

$(".recruit-submit").click(function (event) {
  //form 하위 태그 체크
  chkFrom();
  //폼 데이터를 JSON 방식으로도 보기
  var data = "";
  $.each($("#recruitForm").serializeArray(), function (key, val) {
    data += "," + val["name"] + ":" + val["value"];

    // data += "," "+val['name']+"":""+ val['value']+""";
  });
  data = "{" + data.substr(1) + "}";

  console.log(data);
});

$(".product-submit").click(function (event) {
  //form 하위 태그 체크
  chkFrom();

  //폼 데이터를 JSON 방식으로도 보기
  var data = "";
  $.each($("#productForm").serializeArray(), function (key, val) {
    data += "," + val["name"] + ":" + val["value"];

    // data += "," "+val['name']+"":""+ val['value']+""";
  });
  data = "{" + data.substr(1) + "}";
  console.log(data);
});

$(".audit-submit").click(function (event) {
  //form 하위 태그 체크
  chkFrom2();

  //폼 데이터를 JSON 방식으로도 보기
  var data = "";
  $.each($("#auditForm").serializeArray(), function (key, val) {
    data += "," + val["name"] + ":" + val["value"];

    // data += "," "+val['name']+"":""+ val['value']+""";
  });
  data = "{" + data.substr(1) + "}";
  console.log(data);
});

function chkFrom() {
  //동의
  if ($("#agree").is(":checked") == false) {
    alert("개인정보 제공에 동의하셔야 문의를 진행 하실 수 있습니다.");
    $("#agree").focus();
    return false;
  }
  //이름 확인
  if (!$("#name").val()) {
    alert("이름을 입력하세요");
    $("#name").focus();
    return false;
  }
  //전화번호 확인
  var phone =
    $("#phone option:selected").val() +
    "-" +
    $("#phone2").val() +
    "-" +
    $("#phone3").val();
  var phoneRule = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g;

  if ($("#phone").val() == "1") {
    alert("전화번호를 선택해주세요.");
    $("#phone").focus();
    return false;
  }
  if (!$("#phone2").val()) {
    alert("전화번호 앞자리 입력해주세요.");
    $("#phone2").focus();
    return false;
  }
  if (!$("#phone3").val()) {
    alert("전화번호 뒷자리 입력해주세요.");
    $("#phone3").focus();
    return false;
  }
  if (!phoneRule.test(phone)) {
    alert("잘못된 휴대폰 번호입니다.");
    $("#mail2").focus();
    return;
  }
  //이메일 확인
  var emailRule =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  var mail = $("#mail").val() + "@" + $("#mail2").val();
  if (!$("#mail").val()) {
    alert("이메일 아이디 입력하세요");
    $("#mail").focus();
    return false;
  }
  if (!$("#mail2").val()) {
    alert("이메일 도메인 입력하세요");
    $("#mail2").focus();
    return false;
  }
  if (!emailRule.test(mail)) {
    alert("이메일을 형식에 맞게 입력해주세요.");
    $("#mail2").focus();
    return;
  }

  //문의유형
  if ($("#inquiry").val() == "1") {
    alert("문의유형 선택해주세요.");
    $("#inquiry").focus();
    return false;
  }
  //제목
  if (!$("#title").val()) {
    alert("제목을 입력해주세요.");
    $("#title").focus();
    return false;
  }
  //내용
  if (!$("#summernote").val()) {
    alert("내용을 입력해주세요.");
    $("#summernote").focus();
    return false;
  }

  alert("감사합니다.");
  location.reload();
}

function chkFrom2() {
  //제보대상회사
  if ($("#target-company").val() == "1") {
    alert("제보대상회사 선택해주세요.");
    $("#target-company").focus();
    return false;
  }
  //유형
  if ($("#target-type").val() == "1") {
    alert("유형 선택해주세요.");
    $("#target-type").focus();
    return false;
  }
  //이름 확인
  if (!$("#name").val()) {
    alert("이름을 입력하세요");
    $("#name").focus();
    return false;
  }
  //이메일 확인
  var emailRule =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  var mail = $("#mail").val() + "@" + $("#mail2").val();
  if (!$("#mail").val()) {
    alert("이메일 아이디 입력하세요");
    $("#mail").focus();
    return false;
  }
  if (!$("#mail2").val()) {
    alert("이메일 도메인 입력하세요");
    $("#mail2").focus();
    return false;
  }
  if (!emailRule.test(mail)) {
    alert("이메일을 형식에 맞게 입력해주세요.");
    $("#mail2").focus();
    return false;
  }
  //전화번호 확인
  var phone =
    $("#phone option:selected").val() +
    "-" +
    $("#phone2").val() +
    "-" +
    $("#phone3").val();
  var phoneRule = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g;

  if ($("#phone").val() == "1") {
    alert("전화번호를 선택해주세요.");
    $("#phone").focus();
    return false;
  }
  if (!$("#phone2").val()) {
    alert("전화번호 앞자리 입력해주세요.");
    $("#phone2").focus();
    return false;
  }
  if (!$("#phone3").val()) {
    alert("전화번호 뒷자리 입력해주세요.");
    $("#phone3").focus();
    return false;
  }
  if (!phoneRule.test(phone)) {
    alert("잘못된 휴대폰 번호입니다.");
    $("#phone").focus();
    return false;
  }
  //제목
  if (!$("#report-title").val()) {
    alert("제목을 입력해주세요.");
    $("#report-title").focus();
    return false;
  }
  //누가
  if (!$("#report-who").val()) {
    alert("누가를 입력해주세요.");
    $("#report-who").focus();
    return false;
  }
  //언제
  if (!$("#report-when").val()) {
    alert("언제를 입력해주세요.");
    $("#report-when").focus();
    return false;
  }
  //어디서
  if (!$("#report-where").val()) {
    alert("어디서를 입력해주세요.");
    $("#report-where").focus();
    return false;
  }
  //무엇을
  if (!$("#report-what").val()) {
    alert("무엇을 입력해주세요.");
    $("#report-what").focus();
    return false;
  }
  //어떻게
  if (!$("#report-how").val()) {
    alert("어떻게를 입력해주세요.");
    $("#report-how").focus();
    return false;
  }
  //왜
  if (!$("#report-why").val()) {
    alert("왜를 입력해주세요.");
    $("#report-why").focus();
    return false;
  }
  //기타 요청사항
  if (!$("#report-why").val()) {
    alert("기타 요청사항을 입력해주세요.");
    $("#report-why").focus();
    return false;
  }
  //파일
  if (!$("#fileFiled").val()) {
    alert("파일을 첨부해 주세요");
    $(".upload-name").focus();
    return false;
  }
  //비밀번호
  if (!$("#user-password").val()) {
    alert("비밀번호를 입력해주세요.");
    $("#user-password").focus();
    return false;
  }

  //개인정보 수집동의
  if ($("#agree-radio-first").is(":checked") == false) {
    alert("개인정보 제공에 동의하셔야 제보를 진행 하실 수 있습니다.");
    $("#agree-radio-first").focus();
    return false;
  }
  //개인정보 제3자 제공 수집동의
  if ($("#agree-radio-third").is(":checked") == false) {
    alert("개인정보 제3자 제공에 동의하셔야 제보를 진행 하실 수 있습니다.");
    $("#agree-radio-third").focus();
    return false;
  }
  var pw = $("#user-password").val();
  let number = pw.search(/[0-9]/g);
  let english = pw.search(/[a-z]/gi);
  let spece = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (pw.length < 8 || pw.length > 20) {
    alert("비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.");
    $("#user-password").focus();
    return false;
  } else if (pw.search(/\s/) != -1) {
    alert("비밀번호는 공백 없이 입력해주세요.");
    $("#user-password").focus();
    return false;
  } else if (number < 0 || english < 0 || spece < 0) {
    alert("비밀번호는 영문,숫자,특수문자를 혼합하여 입력해주세요.");
    $("#user-password").focus();
    return false;
  } else if (
    (number < 0 && english < 0) ||
    (english < 0 && spece < 0) ||
    (spece < 0 && number < 0)
  ) {
    alert(
      "비밀번호는 영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요."
    );
    $("#user-password").focus();
    return false;
  } else if (/(\w)\1\1\1/.test(pw)) {
    alert("비밀번호는 같은 문자를 4번 이상 사용하실 수 없습니다.");
    $("#user-password").focus();
    return false;
  } else if (/(\w)\1\1\1/.test(pw)) {
    alert("비밀번호는 같은 문자를 4번 이상 사용하실 수 없습니다.");
    $("#user-password").focus();
    return false;
  }

  if (false === reg.test(pw)) {
    alert(
      "비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다."
    );
    $("#user-password").focus();
    return false;
  }

  alert("감사합니다.");
  location.reload();
}
var fileTarget = $("#fileFiled");
$("#fileFiled").on("change", function () {
  if (window.FileReader) {
    var fileName = $(this)[0].files[0].name;
  } else {
    // old IE
    var fileName = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
  }
  $(this).siblings(".upload-name").val(fileName);
});
//이메일 입력방식 선택
$("#email").on("change", function () {
  $("#email option:selected").each(function () {
    if ($(this).val() == "1") {
      //직접입력일 경우
      $("#mail2").val(""); //값 초기화
      $("#mail2").attr("disabled", false); //활성화
    } else {
      //직접입력이 아닐경우
      $("#mail2").val($(this).text()); //선택값 입력
      $("#mail2").attr("disabled", true); //비활성화
    }
  });
});
//전화번호 숫자만 입력
$(".phone-num").on("keyup", function () {
  $(this).val(
    $(this)
      .val()
      .replace(/[^0-9]/g, "")
  );
});
//내용 바이트 체크
$("#summernote").on("keyup", function () {
  var str = $(this).val();
  var str_len = str.length;
  var size = 1300;
  var rbyte = 0;
  var rlen = 0;
  var one_char = "";

  for (var i = 0; i < str_len; i++) {
    one_char = str.charAt(i);
    if (escape(one_char).length > 4) {
      rbyte += 2; //한글3Byte
    } else {
      rbyte++; //영문 등 나머지 1Byte
    }

    if (rbyte <= size) {
      rlen = i + 1; //return할 문자열 갯수
    }
  }
  if (rbyte > size) {
    alert("최대 " + size + "byte까지 입력 가능합니다.");
    $(this).val(str.substr(0, rlen));
  }
  $(".conts-count").text(rbyte);
});
//첨부파일
function checkFile() {
  if ($("#fileFiled").val() != "") {
    var ext = $("#fileFiled").val().split(".").pop().toLowerCase();
    if ($.inArray(ext, ["jpg", "jpeg", "png", "gif", "bmp", "pdf"]) == -1) {
      alert("첨부파일은 이미지 파일만 등록 가능합니다.");
      $("#fileFiled").val("");
      $(".upload-name").val("파일선택");
      return false;
    }
  }
}
function fileSize() {
  // 용량 체크
  var maxSize = 10 * 1024 * 1024; // 10MB
  var fileSize = $("#fileFiled")[0].files[0].size;
  if (fileSize > maxSize) {
    alert("첨부파일 사이즈는 10MB 이내로 등록 가능합니다.");
    $("#fileFiled").val("");
    $(".upload-name").val("파일선택");
    return;
  }
}
$("#fileFiled").on("change", function () {
  checkFile();
  fileSize();
});

function regPassword() {}


//이동 
function move(itemInfo,itemType){
  if(pageFileName == "brand" || pageFileName == "brand-category" || pageFileName == "index"){
      location.href = "brand-info.html?itemID="+itemInfo+"&itemType="+itemType+"";
  }else if(pageFileName == "news"|| pageFileName == "promotion-view"|| pageFileName == "management" ){
      location.href = "promotion-view.html?itemID="+itemInfo+"&itemType="+itemType+"";
  }else {
      
  }
}


// navigation
$(".navigation li").click(function () {
  $(this).each(function () {
      var thisIndex = $(this).index();
      $(this).siblings().removeClass("on")
      $(this).addClass("on")
      $(this).parent().parent().siblings(".cont-tab").removeClass("on")
      $(this).parent().parent().siblings(".cont-tab").eq(thisIndex).addClass("on")
      //bar animation
  });
  
});

// s-nav  (vod-brand)
$(".s-nav li").click(function () {
  $(this).each(function () {
      var thisIndex = $(this).index();
      $(this).siblings().removeClass("on")
      $(this).addClass("on")
      $(this).parent().siblings(".sec-tab").removeClass("on")
      $(this).parent().siblings(".sec-tab").eq(thisIndex).addClass("on")
      //bar animation
  });
  
});

// modal
$(".modal").click(function () {
  var thisSrc = $(this).attr("src");
  var thisAlt = $(this).attr("alt");
  var opt =	"<div class='modal-wrap'>"+
          
          "<div class='modal-img'>"+
                              "<a href='#' class='modal_close'>X</a>"+
              "<img src='" + thisSrc +"' alt='"+ thisAlt +"'>" +
          "</div>"+
              "</div"	;

  $("#wrap").append(opt);
});

$(document).on("click", ".modal_close", function(e){
  e.preventDefault();
  $("#wrap").find(".modal-wrap").remove();
  
})

// tab-nav
$(".tab-nav li").click(function () {
  $(this).each(function () {
      var thisIndex = $(this).index();
      $(this).siblings().removeClass("on")
      $(this).addClass("on")
      $(this).parent().parent().siblings(".tab-panel").removeClass("on")
      $(this).parent().parent().siblings(".tab-panel").eq(thisIndex).addClass("on")
     
  });
  
});

$(".faq-accodian li").click(function(){
  $(this).siblings().removeClass("on")
  $(this).addClass("on");
})


