$(function () {
    $.ajaxPrefilter(function (option) {
        //option是每次发送请求时的配置对象
        option.url = 'http://www.liulongbin.top:3007' + option.url;

        //每次请求时都需要判断请求的接口是否有权限，有则加请求头
        if (option.url.indexOf('/my/') !== -1) {
            option.headers = {
                Authorization: localStorage.getItem('token')
            }

            //每次进入一个页面都要发送一个请求 来验证用户是否登录
            option.complete = function (res) {
                // 使用 res.responseJSON 获取到服务器的响应内容
                //用户没有登录所以获取不到用户信息，验证失败
                if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                    // 验证失败 做相应操作
                    location.href = '/login.html'
                    localStorage.removeItem('token')

                }
            }
        }
    })
})