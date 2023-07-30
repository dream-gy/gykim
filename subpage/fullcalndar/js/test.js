var calendar = $("#calendar").fullCalendar({
  /** ******************
   *  OPTIONS
   * *******************/
  height: 358,
  defaultView: "month",
  weekends: true,
  editable: false,
  droppable: false,
  displayEventTime: false,
  selectable: true,
  selectMirror: true,
  //locale:"ko",
  header: {
    left: "prev",
    center: "next",
    right: "title",
  },
});
