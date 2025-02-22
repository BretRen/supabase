    // // 导入创建 Supabase 客户端的函数
    // import { createClientSupabase } from '../config/supabse.js'
    import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
    export function createClientSupabase() {
        // Supabase 客户端初始化
        const supabase = createClient('https://lysuqcspfpugxozttfek.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c3VxY3NwZnB1Z3hvenR0ZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMjM3NTYsImV4cCI6MjA0OTY5OTc1Nn0.LFafqHaLxS5r3yynw8EydY0VjGlVI7jwr7cr4ovg7P4');
        return supabase
    }
    // 创建 Supabase 客户端
    const supabase = createClientSupabase();

    // 当前已加载的小说数量
    let moreData = 0;
    const itemsPerPage = 5; // 每次加载的小说数量

    // 获取小说数据
    async function moreNovel(offset, limit) {
        const { data, error } = await supabase
            .from('novel')
            .select('title, introduction, id, created_at')
            .range(offset, offset + limit - 1); // 使用范围查询进行分页

        return { data, error };
    }

    // 显示小说列表
    export async function getNovel(novel, novelButton) {
        novel.innerHTML = ''; // 清空内容
        console.log("加载小说...");

        const token = localStorage.getItem('sb-lysuqcspfpugxozttfek-auth-token');
        if (!token) {
            alert("请先登录");
            return;
        }

        // 获取第一页小说
        const { data, error } = await moreNovel(moreData, itemsPerPage);

        if (error) {
            console.error('获取文章列表失败:', error);
            alert("获取文章列表失败");
            return;
        } else if (data.length === 0) {
            alert("你没有权限或者没有小说可显示");
            return;
        }



        // 创建 "更多小说" 按钮
        const nextpage = document.createElement('button');
        nextpage.textContent = "更多小说";
        nextpage.id = 'nextpage';
        novel.appendChild(nextpage);

        // 渲染小说数据
        renderNovels(novel, data);


    }

    // 渲染小说数据
    function renderNovels(novel, data) {
        const moreDataNovels = document.getElementById("nextpage")
        novel.removeChild(moreDataNovels);
        data.forEach(item => {
            const div = document.createElement('div');
            const title = document.createElement('h3');
            const introduction = document.createElement('p');
            const created_at = document.createElement('p');
            const link = document.createElement('a')

            link.href = "/novel.html?id=" + item.id;

            link.textContent = item.title;
            title.appendChild(link);
            introduction.textContent = "简介：" + item.introduction;
            created_at.textContent = "创建时间：" + new Date(item.created_at).toLocaleString();

            div.appendChild(title);
            div.appendChild(introduction);
            div.appendChild(created_at);

            novel.appendChild(div);
        });
        // 创建 "更多小说" 按钮
        const nextpage = document.createElement('button');
        nextpage.textContent = "更多小说";
        nextpage.id = 'nextpage';
        novel.appendChild(nextpage);
        // 监听 "更多小说" 按钮点击事件
        nextpage.addEventListener('click', async () => {
            console.log("加载更多小说...");
            moreData += itemsPerPage; // 计算下一次的偏移量

            const { data, error } = await moreNovel(moreData, itemsPerPage);

            if (error) {
                console.error('获取文章列表失败:', error);
                alert("获取文章列表失败");
                return;
            } else if (data.length === 0) {
                alert("没有更多小说了！");
                nextpage.disabled = true; // 禁用按钮
                return;
            }

            // 追加新小说数据
            renderNovels(novel, data);
        });
    }
