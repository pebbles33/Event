$(function () {

    //获取layui相关属性
    var form = layui.form;
    var layer = layui.layer;
    var login = $('.loginBox');
    var reg = $('.regBox')
    $('.toReg').on('click', function () {
        login.hide();
        reg.show();
    })
    $('.toLogin').on('click', function () {
        reg.hide();
        login.show();
    })
    //自定义表单验证规则
    form.verify({
        psw: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samepsw: function (value) {
            var psw = $('.regBox [name=password]').val();
            if (value !== psw) {
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的提交事件
    $('#regForm').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！')
                //机器模拟自动触发事件 跳到登录表单
                $('.toLogin').click()
            }
        })

    })
    //监听登录表单的提交事件
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //登陆成功后页面跳转到后台首页
                location.href = '/index.html';
                //将服务器返回来的token永久的存储在本地
                //token用于有权限接口的身份认证
                localStorage.setItem('token', res.token);
            }
        })

    })
})