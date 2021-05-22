import Vue from 'vue'
import VueRouter from 'vue-router'
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home',
    meta: {
      footShow: true, // true显示，false隐藏
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      footShow: true, // true显示，false隐藏
    },

  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      footShow: true, // true显示，false隐藏
    },

  },
  {
    path: '/home',
    component: Home,
    meta: {
      footShow: true, // true显示，false隐藏
    },

  },
  {
    path: '/category',
    component: Category,
    meta: {
      footShow: true, // true显示，false隐藏
    },

  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
