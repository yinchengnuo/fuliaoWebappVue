<template>
  <div class="small-video-list-content" @scroll="scroll" ref="scroller">
      <SmallVideoListItem v-for="(item, index) in smallVideoData" :key="index" :videoInfo="item" :index="index"></SmallVideoListItem>
      <WatchMore v-show="smallVideoData.length" name="小视频"></WatchMore>
      <ToTop v-show="scrollTop > 10" class="totop" @clicked="toTop"></ToTop>
  </div>
</template>

<script>
import WatchMore from '../Public/WatchMore'
import ToTop from '../Public/IconFont/ToTop'
import SmallVideoListItem from './SmallVideoListItem'
export default {
  name: 'SmallVideoListContent',
  components: {
    ToTop,
    WatchMore,
    SmallVideoListItem
  },
  data () {
    return {
      smallVideoData: [],
      scrollTop: 0,
      animationSize: 234
    }
  },
  methods: {
    scroll () {
      this.scrollTop = this.$refs.scroller.scrollTop
      let n = Math.floor(this.scrollTop / 1500)
      if (n) {
        this.animationSize = 234 * (n + 1)
      } else {
        this.animationSize = 234
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
  created () {
    this.$http.get(`http://39.96.73.206:8888/smallvideolist`).then((response) => {
      const temp = response.data.data
      temp.sort((a, b) => {
        return b.like_num - a.like_num
      })
      if (temp.length % 3) {
        temp.shift()
        if (temp.length % 3) {
          temp.shift()
        }
      }
      this.smallVideoData = temp
    })
  }
}
</script>

<style lang="less" scoped>
.small-video-list-content {
    .wrapper(@top: calc(@header-height + 26vw); @height: calc(100% - @header-height - 26vw); @overflow: scroll;);
    .totop {
      .iconfont-to-top;
      bottom: 30vw;
    }
}
</style>
