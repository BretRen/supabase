import { createClient } from '@supabase/supabase-js'

const blogs = document.getElementById('blogs')
const page = document.getElementById('page')
blogs.innerText = "加载中"

let pageInOne = 2

const params = new URLSearchParams(window.location.search);
let pages = Number(params.get('pages'))

if (!pages) {
    pages = 1;
    console.log("初始化")
}

// Create a single supabase client for interacting with your database
const supabase = createClient('https://lysuqcspfpugxozttfek.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c3VxY3NwZnB1Z3hvenR0ZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMjM3NTYsImV4cCI6MjA0OTY5OTc1Nn0.LFafqHaLxS5r3yynw8EydY0VjGlVI7jwr7cr4ovg7P4')

const { count, error2 } = await supabase
  .from('blogs')   // 选择表
  .select('*', { count: 'exact', head: true }); // 只返回 count，不返回数据


if (count < pageInOne) {
    pageInOne = count
    console.log("test")
}

const { data, error } = await supabase
  .from('blogs')
  .select()
  .range((pages - 1) * pageInOne, pages * pageInOne - 1)
console.log(data)



data.forEach((item) => {
    if (blogs.textContent == "加载中"){
        blogs.innerText = ""
    }
    console.log(item)
    let text = null
    if (item.text.length > 10) {
        text = item.text.slice(0, 10) + '...'
    }else {
        text = item.text
    }
    
    blogs.innerHTML += `
    <br>
    <div class="blog">
        <h2><a href="/blog.html?id=${item.id}">${item.title}<a/></h2>
        <p>${text}</p>
        <span>创建时间：${item.created_at}/</span>
    </div>
    <br>
    `

})
let nextpage = null
// pages
if (pages === 1 ){
    nextpage = `<a href="/blogs.html?pages=${pages + 1}">下一页</a>`
}else if (Math.ceil(count / pageInOne) ==  pages){
    nextpage = `<a href="/blogs.html?pages=${pages - 1}">上一页</a>`
}
else {
    nextpage = `<a href="/blogs.html?pages=${pages - 1}">上一页</a> <a href="/blogs.html?pages=${pages + 1}">下一页</a>`
}
if (pageInOne !== count){
    page.innerHTML = `
第 ${pages} 页 / 共 ${Math.ceil(count / pageInOne)} 页
${nextpage}
`
console.log(count)
console.log(pageInOne)
console.log(pages)

}
