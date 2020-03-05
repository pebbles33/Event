$(function () {
    var layer = layui.layer
    var form = layui.form
    form.verify({
        nickname: [
            /^[\S]{0,5}$/, '昵称必须1到5位，且不能出现空格'
        ]
    })
    initUserInfo()
    //获取用户信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //var data = res.data
                // $('[name=username]').val(data.username)
                // $('[name=nickname]').val(data.nickname)
                // $('[name=email]').val(data.email)
                //给表单所有元素赋值 给表单加lay-filter属性 
                form.val('form', res.data)
                layer.msg('获取用户信息成功')
            }
        })
    }

    //修改用户信息
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改用户信息成功')
                window.parent.getUserInfo();
            }
        })
    })

    //重置表单 还原信息
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()

    })
})
