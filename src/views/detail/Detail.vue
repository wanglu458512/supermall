<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <div>
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <!-- <detail-goods-info :detail-info="detailInfo" @imagesLoad="imagesLoad"></detail-goods-info> -->
        <detail-param-info
          ref="param"
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
    // DetailBottomBar,
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
    };
  },
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
      // 2.5.获取商品信息
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
    })

    getRecommend().then((res, error) => {
      console.log(res);
      if (error) return;
      this.recommendList = res.data.list;
    });
  },
  methods:{
    imagesLoad(){
      this.$refs.scroll.refresh()
    }
  }
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
  position: absolute;
  top: 44px;
  bottom: 60px;
}

/* .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  } */
</style>
