(function(){
  $('.btn_login').off('click').on('click',function(){
      util.PackMyAjax({
        url: 'user/login',
        data:{
           userName : $('#userName').val(),
           userPwd : $('#userPwd').val()
        }
      }).then(
          // 执行成功
         (response)=>{
           if(response.msg == '登录成功'){
             window.sessionStorage.setItem('roleName', response.data.roleName)
             window.sessionStorage.setItem('userId', response.data.userId)
             location.href = './index'
           }
          },
          // 执行失败
         (request)=>{
           console.log(request);
          }
      )
    })
})(jQuery)