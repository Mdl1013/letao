

// 表单验证
$(function () {
    $('#form').bootstrapValidator({
        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //设置校验规则
        fields: {

            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名长度必须是2-6位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "用户密码长度为6-12位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }

        }

    });


    // 表单验证成功，使用ajax提交
    $('#form').on("success.form.bv", function (e) {
        //阻止表单的默认提交
        e.preventDefault();
       
        //使用ajax进行提交
        // 通过 ajax 进行提交
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            // 表单序列化
            data: $('#form').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 跳转到首页
                    location.href = "index.html";
                }

                if (info.error === 1000) {
                    // 提示用户名不存在
                    // alert( info.message );
                    // 调用插件实例方法, 更新校验状态成失败
                    // updateStatus
                    // 参数1: 校验字段
                    // 参数2: 校验状态  NOT_VALIDATED未校验, VALIDATING校验中, INVALID校验失败 or VALID成功
                    // 参数3: 配置校验规则, 用于配置提示信息
                    $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
                }

                if (info.error === 1001) {
                    // 密码错误
                    $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
                }
            }
        })

    })


    // 
    $("[type='reset']").on('click', function () {
        $("#form").data("bootstrapValidator").resetForm(true);
    })




})
