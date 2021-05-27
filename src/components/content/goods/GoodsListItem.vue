@<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
name:"GoodsListItem",
props:{
  goodsItem:{
    type:Object,
    default(){
      return {}
    }
  }
},
methods:{
  // vue中监听图片记载完成用@load
  // 非父子组件之间通信，这里用事件总线的方式
  // Vue.prototype.$bus = new Vue() 
  // this.bus.emit('事件名称', 参数)
  // this.bus.on('事件名称', 回调函数(参数))
  imageLoad(){
    this.$bus.$emit('itemImageLoad')
  },
  itemClick(){
    this.$router.push('/detail/'+this.goodsItem.iid)
  }
},
computed:{
  showImage(){
    return this.goodsItem.image || this.goodsItem.show.img
    // return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
  }
}
}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>