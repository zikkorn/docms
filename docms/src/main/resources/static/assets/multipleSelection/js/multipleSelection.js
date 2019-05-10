(function () {
  $('.subject_dd>a').off('click').on('click', function () {
    $('.show_click').show().find('em').eq(0).text($(this).text())
  })

  $('.delta').off('click').on('click', function () {
    $(this).toggleClass('delta_cnm')
    $(this).parent().siblings().eq(1).toggle(300)
    $(this).toggleClass('delta_tranfrom')
  })

  $('.show_click>i').off('click').on('click', function () {
    $('.show_click').hide()
  })
})(jQuery)