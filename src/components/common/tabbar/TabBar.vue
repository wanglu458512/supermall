<template>
    <div class="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  .tab-bar{
    display: flex;
    background-color: #fdfdfd;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow:0 -2px 1px rgba(100,100,100,.2);
    z-index: 9;
  }
</style>
