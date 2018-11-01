$(function () {


    // 发送ajax请求,渲染页面
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页多少条

    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var str = template('first_tmp', info);
                $('tbody').html(str);
                // 分页设置
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,//当前页
                    totalPages: Math.ceil(info.total / pageSize),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });

            }
        })
    }


    // 点击弹出模态框
    $('#addbtn').click(function () {
        $('#firstModal').modal('show');
    });

    //使用表单校验插件
    $('#form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类名不能为空'
                    },
                
                }
            },
        }

    });

      // 4. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$("#form").serialize(),
            dataType:"json",
            success:function (info){
                console.log(info);
                // 关闭模态框
                $('#firstModal').modal('hide');
                 // 页面重新渲染第1页
                currentPage = 1;
                render();
                 // resetForm(true) 传 true 表示内容和校验状态都重置
                $("#form").data('bootstrapValidator').resetForm(true);
            }
        })
    })

})