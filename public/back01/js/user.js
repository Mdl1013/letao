$(function () {
    var currentPage =1;
    var pageSize =5;
   
   var currentId ;
   var isDelete;
    render();
      // 一进入页面, 发送 ajax 请求, 获取用户列表, 通过 模板引擎渲染
    function render(){
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var str = template('tmp', info);
                $('tbody').html(str);    
                
                // 分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total/pageSize),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                    //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage =page;
                        render();
                    }
                });
            }

  
        });
    };
    // 什么时候用事件委托?
    // 1. 元素是动态生成的
    // 2. 批量注册事件, 效率高

    // 点击启用禁用按钮, 显示模态框 (使用事件委托)
    $('tbody').on('click','.btn',function (){
        $("#userModal").modal('show');
        currentId =$(this).parent().data('id');
        isDelete =$(this).hasClass('btn-danger') ? '0':'1';
    });

    $('#submit-btn').click(function (){
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:currentId,
                isDelete: isDelete
            },
            dataType:'json',
            success:function (info){
                console.log('success');
                $("#userModal").modal('hide');
                render();
            }
        })
    })
})