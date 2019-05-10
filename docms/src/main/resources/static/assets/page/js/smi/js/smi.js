(function () {
  selectMenu(0)
  selectMenu(1)
  $('.btn_date').off('click').on('click', function () {
    $.Pop(`  <div class="form-group" style="margin-bottom: 1rem;margin-top: 20px;">
                  <span style="font-size:16px;margin-left: 75px;">承制单位：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 107px">简称：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 60px">主管军代局：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 60px">主管军代室：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 109px">地点：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 45px">工业主管部门：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 78px">企业性质：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 15px">承担主要研制任务：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 15px">承担主要生产任务：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 111px">备注：</span>
                  <input type="text" style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
               <div class="form-group" style="margin-bottom: 1rem;">
                  <span style="font-size:16px;margin-left: 79px;">上传文档：</span>
                  <input type="text" readonly="" class="upload_way" style='margin:0'>
                  <button class="btn btn-info" type="button" style="position: relative;right: 7px;top: -2px;border-top-left-radius: 0;border-bottom-left-radius: 0;">
                      <span>上传</span>
                      <input type="file" class="input_file" style="text-align: center;color: #fff;font-size: 14px;position:absolute;cursor: pointer;width:100%;height:100%;left: 0;top: 0;opacity: 0; ">
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
              $('tbody').append(`<tr>
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
                                    <td>
                                        <button class="btn btn-outline-primary smi_revise">修改</button>
                                        <button class="btn btn-outline-warning" style="margin:0 15px"><a href="../assets/page/file/doc/text.docx" style='color:inherit'>查看</a></button>
                                        <button class="btn btn-outline-info" style="margin-right: 15px">在线编辑</button>
                                        <button class="btn btn-outline-danger smi_delete">删除</button>
                                    </td>
                                </tr>`)
              $('.box').remove()
              $('body').children('div').each(function () {
                  if ($(this).attr('id')) {
                  $(this).remove()
                  }
              })
              util.DomDeklete($('.smi_delete'))
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
  })

 $(document).on('click', '.smi_revise ', function () {
    $.Pop(`  <div class="form-group" style="margin-bottom: 1rem;margin-top: 20px;" data-id=${$(this).parent().parent().children().eq(0).text()}>
                  <span style="font-size:16px;margin-left: 75px;">承制单位：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(1).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 107px">简称：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(2).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 60px">主管军代局：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(3).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 60px">主管军代室：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(4).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 109px">地点：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(5).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 45px">工业主管部门：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(6).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 78px">企业性质：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(7).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 15px">承担主要研制任务：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(8).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 15px">承担主要生产任务：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(9).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
              <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 111px">备注：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(10).text()}' style="text-align: center;color: #fff;font-size: 14px;width: 200px;border-radius: 5px;height: 30px;" class="form-control"/>
              </div>
               <div class="form-group" style="margin-bottom: 1rem;">
                  <span style="font-size:16px;margin-left: 79px;">上传文档：</span>
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
                var thId = $(this).parent().parent().siblings().eq(1).children().eq(0).attr('data-id')
                var inputList = $(this).parent().parent().parent().find('input')
                $('tbody>tr').children('td:first-child').each(function (index, ele) {
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
                            return false
                        }
                    });
                $('.box').remove()
                $('body').children('div').each(function () {
                    if ($(this).attr('id')) {
                    $(this).remove()
                    }
                })
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
  })
  util.DomDeklete($('.smi_delete'))
})(jQuery)