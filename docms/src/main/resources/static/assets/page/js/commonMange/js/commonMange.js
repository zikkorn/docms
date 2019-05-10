(function () {
  var pageNo = 1;
  // 录入事件点击的锁
  var lr_flag = true;
  function proIn() {
    // 当点击删除时 当前页数变成1
    if (arguments[0] == "1") {
      pageNo = 1
    }
    util.DomInquiry({
      url: '/doc/getProjectZxqk',
      data: {
        page: pageNo,
        limit: "10",
        userId: window.sessionStorage.getItem('userId')
      },
      type: 1,
      func: function (response) {
        //分页
        $("#page").paging({
          pageNo: pageNo,//当前页数
          totalPage: Math.ceil(response.count / 10),//总共页数
          totalSize: 300,
          callback: function (num) {
            pageNo = num;
            proIn()
          }
        })
        $('table').children().not('tbody').remove();
        response.data.map((ele, index) => {
          $('.table').eq(0).append(`
               <tr key-id = ${ele.cId == "" ? ele.pId : ele.cId}>
                  <td>${(pageNo - 1) * 10 + index + 1}</td>
                  <td class='prTh'>${ele.pName}</td>
                  <td >${ele.cName}</td>
                  <td style='white-space: nowrap;'>${ele.cSsjd == '' ? ele.pSsjd : ele.cSsjd}</td>
                  <td>${ele.znd == undefined ? '' : ele.znd}</td>
                  <td>${ele.jbsx == undefined ? '' : ele.jbsx}</td>
                  <td>${ele.cYzdw == '' ? ele.pYzdw : ele.cYzdw}  ${ele.cFzr == '' ? ele.pFzr : ele.cFzr}</td>
                  <td>${ele.cZjtd == '' ? ele.pZjtd : ele.cZjtd}</td>
              </tr>
          `)
        })
        var tdList = [];
        for (let index = 1; index < $('tr').length; index++) {
          tdList.push($('tr').eq(index).children('td').eq(1));
        }
        tdList.forEach(function (ele, index) {
          if ($(ele).siblings().eq(1).text() == "" || $(ele).text() == "") {
            $(ele).attr('colspan', 2);
            $(ele).siblings().eq(1).remove();
          }
        })
        var rowtdList = [];
        $('tr').each(function(index, ele){
          if($(this).children().length == 8){
            rowtdList.push($('tr').eq(index).children('td').eq(1))
          }
        })

        var sl = 1;
        var dqdom = '';
        for (let index = 0; index < rowtdList.length; index++) {
          if($(rowtdList[index]).text() == $(rowtdList[index+1]).text()){
            if(sl == 1){
              dqdom = $(rowtdList[index])
            }
            sl++
          }else{
            if(dqdom){
              $(dqdom.removeClass('prTh').siblings().eq(1).addClass('prTh'))
              dqdom.attr('rowspan',sl);
            }
            rowtdList.forEach(function(ele, index){
              if(index < sl && index != 0){
                // console.log($(ele));
                $(ele).siblings().eq(1).addClass('prTh')
                $(ele).remove();
              }
            })
            dqdom = ''
            sl = 1;

          }
        }

        bindPrTd();
      }
    });
  }
  proIn();

  function bindPrTd() {
    $('.prTh').on('click', function (e) {
      var coMangeTitle;
      if ($(e.target).text() == "") {
        coMangeTitle = $(e.target).siblings('.tdPro').text()
      } else {
        coMangeTitle = $(e.target).text();
      }
      util.PackMyAjax({
        url: '/doc/getProjectZxqkById',
        data: {
          id: $(e.target).parent().attr('key-id')
        }
      }).then(
        // 执行成功
        (response) => {
          // 计划线的宽 
          var jhwidth = 0;
          // 执行线的宽
          var zxwidth = 0;
          // 计算计划线margin的值
          var marList = [];
          // 计算执行线的margin的值
          var Zmargin = [];
          // 计划时间
          var jhStatusList = response.data.计划开始时间.split('/');
          var jsfinishList = response.data.计划结束时间.split('/');
          var jhmonth = (parseInt(jsfinishList[0]) - parseInt(jhStatusList[0])) * 12 + parseInt(jsfinishList[1]) - parseInt(jhStatusList[1]);
          var jhmonthList = util.getMonthsDe(parseInt(jhStatusList[0]), parseInt(jhStatusList[1]), jhmonth);
          var syjd = ['立项阶段', '研制总要求阶段', '方案阶段', '正样阶段', '性能鉴定阶段', '作战试验阶段', '列装阶段'];
          var jht = [];
          if (jhmonthList.length <= 0) {
            jhmonthList.push(parseInt(jhStatusList[1]) + 1);
          }
          syjd.forEach(function (ele, index) {
            if (response.data[ele]) {
              var tyb = (response.data[ele]).split('-');
              jht.push(parseFloat(util.DateMinus(tyb[0], tyb[1]) / 30).toFixed(2) + "-" + ele)
            }
          })
          // 执行线
          if (response.data.执行开始时间) {
            var zxStatusList = response.data.执行开始时间.split('/');
            var zxfinishList = response.data.执行结束时间.split('/');
            var zxmonth = (parseInt(zxfinishList[0]) - parseInt(zxStatusList[0])) * 12 + parseInt(zxfinishList[1]) - parseInt(zxStatusList[1]);
            var zxmonthList = util.getMonthsDe(parseInt(zxStatusList[0]), parseInt(zxStatusList[1]), zxmonth);
            var zxx = [];
            if (zxmonthList.length <= 0) {
              zxmonthList.push(parseInt(zxStatusList[1]) + 1);
            }
            syjd.forEach(function (ele, index) {
              if (response.data.zxsjkd[ele]) {
                var tyb = (response.data.zxsjkd[ele]).split('-');
                if(tyb.length < 2){
                  return false;
                }
                zxx.push(parseFloat(util.DateMinus(tyb[0], tyb[1]) / 30).toFixed(2) + "-" + ele);
              }
            });
          } else{
            zxStatusList = ["","",""];
          }

          for (let index = 0; index < syjd.length; index++) {
              if (syjd.length - index <= 1) {
                break;
              }
              if (response.data[syjd[index]] && response.data[syjd[index + 1]] != undefined) {
                var lis = response.data[syjd[index]].split('-');
                marList.push(((util.DateMinus(lis[1], response.data[syjd[index + 1]].split('-')[0]) / 30) * 50).toFixed(2))
              }
            }

          for (let index = 0; index < syjd.length; index++) {
            if (syjd.length - index <= 1) {
              break;
            }
            if (response.data.zxsjkd[syjd[index]] && response.data.zxsjkd[syjd[index + 1]] != undefined) {
              var zxlis = response.data.zxsjkd[syjd[index]].split('-');
              if(zxlis.length < 2){
                break;
              }
              Zmargin.push(((util.DateMinus(zxlis[1], response.data.zxsjkd[syjd[index + 1]].split('-')[0]) / 30) * 50).toFixed(2))
            }
          }
          var dz;
          dz = 50 / 30 * parseFloat(response.data.立项阶段.split('-')[0].split('/')[2]);
          
          if(parseFloat(response.data.立项阶段.split('-')[0].split('/')[2]) == 1){
            dz = 0
          } else if(parseFloat(response.data.立项阶段.split('-')[0].split('/')[2]) == 30){
            dz = 50
          }

          var zx_left;
          zx_left = 50 / 30 * parseFloat(response.data.zxsjkd['立项阶段'].split('-')[0].split('/')[2]);

          if(parseFloat(response.data.zxsjkd['立项阶段'].split('-')[0].split('/')[2]) == 1){
            zx_left = 0
          } else if(parseFloat(response.data.zxsjkd['立项阶段'].split('-')[0].split('/')[2]) == 30){
            zx_left = 50
          }


          $.Pop(`<div class='box_main_div' style='overflow-x: scroll;margin-bottom:20px;width: 1435px;'>
                    <div style='display:inline-block;margin-left: 50px;'>
                      <ul class='co_ul jh'>
                        <li class='jhx_s_first' >${jhStatusList[0] + "年" + jhStatusList[1] + "月"}</li>
                      </ul>
                    </div>
                  <div class='jh_main_div'>
                    <span style='position: absolute;font-size: 16px;left: -60px;top: 7px;'>计划线</span>
                    <div class='bq' >
                      <span class='jh_bk' style='margin-left:0;!important;;border-left:1px solid'></span>
                  
                  </div>
                  <div class='jhx' >
                     
                  </div>
                </div>
              </div>
        

              <div class='box_main_div zx_div' style='margin:0;width: 1435px;height:150px'>
                    <div style='display:inline-block;margin-left: 50px;'>
                      <ul class='co_ul zx'>
                        <li class='jhx_s_first' style='display:${zxStatusList[0] == undefined ? "none" : 'block'}'>${zxStatusList[0] + "年" + zxStatusList[1] + "月"}</li>
                      </ul>
                    </div>
                  <div class='jh_main_div'>
                    <span style='position: absolute;font-size: 16px;left: -60px;top: 7px;'>执行线</span>
                    <div class='zx_bq'>
                      <span class='jh_bk' style='margin-left: 40px;border-left:1px solid'></span>
                  
                  </div>
                  <div class='zxx'>
                     
                  </div>
                </div>
              </div>

              <div class='zh_main_div' >
                <span  class='prev' style="display:${response.data.tssx.length >= 4 ? "inline-block" : "none"}; cursor: pointer;width: 0;height: 0;border-top: 30px solid transparent!important;border-right: 30px solid #404972!important;border-bottom: 30px solid transparent!important;"></span>
                <div style='width:1320px;overflow:hidden'>
                  <ul class='co_ul zbnd' style='left:0'>
                  </ul>
                </div>
                <span class='next' style="display:${response.data.tssx.length >= 4 ? "inline-block" : "none"};cursor: pointer;width: 0;height: 0;border-top: 30px solid transparent!important;border-left: 30px solid #404972!important;border-bottom: 30px solid transparent!important;"></span>
              </div>
              
              <div style='text-align:right'><button class='btn-primary btn sj_btn' style='margin-right: 105px; margin-bottom: 10px;'>事件录入新事项</button></div>

              <div class='box_main_div sj_main_div' style='margin-bottom:0;display:none;'>
                <span style="font-size: 16px;position: relative;top: -160px;">特殊事项录入</span>
                <div style="display: inline-block;">
                  <div style='display: inline-block;'>
                      <input type="text" class='calendar_input jeinput' id='ranges01'/>
                      <span style="color: #bababa;font-size: 16px;position: relative;top: -135px;margin-right: 10px;">重难点</span>
                      <textarea value="" type="text" class='ts_zn_input' style='height: 150px;width: 450px;text-align: left;'></textarea>
                  </div>
                  <div style='display: inline-block;'>
                      <span style="color: #bababa;font-size: 16px;position: relative;top: -135px;margin-left: 30px;">急办事项</span>
                      <textarea value="" type="text" class='ts_jb_input' style='height: 150px;width: 450px;text-align: left;'></textarea>
                  </div>
                  <div style='position: relative;text-align: right;'>
                    <button type="button" class='ts_bt_left' style='padding: 3px 33px;'>录入至本阶段</button>
                    <button type="button" class='ts_bt_right'>转阶段录入</button>
                  </div>
                </div>
              </div>
              `, {
              Title: coMangeTitle + "项目执行情况对照",
              Class: true,
              Animation: "showSweetAlert",
              BoxDrag: false,
              Btn: {
                yes: {
                  vla: "关闭", class: "btn-primary btn", ope: function () {
                    util.clearSS()
                  },
                }
              }
            })
          jhmonthList.forEach(function (ele, index) {
            $('.jh').append(`<li class='${ele.toString().indexOf('年') > 0 ? 'jhx_y_last' : 'jhx_y'}' style='float:left'>${ele}月</li>`)
          })
          jht.forEach(function (ele, index) {
            jhwidth += parseFloat(ele.split('-')[0]) * 50;
          })
          marList.forEach(function (ele) {
            jhwidth += parseFloat(ele)
          })
          $('.jhx').css('width', jhwidth + 100);
          $('.bq').css('width', jhwidth + 100);
          $('.jh').css('width', jhwidth + 200);
          for (let index = 0; index < (Math.floor((jhwidth + 100) / 50)) - 2; index++) {
            $('.bq').append(`<span class='jh_bk'></span>`)
          }
          jht.forEach(function (ele, index) {
            $('.jhx').append(`<span class='jh_gt' style='margin-left:${index == 0 ? dz+50 : ''}px;background:${util.randomColor(index)};width:${parseFloat(ele.split('-')[0]) * 50}px!important'><strong>${ele.split('-')[1]}</strong></span>`)
          })
          $('.jhx>span').each(function (index, ele) {
            if (index != 0) {
              $(ele).css('margin-left', parseFloat(marList[index - 1]))
            }
          })
          // 
          // 执行线
          
          if(response.data.执行开始时间 && response.data.执行结束时间 != response.data.执行开始时间 && response.data.执行结束时间){
          zxmonthList.forEach(function (ele, index) {
            $('.zx').append(`<li class='${ele.toString().indexOf('年') > 0 ? 'jhx_y_last' : 'jhx_y'}' style='float:left'>${ele}月</li>`)
          })
          zxx.forEach(function (ele, index) {
            zxwidth += parseFloat(ele.split('-')[0]) * 50
          })
          Zmargin.forEach(function (ele) {
            zxwidth += parseFloat(ele)
          })
          $('.zxx').css('width', zxwidth + 100);
          $('.zx_bq').css('width', zxwidth + 100);
          $('.zx').css('width', zxwidth + 200);
          for (let index = 0; index < (Math.floor((zxwidth + 100) / 50)) - 2; index++) {
            $('.zx_bq').append(`<span class='jh_bk'></span>`)
          }
          if(zxx.length > 0){
            var zf = util.DateMinus(response.data[zxx[zxx.length - 1].split('-')[1]].split('-')[1], response.data.zxsjkd[zxx[zxx.length - 1].split('-')[1]].split('-')[1]);
            if (zf > 0) {
              zf = 'rqgq'
            } 
          }
          zxx.forEach(function (ele, index) {
            $('.zxx').append(`<span class='jh_gt ' style='background:${util.randomColor(index)};margin-left:${index == 0 ? zx_left+41 : ''}px;width:${parseFloat(ele.split('-')[0]) * 50}px'><strong class='${zxx.length - index == 1 ? zf : ''}'>${ele.split('-')[1]}</strong></span>`)
          })
          $('.zxx>span').each(function (index, ele) {
            if (index != 0) {
              $(ele).css('margin-left', parseFloat(Zmargin[index - 1]))
            }
          })
          }

          // 列表展示
          addList(response.data.tssx);
          // 小红点
          var tssxList = response.data.tssx;
          for (let index = 0; index < tssxList.length; index++) {
            $('.zxx .jh_gt').each(function (i, ele) {
              if($(ele).children('strong').eq(0).text() == tssxList[index].ssjd){
                var left_span ;
                if(response.data.zxsjkd[tssxList[index].ssjd].split('-')[0] == tssxList[index].zxsj){
                  left_span = 0;
                } else if(response.data.zxsjkd[tssxList[index].ssjd].split('-')[1] == tssxList[index].zxsj) {
                  left_span = parseInt($(ele).css('width').replace(/px/g,''));
                  left_span -= 11;
                } else{
                  left_span = parseInt($(ele).css('width').replace(/px/g,''));
                  left_span -= util.DateMinus(tssxList[index].zxsj,response.data.zxsjkd[tssxList[index].ssjd].split('-')[1])
                }
                $(ele).prepend(`
                  <span class="zx_nr_pa" style='left:${left_span}px;background:${util.randomColor()}'> 
                    <span class="triangle_before" style='display:none'>
                        <span class='zx_nr' style='overflow:auto'>
                          <h6>重难点：${tssxList[index].znd}</h6>
                          <h6>急办事项：${tssxList[index].jbsx}</h6>   
                          <img style='cursor: pointer;' src="../assets/page/images/commonMange/commonManage_revise.png" alt="" class='hd_revise' key-projectId=${response.data.id} key_dqid = ${tssxList[index].id} key_ssjd = ${tssxList[index].ssjd} />                   
                          <span style='margin:0 20px'></span>
                          <img style='cursor: pointer;' src="../assets/page/images/commonMange/commonManage_delete.png" alt="" class='hd_delete' key-projectId=${response.data.id} key_dqid = ${tssxList[index].id} key_ssjd = ${tssxList[index].ssjd} />                   
                        </span>
                    </span>
                  </span>
                `)
              }
            })
          }
          $('.zx_nr_pa').hover(function(){
            $(this).css('z-index','999999999');
            $(this).find('.triangle_before').show();
            $('.box_main_div').eq(1).removeClass('zx_div');
          },function(){
            $(this).css('z-index','1');
            $(this).children('.triangle_before').hide();
            $('.box_main_div').eq(1).addClass('zx_div')
          })
          jeDate("#ranges01", {
            zIndex: 99999999,
            format: 'YYYY/MM/DD'
          });
          // 按钮录入至本阶段
          $('.ts_bt_left,.ts_bt_right').off('click').on('click',function(){
            if($('.calendar_input').val() == ""){
              spop({ template: "请输入日期", position: 'top-center', style: 'error', autoclose: 3000 });
              return false;
            }
            var zxjdh ;
            if($(this).text() == '转阶段录入'){
              if(response.data.zxjd == ""){
                zxjdh = $('.jhx .jh_gt').eq(0).text();
              }else{
                for (let index = 0; index < syjd.length; index++) {
                  if(syjd[index] == response.data.zxjd && syjd[index+1]){
                    zxjdh = syjd[index+1];
                    break;
                  }
                }
              }
            }else if($(this).text() == '录入至本阶段'){
              zxjdh = response.data.zxjd;
              if(zxjdh == ""){
                zxjdh = "立项阶段"
              }
            }
             util.PackMyAjax({
               url: '/doc/updateTssx',
               data: {
                 projectId: response.data.id,
                 ssjd: zxjdh,
                 znd: $('.ts_zn_input').val(),
                 jbsx: $('.ts_jb_input').val(),
                 zxsj: $('.calendar_input').val()
               }
              }).then(
                (response) => {
                  // return false;
                  setTimeout(util.reurl,100);//0.1秒后刷新
                  // spop({ template: response.msg, position: 'top-center', style: 'success', autoclose: 3000 });
                }
              )
          })

          zylb()
        },
        // 执行失败
        (request) => {
          console.log(request);
        }
      )
    }
    )
  }

  // 小红点修改
  $(document).on('click', '.hd_revise',function(){
    if($('.calendar_input').val() == ""){
      spop({ template: "请输入日期", position: 'top-center', style: 'error', autoclose: 3000 });
      return false;
    }
    util.PackMyAjax({
        url: '/doc/updateTssx',
        data: {
          id: $(this).attr('key_dqid'),
          projectId: $(this).attr('key-projectid'),
          ssjd: $(this).attr('key_ssjd'),
          znd: $('.ts_zn_input').val(),
          jbsx: $('.ts_jb_input').val(),
          zxsj: $('.calendar_input').val()
        }
      }).then(
        // 执行成功
        (response) => {
           return false;
           spop({ template: "修改成功", position: 'top-center', style: 'success', autoclose: 3000 });
           setTimeout(util.reurl,100);
        }
      )
  })

  // 小红点删除
  $(document).on('click', '.hd_delete',function(){
      util.PackMyAjax({
        url: '/doc/delTssx',
        data: {
          id: $(this).attr('key_dqid'),
        }
      }).then(
        // 执行成功
        (response) => {
           spop({ template: "删除成功", position: 'top-center', style: 'success', autoclose: 3000 });
           setTimeout(util.reurl,100);
        }
      )
  })

  // 事件录入新事项
  $(document).on('click', '.sj_btn',function(){
    if($(this).text() == "事件录入新事项"){
      $(this).text("结束录入");
    }else if($(this).text() == "结束录入"){
      $(this).text("事件录入新事项");
    }
    if(lr_flag){
      lr_flag = false;
      $('.sj_main_div').animate({
        opacity: "toggle",
        height: "toggle" 
      }, 'slow',function(){
        lr_flag = true;
      });
    }
  })

  // 点击轮播
  function zylb() {
    var ulWidth = parseInt($('.zbnd').css('width').replace(/px/g,''));
    var flag = true;
    $('.prev,.next').on('click', function () {
      if ($(this).attr('class') == 'next' ) {
        if(ulWidth - 1320 == Math.abs(parseInt($('.zbnd').css('left').replace(/px/g,'')))){
        } else{
          if(flag){
            flag = false;
            $('.zbnd').animate({left: parseInt($('.zbnd').css('left').replace(/px/g,''))-330 },function(){
              flag = true
            });
            
          }
        }
      } else if ($(this).attr('class') == 'prev') {
        if(parseInt($('.zbnd').css('left').replace(/px/g,'')) == 0){
        } else{
          if(flag){
            flag = false;
            $('.zbnd').animate({left: parseInt($('.zbnd').css('left').replace(/px/g,''))+330 },function(){
              flag = true
            });
          }
        }
      }
    })
  }
  function addList(list) {
    $('.zbnd').empty();
    if(list.length <= 0){
    $('.zbnd').addClass('addWidth');
    $('.prev,.next').show();
      for (let index = 0; index < 4; index++) {
        $('.zbnd').append(`<li class='lb_li'>
                              <h6>录入时间：</h6>
                              <h6>重难点：</h6>
                              <h6>急办事项：</h6>
                            </li>`)
        
      }
    }
    $('.zbnd').css('width',list.length * 330);
    list.forEach(function (ele, index) {
      $('.zbnd').append(`<li class='lb_li'>
                              <h6>录入时间：${ele.zxsj}</h6>
                              <h6>重难点：${ele.znd}</h6>
                              <h6>急办事项：${ele.jbsx}</h6>
                            </li>`)
    })
  }
})(jQuery)
