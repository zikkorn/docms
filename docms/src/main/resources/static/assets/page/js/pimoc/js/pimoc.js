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

    proIn()

    function proIn() {
        util.DomInquiry({
            url: '/grxx/getGbgrxx',
            data: {
                page: pageNo,
                limit: "6",
                name: $('.form-control').eq(0).val(),
              /*  birthday: $('.form-control').eq(1).val() == "请选择" ? '' : $('.form-control').eq(1).val(),
                dtsj: $('.form-control').eq(2).val() == "请选择" ? '' : $('.form-control').eq(2).val(),
                rwsj: $('.form-control').eq(3).val() == "请选择" ? '' : $('.form-control').eq(3).val(),
                jg: $('.form-control').eq(4).val() == "请选择" ? '' : $('.form-control').eq(4).val(),*/
                xzjysj: $('.form-control').eq(1).val(),
                jxysj: $('.form-control').eq(2).val()
              /*  zyjszgysj: $('.form-control').eq(7).val() == "请选择" ? '' : $('.form-control').eq(7).val(),
                qrzxl: $('.form-control').eq(8).val() == "请选择" ? '' : $('.form-control').eq(8).val(),
                jgz: $('.form-control').eq(9).val() == "请选择" ? '' : $('.form-control').eq(9).val(),
                sfz: $('.form-control').eq(10).val() == "请选择" ? '' : $('.form-control').eq(10).val(),
                bz: $('.form-control').eq(11).val() == "请选择" ? '' : $('.form-control').eq(11).val()*/
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
                        <td>${ele.name}</td>
                        <td>${ele.birthday}</td>
                        <td>${ele.dtsj}</td>
                        <td>${ele.rwsj}</td>
                        <td>${ele.jg}</td>
                        <td>${ele.xzjysj}</td>
                        <td>${ele.jxysj}</td>
                        <td>${ele.zyjszgysj}</td>
                        <td>${ele.qrzxl}</td>
                        <td>${ele.jgz}</td>
                        <td>${ele.sfz}</td>
                        
                        <td>${ele.bz == null ? "" : ele.bz}</td>
                        <td>
                            <button class="btn btn-outline-primary pimoc_revise" style="position: relative;left: -30px;">修改</button>
                            <button class="btn btn-outline-warning" style="margin:0 30px;margin-left: 0;"><a href=${pathList[util.randomNum(0,5)]} style="color: inherit;">查看</a></button>
                            <button class="btn btn-outline-info">在线编辑</button>
                            <span style="margin-right:30px"></span>
                            <button class="btn btn-outline-danger daily_delete">删除</button>
                        </td>
                    </tr>`)
            })
                util.DomDeklete($('.daily_delete'), proIn, '/grxx/delGbgrxxById')
            }
        });
    }
    selectMenu(0)
    selectMenu(1)
    selectMenu(2)
  $('.btn_date').off('click').on('click', function () {
    $.Pop(`  <div class="form-group" style="margin-bottom: 1rem;margin-top: 20px;">
                  <span style="font-size:16px;margin-left: 113px;">姓名</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 81px">出生年月</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 81px">党团时间</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 81px">入伍时间</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 113px">籍贯</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 45px">现职级与时间</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 63px">军衔与时间</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px">专业技术资格与时间</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 65px">全日制学历</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 97px">军官证</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 97px">身份证</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 113px">备注</span>
                  <input type="text" style="color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;text-align:center" class="form-control"/>
              </div>
               <div class="form-group" style="margin-bottom: 1rem;">
                  <span style="font-size:16px;margin-left: 81px;">上传文档</span>
                  <input type="text" readonly="" class="upload_way" style='margin:0'>
                  <button class="btn btn-info" type="button" style="position: relative;right: 7px;top: -2px;border-top-left-radius: 0;border-bottom-left-radius: 0;">
                      <span>上传</span>
                      <input type="file" class="input_file" style="position:absolute;cursor: pointer;width:100%;height:100%;left: 0;top: 0;opacity: 0; ">
                  </button>
              </div>
             `, {
        Title: "新增数据",
        Class: true,
        Animation: "slideFromTop",
        BoxDrag: false,
        Btn: {
          yes: {
            vla: "提交", class: "btn-primary btn", ope: function () {
                console.log(1)
                //  var bz = $('.form-control').val();
                if ($('.upload_way').val() == "") {
                      spop({ template: '请上传文件', position: 'top-center', style: 'error', autoclose: 3000 })
                      return false
                  }
                  var showAlertList = $('.showAlert').find("input")
                  util.PackMyAjax({
                      url: '/grxx/fileUpload',
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
                          url: '/grxx/saveGbgrxx',
                          data: {
                              id: "",
                              name: showAlertList.eq(0).val(),
                              birthday: showAlertList.eq(1).val(),
                              dtsj: showAlertList.eq(2).val(),
                              rwsj: showAlertList.eq(3).val(),
                              jg: showAlertList.eq(4).val(),
                              xzjysj:showAlertList.eq(5).val(),
                              jxysj:showAlertList.eq(6).val(),
                              zyjszgysj:showAlertList.eq(7).val(),
                              qrzxl:showAlertList.eq(8).val(),
                              jgz:showAlertList.eq(9).val(),
                              sfz:showAlertList.eq(10).val(),
                              bz:showAlertList.eq(11).val(),
                              filepath: response.data

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
                //-----------
              /*  var name=
                $.ajax({




                  })*/
                /*$('tbody').append(`<tr>
                                    <td>${$('tbody').children().length + 1}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(0).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(1).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(2).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(3).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(4).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(5).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(6).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(7).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(8).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(9).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(10).val()}</td>
                                    <td>${$(this).parent().parent().parent().find('input').eq(11).val()}</td>
                                    <td>
                                        <button class="btn btn-outline-primary pimoc_revise" >修改</button>
                                        <button class="btn btn-outline-warning" style="margin:0 15px"><a  style='color:inherit' href="../assets/page/file/doc/text.docx">查看</a></button>
                                        <button class="btn btn-outline-info" style="margin-right: 15px">在线编辑</button>
                                        <button class="btn btn-outline-danger pimoc_delete">删除</button>
                                    </td>
                                </tr>`)
                                util.DomDeklete($('.pimoc_delete'))
                $('.box').remove()
                $('body').children('div').each(function () {
                if ($(this).attr('id')) {
                    $(this).remove()
                }
                })
                     */
            },
          },
          no: {
            vla: "取消", class: "btn-light btn", ope: function () {
              $('.box').remove()
              $('body').children('div').each(function () {
                if ($(this).attr('id')) {
                  $(this).remove()
                }
              })
            },
          },
        }

      })
      springFrame_later()
  })

  $(document).on('click', '.pimoc_revise ', function () {
      $.Pop(`<div class="form-group" style="margin-bottom: 1rem;margin-top: 20px;" data-id=${$(this).parent().parent().attr('key-id')}>
                  <span style="font-size:16px;margin-left: 113px;">姓名</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(1).text()}'  style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 81px">出生年月</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(2).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 81px">党团时间</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(3).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 81px">入伍时间</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(4).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 113px">籍贯</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(5).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 45px">现职级与时间</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(6).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 63px">军衔与时间</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(7).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px">专业技术资格与时间</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(8).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 65px">全日制学历</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(9).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 97px">军官证</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(10).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 97px">身份证</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(11).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 113px">备注</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(12).text()}' style="color: #fff;font-size: 14px;text-align:center;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
               <div class="form-group" style="margin-bottom: 1rem;">
                  <span style="font-size:16px;margin-left: 81px;">上传文档</span>
                  <input type="text" readonly="" class="upload_way" style='margin:0'>
                  <button class="btn btn-info" type="button" style="position: relative;right: 7px;top: -2px;border-top-left-radius: 0;border-bottom-left-radius: 0;">
                      <span>上传</span>
                      <input type="file" class="input_file" style="position:absolute;cursor: pointer;width:100%;height:100%;left: 0;top: 0;opacity: 0; ">
                  </button>
              </div>
             `, {
        Title: "修改数据",
        Class: true,
        Animation: "showSweetAlert",
        BoxDrag: false,
        Btn: {
          yes: {
            vla: "提交", class: "btn-primary btn", ope: function () {
            /*  var thId = $(this).parent().parent().siblings().eq(1).children().eq(0).attr('data-id')
              var inputList = $(this).parent().parent().parent().find('input')
               */
                  var thId = $('.showAlert').find(".form-group").eq(0).attr('data-id');
                  var bz = $('.form-control').val()
                  if ($('.upload_way').val() == "") {
                      spop({ template: '请上传文件', position: 'top-center', style: 'error', autoclose: 3000 })
                      return false
                  }
                  var showAlertList = $('.showAlert').find("input")
                //  var showAlertList = $('.showAlert').find(".select-menu-input")
                  util.PackMyAjax({
                      url: '/grxx/fileUpload',
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
                          url: '/grxx/saveGbgrxx',
                          data: {
                              id: thId,
                              name: showAlertList.eq(0).val(),
                              birthday: showAlertList.eq(1).val(),
                              dtsj: showAlertList.eq(2).val(),
                              rwsj: showAlertList.eq(3).val(),
                              jg: showAlertList.eq(4).val(),
                              xzjysj:showAlertList.eq(5).val(),
                              jxysj:showAlertList.eq(6).val(),
                              zyjszgysj:showAlertList.eq(7).val(),
                              qrzxl:showAlertList.eq(8).val(),
                              jgz:showAlertList.eq(9).val(),
                              sfz:showAlertList.eq(10).val(),
                              bz:showAlertList.eq(11).val(),
                              filepath: response.data

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



             /* $('tbody>tr').children('td:first-child').each(function (index, ele) {
                      if($(ele).text() == thId){
                          $(ele).siblings().eq(0).text(inputList.eq(0).val())
                          $(ele).siblings().eq(1).text(inputList.eq(1).val())
                          $(ele).siblings().eq(2).text(inputList.eq(2).val())
                          $(ele).siblings().eq(3).text(inputList.eq(3).val())
                          $(ele).siblings().eq(4).text(inputList.eq(4).val())
                          $(ele).siblings().eq(5).text(inputList.eq(5).val())
                          $(ele).siblings().eq(6).text(inputList.eq(6).val())
                          $(ele).siblings().eq(7).text(inputList.eq(7).val())
                          $(ele).siblings().eq(8).text(inputList.eq(8).val())
                          $(ele).siblings().eq(9).text(inputList.eq(9).val())
                          $(ele).siblings().eq(10).text(inputList.eq(10).val())
                          $(ele).siblings().eq(11).text(inputList.eq(11).val())
                          return false
                      }
                  });
                $('.box').remove()
                $('body').children('div').each(function () {
                if ($(this).attr('id')) {
                    $(this).remove()
                }
                }) */



            },
          },
          no: {
            vla: "取消", class: "btn-light btn", ope: function () {
              $('.box').remove()
              $('body').children('div').each(function () {
                if ($(this).attr('id')) {
                  $(this).remove()
                }
              })
            },
          },
        }

      })
      springFrame_later()
  })


  util.DomDeklete($('.pimoc_delete'))
        // $('.btn-primary').off('click').on('click',function(){
    //     proIn()
    // })

  function springFrame_later() {
        $('input[type=file]').on('change', function () {
            console.log(1)
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