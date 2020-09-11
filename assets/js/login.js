$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    let form = layui.form
    let layer = layui.layer
    form.verify({                 
        pwd: [/^[\S]{6,12}$/, '密码为6-12位，不能为空格'],
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd != value) return ('密码不一致')
        }
    })
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form-reg  [name=username]').val(),
            password:$('#form-reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function ( res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg(res.message)
            $('#link_login').click()
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        console.log(data);
        $.post('http://ajax.frontend.itheima.net/api/login', data, function (res) {
            if (res.status !== 0) return layer.msg('用户名或密码错误')
            layer.msg(res.message)
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        })
    })
})