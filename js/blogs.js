import { createClientSupabase } from './config/supabse.js'
const blogs = document.getElementById('blogs')
const page = document.getElementById('page')
blogs.innerText = "加载中"

let pageInOne = 2

const params = new URLSearchParams(window.location.search);
let pages = Number(params.get('pages')) || 1;


const supabase = createClientSupabase()
async function fetchBlogs() {
    try {
        // 获取总博客数
        const { count, error: countError } = await supabase
            .from('blogs')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('获取博客总数失败:', countError);
            blogs.innerText = "加载失败，请稍后重试";
            return;
        }

        if (count < pageInOne) {
            pageInOne = count;
        }

        // 获取当前页的博客
        const { data, error } = await supabase
            .from('blogs')
            .select()
            .range((pages - 1) * pageInOne, pages * pageInOne - 1);

        if (error) {
            console.error('获取博客失败:', error);
            blogs.innerText = "加载失败，请稍后重试";
            return;
        }

        blogs.innerText = "";
        data.forEach((item) => {
            let text = item.text.length > 10 ? item.text.slice(0, 10) + '...' : item.text;

            let blogDiv = document.createElement('div');
            blogDiv.classList.add('blog');

            let titleElement = document.createElement('h2');
            let titleLink = document.createElement('a');
            titleLink.href = `/blog.html?id=${item.id}`;
            titleLink.textContent = item.title;
            titleElement.appendChild(titleLink);

            let textElement = document.createElement('p');
            textElement.textContent = text;

            let dateElement = document.createElement('span');
            dateElement.textContent = `创建时间：${item.created_at}`;

            blogDiv.appendChild(titleElement);
            blogDiv.appendChild(textElement);
            blogDiv.appendChild(dateElement);

            blogs.appendChild(blogDiv);
            blogs.appendChild(document.createElement('br'));
        });

        // 处理分页逻辑
        let totalPages = Math.ceil(count / pageInOne);
        let nextpageHTML = "";

        if (pages > 1) {
            nextpageHTML += `<a href="/blogs.html?pages=${pages - 1}">上一页</a> `;
        }
        if (pages < totalPages) {
            nextpageHTML += `<a href="/blogs.html?pages=${pages + 1}">下一页</a>`;
        }

        if (totalPages > 1) {
            page.innerHTML = `第 ${pages} 页 / 共 ${totalPages} 页<br>${nextpageHTML}`;
        }
    } catch (error) {
        console.error('加载博客时发生错误:', error);
        blogs.innerText = "加载失败，请稍后重试";
    }
}

// 运行
fetchBlogs();
