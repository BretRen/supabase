import { createClient } from '@supabase/supabase-js'
import DOMPurify from 'dompurify';
const blog = document.getElementById('blog')

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// Create a single supabase client for interacting with your database
const supabase = createClient('https://lysuqcspfpugxozttfek.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c3VxY3NwZnB1Z3hvenR0ZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMjM3NTYsImV4cCI6MjA0OTY5OTc1Nn0.LFafqHaLxS5r3yynw8EydY0VjGlVI7jwr7cr4ovg7P4')
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

