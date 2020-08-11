import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import('../components/Login.vue')
const Home = () => import('../components/Home.vue')
const Welcome = () => import('../components/Welcome.vue')
const Users = () => import('../components/user/Users.vue')
const Rights = () => import('../components/power/Rights.vue')
const Roles = () => import('../components/power/Roles.vue')

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children: [
        {
          path:'/welcome',
          component:Welcome
        },
        {
          path:'/users',
          component:Users
        },
        {
          path:'/rights',
          component:Rights
        },
        {
          path:'/roles',
          component:Roles
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})


export default router
