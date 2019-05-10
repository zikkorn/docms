(function () {
  // 初始化页数
  var pageNo = 1;
  // 文件对象
  var FileObject = null;
  var pathList = [
    '../assets/page/file/video/text.mp4',
    '../assets/page/file/doc/text.docx',
    '../assets/page/file/img/text.png',
    '../assets/page/file/pdf/JavaScript模式.pdf',
    '../assets/page/file/pptx/text.pptx',
    '../assets/page/file/xlsx/text.xlsx',
  ];
  selectMenu(0)
  selectMenu(1)
  selectMenu(2)

  proIn()
  function proIn() {
    util.DomInquiry({
      url: '/daily/getDailyOffice',
      data: {
        page: pageNo,
        limit: "6",
        gwlx: $('.select-menu-input').eq(0).val() == "请选择" ? '' : $('.select-menu-input').eq(0).val(),
        fbdw: $('.select-menu-input').eq(1).val() == "请选择" ? '' : $('.select-menu-input').eq(1).val(),
        theme: $('.select-menu-input').eq(2).val() == "请选择" ? '' : $('.select-menu-input').eq(2).val()
      },
      type: 1,
      func: function (response) {
        // 分页
        $("#page").paging({
          pageNo: pageNo,//当前页数
          totalPage: Math.ceil(response.count / 6),//总共页数
          totalSize: 300,
          callback: function (num) {
            pageNo = num;
            proIn()
          }
        })
        $('tbody').empty()
        response.data.map((ele, index) => {
          $('tbody').eq(0).append(`
                    <tr key-id=${ele.id}>   
                        <td>${(pageNo - 1) * 6 + index + 1}</td>
                        <td>${ele.gwlx}</td>
                        <td>${ele.fbdw}</td>
                        <td>${ele.theme}</td>
                        <td>${ele.updateDate == null ? "" : ele.updateDate}</td>
                        <td>${ele.filesize == null ? "" : ele.filesize}</td>
                        <td>${ele.bz == null ? "" : ele.bz}</td>
                        <td>
                            <button class="btn btn-outline-primary daily_revise" style="position: relative;left: -30px;">修改</button>
                            <button class="btn btn-outline-warning" style="margin:0 30px;margin-left: 0;"><a href=${pathList[util.randomNum(0,5)]} style="color: inherit;">查看</a></button>
                            <button class="btn btn-outline-info">在线编辑</button>
                            <span style="margin-right:30px"></span>
                            <button class="btn btn-outline-danger daily_delete">删除</button>
                        </td>
                    </tr>`)
        })
        util.DomDeklete($('.daily_delete'), proIn, '/daily/delDailyById')
      }
    });
  }

  $('.newFile').off('click').on('click', function () {
    $.Pop(`<div class="form-group" style="margin-bottom: 2rem;margin-top: 20px;">
                  <span style="font-size:16px;margin-left: 30px;">公文类型：</span>
                  <div class="select-menu" style="top: -33px;right: -31px;width: 400px;">
                    <div class="select-menu-div" style='text-align: center;'>
                        <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -1px;'/>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <ul class="select-menu-ul" style='text-align: center'> 
                        <li class="select-this">会议纪要</li>
                        <li>协调单</li>
                        <li>机关通知</li>
                    </ul>
                  </div>
              </div>
              <div class="form-group" style='margin-bottom: 2rem;'>
                  <span style="font-size:16px;margin-left: 30px">发布单位：</span>
                  <div class="select-menu" style="top: 22px;right: -31px;;width: 400px;">
                    <div class="select-menu-div" style='text-align: center;'>
                        <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -1px;'/>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <ul class="select-menu-ul" style='text-align: center'> 
                        <li class="select-this">城建局</li>
                        <li>交通局</li>
                        <li>房管局</li>
                        <li>税务等部门</li>
                        <li>烟草局</li>
                        <li>审计局</li>
                    </ul>
                  </div>
              </div>
              <div class="form-group" style="margin-bottom: 2rem;position: relative;">
                  <span style="font-size:16px;margin-left: 62px;">主题：</span>
                  <div class="select-menu" style="top: -122px;right: -46px;width: 400px;">
                    <div class="select-menu-div" style='text-align: center;'>
                        <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -1px;'/>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <ul class="select-menu-ul" style='text-align: center'> 
                        <li class="select-this">科研</li>
                        <li>军事</li>
                    </ul>
                  </div>
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                  <span style="font-size:16px;margin-left: 30px;">上传文档：</span>
                  <input type="text" readonly="" class="upload_way" style='margin:0'>
                  <button class="btn btn-info" type="button" style="position: relative;right: 7px;top: -2px;border-top-left-radius: 0;border-bottom-left-radius: 0;">
                      <span>上传</span>
                      <input type="file" class="input_file" style="position:absolute;cursor: pointer;width:100%;height:100%;left: 0;top: 0;opacity: 0; ">
                  </button>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 60px">备注：</span>
                  <input type="text" style="width: 200px;border-radius: 5px;height: 30px;margin-left: 2px;text-align: center;color: #fff;" class="form-control"/>
              </div>
              `, {
        Title: "新增文件",
        Class: true,
        Animation: "slideFromTop",
        BoxDrag: false,
        Btn: {
          yes: {
            vla: "提交", class: "btn-primary btn", ope: function () {
              var bz = $('.form-control').val();
              if ($('.upload_way').val() == "") {
                spop({ template: '请上传文件', position: 'top-center', style: 'error', autoclose: 3000 })
                return false
              }
              var showAlertList = $('.showAlert').find(".select-menu-input")
              util.PackMyAjax({
                url: '/daily/fileUpload',
                data: FileObject,
                type: '1'
              }).then(
                (response) => {
                  return response
                },
                (request) => {
                  console.log(request);
                }
              ).then(
                (response) => {
                  if (response.msg == '成功') {
                    util.PackMyAjax({
                      url: '/daily/saveDailyOffice',
                      data: {
                        id: "",
                        gwlx: showAlertList.eq(0).val(),
                        fbdw: showAlertList.eq(1).val(),
                        theme: showAlertList.eq(2).val(),
                        filepath: response.data,
                        bz: bz
                      }
                    }).then(
                      (response) => {
                        if (response.code == 1) {
                          proIn()
                          spop({ template: '保存成功', position: 'top-center', style: 'success', autoclose: 3000 });
                        }
                      },
                      (request) => {
                        console.log(request);
                      }
                    )
                  }
                },
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
    springFrame_later()
  })

  $(document).on('click', '.daily_revise ', function () {
    $.Pop(`<div class="form-group" style="margin-bottom: 2rem;margin-top: 20px;" data-id=${$(this).parent().parent().attr('key-id')}>
                        <span style="font-size:16px;margin-left: 30px;">公文类型：</span>
                        <div class="select-menu" style="top: -33px;right: -31px;width: 400px;">
                          <div class="select-menu-div" style='text-align: center;'>
                              <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -1px;'/>
                              <i class="fa fa-caret-down"></i>
                          </div>
                          <ul class="select-menu-ul" style='text-align: center'> 
                              <li class="${$(this).parent().parent().children().eq(1).text() == "会议纪要" ? 'select-this' : ''}">会议纪要</li>
                              <li class="${$(this).parent().parent().children().eq(1).text() == "协调单" ? 'select-this' : ''}">协调单</li>
                              <li class="${$(this).parent().parent().children().eq(1).text() == "机关通知" ? 'select-this' : ''}">机关通知</li>
                          </ul>
                        </div>
                    </div>
                    <div class="form-group" style='margin-bottom: 2rem;'>
                        <span style="font-size:16px;margin-left: 30px">发布单位：</span>
                        <div class="select-menu" style="top: 22px;right: -31px;;width: 400px;">
                          <div class="select-menu-div" style='text-align: center;'>
                              <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -1px;'/>
                              <i class="fa fa-caret-down"></i>
                          </div>
                          <ul class="select-menu-ul" style='text-align: center'> 
                              <li class="${$(this).parent().parent().children().eq(2).text() == "城建局" ? 'select-this' : ''}">城建局</li>
                              <li class="${$(this).parent().parent().children().eq(2).text() == "交通局" ? 'select-this' : ''}">交通局</li>
                              <li class="${$(this).parent().parent().children().eq(2).text() == "房管局" ? 'select-this' : ''}">房管局</li>
                              <li class="${$(this).parent().parent().children().eq(2).text() == "税务等部门" ? 'select-this' : ''}">税务等部门</li>
                              <li class="${$(this).parent().parent().children().eq(2).text() == "烟草局" ? 'select-this' : ''}">烟草局</li>
                              <li class="${$(this).parent().parent().children().eq(2).text() == "审计局" ? 'select-this' : ''}">审计局</li>
                          </ul>
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom: 2rem;position: relative;">
                        <span style="font-size:16px;margin-left: 62px;">主题：</span>
                        <div class="select-menu" style="top: -122px;right: -46px;width: 400px;">
                          <div class="select-menu-div" style='text-align: center;'>
                              <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -1px;'/>
                              <i class="fa fa-caret-down"></i>
                          </div>
                          <ul class="select-menu-ul" style='text-align: center'> 
                              <li class="${$(this).parent().parent().children().eq(3).text() == "科研" ? 'select-this' : ''}">科研</li>
                              <li class="${$(this).parent().parent().children().eq(3).text() == "军事" ? 'select-this' : ''}">军事</li>
                          </ul>
                        </div>
                    </div>
                    <div class="form-group" style="margin-bottom: 1rem;">
                        <span style="font-size:16px;margin-left: 30px;">上传文档：</span>
                        <input type="text" readonly="" class="upload_way" style='margin:0' size="0">
                        <button class="btn btn-info" type="button" style="position: relative;right: 7px;top: -2px;border-top-left-radius: 0;border-bottom-left-radius: 0;">
                            <span>上传</span>
                            <input type="file" class="input_file" style="position:absolute;cursor: pointer;width:100%;height:100%;left: 0;top: 0;opacity: 0; ">
                        </button>
                    </div>
                    <div class="form-group" style='margin-bottom: 1rem;'>
                        <span style="font-size:16px;margin-left: 60px">备注：</span>
                        <input type="text"  style="width: 200px;border-radius: 5px;height: 30px;margin-left: 2px;text-align: center;color: #fff;" class="form-control" value='${$(this).parent().parent().children().eq(6).text()}'/>
                    </div>
                    `, {
        Title: "修改文件",
        Class: true,
        Animation: "showSweetAlert",
        BoxDrag: false,
        Btn: {
          yes: {
            vla: "提交", class: "btn-primary btn", ope: function () {
              var thId = $('.showAlert').find(".form-group").eq(0).attr('data-id');
              var bz = $('.form-control').val()
              if ($('.upload_way').val() == "") {
                spop({ template: '请上传文件', position: 'top-center', style: 'error', autoclose: 3000 })
                return false
              }
              var showAlertList = $('.showAlert').find(".select-menu-input")
              util.PackMyAjax({
                url: '/daily/fileUpload',
                data: FileObject,
                type: '1'
              }).then(
                (response) => {
                  return response
                },
                (request) => {
                  console.log(request);
                }
              ).then(
                (response) => {
                  if (response.msg == '成功') {
                    util.PackMyAjax({
                      url: '/daily/saveDailyOffice',
                      data: {
                        id: thId,
                        gwlx: showAlertList.eq(0).val(),
                        fbdw: showAlertList.eq(1).val(),
                        theme: showAlertList.eq(2).val(),
                        filepath: response.data,
                        bz: bz
                      }
                    }).then(
                      (response) => {
                        if (response.code == 1) {
                          proIn()
                          spop({ template: '修改成功', position: 'top-center', style: 'success', autoclose: 3000 });
                        }
                      },
                      (request) => {
                        console.log(request);
                      }
                    )
                  }
                },
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
    springFrame_later()
  })

  $('.btn_daily').off('click').on('click',function(){
    proIn()
  })

  function springFrame_later() {
    $('input[type=file]').on('change', function () {
      $('.upload_way')[0].value = $(this)[0].files[0].name
      $('.upload_way')[0].size = $(this)[0].files[0].size
      var form = new FormData();
      form.append("file", $(this)[0].files[0]);
      FileObject = form
    })
    selectMenu(3)
    selectMenu(4)
    selectMenu(5)
  }

})(jQuery)