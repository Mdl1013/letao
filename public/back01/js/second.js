$(function () {
    // 发送ajax请求,渲染页面
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页多少条

    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var str = template('second_tmp', info);
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

    // 请求模态框的下拉菜单数据, 进行渲染
    // /category/queryTopCategoryPaging
    // 提供的是分页接口, 我们可以通过 分页接口, 模拟获取全部一级分类的接口
    // 配置请求 第一页, 请求 100 条数据, 模拟接口
    $('#addbtn').click(function () {
        $('#secondModal').modal('show');
        $.ajax({
            type: 'get',
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var str = template('dropdown-tmp', info);
                $('.dropdown-menu').html(str);
            }

        })
    });

    // 3. 给下拉菜单中的 a 注册点击事件, 通过事件委托注册
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('#dropdownText').text(txt);
        var id = $(this).data("id");
        $('[name="categoryId"]').val(id);

        // 让一级分类对应的隐藏域, 校验状态置成 校验成功
        // 参数1: 字段名称
        // 参数2: 校验状态
        // 参数3: 配置校验规则, 用来显示错误信息
        $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID");
    })

    // 4.配置文件上传插件
    $('#fileupload').fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            var picurl = data.result.picAddr;
            // 设置给 img的 src 属性
            $('#imgbox img').attr('src', picurl);
            // 设置给 隐藏域
            $('[name="brandLogo"]').val( picurl );
            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
        }
    });
    


    //5.使用表单校验插件
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
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    },

                }
            },
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名称'
                    },

                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择图片'
                    },

                }
            },
        }

    });
    // 6. 注册表单校验成功事件, 阻止默认的表单提交, 通过 ajax 进行提交
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        console.log($('#form').serialize());
        
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $('#form').serialize(),
            dataType:'json',
            success:function (info){
               console.log(info);
               
               if (info.success){
                    $('#secondModal').modal('hide');
                    currentPage =1;
                    render();

                    $('#form').data("bootstrapValidator").resetForm(true);
                    $('#dropdownText').text('请选择一级分类');
                    $('#imgbox img').attr("src", "images/none.png");
                
               }
            }
               
        })
    });

})