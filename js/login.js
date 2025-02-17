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
    const { data, error: errorSupabase } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })
      
    console.log(data)
    if (errorSupabase) {
        error.innerText = "Login failed: " + errorSupabase.message;
        sub.disabled = false; // 失败时重新启用按钮
        return;
    }else {
        error.innerHTML = '登录成功<br><a href="/">back</a>'
    }

})




// const { data, errorSupabase } = await supabase.auth.signUp({
//     email: 'example@email.com',
//     password: 'example-password',
//   })