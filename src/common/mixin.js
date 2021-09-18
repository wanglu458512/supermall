import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop";

export const itemLisenterMixin = {
  mounted() {
    // 3.监听一些事件
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('imgLoad', () => {
      refresh() 
      console.log("我是混入的内容");
    })
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    }
  }
}

