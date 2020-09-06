import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/Home.vue'
import register from '@/views/register.vue'
import login from '@/views/Login.vue'
import userinfo from '@/views/userinfo.vue'
import edit from '@/views/Edit.vue'
import article from '@/views/Article.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {path:'/',component:home,meta:{keeepalive:true}},
        {path:'/register',component:register},
        {path:'/login',component:login},
        {path:'/userinfo',component:userinfo,meta:{
            istoken:true
        }},
        {path:'/edit',component:edit},
        {path:'/article/:id',component:article}
    ]
})

router.beforeEach((to, from, next) => {
    //to去哪里
    //from从哪儿来
    //next一个函数表示放行

    //用户要登录
    if (to.path === '/login') return next()

    //获取token
    const tokenstr = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    if (!tokenstr && !id && to.meta.istoken==true){
        next('/login')
        Vue.prototype.$msg.fail('请重新登录')
    }
    next()
})

export default router
