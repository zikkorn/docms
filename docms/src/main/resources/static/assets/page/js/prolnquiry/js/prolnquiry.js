(function () {
  var pageNo = 1;
  // 判断当前的table数量
  var i = 0;
  // // 存储项目的List
  // var proJectList = [];
  // var singleProject = [
  //   "projectName", "dept", "projectLx", "yzdw", "fzr", "zjtd", "lxjdDate",
  //   "yzzyqjdDate", "fajdDate", "zyjdDate", "xnjdjdDate", "zzsyjdDate", "lzdxjdDate"
  // ]userId
  
  function proIn() {
    // 当点击删除时 当前页数变成1
    if (arguments[0] == "1") {
      pageNo = 1
    }
    if (arguments[0] == "2") {
    } else {
      // 所属单位
      util.ddl({
        url: '/doc/getDeptName',
        Filindex: 0,
        field: 'dept',
        data:{
            userId: window.sessionStorage.getItem('userId')
        }
        
      })
      // 项目名称
      util.ddl({
        url: '/doc/getProjectName',
        Filindex: 1,
        field: 'projectName',
        data:{
            userId: window.sessionStorage.getItem('userId')
        }
      })
    }

    util.DomInquiry({
      url: 'doc/getProject',
      data: {
        page: pageNo,
        limit: "6",
        userId: window.sessionStorage.getItem('userId'),
        projectName: ($('.select-menu-input').eq(1).val() == "请选择" ? "" : $('.select-menu-input').eq(1).val()),
        dept: ($('.select-menu-input').eq(0).val() == "请选择" ? "" : $('.select-menu-input').eq(0).val()),
        projectLx: $('.shaixuan_tj').find('strong').eq(0).text()
      },
      type: 1,
      func: function (response) {
        //分页
        $("#page").paging({
          pageNo: pageNo,//当前页数
          totalPage: Math.ceil(response.count / 6),//总共页数
          totalSize: 300,
          callback: function (num) {
            pageNo = num;
            proIn()
          }
        })
        $('tbody').eq(0).empty()
        response.data.map((ele, index) => {
          $('tbody').eq(0).append(`
              <tr key-id=${ele.cId == "" ? ele.pId : ele.cId}>
                <td>${(pageNo - 1) * 6 + index + 1}</td>
                <td>${ele.cDept == "" ? ele.pDept : ele.cDept}</td>
                <td>${ele.pName}</td>
                <td>${ele.cName}</td>
                <td>${ele.cLx == "" ? ele.pLx : ele.cLx}</td>
                <td>${ele.cCreateDate == "" ? ele.pCreateDate : ele.cCreateDate}</td>
                <td>${ele.cUpdateDate == "" ? ele.pUpdateDate : ele.cUpdateDate}</td>
                <td>
                    <button key-pId = ${ele.pId} class="btn btn-outline-warning pro_add_zx">添加子项目</button>
                    <span style="margin:0 1.25rem"></span>
                    <button class="btn btn-outline-primary pro_revise">修改</button>
                    <span style="margin:0 1.25rem"></span>
                    <button class="btn btn-outline-danger prolnquiry_delete">删除</button>
                </td>
              </tr>
          `)
        })
        util.DomDeklete($('.prolnquiry_delete'), proIn, '/doc/delProject');
      }
    });
  }

  $('.Pro_inquiry').off('click').on('click', function () { proIn("2") })
  $('.newPro').off('click').on('click', function () {
    i = 0;
    $.Pop(`<div class="form-group" style="margin-bottom: 1rem;text-align: center;width: 74%;margin: auto;border-color: #3b425f !important;border-bottom: .0625rem solid;">
              <span class='pro_title' key-upId='' style="font-size: 1rem;display: block;margin-bottom: .625rem;">主项目</span>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;margin-top: 1.25rem;">
              <span style="font-size:1rem;margin-left: 5.625rem;">项目名称：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">所属单位：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;position: relative;">
              <span style="font-size:1rem;margin-left: 5.625rem;">项目类型：</span>
              <div class="select-menu" style="top: -7.625rem;right: -6.625rem;width: 25rem;">
                <div class="select-menu-div" style='text-align: center;'>
                    <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -0.0625rem;'/>
                    <i class="fa fa-caret-down"></i>
                </div>
                <ul class="select-menu-ul" style='text-align: center'> 
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "预研项目" ? "select-this" : ""}>预研项目</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "型号项目" ? "select-this" : ""}>型号项目</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "订购项目" ? "select-this" : ""}>订购项目</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "军内科研" ? "select-this" : ""}>军内科研</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "专项建设" ? "select-this" : ""}>专项建设</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "部队建设" ? "select-this" : ""}>部队建设</li>
                </ul>
              </div>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">研制单位：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 4.625rem">主要负责人：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">专家团队：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">立项阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lx_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lx_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 2.5625rem">研制总要求阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="yz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="yz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">方案阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="fa_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="fa_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">正样阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zy_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zy_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">性能阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="xn_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="xn_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 3.625rem">作战试验阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 3.625rem">列装定性阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>`, {
        Title: "新增项目",
        Class: true,
        Animation: "slideFromTop",
        BoxDrag: false,
        Btn: {
          yes: {
            vla: "提交", class: "btn-primary btn tj_btn", ope: function () {
              var isOk = 1;
              var inputList = $('.showAlert').find('input');
              var iSstaus = 1;
              inputList.each(function (index, ele) {
                if (($(ele).val() == '') && index <= 7) {
                  iSstaus = 2
                  spop({ template: '请填写完整项目', position: 'top-center', style: 'error', autoclose: 3000 });
                  return false
                }
              })
              if (iSstaus == 2) {
                return false
              }
              var pareID = '';
              $('.table_right_public').each(function(index, ele){
                if($(this).attr('key-index') == 0){
                  pareID = $(this).attr('key-dataid')
                }
              })

              for (let index = 6; index < inputList.length; index++) {
                  if(!$(inputList[index]).val()){
                    if(index % 2 == 0){
                    }else {
                      if(!$(inputList[index-1]).val()){
                        break;
                      } else{
                        spop({ template: '日期请输入完整', position: 'top-center', style: 'error', autoclose: 3000 });
                        isOk = 2
                        break;
                      }
                    }
                  }
              }

              if(isOk == 2){
                return false;
              }
              // 新增项目
              util.PackMyAjax({
                url: '/doc/saveProject',
                data: {
                  id: '',
                  userId: window.sessionStorage.getItem('userId'),
                  parentId: pareID,
                  projectName: inputList.eq(0).val(),
                  dept: inputList.eq(1).val(),
                  projectLx: inputList.eq(2).val(),
                  yzdw: inputList.eq(3).val(),
                  fzr: inputList.eq(4).val(),
                  zjtd: inputList.eq(5).val(),
                  lxjdDate: inputList.eq(6).val() + '-' +inputList.eq(7).val(),
                  yzzyqjdDate: inputList.eq(8).val() + '-' +inputList.eq(9).val() == "-" ? '' : inputList.eq(8).val() + '-' +inputList.eq(9).val(),
                  fajdDate: inputList.eq(10).val() + '-' +inputList.eq(11).val() == "-" ? '' : inputList.eq(10).val() + '-' +inputList.eq(11).val(),
                  zyjdDate: inputList.eq(12).val() + '-' +inputList.eq(13).val() == "-" ? '' : inputList.eq(12).val() + '-' +inputList.eq(13).val(),
                  xnjdjdDate: inputList.eq(14).val() + '-' +inputList.eq(15).val() == "-" ? '' : inputList.eq(14).val() + '-' +inputList.eq(15).val(),
                  zzsyjdDate: inputList.eq(16).val() + '-' +inputList.eq(17).val() == "-" ? '' : inputList.eq(16).val() + '-' +inputList.eq(17).val(),
                  lzdxjdDate: inputList.eq(18).val() + '-' +inputList.eq(19).val() == "-" ? '' : inputList.eq(18).val() + '-' +inputList.eq(19).val(),
                }
              }).then(
                // 执行成功
                (response) => {
                  proIn()
                  spop({
                    template: '添加成功',
                    position: 'top-center',
                    style: 'success',
                    autoclose: 3000
                  });
                  console.log(response);
                },
                // 执行失败
                (request) => {
                  console.log(request);
                }
              )
              util.clearSS()
            },
          },
          no: {
            vla: "+ 新增子项目", class: "btn-light btn ", ope: function () {
              var inputList = $('.showAlert').find('input');
              var isData = 1;
              var isOk = 1;
              $('.box').find('input').each(function (index, ele) {
                if (!$(ele).val() && index <= 7) {
                  isData = 2
                  spop({ template: '请填写完整项目', position: 'top-center', style: 'error', autoclose: 3000 });
                  return false
                }
              })
              if (isData == 1) {
                // 新增项目
                var pareID = '';
                $('.table_right_public').each(function(index, ele){
                  if($(this).attr('key-index') == 0){
                    pareID = $(this).attr('key-dataid')
                  }
                })
                
                for (let index = 6; index < inputList.length; index++) {
                  if(!$(inputList[index]).val()){
                    if(index % 2 == 0){
                    }else {
                      if(!$(inputList[index-1]).val()){
                        break;
                      } else{
                        spop({ template: '日期请输入完整', position: 'top-center', style: 'error', autoclose: 3000 });
                        isOk = 2
                        break;
                      }
                    }
                  }
              }

              if(isOk == 2){
                return false;
              }
                util.PackMyAjax({
                  url: '/doc/saveProject',
                  data: {
                    id: '',
                    userId: window.sessionStorage.getItem('userId'),
                    parentId: pareID,
                    projectName: inputList.eq(0).val(),
                    dept: inputList.eq(1).val(),
                    projectLx: inputList.eq(2).val(),
                    yzdw: inputList.eq(3).val(),
                    fzr: inputList.eq(4).val(),
                    zjtd: inputList.eq(5).val(),
                    lxjdDate: inputList.eq(6).val() + '-' +inputList.eq(7).val(),
                    yzzyqjdDate: inputList.eq(8).val() + '-' +inputList.eq(9).val() == "-" ? '' : inputList.eq(8).val() + '-' +inputList.eq(9).val(),
                    fajdDate: inputList.eq(10).val() + '-' +inputList.eq(11).val() == "-" ? '' : inputList.eq(10).val() + '-' +inputList.eq(11).val(),
                    zyjdDate: inputList.eq(12).val() + '-' +inputList.eq(13).val() == "-" ? '' : inputList.eq(12).val() + '-' +inputList.eq(13).val(),
                    xnjdjdDate: inputList.eq(14).val() + '-' +inputList.eq(15).val() == "-" ? '' : inputList.eq(14).val() + '-' +inputList.eq(15).val(),
                    zzsyjdDate: inputList.eq(16).val() + '-' +inputList.eq(17).val() == "-" ? '' : inputList.eq(16).val() + '-' +inputList.eq(17).val(),
                    lzdxjdDate: inputList.eq(18).val() + '-' +inputList.eq(19).val() == "-" ? '' : inputList.eq(18).val() + '-' +inputList.eq(19).val(),
                  }
                }).then(
                  // 执行成功
                  (response) => {
                    proIn();
                    $('.pro_title').text('子项目');
                    spop({
                      template: '添加成功' + (i == 0 ? "主项目" : $('.pro_title').text()),
                      position: 'top-center',
                      style: 'success',
                      autoclose: 3000
                    });
                    inputList.each(function (index, ele) {
                      if ($(ele).attr('class') == 'select-menu-input') {

                      } else {
                        $(ele).val('')
                      }
                    })
                    $('.showAlert').prepend(`<div class='table_right_public' key-dataId = ${response.data} key-index = ${i} style='top: ${i * 70 + 57}px'>${i == 0 ? "主项目" : "子项目"}</div>`);
                    i++;
                    Rsd()
                  },
                  // 执行失败
                  (request) => {
                    console.log(request);
                  }
                )
              }
            },
          },
        }

      })
    onRl()
    selectMenu(2)
  })

  $(document).on('click', '.pro_revise ', function () {
    var rep;
    util.PackMyAjax({
      url: '/doc/getProjectById',
      data: {
        id: $(this).parents('tr').attr('key-id')
      }
    }).then(
      // 执行成功
      (response) => {
        rep = response.data;
      },
      // 执行失败
      (request) => {
        console.log(request);
      }
    ).then(
      () => {
        $.Pop(`<div class="form-group" style="margin-bottom: 1rem;margin-top: 1.25rem;display: block" data-id=${$(this).parents('tr').attr('key-id')}>
              <span style="font-size:1rem;margin-left: 5.625rem;">项目名称：</span>
              <input type="text" value='${$(this).parents('tr').children().slice(1, 7).eq(2).text() == '' ? $(this).parents('tr').children().slice(1, 7).eq(1).text() : $(this).parents('tr').children().slice(1, 7).eq(2).text()}' style="color: #fff;font-size: .875rem;text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">所属单位：</span>
              <input type="text" value='${$(this).parents('tr').children().slice(1, 7).eq(0).text()}' style="color: #fff;font-size: .875rem;text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;position: relative;">
              <span style="font-size:1rem;margin-left: 5.625rem;">项目类型：</span>
              <div class="select-menu" style="top: -7.625rem;right: -6.625rem;width: 25rem;">
                <div class="select-menu-div" style='text-align: center;'>
                    <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -0.0625rem;'/>
                    <i class="fa fa-caret-down"></i>
                </div>
                <ul class="select-menu-ul" style='text-align: center'> 
                    <li class="${$(this).parents('tr').children().slice(1, 7).eq(3).text() == '预研项目' ? 'select-this' : ''}">预研项目</li>
                    <li class="${$(this).parents('tr').children().slice(1, 7).eq(3).text() == '型号项目' ? 'select-this' : ''}">型号项目</li>
                    <li class="${$(this).parents('tr').children().slice(1, 7).eq(3).text() == '订购项目' ? 'select-this' : ''}">订购项目</li>
                    <li class="${$(this).parents('tr').children().slice(1, 7).eq(3).text() == '军内科研' ? 'select-this' : ''}">军内科研</li>
                    <li class="${$(this).parents('tr').children().slice(1, 7).eq(3).text() == '专项建设' ? 'select-this' : ''}">专项建设</li>
                    <li class="${$(this).parents('tr').children().slice(1, 7).eq(3).text() == '部队建设' ? 'select-this' : ''}">部队建设</li>
                </ul>
              </div>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">研制单位：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control" value=${rep.yzdw}>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 4.625rem">主要负责人：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control" value=${rep.fzr}>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">专家团队：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control" value=${rep.zjtd}>
          </div>
           <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">立项阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lx_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.lxjdDate.split('-')[0]}>
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lx_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;"  value=${rep.lxjdDate.split('-')[1]}>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 2.5625rem">研制总要求阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="yz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.yzzyqjdDate.split('-')[0]}>
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="yz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.yzzyqjdDate.split('-')[1] == undefined ? '' : rep.yzzyqjdDate.split('-')[1]}>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">方案阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="fa_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.fajdDate.split('-')[0]}>
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="fa_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.fajdDate.split('-')[1] == undefined ? '' : rep.fajdDate.split('-')[1]}>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">正样阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zy_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.zyjdDate.split('-')[0]}>
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zy_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.zyjdDate.split('-')[1] == undefined ? '' : rep.zyjdDate.split('-')[1]}>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">性能阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="xn_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.xnjdjdDate.split('-')[0]}>
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="xn_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.xnjdjdDate.split('-')[1] == undefined ? '' : rep.xnjdjdDate.split('-')[1]}>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 3.625rem">作战试验阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.zzsyjdDate.split('-')[0]}>
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.zzsyjdDate.split('-')[1] == undefined ? '' : rep.zzsyjdDate.split('-')[1]}>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 3.625rem">列装定性阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.lzdxjdDate.split('-')[0]}>
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" value=${rep.lzdxjdDate.split('-')[1] == undefined ? '' : rep.lzdxjdDate.split('-')[1]}>
          </div>`, {
            Title: "修改项目",
            Class: true,
            Animation: "showSweetAlert",
            BoxDrag: false,
            Btn: {
              yes: {
                vla: "提交", class: "btn-primary btn", ope: function () {
                  var thId = $('.showAlert').find(".form-group").eq(0).attr('data-id')
                  var inputList = $('.showAlert').find('input');
                  var iSstaus = 1;
                  inputList.each(function (index, ele) {
                    if (index < 6 && $(ele).val() == '') {
                      iSstaus = 2
                      spop({ template: '请填写完整项目', position: 'top-center', style: 'error', autoclose: 3000 });
                      return false
                    }
                  })
                  if (iSstaus == 2) {
                    return false
                  }
                  util.PackMyAjax({
                    url: '/doc/saveProject',
                    data: {
                      id: thId,
                      userId: window.sessionStorage.getItem('userId'),
                      projectName: inputList.eq(0).val(),
                      dept: inputList.eq(1).val(),
                      projectLx: inputList.eq(2).val(),
                      yzdw: inputList.eq(3).val(),
                      fzr: inputList.eq(4).val(),
                      zjtd: inputList.eq(5).val(),
                      lxjdDate: inputList.eq(6).val() + '-' +inputList.eq(7).val(),
                      yzzyqjdDate: inputList.eq(8).val() + '-' +inputList.eq(9).val() == "-" ? '' : inputList.eq(8).val() + '-' +inputList.eq(9).val(),
                      fajdDate: inputList.eq(10).val() + '-' +inputList.eq(11).val() == "-" ? '' : inputList.eq(10).val() + '-' +inputList.eq(11).val(),
                      zyjdDate: inputList.eq(12).val() + '-' +inputList.eq(13).val() == "-" ? '' : inputList.eq(12).val() + '-' +inputList.eq(13).val(),
                      xnjdjdDate: inputList.eq(14).val() + '-' +inputList.eq(15).val() == "-" ? '' : inputList.eq(14).val() + '-' +inputList.eq(15).val(),
                      zzsyjdDate: inputList.eq(16).val() + '-' +inputList.eq(17).val() == "-" ? '' : inputList.eq(16).val() + '-' +inputList.eq(17).val(),
                      lzdxjdDate: inputList.eq(18).val() + '-' +inputList.eq(19).val() == "-" ? '' : inputList.eq(18).val() + '-' +inputList.eq(19).val(),
                    }
                  }).then(
                    // 执行成功
                    (response) => {
                      proIn()
                      spop({
                        template: '修改成功',
                        position: 'top-center',
                        style: 'success',
                        autoclose: 3000
                      });
                      console.log(response);
                    },
                    // 执行失败
                    (request) => {
                      console.log(request);
                    }
                  )
                  util.clearSS()
                },
              },
              no: {
                vla: "取消", class: "btn-light btn", ope: function () {
                  util.clearSS()
                },
              },
            }
          })
        onRl()
        selectMenu(2)
      })
  });

  $(document).on('click','.pro_add_zx',function(){
    var parentId = $(this).attr('key-pId');
     $.Pop(`<div class="form-group" style="margin-bottom: 1rem;text-align: center;width: 74%;margin: auto;border-color: #3b425f !important;border-bottom: .0625rem solid;">
              <span class='pro_title' key-upId='' style="font-size: 1rem;display: block;margin-bottom: .625rem;">子项目</span>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;margin-top: 1.25rem;">
              <span style="font-size:1rem;margin-left: 5.625rem;">项目名称：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">所属单位：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;position: relative;">
              <span style="font-size:1rem;margin-left: 5.625rem;">项目类型：</span>
              <div class="select-menu" style="top: -7.625rem;right: -6.625rem;width: 25rem;">
                <div class="select-menu-div" style='text-align: center;'>
                    <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -0.0625rem;'/>
                    <i class="fa fa-caret-down"></i>
                </div>
                <ul class="select-menu-ul" style='text-align: center'> 
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "预研项目" ? "select-this" : ""}>预研项目</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "型号项目" ? "select-this" : ""}>型号项目</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "订购项目" ? "select-this" : ""}>订购项目</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "军内科研" ? "select-this" : ""}>军内科研</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "专项建设" ? "select-this" : ""}>专项建设</li>
                    <li class=${$('.shaixuan_tj strong').eq(0).text() == "部队建设" ? "select-this" : ""}>部队建设</li>
                </ul>
              </div>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">研制单位：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 4.625rem">主要负责人：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">专家团队：</span>
              <input type="text" style="text-align: center;width: 12.5rem;border-radius: .3125rem;height: 1.875rem;" class="form-control"/>
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">立项阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lx_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lx_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 2.5625rem">研制总要求阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="yz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="yz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">方案阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="fa_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="fa_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">正样阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zy_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zy_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 5.625rem">性能阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="xn_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="xn_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 3.625rem">作战试验阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="zz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>
          <div class="form-group" style='margin-bottom: 1rem;'>
              <span style="font-size:1rem;margin-left: 3.625rem">列装定性阶段：</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lz_inpstart" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
              <span style='margin: 0 5px;'>-</span>
              <input type="text" readonly class="form-control dateinput dateicon" id="lz_inpend" style="text-align: center;width: 120px;border-radius: .3125rem;height: 1.875rem;" />
          </div>`, {
        Title: "新增项目",
        Class: true,
        Animation: "slideFromTop",
        BoxDrag: false,
        Btn: {
          yes: {
            vla: "+ 新增子项目", class: "btn-primary btn tj_btn", ope: function () {
              var inputList = $('.showAlert').find('input');
              var iSstaus = 1;
              inputList.each(function (index, ele) {
                if (index < 6 && $(ele).val() == '') {
                  iSstaus = 2
                  spop({ template: '请填写完整项目', position: 'top-center', style: 'error', autoclose: 3000 });
                  return false
                }
              })
              if (iSstaus == 2) {
                return false
              }
               util.PackMyAjax({
                url: '/doc/saveProject',
                data: {
                  id: '',
                  userId: window.sessionStorage.getItem('userId'),
                  parentId: parentId,
                  projectName: inputList.eq(0).val(),
                  dept: inputList.eq(1).val(),
                  projectLx: inputList.eq(2).val(),
                  yzdw: inputList.eq(3).val(),
                  fzr: inputList.eq(4).val(),
                  zjtd: inputList.eq(5).val(),
                  lxjdDate: inputList.eq(6).val() + '-' +inputList.eq(7).val(),
                  yzzyqjdDate: inputList.eq(8).val() + '-' +inputList.eq(9).val() == "-" ? '' : inputList.eq(8).val() + '-' +inputList.eq(9).val(),
                  fajdDate: inputList.eq(10).val() + '-' +inputList.eq(11).val() == "-" ? '' : inputList.eq(10).val() + '-' +inputList.eq(11).val(),
                  zyjdDate: inputList.eq(12).val() + '-' +inputList.eq(13).val() == "-" ? '' : inputList.eq(12).val() + '-' +inputList.eq(13).val(),
                  xnjdjdDate: inputList.eq(14).val() + '-' +inputList.eq(15).val() == "-" ? '' : inputList.eq(14).val() + '-' +inputList.eq(15).val(),
                  zzsyjdDate: inputList.eq(16).val() + '-' +inputList.eq(17).val() == "-" ? '' : inputList.eq(16).val() + '-' +inputList.eq(17).val(),
                  lzdxjdDate: inputList.eq(18).val() + '-' +inputList.eq(19).val() == "-" ? '' : inputList.eq(18).val() + '-' +inputList.eq(19).val(),
                }
              }).then(
                // 执行成功
                (response) => {
                  proIn()
                  spop({
                    template: '添加成功',
                    position: 'top-center',
                    style: 'success',
                    autoclose: 3000
                  });

                  inputList.each(function (index, ele) {
                    if(index != 2){
                      $(ele).val('')
                    }
                  })
                },
                // 执行失败
                (request) => {
                  console.log(request);
                }

              )
            }
          },
          no: {
            vla: "取消", class: "btn-light btn ", ope: function () {
              util.clearSS()
            }
          },
        }
      })
    onRl()
    selectMenu(2)
  })

  // 日历绑定
  function onRl() {
    // 立项阶段
    util.setDate('#lx_inpstart','#lx_inpend')
    // 研制总要求阶段
    util.setDate('#yz_inpstart','#yz_inpend')
    // 方案阶段
    util.setDate('#fa_inpstart','#fa_inpend')
    // 正祥阶段
    util.setDate('#zy_inpstart','#zy_inpend')
    // 性能阶段
    util.setDate('#xn_inpstart','#xn_inpend')
    // 作战试验阶段
    util.setDate('#zz_inpstart','#zz_inpend')
    // 列装定性阶段
    util.setDate('#lz_inpstart','#lz_inpend')
  }

  // 点击右侧的table显示对应的数据
  function Rsd() {
    $('.table_right_public').off('click').on('click', function () {
      var inputList = $('.showAlert').find('input');
      if ($(this).text() == "主项目") {
        $('.pro_title').text("主项目")
      } else {
        $('.pro_title').text($(this).text())
      }
      util.PackMyAjax({
        url: '/doc/getProjectById',
        data: {
          id: $(this).attr('key-dataid')
        }
      }).then(
        // 执行成功
        (response) => {
          $('.pro_title').attr('key-upId', response.data.id)
          inputList.eq(0).val(response.data.projectName);
          inputList.eq(1).val(response.data.dept);
          inputList.eq(2).val(response.data.projectLx);
          inputList.eq(3).val(response.data.yzdw);
          inputList.eq(4).val(response.data.fzr);
          inputList.eq(5).val(response.data.zjtd);

          inputList.eq(6).val(response.data.lxjdDate.split('-')[0]);
          inputList.eq(7).val(response.data.lxjdDate.split('-')[1]);

          inputList.eq(8).val(response.data.yzzyqjdDate.split('-')[0]);
          inputList.eq(9).val(response.data.yzzyqjdDate.split('-')[1]);

          inputList.eq(10).val(response.data.fajdDate.split('-')[0]);
          inputList.eq(11).val(response.data.fajdDate.split('-')[1]);

          inputList.eq(12).val(response.data.zyjdDate.split('-')[0]);
          inputList.eq(13).val(response.data.zyjdDate.split('-')[1]);

          inputList.eq(14).val(response.data.xnjdjdDate.split('-')[0]);
          inputList.eq(15).val(response.data.xnjdjdDate.split('-')[1]);

          inputList.eq(16).val(response.data.zzsyjdDate.split('-')[0]);
          inputList.eq(17).val(response.data.zzsyjdDate.split('-')[1]);

          inputList.eq(18).val(response.data.lzdxjdDate.split('-')[0]);
          inputList.eq(19).val(response.data.lzdxjdDate.split('-')[1]);

        },
        // 执行失败
        (request) => {
          console.log(request);
        }
      )

      // var thisProJect = proJectList[$(this).attr('key-index')]
      // for(let i = 0; i< $('.box').find('input').length ; i++){
      //   $('.box').find('input')[i].value = thisProJect[singleProject[i]]
      // }
    })
  }

  window.proIn = proIn
})(jQuery)