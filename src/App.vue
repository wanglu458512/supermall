<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-if="$route.meta.footShow"/>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabbar/MainTabBar";
  export default {
    name:'App',
    components:{
      MainTabBar
    },
    data(){
      return{

      }
    }
  }
</script>
<style>
  @import "assets/css/base.css";

</style>
