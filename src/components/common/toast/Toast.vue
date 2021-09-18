<template>
  <div class="toast" v-show="isShow">
    <div >{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,duration=2000){
        this.isShow=true;
        this.message=message
        setTimeout(()=>{
          this.isShow=false;
          this.message=''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 5px;
    background-color: rgba(211, 111, 141, 0.8);
    padding: 8px 10px;
    color: #fff;
    font-size: 16px;
    z-index: 9999;
  }
</style>
