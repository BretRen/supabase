// 导入创建 Supabase 客户端的函数
import { createClientSupabase } from './config/supabse.js'

// 创建 Supabase 客户端
const supabase = createClientSupabase()

// 从 localStorage 获取保存的认证 token
const token = localStorage.getItem('sb-lysuqcspfpugxozttfek-auth-token');

// 获取 HTML 页面中的 DOM 元素
const link = document.getElementById('link')  // 用于显示链接
const logout = document.getElementById('logout')  // 退出登录按钮
const up_password = document.getElementById('up-password')  // 修改密码按钮
const up_password_div = document.getElementById('up-password-div')  // 用于显示密码输入框的容器
const params = new URLSearchParams(window.location.search);  // 获取 URL 中的查询参数

// 检查是否存在认证 token
if (token) {
    console.log("Token 存在:", token);  // 如果 token 存在，说明用户已登录
    logout.style.display = 'block';  // 显示退出登录按钮
    up_password.style.display = 'block';  // 显示修改密码按钮
    link.innerHTML = '<a href="./blogs.html">blogs</a> <br>'  // 显示博客链接
} else {
    console.log("Token 不存在，用户未登录");  // 如果 token 不存在，说明用户未登录
    link.innerHTML = '<a href="./login.html">登录</a> <br> <a href="./reg.html">注册</a> <br> <a href="./blogs.html">blogs</a>'  // 显示登录、注册、博客链接
}

// 退出登录事件
logout.addEventListener('click', () => {
    // 删除保存的认证 token
    localStorage.removeItem('sb-lysuqcspfpugxozttfek-auth-token');
    // 跳转到首页
    window.location.href = './index.html';
})

// 修改密码函数
function up_password_function() {
    // 禁用修改密码按钮，防止重复点击
    up_password.disabled = true;

    // 创建新的输入框用于输入新密码
    const new_password = document.createElement('input')
    const p_new_password = document.createElement('p')

    // 更改输入框类型为密码框
    new_password.type = 'password'

    // 创建文字提示
    p_new_password.innerText = "new password"

    // 添加到 DOM 中
    up_password_div.appendChild(p_new_password)
    up_password_div.appendChild(new_password)

    // 创建第二个输入框，用于确认新密码
    const check_password = document.createElement('input')
    const p_check_password = document.createElement('p')

    // 创建文字提示
    p_check_password.innerText = "Re-enter new password"

    // 更改输入框类型为密码框
    check_password.type = 'password'

    // 添加到 DOM 中
    up_password_div.appendChild(p_check_password)
    up_password_div.appendChild(check_password)

    // 创建“修改密码”按钮
    const sub_up_password = document.createElement('button')
    sub_up_password.innerText = "修改密码"

    // 创建“取消”按钮
    const cancel_up_password = document.createElement('button')
    cancel_up_password.innerText = "取消"

    // 取消按钮的点击事件：移除所有的输入框和按钮，恢复修改密码按钮
    cancel_up_password.addEventListener('click', () => {
        up_password_div.removeChild(p_new_password)
        up_password_div.removeChild(new_password)
        up_password_div.removeChild(p_check_password)
        up_password_div.removeChild(check_password)
        up_password_div.removeChild(sub_up_password)
        up_password_div.removeChild(cancel_up_password)
        up_password.disabled = false  // 恢复修改密码按钮的可用状态
    })

    // 将取消按钮添加到 DOM 中
    up_password_div.appendChild(cancel_up_password)

    // 将修改密码按钮添加到 DOM 中
    up_password_div.appendChild(sub_up_password)

    // 提交修改密码事件
    sub_up_password.addEventListener('click', async () => {
        // 验证密码长度
        if (new_password.value.length < 8 || check_password.value.length < 8) {
            alert("Password must be at least 8 characters long")
            return
        }

        // 验证两次密码是否一致
        if (new_password.value !== check_password.value) {
            alert("两次输入的新密码不一致")
            return
        }

        // 禁用提交按钮，防止重复提交
        sub_up_password.disabled = true

        // 使用 Supabase API 更新用户的密码
        const { data, error } = await supabase.auth.updateUser({
            password: new_password.value
        })

        console.log(data)

        // 如果发生错误，提示错误信息
        if (error) {
            alert("修改密码失败，原因：" + error.message)
            return
        } else {
            // 如果修改成功，清除认证 token 并跳转到首页
            localStorage.removeItem('sb-lysuqcspfpugxozttfek-auth-token');
            alert("修改密码成功")
            alert("请重新登录")
            window.location.href = './index.html'  // 跳转到首页
        }
    })
}

// 为修改密码按钮添加点击事件
up_password.addEventListener('click', up_password_function)

// 获取 URL 中的查询参数 type
const type = params.get('type')

// 如果查询参数 type 为 'resetpassword'，则直接调用修改密码函数
if (type == 'resetpassword') {
    up_password_function()
}
