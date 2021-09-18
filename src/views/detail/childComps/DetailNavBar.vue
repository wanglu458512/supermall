<template>
  <nav-bar class="detail-nav">
    <img
      slot="left"
      class="back"
      @click="backClick"
      src="~assets/img/common/back.svg"
    />
    <div class="title" slot="center">
      <span
        class="title-item"
        v-for="(item, index) in titles"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="titleClick(index)"
      >
        {{ item }}
      </span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick: function (index) {
      this.currentIndex = index;// 实现点击哪一个哪一个变为红
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();// 返回上一个页面
    },
  },
};
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}

.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.title-item.active {
  color: var(--color-high-text);
}

.back {
  margin-top: 12px;
}
</style>
