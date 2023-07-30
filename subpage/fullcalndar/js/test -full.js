function numberPad(n, width) {
  //0 채우기
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    height: 380,
    weekends: true,
    editable: false,
    droppable: false,
    displayEventTime: false,
    selectable: false,
    selectMirror: true,
    //locale:"ko",
    headerToolbar: {
      left: "prev",
      center: "title",
      right: "next",
    },
    titleFormat: function (date) {
      return date.date.year + "." + numberPad(date.date.month + 1, 2) + "";
    },
    dayHeaderContent: function (date) {
      if (date.text == "Sun") {
        date.text = "일";
      } else if (date.text == "Mon") {
        date.text = "월";
      } else if (date.text == "Tue") {
        date.text = "화";
      } else if (date.text == "Wed") {
        date.text = "수";
      } else if (date.text == "Thu") {
        date.text = "목";
      } else if (date.text == "Fri") {
        date.text = "금";
      } else if (date.text == "Sat") {
        date.text = "토";
      }
    },
    eventDidMount: function (info) {
      //console.log(info.event.title)
      if (info.event.title == "avail") {
        info.el.parentNode.parentNode.parentNode.parentNode.classList.add("ok");
      }
      if (info.event.title == "unavail") {
       info.el.parentNode.parentNode.parentNode.parentNode.classList.add("no");
        // var weekendHasClass =
        //   info.el.parentNode.parentNode.parentNode.parentNode.className;
        // if (
        //   weekendHasClass.indexOf("fc-day-sat") == -1 &&
        //   weekendHasClass.indexOf("fc-day-sun") == -1
        // ) {
          
        // }
        //console.log(weekendHasClass);
      }
    },
    select: function (data) {
      //console.log(data.jsEvent.target);
      //console.log("sdfsdddddd, selectselectselect")
      // if (data.jsEvent.target.parentNode.parentNode.parentNode.classList.contains("no")) {
      //   console.log("Sdfsdfsdfsdfsdf");
      // }
      //console.log(data.jsEvent.target.parentNode.parentNode.parentNode);
      // if(title){
      //   console.log("sdf")
      // }
      //console.log(da.jsEvent.target);
      // var this1 = da.jsEvent.target;
      //this1.css("border", "3px solid red");
      //})
      // da.target.css("border", "3px solid red");
      // $('#calendar').on("click",".fc-bgevent",function(event){
      //   console.log($(this).data);
      // })
      // console.log($(this));
      // //$(this).addClass("uuuuuuuu");
      // $(this).css("border", "3px solid red");
      // calendar.unselect()
    },
    eventClick: function (data) {
      //console.log("qwe")
      var aaaaaa = data.el.parentNode.parentNode.parentNode.parentNode.parentNode;
      const active = aaaaaa.querySelector(".selectDay");
      //var ttt = aaaaaa.querySelector(".selectDay");
      console.log(aaaaaa);
      if(active) {
        active.classList.remove("selectDay");
        
      }
      //data.el.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes.classList.remove("selectDay")
      data.el.parentNode.parentNode.parentNode.parentNode.classList.add("selectDay")
      //var wer = this.el;
      //console.log(this);
    },
    events: [
      $.ajax({
        url: "./data/test.json",
        dataType: "json",
        success: function (data) {
          //console.log(weekList)
          for (i = 0; i < data.length; i++) {
            //console.log()
            calendar.addEvent({
              title: data[i]["dayAvail"],
              start: data[i]["start"],
            });
          }
        },
      }),
    ],
  });
  calendar.render();
});
