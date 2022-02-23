import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
// children
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/welcome',
    children:[
      {
        path: '/welcome',
        component: () => import('../views/home/welcome.vue')
      },
      {
        path: '/users',
        component: () => import('../views/home/users.vue')
      },
      {
        path: '/roles',
        component: () => import('../views/home/roles.vue')
      },
      {
        path: '/rights',
        component: () => import('../views/home/rights.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path:"*",
    redirect:"/"
  }
]

const router = new VueRouter({
  routes
})

// 添加路由守卫

router.beforeEach((to,from,next)=>{
  //  如果是登录页面  直接进入
  // 其他页面  需要先判断是否登录  登录进入   非登录跳转到登录页面
console.log(to)
   if(to.path=='/login'){
     next()
     return 
   }

   if(localStorage.getItem('token')){
     next()
   }else{
    // 跳转到登录页面
    next('/login')
   }

})

export default router
