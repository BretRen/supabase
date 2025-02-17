import { createClientSupabase } from './config/supabse.js'
const supabase = createClientSupabase()
const email = document.getElementById('email')
const sub = document.getElementById('sub');
sub.addEventListener('click',async() => {
   sub.disabled = true
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
        redirectTo: 'http://127.0.0.1:3000/?type=resetpassword',
      })
    console.log(data)
    console.log(email.value, error)
    if (error) {
        sub.disabled = false
        alert(error)
    } else {
        alert("重置密码链接已发送到您的邮箱")
    }
})
