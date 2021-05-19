import Vue from 'vue'
import VueRouter from 'vue-router'
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
