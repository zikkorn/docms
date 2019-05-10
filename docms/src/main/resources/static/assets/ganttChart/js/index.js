$(function () {
  "use strict";
  $(".gantt").gantt({
    source: [{
      name: "预研项目",
      desc: "A项目",
      values: [{
        from: "/Date(1328832000000)/",
        to: "/Date(1338832000000)/",
        label: "2",
        customClass: "ganttRed",
        dataObj: 1
      }]
    }, 
    {
      name: " ",
      desc: "B项目",
      values: [{
        from: "/Date(1322611200000)/",
        to: "/Date(1323302400000)/",
        label: "3",
        customClass: "ganttRed"
      }]
    }, {
      name: "订购项目",
      desc: "A项目",
      values: [{
        from: "/Date(1323802400000)/",
        to: "/Date(1325685200000)/",
        label: "4",
        customClass: "ganttGreen"
      }]
    },{
      name: " ",
      desc: "A项目",
      values: [{
        from: "/Date(1325685200000)/",
        to: "/Date(1325695200000)/",
        label: "6",
        customClass: "ganttBlue"
      }]
    }, {
      name: "型号项目",
      desc: "A项目",
      values: [{
        from: "/Date(1326785200000)/",
        to: "/Date(1325785200000)/",
        label: "7",
        customClass: "ganttGreen"
      }]
    }, {
      name: "军内项目",
      desc: "A项目",
      values: [{
        from: "/Date(1331811200000)/",
        to: "/Date(1332611200000)/",
        label: "测试",
        customClass: "ganttOrange"
      }]
    }, {
      name: " ",
      desc: "A项目",
      values: [{
        from: "/Date(1336611200000)/",
        to: "/Date(1338711200000)/",
        label: "11",
        customClass: "ganttOrange"
      }]
    }, {
      name: "部队建设",
      desc: "A项目",
      values: [{
        from: "/Date(1330011200000)/",
        to: "/Date(1336611200000)/",
        label: "12",
        customClass: "ganttOrange"
      }]
    }, {
      name: "专项建设",
      desc: "A项目",
      values: [{
        from: "/Date(1330011200000)/",
        to: "/Date(1336611200000)/",
        label: "12",
        customClass: "ganttOrange"
      }]
    }],
    navigate: "scroll",
     scale:"weeks",
        minScale:"weeks",
        maxScale:"months",
    itemsPerPage: 20,
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    onItemClick: function (data) {
      console.log(data);
    },
    onAddClick: function (dt, rowId) {
      alert("Empty space clicked - add an item!");
    },
    onRender: function () {
      if (window.console && typeof console.log === "function") {
        $('.day').hide()
      }
    }
  });
  $(".gantt").popover({
    selector: ".bar",
    title: "I'm a popover",
    content: "And I'm the content of said popover.",
    trigger: "hover"
  });
  prettyPrint(); 
  
});