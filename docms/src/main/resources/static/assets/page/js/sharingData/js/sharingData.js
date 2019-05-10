(function () {
  // 初始化页数
  var pageNo = 1;
  // 文件对象
  var FileObject = null;
  selectMenu(0)
  selectMenu(1);
  var pathList = [
    '../assets/page/file/video/text.mp4',
    '../assets/page/file/doc/text.docx',
    '../assets/page/file/img/text.png',
    '../assets/page/file/pdf/JavaScript模式.pdf',
    '../assets/page/file/pptx/text.pptx',
    '../assets/page/file/xlsx/text.xlsx',
  ]
  proIn()
  function proIn() {
    util.DomInquiry({
      url: 'daily/getShareData',
      data: {
        page: pageNo,
        limit: "6",
        zllx: '',
        title: '',
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
        $('tbody').empty();
        response.data.map((ele, index) => {
          $('tbody').eq(0).append(`
                    <tr key-id=${ele.id}>
                        <td>${(pageNo - 1) * 6 + index + 1}</td>
                        <td>${ele.zllx}</td>
                        <td>${ele.author}</td>
                        <td>${ele.title}</td>
                        <td>${ele.updateDate == null ? "" : ele.updateDate}</td>
                        <td>${ele.filesize == null ? "" : ele.filesize}</td>
                        <td>${ele.bz == null ? "" : ele.bz}</td>
                        <td>
                            <button class="btn btn-outline-primary sharing_revise" style="position: relative;left: -30px;">修改</button>
                            <button class="btn btn-outline-warning" style="margin:0 30px;margin-left: 0;"><a href=${pathList[util.randomNum(0,5)]} style="color: inherit;">查看</a></button>
                            <button class="btn btn-outline-info">在线编辑</button>
                            <span style="margin-right:30px"></span>
                            <button class="btn btn-outline-danger sharing_delete">删除</button>
                        </td>
                    </tr>`)
        })
        util.DomDeklete($('.sharing_delete'), proIn, '/daily/delShareById')
      }
    });
  }


  $('.newFile').off('click').on('click', function () {
    $.Pop(`<div class="form-group" style="margin-bottom: 2rem;margin-top: 20px;">
                  <span style="font-size:16px;margin-left: 30px;">资料类型：</span>
                  <div class="select-menu" style="top: -33px;right: -31px;width: 400px;">
                    <div class="select-menu-div" style='text-align: center;'>
                        <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -1px;'/>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <ul class="select-menu-ul" style='text-align: center'>
                        <li class="select-this">技术标准</li>
                        <li>外军动态</li>
                        <li>科技文献</li>
                    </ul>
                  </div>
              </div>
              <div class="form-group" style="margin-bottom: 2rem;">
                  <span style="font-size:16px;margin-left: 61px">作者：</span>
                  <input type="text" style="width: 200px;border-radius: 5px;height: 30px;text-align: center;color: #fff;font-size:14px;" class="form-control author">
              </div>
              <div class="form-group" style="margin-bottom: 2rem;position: relative;">
                  <span style="font-size:16px;margin-left: 62px;">标题：</span>
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
                  <button class="btn btn-info" type="button" style="position: relative;right: 7px;top: -1px;border-top-left-radius: 0;border-bottom-left-radius: 0;">
                      <span>上传</span>
                      <input type="file" class="input_file" style="position:absolute;cursor: pointer;width:100%;height:100%;left: 0;top: 0;opacity: 0; ">
                  </button>
              </div>
               <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 60px">备注：</span>
                  <input type="text"  value='${$(this).parent().parent().children().eq(6).text()}' style="width: 200px;border-radius: 5px;height: 30px;margin-left: 2px;text-align: center;color: #fff;" class="bz form-control"/>
              </div>
              `, {
        Title: "新增文件",
        Class: true,
        Animation: "slideFromTop",
        BoxDrag: false,
        Btn: {
          yes: {
            vla: "提交", class: "btn-primary btn", ope: function () {
              if($('.author').val() == "" ){
                spop({ template: '请输入作者', position: 'top-center', style: 'error', autoclose: 3000 });
                return false
              }else if($('.upload_way').val() == ""){
                spop({ template: '请上传文件', position: 'top-center', style: 'error', autoclose: 3000 });
                return false
              }
              var showAlertList = $('.showAlert').find(".select-menu-input");
              var bz = $('.bz').val();
              var author = $('.author').val()
              util.PackMyAjax({
                url: '/daily/UploadShare',
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
                      url: '/daily/saveShareData',
                      data: {
                        id: "",
                        zllx: showAlertList.eq(0).val(),
                        author: author,
                        title: showAlertList.eq(1).val(),
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

  $(document).on('click', '.sharing_revise ', function () {
    $.Pop(`<div class="form-group" style="margin-bottom: 2rem;margin-top: 20px;" data-id=${$(this).parent().parent().children().eq(0).text()}>
                  <span style="font-size:16px;margin-left: 30px;">资料类型：</span>
                  <div class="select-menu" style="top: -33px;right: -31px;width: 400px;">
                    <div class="select-menu-div" style='text-align: center;'>
                        <input readonly class="select-menu-input" style='text-align: center;position: relative;top: -1px;'/>
                        <i class="fa fa-caret-down"></i>
                    </div>
                    <ul class="select-menu-ul" style='text-align: center'>
                        <li class="${$(this).parent().parent().children().eq(1).text() == "技术标准" ? 'select-this' : ''}">技术标准</li>
                        <li class="${$(this).parent().parent().children().eq(1).text() == "外军动态" ? 'select-this' : ''}">外军动态</li>
                        <li class="${$(this).parent().parent().children().eq(1).text() == "科技文献" ? 'select-this' : ''}">科技文献</li>
                    </ul>
                  </div>
              </div>
              <div class="form-group" style="margin-bottom: 2rem;">
                  <span style="font-size:16px;margin-left: 61px">作者：</span>
                  <input type="text" value="${$(this).parent().parent().children().eq(2).text()}" style="font-size:14px;width: 200px;border-radius: 5px;height: 30px;text-align: center;color: #fff;" class="form-control">
              </div>
              <div class="form-group" style="margin-bottom: 2rem;position: relative;">
                  <span style="font-size:16px;margin-left: 62px;">标题：</span>
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
                  <input type="text" readonly="" class="upload_way" style='margin:0' size='0'>
                  <button class="btn btn-info" type="button" style="position: relative;right: 7px;top: -1px;border-top-left-radius: 0;border-bottom-left-radius: 0;">
                      <span>上传</span>
                      <input type="file" class="input_file" style="position:absolute;cursor: pointer;width:100%;height:100%;left: 0;top: 0;opacity: 0; ">
                  </button>
              </div>
               <div class="form-group" style='margin-bottom: 1rem;'>
                  <span style="font-size:16px;margin-left: 60px">备注：</span>
                  <input type="text" value='${$(this).parent().parent().children().eq(6).text()}' style="width: 200px;border-radius: 5px;height: 30px;margin-left: 2px;text-align: center;color: #fff;" class="form-control"/>
              </div>
              `, {
        Title: "修改文件",
        Class: true,
        Animation: "showSweetAlert",
        BoxDrag: false,
        Btn: {
          yes: {
            vla: "提交", class: "btn-primary btn", ope: function () {
              var thId = $(this).parent().parent().siblings().eq(1).children().eq(0).attr('data-id')
              var inputList = $(this).parent().parent().parent().find('input')
              $('tbody>tr').children('td:first-child').each(function (index, ele) {
                if ($(ele).text() == thId) {
                  $(ele).siblings().eq(0).text(inputList.eq(0).val())
                  $(ele).siblings().eq(1).text(inputList.eq(1).val())
                  $(ele).siblings().eq(2).text(inputList.eq(2).val())
                  $(ele).siblings().eq(3).text(util.getNowFormatDate())
                  $(ele).siblings().eq(4).text($('.upload_way').attr('size') + "kib")
                  $(ele).siblings().eq(5).text(inputList.eq(5).val())
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
    springFrame_later()
  })

  function springFrame_later() {
    selectMenu(2)
    selectMenu(3)
    $('input[type=file]').on('change', function () {
      $('.upload_way')[0].value = $(this)[0].files[0].name;
      $('.upload_way')[0].size = $(this)[0].files[0].size;
      var form = new FormData();
      form.append("file", $(this)[0].files[0]);
      FileObject = form
    })
  }

})(jQuery)