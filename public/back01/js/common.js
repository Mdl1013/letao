// ajax 全局事件
// 需求: (1) 在 ajax 开始发送的时候, 开启进度条,
//       (2) 在 所有的 ajax 请求结束时, 结束进度条

$(function () {
    $(document).ajaxStart(function (){
        // 开启进度条
        NProgress.start();
    });
    $(document).ajaxStop(function (){
        setTimeout(function (){
            // 关闭进度条
            NProgress.done();
        },500);
    });
})
// 导航菜单切换
$(function(){
    // 二级菜单切换
    $('.it_aside .category').click(function(){
        $(this).next().stop().slideToggle();
    });

    //     
    $('.it_topbar .icon_menu').click(function() {
    // 切换侧边栏, hidemenu 表示隐藏侧边栏的状态
    $('.it_aside').toggleClass("hidemenu");
    $(".it_main").toggleClass("hidemenu");
    $(".it_topbar").toggleClass("hidemenu");
  })
});

//模态框的 使用
$(function(){
    $('.it_topbar .icon_logout').click(function() {
        
        $('#myModal').modal("toggle");
    })
});
// 退出等录
$(function(){
    $('#logoutBtn').click(function() {
        
        $.ajax ({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success: function (info){
                if (info.success) {
                    location.href = "login.html";
                }
                
            }
        })
    })
}); 
