import { createClientSupabase } from './config/supabse.js'

import DOMPurify from 'dompurify';
const blog = document.getElementById('blog')

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Create a single supabase client for interacting with your database
const supabase = createClientSupabase()
const { data, error } = await supabase
  .from('blogs')
  .select('*')
  .eq('id', id)
console.log(data)

if (data.length === 0) {
    blog.innerHTML = "No blog found" 
}else {
    const text = DOMPurify.sanitize(data[0].text)
    blog.innerHTML = `
    <h2>${data[0].title}</h2>
    <p>${text}</p>
    <span>创建时间：${data[0].created_at}</span>
    <a href="/">返回</a>
    `
}

