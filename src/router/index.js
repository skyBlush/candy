import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Carousel from '@/components/Carousel'
import Lazy from '@/components/Lazy'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Detail from '@/components/Detail'
import Home from '@/components/Home'
import Homes from '@/components/Homes'
import Shop from '@/components/Shop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:fid',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/register',
      name:'Register',
      component:Register
    },
    {
      path: '/login',
      name:'Login',
      component:Login
    },
    {
      path: '/homes',
      name: 'Homes',
      component: Homes
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    }
  ]
})
