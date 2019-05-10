(function () {
  $('.uCData').text(util.getNowFormatDate())
  $('.uCStatus').off('click').on('click', function () {
    $(this).addClass('UCStatus').siblings().removeClass('UCStatus')

  })
  $('.Entering').off('click').on('click', function () {
    util.PackMyAjax({
      url: '/user/saveActivity',
      data: {
        "title": $('.event_title').val(),
        "activity_description": $('.event_content').val(),
        "userId": window.sessionStorage.getItem('userId'),
        "userName": $('.profile-text').text(),
        "datetime": $('.uCData').text() +" "+ new Date().getHours() + ":00:00",
        "lx": $('.UCStatus').text(),
      }
    }).then(
      (response) => {
        spop({ template: "录入成功", position: 'top-center', style: 'success', autoclose: 3000 });
        console.log(response);
      },
      (request) => {
        console.log(request);
      }
    )
  })
})(jQuery)