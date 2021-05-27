@<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" @click.native="checkClick" :isChecked="isCheckAll"></check-button>
      <span>全选</span>
    </div>
    <div class="totalPrice">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去结算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
import { mapGetters } from 'vuex';

export default {
  name: "CartBottomBar",
  data(){
    return{
      isChecked:false
    }
  },
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return ("￥" + this.$store.state.cartList.filter((item) => {
            return item.checked;
          }).reduce((preValue, item) => {
            return preValue + item.realPrice * item.count;
          },0).toFixed(2)
      );
    },
    checkLength(){
      return this.$store.state.cartList.filter((item)=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.count
      },0)
    },
    // 全选的状态显示：判断是否有一个不选中，全选就是不选中
    isCheckAll(){
      if(this.cartList.length===0) return false
		  // return !(this.$store.state.cartList.filter(item => !item.checked).length)
		  // return !this.$store.state.cartList.find(item => !item.checked)   //  return false
		  return this.cartList.every(item => item.checked)// retunr false 一假为假
    }

  },
  methods:{
    // 点击全选
    checkClick(){
      // console.log('---');
      if(this.isCheckAll){
        // 原来都是全选，点击一次，全部不选中
        this.cartList.forEach(item=>item.checked=false)
      }else {
        // 原来是全不选或者有一个不选，点击一次，全选中
        this.cartList.forEach(item => item.checked=true)
      }
    },
    calcClick(){
      if(!this.isCheckAll){
        if(this.cartList.length!=0){
            this.$toast.show('请选择要购买的商品')
          }else {
              this.$toast.show('请先加购商品到购物车')
          }
      }
    }
  }
};
</script>

<style>
.bottom-bar {
  display: flex;
  background: rgb(252, 236, 236);
  height: 40px;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  width: 60px;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.totalPrice {
  margin-left: 15px;
  flex: 1;
}
.calculate {
  width: 100px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>