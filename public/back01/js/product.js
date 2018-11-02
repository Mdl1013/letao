$(function () {
    var currentPage = 1;
    var pageSize = 2;
    var picArr = [];

    
    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var str = template('pro-tmp', info);
                $('tbody').html(str);
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

    // 显示模态框
    $('#addpro').click(function () {
        $('#productModal').modal('show');
        // 发送 ajax 请求, 请求二级分类列表数据, 进行渲染下拉菜单
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                var str = template('dropdown-tmp', info);
                $('.dropdown-menu').html(str);

            }
        })
    });

    // 注册事件委托, 给 a 注册点击事件
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text();
        $('#dropdownText').text(txt);
        $("#form").data('bootstrapValidator').updateStatus("brandId", "VALID");
    });

    // 图片上传配置插件
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data.result.picAddr);
            // 获取图片地址对象
            var picObj = data.result;
            // 获取图片地址
            var picAddr = picObj.picAddr;
            // 新得到的图片对象, 应该推到数组的最前面    push pop shift unshift
            picArr.unshift(picObj);

            // 新的图片, 应该添加到 imgBox 最前面去
            $('#imgbox').prepend('<img src="' + picAddr + '" width="100%">');

            if (picArr.length > 3) {
                picArr.pop();
                // 除了删除数组的最后一项, 还需要将页面中渲染的最后一张图片删除掉
                // 通过 last-of-type 找到imgBox盒子中最后一个 img 类型的标签, 让他自杀
                $('#imgbox img:last-of-type').remove();
            }
            // 如果处理后, 图片数组的长度为 3, 说明已经选择了三张图片, 可以进行提交
            // 需要将表单 picStatus 的校验状态, 置成 VALID
            if (picArr.length === 3) {
                $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID");
            }
        }
    });

    //使用表单校验插件
    $("#form").bootstrapValidator({
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
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择二级分类'
                    },
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品名称'
                    },
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品描述'
                    },
                }
            },
            // 商品库存
            // 要求: 必须是非零开头的数字, 非零开头, 也就是只能以 1-9 开头
            // 数字: \d
            // + 表示一个或多个
            // * 表示零个或多个
            // ? 表示零个或1个
            // {n} 表示出现 n 次
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 32-40'
                    }
                }
            },
            // 商品价格
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品价格"
                    }
                }
            },
            // 商品原价
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请上传3张图片'
                    },

                }
            },


        }

    });

    //注册表单验证成功事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        // 表单提交得到的参数字符串
        var params =$('#form').serialize();

        // 需要在参数的基础上拼接上这些参数
        // &picName1=xx&picAddr1=xx
        // &picName2=xx&picAddr2=xx
        // &picName3=xx&picAddr3=xx
        params += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
        params += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
        params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;


        console.log(params);
        // //使用ajax提交逻辑
        // // 通过 ajax 进行添加请求
        $.ajax({
            url: "/product/addProduct",
            type: "post",
            data: params,
            success: function (info) {
                console.log(info)
                if (info.success) {
                    $('#productModal').modal("hide");
                    // 重置表单
                    $("#form").data('bootstrapValidator').resetForm(true);
                    // 重新渲染
                    currentPage =1;
                    render();
                    // 手动重置表单
                    $('#dropdownText').text('请选择二级分类');
                    $('#imgbox img').remove();
                    // 重置数组 picArr
                    picArr =[];

                }
            }
        })
    });
})