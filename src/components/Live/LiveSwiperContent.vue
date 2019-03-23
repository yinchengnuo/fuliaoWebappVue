<template>
  <div class="live-swiper-content" @scroll="scroll" ref="scroller">
    <div class="wrapper" ref="scrollerContent">
      <UserItem v-for="(item, index) in liveListInfo" :key="index" :userInfo="item" :name="name"></UserItem>
      <WatchMore v-show="showWatchMore" :name="name"></WatchMore>
    </div>
    <ToTop v-show="scrollTop > 10" class="totop" @clicked="toTop"></ToTop>
  </div>
</template>

<script>
import UserItem from '../Public/UserItem'
import WatchMore from '../Public/WatchMore'
import ToTop from '../Public/IconFont/ToTop'
export default {
  name: 'LiveSwiperContent',
  props: ['name'],
  components: {
    UserItem,
    ToTop,
    WatchMore
  },
  data () {
    return {
      height: 0,
      scrollTop: 0,
      animationSize: 234,
      showWatchMore: false
    }
  },
  methods: {
    scroll (e) {
      this.scrollTop = this.$refs.scroller.scrollTop
      let n = Math.floor(this.scrollTop / 1500)
      if (n) {
        this.animationSize = 234 * (n + 1)
      } else {
        this.animationSize = 234
      }
      if (this.$refs.scrollerContent.offsetHeight - this.height - this.$refs.scroller.scrollTop < 0) {
        if (this.name === '推荐') {
          this.$store.dispatch('getAsync', 'tuijian')
        } else if (this.name === '魅力') {
          this.$store.dispatch('getAsync', 'meili')
        } else if (this.name === '才艺') {
          this.$store.dispatch('getAsync', 'caiyi')
        } else if (this.name === '杭州') {
          this.$store.dispatch('getAsync', 'hangzhou')
        }
      }
    },
    toTop () {
      let timer = 0
      const start = () => {
        this.$refs.scroller.scrollTop = this.scrollTop -= this.animationSize
        if (this.scrollTop > this.animationSize) {
          timer = window.requestAnimationFrame(start)
        } else {
          this.$refs.scroller.scrollTop = this.scrollTop = 0
          window.cancelAnimationFrame(timer)
        }
      }
      timer = window.requestAnimationFrame(start)
    }
  },
  computed: {
    liveListInfo () {
      return this.$store.state.liveListInfo[this.name]
    }
  },
  mounted () {
    this.height = this.$refs.scroller.offsetHeight
    setTimeout(() => {
      this.showWatchMore = true
    }, 666)
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.live-swiper-content {
  .wrapper(@overflow: auto;);
  border-top: 2vw solid #fff;
  box-sizing: border-box;
  .wrapper {
    float: left;
    position: relative;
    min-height: 100vw;
  }
  .totop {
    .iconfont-to-top;
  }
}
</style>
