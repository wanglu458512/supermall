@<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    //防止better-scroll创建完之后在执行完mounted之后会被销毁 所以提前保存下来
    return {
      scroll: null,
      message: "haha",
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 1.创建BScroll对象,在这里元素的选取要采用this.$refs.ref名字，这样的话选取的就是一个唯一确定的元素了，如果用document.querySelector选取的话如果类名冲突，就会导致选取元素错误还不好排错，所以要用refs的形式。
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeDOM: true,
      observeImage: true,
      mouseWheel:true
    });
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }
    // 3.监听scroll滚到底部，pullingUp上拉刷新
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        // console.log('监听滚动到底部');
        this.$emit('pullingUp')
      })
    }

  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll ?this.scroll.y :0
    }
  },
};
</script>

<style scoped>
</style>