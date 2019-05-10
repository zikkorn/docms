(function () {
    // 初始化页数
    var pageNo = 1;
    // 项目名称
    var projectName_id = '';
    // 文件对象
    var FileObject = null;
    // 项目名称
    util.ddl({
        url: '/doc/getProjectName',
        Filindex: 0,
        data:{
            userId: window.sessionStorage.getItem('userId')
        },
        field: 'projectName',
        func: function (liEle) {
            projectName_id = liEle.attr('key-id');
        }
    })

    $('.doc_inquiry').off('click').on('click', function () {
        proIn()
    })

    function getProName(ele) {
        var zs = '';
        util.DomInquiry({
            url: '/doc/getProjectName',
            data: {
                userId: window.sessionStorage.getItem('userId')
            },
            type: 1,
            func: function (response) {
                response.data.map((ele, index) => {
                    if (ele.child.length > 0) {
                        var ls = ''
                        ele.child.map((childEle, childIndex) => {
                            ls +=`<option data-key=${childEle.projectLx}  key-id = ${childEle.id} value=${childEle.projectName}>${childEle.projectName}</option>`
                        })
                        zs += `<optgroup label=${ele.projectName}  data-key=${ele.projectLx}  key-id = ${ele.id} >${ls}</optgroup>`
                    } else {
                        zs += `<option data-key=${ele.projectLx}  key-id = ${ele.id} value=${ele.projectName}>${ele.projectName}</option>`
                    }
                    
                })
                ele.append(zs);
            }
        })
    }
    

    // 查询
    function proIn() {
        // 当点击删除时 当前页数变成1
        if (arguments[0] == "1") {
            pageNo = 1
        }
        util.DomInquiry({
            url: '/doc/getDocument',
            data: {
                page: pageNo,
                limit: "6",
                projectId: projectName_id,
                projectStage: $('.shaixuan_tj').find('strong').eq(0).text(),
                projectStageChild: $('.show_click').find('em').eq(0).text(),
                userId: window.sessionStorage.getItem('userId'),
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
                $('tbody').empty()
                response.data.map((ele, index) => {
                    $('tbody').eq(0).append(`
                    <tr key-id=${ele.id}>
                        <td>${(pageNo - 1) * 6 + index + 1}</td>
                        <td>${ele.pProjectName}</td>
                        <td>${ele.cProjectName}</td>
                        <td>${ele.projectStageChild = undefined ? '' : ele.projectStageChild}</td>
                        <td>${ele.docPath}</td>
                        <td>${ele.createDate}</td>
                        <td>${ele.updateDate == null ? '' : ele.updateDate}</td>
                        <td>
                            <button class="btn btn-outline-primary doc_revise" style="position: relative;left: -30px;">修改</button>
                            <button class="btn btn-outline-warning" style="margin:0 30px;margin-left: 0;"><a href="../assets/page/file/video/text.mp4" style="color: inherit;">查看</a></button>
                            <button class="btn btn-outline-info">在线编辑</button>
                            <span style="margin-right:30px"></span>
                            <button class="btn btn-outline-danger doc_delete">删除</button>
                        </td>
                    </tr>`)
                })
                util.DomDeklete($('.doc_delete'), proIn, '/doc/delDocument')
            }
        });
    }

    $('.newDoc').off('click').on('click', function () {
        
        $.Pop(`<div class="form-group" style="margin-bottom: 2rem;margin-top: 20px;">
                    <span style="font-size:16px;margin-left: 30px;">所属项目：</span>
                    <select class="myselect">
                        
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 2rem;margin-top: 20px;">
                    <span style="font-size:16px;margin-left: 30px;">项目类型：</span>
                    <input type="text" class='form-control pro_type' id=${$(this).parent().parent().parent().find('.select-this').eq(0).attr('key-id')}  value=${$(this).parent().parent().parent().find('.select-this').eq(0).attr('data-key')} readonly style='width: 200px;height: 30px;border-radius: 5px;margin-left: -2px;text-align: center;color: #fff;font-size: 13px;'/>
                </div>
                        <div class="form-group" >
                            <span style="font-size:16px;margin-left: 30px;">项目阶段：</span>
                            <div class='select_div_only'>
                              <span style='position: relative;top: 3px;'>请选择</span>
                              <ul class="select_div_only_ul" style="opacity: 0;display:none" >
                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='预研项目'>
                                          <li><a>立项</a></li>
                                          <li><a>合同订购</a></li>
                                          <li><a>合同文档</a></li>
                                          <li><a>合同材料</a></li>
                                          <li><a>问题材料</a></li>
                                          <li><a>其他材料</a></li>
                                        </div>
                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='型号项目'>
                                          <li><a>立项</a></li>
                                          <li><a>竞争择优</a></li>
                                          <li><a>合同签订</a></li>
                                          <li><a>合同履行</a>
                                               <ul style='display:none;top: 97px;right: -200px;' class='select_div_only_ul_children_ul'>
                                                  <li><a>方案设计</a></li>
                                                  <li><a>工程研制</a></li>
                                                  <li><a>性能鉴定试验</a></li>
                                                  <li><a>状态鉴定</a></li>
                                                  <li><a>作战试验</a></li>
                                                  <li><a>列装列型</a></li>
                                                  <li><a>合同付款</a></li>
                                              </ul>
                                          </li>
                                          <li><a>合同监管文档</a></li>
                                          <li><a>合同监管文件材料</a></li>
                                          <li><a>其他材料</a></li>
                                        </div>
                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='订购项目'>
                                          <li><a>竞争择优</a></li>
                                          <li><a>合同签订</a></li>
                                          <li><a>合同履行</a>
                                              <ul style="top: 65px; right: -200px; display: none;" class="select_div_only_ul_children_ul">
                                                  <li><a>技术状态管理</a></li>
                                                  <li><a>调拨</a></li>
                                                  <li><a>付款</a></li>
                                                  <li><a>售后服务</a></li>
                                                  <li><a>培训</a></li>
                                              </ul>
                                          </li>
                                          <li><a>合同监管文档</a></li>
                                          <li><a>合同监管文件材料</a></li>
                                          <li><a>价格情况</a></li>
                                          <li><a>存在问题</a></li>
                                          <li><a>其他材料</a></li>
                                        </div>

                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='军内科研'>
                                          <li><a>项目管理 </a></li>
                                          <li><a>成果管理</a></li>
                                        </div>

                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='专项建设'>
                                          <li><a>任务依据</a></li>
                                          <li><a>合同</a></li>
                                          <li><a>方案</a></li>
                                          <li><a>实施</a></li>
                                          <li><a>相关问题</a></li>
                                          <li><a>备注</a></li>
                                        </div>

                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='部队建设'>
                                          <li><a>任务依据</a></li>
                                          <li><a>合同</a></li>
                                          <li><a>部对调研及问题</a></li>
                                          <li><a>方案</a></li>
                                          <li><a>实施</a></li>
                                          <li><a>加改装装备</a></li>
                                          <li><a>备注</a></li>
                                        </div>
                            </ul>
                          </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 2rem;">
                            <span style="font-size:16px;margin-left: 30px;">上传文档：</span>
                            <input type="text" readonly class='upload_way'/>
                            <button class='btn btn-info' type="button" style='position: relative;right: 7px;top: -1px;border-top-left-radius: 0;border-bottom-left-radius: 0;'>
                                <span>上传</span>
                                <input type="file" class="input_file" style="width: 72px;z-index: 999999;position: absolute;cursor: pointer;left: 0;top: 0;right: 0;opacity: 0;bottom: 0; ">
                            </button>
                        </div>`, {
                Title: "新增文档",
                Class: true,
                Animation: "slideFromTop",
                BoxDrag: false,
                Btn: {
                    yes: {
                        vla: "提交", class: "btn-primary btn", ope: function () {
                            var inputList = $('.showAlert').find('input');
                            var projectStageChild = $('.select_div_only>span').text()
                            if ($('.upload_way').val() == "") {
                                spop({ template: '请添加全信息', position: 'top-center', style: 'error', autoclose: 3000 })
                                return false
                            }
                            if (typeof projectStageChild === "string" && projectStageChild != "请选择") {
                                if (FileObject) {
                                    util.PackMyAjax({
                                        url: '/doc/fileUpload',
                                        data: FileObject,
                                        type: '1'
                                    }).then(
                                        // 执行成功
                                        (response) => {
                                            return response
                                        },
                                        // 执行失败
                                        (request) => {
                                            console.log(request);
                                        }
                                    ).then(
                                        // 执行成功
                                        (response) => {
                                            if (response.msg == '成功') {
                                                util.PackMyAjax({
                                                    url: '/doc/saveDocument',
                                                    data: {
                                                        id: '',
                                                        projectId: inputList.eq(0).attr('id'),
                                                        projectStageChild: projectStageChild,
                                                        docPath: response.data,
                                                        userId: window.sessionStorage.getItem('userId')
                                                    }
                                                }).then(
                                                    // 执行成功
                                                    (response) => {
                                                        if (response.code == 1) {
                                                            proIn()
                                                            spop({
                                                                template: '添加成功',
                                                                position: 'top-center',
                                                                style: 'success',
                                                                autoclose: 3000
                                                            });
                                                        }
                                                    },
                                                    // 执行失败
                                                    (request) => {
                                                        console.log(request);
                                                    }
                                                )
                                            }
                                        },
                                        // 执行失败
                                        (request) => {
                                            console.log(request);
                                        }
                                    )
                                } else {
                                    spop({ template: '请上传文件', position: 'top-center', style: 'error', autoclose: 3000 })
                                    return false
                                }
                            } else {
                                spop({ template: '请添加全信息', position: 'top-center', style: 'error', autoclose: 3000 })
                                return false
                            }
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
        springFrame_later();
        getProName($('.myselect'))
    })


    $(document).on('click', '.doc_revise ', function () {
        util.DomInquiry({
            url: '/doc/getDocById',
            data: {
                id:$(this).parent().parent().attr('key-id')
            },
            type: 1,
            func: function (response) {
                $('.je-select').text(response.data.projectName);
                $('.pro_type').attr('id',response.data.projectId)
            }
        })
        $.Pop(`<div class="form-group" style="margin-bottom: 2rem;margin-top: 20px;"  data-id=${$(this).parent().parent().attr('key-id')}>
                    <span style="font-size:16px;margin-left: 30px;">所属项目：</span>
                    <select class="myselect">
                        
                    </select>
                </div>
                <div class="form-group" style="margin-bottom: 2rem;margin-top: 20px;">
                    <span style="font-size:16px;margin-left: 30px;">项目类型：</span>
                    <input type="text" class='form-control pro_type' value="${$(this).parent().parent().children().eq(3).text().split('-')[0]}" readonly style='width: 200px;height: 30px;border-radius: 5px;margin-left: -1px;text-align: center;color: #fff;font-size: 13px;'/>
                </div>
                        <div class="form-group" >
                            <span style="font-size:16px;margin-left: 30px;">项目阶段：</span>
                            <div class='select_div_only'>
                              <span style='position: relative;top: 3px;'>${$(this).parent().parent().children().eq(3).text().split('-')[1]}</span>
                              <ul class="select_div_only_ul" style="opacity: 0;display:none" >
                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='预研项目'>
                                          <li><a>立项</a></li>
                                          <li><a>合同订购</a></li>
                                          <li><a>合同文档</a></li>
                                          <li><a>合同材料</a></li>
                                          <li><a>问题材料</a></li>
                                          <li><a>其他材料</a></li>
                                        </div>
                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='型号项目'>
                                          <li><a>立项</a></li>
                                          <li><a>竞争择优</a></li>
                                          <li><a>合同签订</a></li>
                                          <li><a>合同履行</a>
                                               <ul style='display:none;top: 97px;right: -200px;' class='select_div_only_ul_children_ul'>
                                                  <li><a>方案设计</a></li>
                                                  <li><a>工程研制</a></li>
                                                  <li><a>性能鉴定试验</a></li>
                                                  <li><a>状态鉴定</a></li>
                                                  <li><a>作战试验</a></li>
                                                  <li><a>列装列型</a></li>
                                                  <li><a>合同付款</a></li>
                                              </ul>
                                          </li>
                                          <li><a>合同监管文档</a></li>
                                          <li><a>合同监管文件材料</a></li>
                                          <li><a>其他材料</a></li>
                                        </div>
                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='订购项目'>
                                          <li><a>竞争择优</a></li>
                                          <li><a>合同签订</a></li>
                                          <li><a>合同履行</a>
                                              <ul style="top: 65px; right: -200px; display: none;" class="select_div_only_ul_children_ul">
                                                  <li><a>技术状态管理</a></li>
                                                  <li><a>调拨</a></li>
                                                  <li><a>付款</a></li>
                                                  <li><a>售后服务</a></li>
                                                  <li><a>培训</a></li>
                                              </ul>
                                          </li>
                                          <li><a>合同监管文档</a></li>
                                          <li><a>合同监管文件材料</a></li>
                                          <li><a>价格情况</a></li>
                                          <li><a>存在问题</a></li>
                                          <li><a>其他材料</a></li>
                                        </div>

                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='军内科研'>
                                          <li><a>项目管理 </a></li>
                                          <li><a>成果管理</a></li>
                                        </div>

                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='专项建设'>
                                          <li><a>任务依据</a></li>
                                          <li><a>合同</a></li>
                                          <li><a>方案</a></li>
                                          <li><a>实施</a></li>
                                          <li><a>相关问题</a></li>
                                          <li><a>备注</a></li>
                                        </div>

                                        <div style='display:none;border: 1px solid;border-radius: 5px;' data-key='部队建设'>
                                          <li><a>任务依据</a></li>
                                          <li><a>合同</a></li>
                                          <li><a>部对调研及问题</a></li>
                                          <li><a>方案</a></li>
                                          <li><a>实施</a></li>
                                          <li><a>加改装装备</a></li>
                                          <li><a>备注</a></li>
                                        </div>
                            </ul>
                          </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 2rem;">
                            <span style="font-size:16px;margin-left: 30px;">上传文档：</span>
                            <input type="text" readonly class='upload_way'/>
                            <button class='btn btn-info' type="button" style='position: relative;right: 7px;top: -1px;border-top-left-radius: 0;border-bottom-left-radius: 0;'>
                                <span>上传</span>
                                <input type="file" class="input_file" style="width: 72px;z-index: 999999;position: absolute;cursor: pointer;left: 0;top: 0;right: 0;opacity: 0;bottom: 0; ">
                            </button>
                        </div>`, {
                Title: "修改文档",
                Class: true,
                Animation: "showSweetAlert",
                BoxDrag: false,
                Btn: {
                    yes: {
                        vla: "提交", class: "btn-primary btn", ope: function () {
                            var thId = $('.showAlert').find(".form-group").eq(0).attr('data-id');
                            var prId = $('.pro_type').attr('id');
                            var projectStageChild = $('.select_div_only>span').text()
                            if ($('.showAlert').find('input').eq(0).val() == "请选择") {
                                spop({ template: '请添加全信息', position: 'top-center', style: 'error', autoclose: 3000 })
                                return false
                            }
                            if (typeof projectStageChild === "string" && projectStageChild != "请选择") {
                                if (FileObject) {
                                    util.PackMyAjax({
                                        url: '/doc/fileUpload',
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
                                                    url: '/doc/saveDocument',
                                                    data: {
                                                        id: thId,
                                                        projectId: prId,
                                                        projectStageChild: projectStageChild,
                                                        docPath: response.data
                                                    }
                                                }).then(
                                                    (response) => {
                                                        if (response.code == 1) {
                                                            proIn()
                                                            spop({
                                                                template: '修改成功',
                                                                position: 'top-center',
                                                                style: 'success',
                                                                autoclose: 3000
                                                            });
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
                                } else {
                                    spop({ template: '请上传文件', position: 'top-center', style: 'error', autoclose: 3000 })
                                    return false
                                }
                            } else {
                                spop({ template: '请添加全信息', position: 'top-center', style: 'error', autoclose: 3000 })
                                return false
                            }
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
        springFrame_later();
        getProName($('.myselect'))
    })


    function springFrame_later() {
        $(".myselect").jeSelect({
            sosList:false,
            zIndex: 999999,
            itemfun:function(elem, index, val, txts, dqthis) {
                $('.pro_type')[0].value = dqthis.attr('data-key');
                $('.pro_type')[0].id = dqthis.attr('key-id');
                $('.select_div_only>span').text('请选择')
            }
        });
        $(document).on('click','dt',function(){
            $('.je-select').text($(this).text());
            $('.pro_type')[0].value = $(this).attr('data-key');
            $('.pro_type')[0].id = $(this).attr('key-id');
            $('.select_div_only>span').text('请选择')
            $('.je-select-open').remove();
        })
        $('.select_div_only').off('click').on('click', function () {
            if ($(".select_div_only_ul").eq(0).css("display") === "block") {
                $(".select_div_only_ul").hide().eq(0).animate({ marginTop: "50px", opacity: "0" }, "fast");
            } else {
                $(".select_div_only_ul").show().eq(0).animate({ marginTop: "5px", opacity: "1" }, "fast");
            }
            $(".select_div_only_ul").children().each(function (index, ele) {
                if ($(ele).attr('data-key') == $('.pro_type').val()) {
                    $(ele).show();
                } else {
                    $(ele).hide()
                }
            })
        })

        $(".select_div_only_ul li").off('click').on('click', function (e) {
            e.stopPropagation();
            $('.select_div_only').children().eq(0).text($(this).children('a').text())
            $('.select_div_only_ul').hide()
        })

        $('.select_div_only_ul>div>li').hover(function () {
            $(this).children('ul').show()
        }, function () {
            $(this).children('ul').hide()
        })


        $('input[type=file]').on('change', function () {
            $('.upload_way')[0].value = $(this)[0].files[0].name
            var form = new FormData();
            form.append("file", $(this)[0].files[0]);
            FileObject = form
        })
    }

    window.proIn = proIn
})(jQuery)