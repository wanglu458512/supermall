import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
