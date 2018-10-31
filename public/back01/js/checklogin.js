// 一进入页面, 判断当前用户是否是登陆的(发送请求询问后台), 如果是已登录才能继续访问
$(function (){
    $.ajax({
        type:'get',
        url:'/employee/checkRootLogin',
        dataType:'json',
        success:function(info){
            console.log(info);
            if (info.error === 400) {
                // 当前用户未登陆, 拦截到登陆页
                location.href ='login.html';
            }
            if (info.success) {
                console.log('登录成功');
            }
        }
    })
})