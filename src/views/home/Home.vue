@<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 让home中的内容保持原来的位置
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY,0);   
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY() 
    // 2.取消监听
    this.$bus.$off('itemImageLoad', () => {
      this.debounce(this.$refs.scroll.refresh, 50)
	})
  },
  // 网络请求数据
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    //2 调用请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // bug解决首页中可滚动区域的问题：监听每一张图片是否加载完成，每一次执行依次refresh
    // 1.图片加载完成后的事件监听,非父子组件的通信,itemImageLoad->GoodsListItem
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    // 事件监听
    // 1.监听tabclick 流行 精选 热卖的点击,实现吸顶
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 利用scrollTo方法实现返回顶端
    backClick() {
      // console.log('backClick');
      this.$refs.scroll.scrollTo(0, 0);
    },
    //  获取到tabControl的offsetTop,监听HomeSwiper中img的加载完,可以使用isLoad的变量进行状态的记录不让HomeSwiper多次发出事件
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 利用position属性，判断BackTop显示和隐藏、TabContro是否吸顶
    contentScroll(position) {
      // console.log(position+'返回顶端的显示和隐藏');
      // 1.判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.判断tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // @pullingUp="loadMore" 滚动到底部，上拉加载更多
    loadMore() {
      // 传入tabClick方法的currentType，获取商品列表数据
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },

    // 网络请求相关
    // 1.请求首页轮播图、recmmoned的数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 2.请求首页商品数据,动态获取page
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res.data);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>


<style scoped>
.home-nav {
  /* 在使用浏览器原生滚动时 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
  background-color: var(--color-tint);
  color: rgb(255, 255, 255);
}
.tab-control {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: calc(100vh-93px); 报错*/
}
/* .fixed {
  position: fixed;
  right: 0;
  left: 0;
  top: 44px;
} */
</style>