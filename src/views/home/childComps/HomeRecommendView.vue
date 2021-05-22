@<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommenditem">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 15px 0 16px;
  border-bottom: 3px solid rgb(228, 228, 228);
}
.recommenditem {
  flex: 1;
}
.recommenditem img {
  width: 80%;
  margin-bottom: 8px;
}
</style>