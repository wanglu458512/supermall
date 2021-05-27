import Vuex from "vuex"
import Vue from "vue"
import getters from "./getters"

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      payload.checked=true
      state.cartList.push(payload);
    }
  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        // 1.查找之前数组中是否有该数据
        const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 2.判断oldProduct
        if (oldProduct) {
          // oldProduct.count+=1
          context.commit('addCounter', oldProduct)
          resolve('当前商品数量+1')
        } else {
          payload.count = 1
          context.commit('addToCart', payload)
          resolve('添加了新的商品')
        }
      })
    }
  },
  getters
})

export default store