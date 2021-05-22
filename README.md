# supermall

# 目录结构
- network
- components -> common/content
- pages -> 路由分层
- common 
- assets
- router
- store

# 设置CSS初始化和全局样式
- initialize.css
- base.css

# 项目步骤

# 首页制作开始
1.tabbar封装
2.axios封装
3.navbar封装

4.封装请求首页数据
- 封装请求首页更多数据
- 将banner数据放在banners变量中
- 将recommend数据放在recommends变量中

5.根据swiper封装HomeSwiper
- 使用Swiper和SwiperItem
- 传入banners进行展示

6.封装HomeRecommendView
- 传入recommends数据，进行展示

7.封装FeatureView
- 展示一张图片即可

8.封装TabControl

9.首页商品数据的请求 | 对首页数据进行展示
- 设计数据结构
- 发送数据请求
- 封装GoodsList组件
- 封装GoodsListItem组件

10.对滚动进行重构: Better-Scroll

11.返回顶部BackTop
# 首页结束

# 详情页开始
- 未解决detailgoodsinfo加入后界面混乱的问题，暂时没有将该组件展示出来

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
