(function(){
   if(window.devicePixelRatio == 1.25){
  document.documentElement.style.setProperty(`font-size`, '.8rem');
}
})(window)
var util = {};
// 计算当前字符长度
util.GetLength = function (str) {
  ///<summary>获得字符串实际长度，中文2，英文1</summary>
  ///<param name="str">要获得长度的字符串</param>
  var realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128)
      realLength += 1;
    else
      realLength += 2;
  }
  return realLength;
};


// 获取当前的路径并进行跳转
util.PageJump = function (url) {
  location.href = document.location.origin + url
}

// 点击跳回首页
$('.go_home').eq(0).off('click').on('click', function () {
  util.PageJump("/index")
})

// 项目管理页面的跳转
$('.menu-title').eq(0).off('click').on('click', function () {
  if(window.sessionStorage.getItem('roleName')=="超级用户"){
     util.PageJump("/proManage")
  }else{
    util.PageJump("/commonManage")
  }
 
})

// -----------------封装的ajax---------------------
util.PackMyAjax = function(param){
    return new Promise(function(resolve, reject){
        if(param.type == "1"){
            $.ajax({
              url: param.url,
              type: 'post',
              contentType: false,
              processData: false,
              data: param.data || '',
              dataType: "json",
              success: function(data){
                  resolve(data);
              },
              error: function(error){
                  reject(error)
              }
          });
        } else{
          $.ajax({
            url: param.url,
            type: 'post',
            data: param.data || '',
            dataType: "json",
            success: function (data) {
              resolve(data);
            },
            error: function (error) {
              reject(error)
            }
          });
        }
    });
};


// 查询
util.DomInquiry = function(InquiryTerm){
  util.PackMyAjax({
    url: InquiryTerm.url,
    data: InquiryTerm.data,
  }).then(
    // 执行成功
    (response) => {
      // type = 1 表示自己处理返回值
      if(InquiryTerm.type === 1){
        InquiryTerm.func(response)
      } else{

      }
    },
    // 执行失败
    (request) => {
      console.log(request);
    }
  )
}


// 删除
util.DomDeklete = function (dom,func,path) {
  dom.off('click').on('click', function () {
    var trList = $(this).parent().parent()
    util.DomInquiry({
      url: path,
      data: {
        id: trList.attr('key-id')
      },
      type: 1,
      func: function (response) {
        if (response.code == 1) {
          spop({
                template: '删除成功',
                position  : 'top-center',
                style: 'success',
                autoclose: 3000
              });
          func("1")
        }
      }
    });
  })
}

// url,Filindex, field
util.ddl  = function(ddlList){
  util.PackMyAjax({
    url: ddlList.url,
    data: ddlList.data
  }).then(
    // 执行成功
    (response) => {
      if (response.code == 1) {
        var field = ddlList.field;
        $('.select-menu-ul').eq(ddlList.Filindex).empty();
        $('.select-menu-ul').eq(ddlList.Filindex).append(response.data.map((ele, index) => {
          return `<li data-key=${ele.projectName}  key-id = ${ele.id}>${ele[field]}</li>`
        }))
        $('.select-menu-ul').eq(ddlList.Filindex).prepend(`<li class='select-this' data-key="请选择">请选择</li>`)
        selectMenu(ddlList.Filindex,ddlList.func)
      }
    },
    // 执行失败
    (request) => {
      console.log(request);
    }
  )
}

// 清除弹框
util.clearSS = function () {
  $('.box').remove()
  $('body').children('div').each(function () {
    if ($(this).attr('id')) {
      $(this).remove()
    }
  })
}


// 获取日期
util.getNowFormatDate = function () {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

/*'yyyy-MM-dd HH:mm:ss'格式的字符串转日期*/
util.stringToDate = function (str) {
  var tempStrs = str.split(" ");
  var dateStrs = tempStrs[0].split("-");
  var year = parseInt(dateStrs[0], 10);
  var month = parseInt(dateStrs[1], 10) - 1;
  var day = parseInt(dateStrs[2], 10);
  var timeStrs = tempStrs[1].split(":");
  var hour = parseInt(timeStrs[0], 10);
  var minute = parseInt(timeStrs[1], 10);
  var second = parseInt(timeStrs[2], 10);
  var date = new Date(year, month, day, hour, minute, second);
  return date;
}

// 获取月份
util.getMonthsAdd = function(Y,M) {
  var dataArr = [];
  var data = new Date(Y,M);
  var year = data.getFullYear();
  data.setMonth(data.getMonth() + 1, 1); //获取到当前月份,设置月份
  for (var i = 0; i < 12; i++) {
    data.setMonth(data.getMonth() - 1); //每次循环一次 月份值减1
    var m = data.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    dataArr.push(m);
  }
  return dataArr;
}

// 获取月份
util.getMonthsDe = function(Y,M,le) {
  var Year = Y;
  var dataArr = [];
  var data = new Date(Y,M);
  var year = data.getFullYear();
  data.setMonth(data.getMonth() - 1, 1); //获取到当前月份,设置月份
  for (var i = 0; i < le; i++) {
    data.setMonth(data.getMonth() + 1); //每次循环一次 月份值减1
    var m = data.getMonth() + 1;
    m = m < 10 ? m : m;
    if(m == 1){
      m = (Year + 1)  + "年" + m;
      Year += 1;
    }
    dataArr.push(m);
  }
  return dataArr;
}

// console.log(getMonthsAdd());
// console.log(getMonthsDe());

/*
 * 根据Value格式化为带有换行、空格格式的HTML代码
 * @param strValue {String} 需要转换的值
 * @return  {String}转换后的HTML代码
 * @example  
 * getFormatCode("测\r\n\s试")  =>  “测<br/> 试”
 */
util.getFormatCode = function(strValue){
	return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, ' ');
}


// 颜色随机生成
util.randomColor = function (index) {
  var arrColor = ["#95a5ea", "#eca1fc", "#e3a880", "#71cd9f", "#94a0e4", "#c9e494", "#7FEC46"]
  return arrColor[index]//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
}

// 获取天数
util.DateMinus = function (sDate,sJs){ 
　　var sdate = new Date(sDate.replace(/-/g, "/")); 
　　var now = new Date(sJs.replace(/-/g, "/")); 
　　var days = now.getTime() - sdate.getTime(); 
　　var day = parseInt(days / (1000 * 60 * 60 * 24)); 
　　return day; 
}

// 页面自动刷新
util.reurl = function () {
 location.reload();
}

// 随机生成数
util.randomNum = function (minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
} 

// 获取当前日期后一天
util.getNextDate = function(date,day) {  
  var dd = new Date(date);
  dd.setDate(dd.getDate() + day);
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return y + "-" + m + "-" + d;
};



util.setDate = function (startId,endId) {
  var start = {}, end = {};
  jeDate(startId, {
    format: 'YYYY/MM/DD',
    zIndex: 999999,
    donefun: function (obj) {
      end.minDate = util.getNextDate(obj.val, 1); //开始日选好后，重置结束日的最小日期
      jeDate(endId, LinkageEndDate(false));
      $(endId).val('')
    }
  });
  jeDate(endId, LinkageEndDate);

  function LinkageEndDate(istg) {
    return {
      trigger: istg || "click",
      format: 'YYYY/MM/DD',
      zIndex: 999999,
      minDate: function (that) {
        //that 指向实例对象
        var nowMinDate = jeDate.valText(startId) == "" && jeDate.valText(that.valCell) == "";
        return nowMinDate ? jeDate.nowDate({ DD: 0 }) : end.minDate;
        $(startId).val('')
      }, //设定最小日期为当前日期
      donefun: function (obj) {
        start.maxDate = obj.val; //将结束日的初始值设定为开始日的最大日期
      }
    };
  }
}
// 去重
util.unique = function (arr){
  arr = arr || [];
        var obj = {},
            ret = [];
        for(var i = 0, ilen = arr.length; i < ilen; i+=1) {
            var curItem = arr[i],
                curItemType = typeof(curItem) + curItem;
            if(obj[curItemType] !== 1) {
                ret.push(curItem);
                obj[curItemType] = 1;
            }
        }
        return ret;
}





