import { createClientSupabase } from './config/supabse.js'
const supabase = createClientSupabase()



function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const password = document.getElementById('password')
const email = document.getElementById('email')
const error = document.getElementById('error')
const sub = document.getElementById('sub')

sub.addEventListener('click', async () => {
    error.innerText = ""
    if (!isValidEmail(email.value)) {
        error.innerText = "Invalid email"
        return
    }
    if (password.value.length < 8) {
        error.innerHTML += "<br>Password must be at least 8 characters long"
        return
    }

    sub.disabled = true
    const { data, error: errorSupabase } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
    })
    console.log(data)
    if (errorSupabase) {
        error.innerText = "Signup failed: " + errorSupabase.message;
        sub.disabled = false; // 失败时重新启用按钮
        return;
    }else {
        error.innerHTML = '注册成功，请查看邮箱并确定然后登录,如果没有收到请检查是否已经注册！<br><a href="./login.html">登录</a>'
    }

})




// const { data, errorSupabase } = await supabase.auth.signUp({
//     email: 'example@email.com',
//     password: 'example-password',
//   })
