<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <div>
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <!-- <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info> -->
        <detail-param-info
          ref="params"
          :param-info="paramInfo"
        ></detail-param-info>
        <detail-comment-info
          ref="comment"
          :comment-info="commentInfo"
        ></detail-comment-info>
        <detail-recommend-info
          ref="recommend"
          :recommend-list="recommendList"
        ></detail-recommend-info>
      </div>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @backTop="backTop" class="back-top" v-show="showBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top> -->
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import { debounce } from "common/utils";
import {mapActions, mapGetters} from "vuex"

import {
  getDetailId,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll,

    // BackTop
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      getThemeTopy:null,
    };
  },
  // 请求数据
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.请求数据
    getDetailId(this.iid).then((res) => {
      // console.log(res);
      // 2.1.获取结果
      const data = res.result;
      // 2.2.获取顶部信息
      this.topImages = data.itemInfo.topImages;
      // 2.3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 2.5.获取商品x详细信息
      this.detailInfo = data.detailInfo;
      // 2.6.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 2.7.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // this.$nextTick(()=>{
    // DOm被渲染 但是图片没有渲染完
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs); 
    // })

    // 获取主题的高度  
    this.getThemeTopy = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // this.themeTops.push(Number.MAX_VALUE)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop+this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs); // ???
    }, 100);

    getRecommend().then((res, error) => {
      // console.log(res);
      if (error) return;
      this.recommendList = res.data.list;
    });
  },

  // mounted(){
    // this.themeTopYs.push(0)
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
  //   console.log(this.themeTopYs);
  // },

  methods: {
    // ...mapActions(['addCart']),
    // 点击标题立即滚动到对应的位置
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    // 图片加载完获取主题的高度
    imageLoad() {
      // this.$refs.scroll.refresh();
      const refresh=debounce(this.$refs.scroll.refresh,50)
      refresh()
      this.getThemeTopy();
    },
    // 内容滚动 联动显示正确的标题???
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y;
      // 在positionY值和主题值之间对比
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (this.currentIndex !== i && 
          (positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1] )) {
          this.currentIndex=i
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },

    addToCart() {
      // 获取购物车信息
      // 1.创建对象
      const product = {};
      // 2.获取购物车需要展示的信息
      product.iid = this.iid;
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.realPrice = this.goods.realPrice;
      // 3.将商品添加到购物车中(1.promise 2.mapActions映射)
      // this.$store.commit("addCart", product);
      this.$store.dispatch('addCart', product).then(res=>{
        // console.log(res); 
        // 弹窗
        this.$toast.show(res,2000)
        // console.log(this.$toast);
      })
      // this.addCart(product).then(res =>{console.log(res);}) // mapActions
     

    },
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}

/* .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  } */
</style>
