$(function () {
    //验证规则
    var layer = layui.layer
    var form = layui.form
    form.verify({
        psw: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        newpsw: function (value) {
            var oldp = $('[name=oldPwd]').val()
            if (value === oldp) {
                return '新旧密码不能相同'
            }
        },
        samepsw: function (value) {
            var newp = $('[name=newPwd]').val()
            if (value !== newp) {
                return '密码不相同'
            }
        }
    })
    //发起 请求
    $('form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改密码成功')
                //表单的原生DOM对象提供了reset() 用于重置表单
                $('form')[0].reset()
            }
        })
    })

})