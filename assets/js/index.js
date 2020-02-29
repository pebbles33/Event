$(function () {

    getUserInpo();
    //退出事件绑定
    $('#btnExit').on('click', function () {
        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            // layer.close 表示关闭指定的弹出层
            layer.close(index)
        });
    })
})
//发送请求来获取用户信息
function getUserInpo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            //渲染用户头像
            renderAvatar(res.data);
        }
        //请求完毕后 不管失败还是成功都要执行的回调函数
        //complete: function (res) {
        // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     // 验证失败 做相应操作
        //     localStorage.removeItem('token')
        //     location.href = '/login.html'
        // }
        //  }
    })
}
//对获取到的用户信息进行处理
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //图片头像
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user_pic).show()
        $('.text-avatar').hide()
    }
    //文本头像
    else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}