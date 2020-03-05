$(function () {

    var layer = layui.layer
    var $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options)

    $('#btnChange').on('click', function () {
        $('#file').click()
    })


    $('#file').on('change', function (e) {
        // console.log(e);
        var files = e.target.files
        // console.log(file);
        if (files.length === 0) { return layer.msg('请选择图片') }

        var newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)
    })

    $('#sure').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 2. 上传头像到服务器
        $.post('/my/update/avatar', { avatar: dataURL }, function (res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败！')
            }
            layer.msg('更换头像成功！')
            // 调用父页面中的方法，重新渲染头像
            window.parent.getUserInfo()
        }
        )
    })


})