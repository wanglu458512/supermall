# supermall
11111111111111111111111111111
2222222222222222222222222222
# 目录结构

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

10.对滚动进行重构: Better-Scroll,监听页面滚动，上拉加载更多

11.返回顶部BackTop

12.TabControl吸顶

13.Home中的内容保持原先的位置 keep-alive

# 首页总结
封装Better-Scroll，实现监听页面滚动、上拉加载更多效果；利用事件总线解决了刚开始时scrollerHeight未更新导致可滚动区域高度出错的问题；使用防抖函数优化refresh频繁刷新的问题；利用scrollTo方法实现返回顶端，在页面滚动过程中获取position，实现BackTop显示和隐藏、TabContro吸顶效果；使用vue-lazyload实现图片懒加载；


# 详情页开始
- 待解决详情页实现点击标题立即滚动到对应的位置，内容和标题联动效果
- 未解决detailgoodsinfo加入后界面混乱的问题，暂时没有将该组件展示出来,导致获取不到this.$refs.params.$el.offsetTop ，不能实现上一条功能

# 购物车
封装toast作为插件使用，实现弹窗效果，去购物弹窗，结算时弹窗
使用vuex管理购物车的商品对象，实现购物车数据在多个界面之间共享
实现购物车商品合计、全选按钮等功能

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
