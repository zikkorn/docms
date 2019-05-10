(function () {
    $('.today_time').text("今日" + util.getNowFormatDate().split('-')[2] + "号")
    $('.btn_publish').off('click').on('click', function () {
        $.Pop(`<div class="form-group" style="margin-bottom: 1rem;margin-top: 20px;">
                  <textarea class='publish_textarea'style='background: transparent;width: 600px;height: 200px;color: #fff;font-size: 14px;'></textarea>   
               </div>
             `, {
                Title: "编辑区",
                Class: true,
                Animation: "slideFromTop",
                BoxDrag: false,
                Btn: {
                    yes: {
                        vla: "发布", class: "btn-primary btn", ope: function () {
                            var Pub_information = $('.review-card').eq(0)
                            Pub_information.children().eq(1).prepend(`<div class="list-item">
                                <div class="preview-image">
                                    <span>1</span>
                                </div>
                                <div class="content" style="position:relative">
                                    <div class="d-flex align-items-center">
                                        ${util.getFormatCode($(".publish_textarea").val())}
                                    </div>
                                    <div class="d-flex align-items-center" style="margin-top: 18px;">
                                        <a href="">发布人：小强</a>
                                        <a href="" style="margin-left: 30px;">发布时间：${util.getNowFormatDate().split('-')[1]}月${util.getNowFormatDate().split('-')[2]}号</a>
                                    </div>
                                </div>
                            </div>`)
                            Pub_information.find(".list-item:last-child").remove()
                            if ($('.list-item').length >= 4) {
                                $('.list-item').eq($('.list-item').length - 1).remove()
                            }
                           util.clearSS()
                        },
                    },
                    no: {
                        vla: "清空", class: "btn-light btn", ope: function () {
                            $('.publish_textarea').val('')
                        },
                    },
                }
            })
    })


    var highlighter;
    rangy.init();
    highlighter = rangy.createHighlighter();
    highlighter.addClassApplier(rangy.createClassApplier("highlight", {
        ignoreWhiteSpace: true,
        tagNames: ["span", "a"]
    }));
    // 标红
    $('.btn_Marked_red').off('click').on('click', function () {
        highlighter.highlightSelection('highlight')
    })
    // 删除
    $('.btn_cancel_red').off('click').on('click', function () {
        highlighter.unhighlightSelection();
    })
    // 编辑
    $('.btn_edit').off('click').on('click', function () {
        $(this).parent().children('div').attr('contenteditable','true')
    })
    // 保存
    $('.btn_preserve').off('click').on('click', function () {
        $(this).parent().children('div').attr('contenteditable','false')
    })

})(jQuery)

