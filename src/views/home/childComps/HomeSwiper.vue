@<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.id">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return{
      isLoad:false
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods:{
    imageLoad(){
      // 为了不让HomeSwiper多次发出事件,可以使用isLoad的变量进行状态的记录
      if(!this.isLoad){
        this.$emit("swiperImageLoad")
        this.isLoad=true
      } 
    }
  }
};
</script>

<style>

</style>