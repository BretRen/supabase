import { createClientSupabase } from './config/supabse.js'

const supabase = createClientSupabase()
const token = localStorage.getItem('sb-lysuqcspfpugxozttfek-auth-token');
const link = document.getElementById('link')
const logout = document.getElementById('logout')
const up_password = document.getElementById('up-password')
const up_password_div = document.getElementById('up-password-div')


if (token) {
    console.log("Token 存在:", token);
    logout.style.display = 'block';
    up_password.style.display = 'block';
    link.innerHTML = '<a href="./blogs.html">blogs</a> <br>'
} else {
    console.log("Token 不存在，用户未登录");
    link.innerHTML = '<a href="./login.html">登录</a> <br> <a href="./reg.html">注册</a> <br> <a href="./blogs.html">blogs</a>'
}
logout.addEventListener('click', () => {
    localStorage.removeItem('sb-lysuqcspfpugxozttfek-auth-token');
    window.location.href = './index.html';
})

up_password.addEventListener('click', () => {
    //

    // 禁用按钮 
    up_password.disabled = true

    //创建输入框
    const new_password = document.createElement('input')
    const p_new_password = document.createElement('p')

    //更改输入框类型
    new_password.type = 'password'

     // 创建文字
    p_new_password.innerText = "new password"

    //添加到 DOM
    up_password_div.appendChild(p_new_password)
    up_password_div.appendChild(new_password)

    // 创建确认输入框
    const check_password = document.createElement('input')
    const p_check_password = document.createElement('p')
    
    // 创建文字
    p_check_password.innerText = "Re-enter new password"

    //更改输入框类型
    check_password.type = 'password'

    //添加到 DOM
    up_password_div.appendChild(p_check_password)
    up_password_div.appendChild(check_password)

    // 修改密码按钮
    const sub_up_password = document.createElement('button')
    sub_up_password.innerText = "修改密码"

    // 取消
    const cancel_up_password = document.createElement('button')
    cancel_up_password.innerText = "取消"

    // 取消所有更改密码的DOM
    cancel_up_password.addEventListener('click', () => {
        up_password_div.removeChild(p_new_password)
        up_password_div.removeChild(new_password)
        up_password_div.removeChild(p_check_password)
        up_password_div.removeChild(check_password)
        up_password_div.removeChild(sub_up_password)
        up_password_div.removeChild(cancel_up_password)
        up_password.disabled = false

    })

    // 把取消按钮添加到 DOM
    up_password_div.appendChild(cancel_up_password)

    //添加到 DOM
    up_password_div.appendChild(sub_up_password)

    // 验证
    sub_up_password.addEventListener('click', async () => {
        if (new_password.value.length < 8 && check_password.value.length < 8) {
            alert("Password must be at least 8 characters long")
            return
        }
        if (new_password.value !== check_password.value) {
            alert("两次输入的新密码不一致")
            return
        }
        sub_up_password.disabled = true
        const { data, error } = await supabase.auth.updateUser({
            password: new_password.value
          })
        console.log(data)
        if (error) {
            alert("修改密码失败，原因：" + error)
            return
        }else {
            localStorage.removeItem('sb-lysuqcspfpugxozttfek-auth-token');
            alert("修改密码成功")
            alert("请重新登录")
            window.location.href = './index.html'

        }



    })
})
