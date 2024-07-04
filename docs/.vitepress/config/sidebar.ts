export const sidebar={
    '/docx/':[
        {
            text: 'Welcome',
            collapsed: false,
            items: [
                { text: 'Hello', link: '/docx/hello/hello' },
                { text: '资源记录', link: '/docx/hello/资源记录' },
            ]
        },
        {
            text: 'Go',
            collapsed: true,
            items: [
                { text: '学习', link: '/docx/go/学习' },
            ]
        },
        {
            text: 'leetcode',
            collapsed: true,
            items: [
                { text: '常用操作', link: '/docx/leetcode/常用操作' },
                { text: '代码1', link: '/docx/leetcode/代码1' },
                { text: '代码2', link: '/docx/leetcode/代码2' },
            ]
        },
        // {
        //     text: 'C/C++',
        //     collapsed: false,
        //     items: [
        //         { text: 'C入门1',link: '/docx/C-C++/C入门1' },
        //     ]
        // },
        {
            text: 'git',
            collapsed: true,
            items: [
                { text: '入门1', link: '/docx/git/入门1' },
            ]
        },
        {
            text: 'Docker',
            collapsed: true,
            items: [
                { text: '01', link: '/docx/Docker/01' },
                { text: '02', link: '/docx/Docker/02' },
                { text: '03', link: '/docx/Docker/03' },
                { text: '04', link: '/docx/Docker/04' },
            ]
        },
        {
            text: '云原生',
            collapsed: true,
            items: [
                { text: 'docker', link: '/docx/云原生/docker' },
                { text: 'DevOps', link: '/docx/云原生/DevOps' },
            ]
        },
    ],
    '/前端开发/':[
        {
            text: '基础',
            collapsed: false,
            items: [
                { text: '构建网站的工具', link: '/前端开发/基础/构建网站的工具' },
                { text: '前端模块化', link: '/前端开发/基础/前端模块化' },
            ]
        }, 
        {
            text: 'HTML',
            collapsed: false,
            items: [
                { text: '简介', link: '/前端开发/html/introduce' },
            ]
        },
        {
            text: 'CSS',
            collapsed: false,
            items: [
                { text: '简介', link: '/前端开发/css/introduce' },
                { text: 'CSS基础', link: '/前端开发/css/CSS基础' },
                { text: '样式设置', link: '/前端开发/css/样式设置' },
                { text: '十种布局', link: '/前端开发/css/十种布局' },
            ]
        },
        {
            text: 'JavaScript',
            collapsed: false,
            items: [
                { text: '简介', link: '/前端开发/javascript/introduce' },
                { text: '定义', link: '/前端开发/javascript/定义' },
                { text: '一些语法', link: '/前端开发/javascript/一些语法' },
                { text: '字符串', link: '/前端开发/javascript/字符串' },
                { text: '数组', link: '/前端开发/javascript/数组' },
                { text: '代码块', link: '/前端开发/javascript/代码块'},
                { text: 'js对象', link: '/前端开发/javascript/js对象'},
                { text: '面向对象', link: '/前端开发/javascript/面向对象'},
                { text: 'json', link: '/前端开发/javascript/json'},
                { text: '异步', link: '/前端开发/javascript/异步'},
                { text: '客户端WebAPI', link: '/前端开发/javascript/客户端WebAPI'},
                { text: 'ES6', link: '/前端开发/javascript/ES6'},
                { text: 'web表单', link: '/前端开发/javascript/web表单'},
                { text: '客户端web开发工具', link: '/前端开发/javascript/客户端web开发工具'},
                { text: '客户端框架介绍', link: '/前端开发/javascript/客户端框架介绍'},
                
            ]
        },
        {
            "text":"工具库",
            collapsed:false,
            items:[
                {text:'axios',link:'/前端开发/工具库/axios.md'},
            ]
        },
        {
            "text":"测试",
            collapsed:false,
            items:[
                {text:'mockjs',link:'/前端开发/测试/mockjs.md'},
            ]
        },
        {
            "text":'webpack',
            collapsed:false,
            items:[
                { text: '基础知识', link: '/前端开发/webpack/基础知识.md' },
                { text: '核心概念', link: '/前端开发/webpack/核心概念.md' },
                { text: '渐进式网络应用程序PWA', link: '/前端开发/webpack/渐进式网络应用程序PWA.md' },
                { text: '一些特性', link: '/前端开发/webpack/一些特性.md' },
            ]
        },
        {
            "text":'typescript',
            collapsed:false,
            items:[
                { text: '基础知识', link: '/前端开发/typescript/基础知识.md' },
            ]
        },
        {
            text: 'React',
            collapsed: false,
            items: [
                {text: '入门',link:'/前端开发/React/入门'},
                {text:'入门项目开始',link:'/前端开发/React/入门项目开始'},
                {text:'day1',link:'/前端开发/React/day1'},
                {text:'day2',link:'/前端开发/React/day2'},
                {text:'Hooks',link:'/前端开发/React/Hooks'},
                {text:'知识记录',link:'/前端开发/React/知识记录'},
            ]
        },
        {
            text: 'Vue',
            collapsed: false,
            items: [
                {text: '入门',link:'/前端开发/Vue/入门'},
                {text:'day1',link:'/前端开发/Vue/day1'},
                {text:'day2',link:'/前端开发/Vue/day2'},
                {text:'day3',link:'/前端开发/Vue/day3'},
                {text:'day4',link:'/前端开发/Vue/day4'},
                {text:'day5',link:'/前端开发/Vue/day5'},
                {text:'day6',link:'/前端开发/Vue/day6'},
                {text:'day7',link:'/前端开发/Vue/day7'},
                {text:'day8',link:'/前端开发/Vue/day8'},
                {text:'vue3',link:'/前端开发/Vue/vue3'},
                {text:'Vue单元测试',link:'/前端开发/Vue/Vue单元测试'},
            ]
        },
        {
            text: '微信小程序',
            collapsed: false,
            items:[
                { text: 'day1', link:'/前端开发/微信小程序/day1' },
                { text: 'day2', link:'/前端开发/微信小程序/day2' },
                { text: 'day3', link:'/前端开发/微信小程序/day3' },
                { text: 'day4', link:'/前端开发/微信小程序/day4' },
                { text: '案例', link:'/前端开发/微信小程序/案例' },
            ]
        },
        {
            text: 'uni-app',
            collapsed: false,
            items:[
                { text: 'day1', link:'/前端开发/uni-app/day1' },
            ]
        },
        {
            text: '跨浏览器测试',
            collapsed:false,
            items:[
                {text:'介绍',link:'/前端开发/跨浏览器测试/介绍'},
            ]
        },
        {
            text: '服务端网页编程',
            collapsed:false,
            items:[
                {text: '介绍',link:'/前端开发/服务端网页编程/介绍'},
                {text:'Django',link:'/前端开发/服务端网页编程/Django'},
                {text:'代码',link:'/前端开发/服务端网页编程/代码'},
            ]
        },
    ],
    '/article/':[
        {
            text: 'Welcome',
            collapsed: false,
            items: [
                { text: 'hello', link: '/article/hello/hello' },
            ]
        },
        {
            text:'待学列表',
            collapsed: false,
            items:[
                { text: '待学列表整理', link: '/article/待学列表/待学列表整理' }
            ]
        }
    ],
    '/杂项/':[
        {
            text: '安全',
            collapsed: false,
            items: [
                { text: '同源策略', link: '/杂项/安全/同源策略' },
                { text: '内容安全策略', link: '/杂项/安全/CSP' },
                { text: 'XSS和CSRF', link: '/杂项/安全/XSS和CSRF' },
            ]
        },
    ],
}
