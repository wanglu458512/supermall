@<template>
  <div class="tab-control">
    <div :class="{active:index==currentIndex}" v-for="(item,index) in titles" class="tab-control-item" @click="itemClick(index)" :key="item.index">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    },
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active span {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}
</style>