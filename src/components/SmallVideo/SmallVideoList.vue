<template>
  <div class="small-video-list">
    <Header class="header" name="小视频"></Header>
    <SmallVideoSwiper></SmallVideoSwiper>
    <SmallVideoListCentent></SmallVideoListCentent>
  </div>
</template>

<script>
import Header from '../Public/Header'
import SmallVideoSwiper from './SmallVideoSwiper'
import SmallVideoListCentent from './SmallVideoListCentent'
export default {
  name: 'LiveThr',
  components: {
    Header,
    SmallVideoSwiper,
    SmallVideoListCentent
  },
  data () {
    return {
      smallVideoList: []
    }
  },
  methods: {
    slider (active) {
      this.activeClass = active
    },
    change (index) {
      this.activeClass = index
    },
    play () {
      if (!this.liveEnded) {
        this.show = true
        this.$refs.player.play()
      }
    },
    alert (watcherInfo, index) {
      this.watcherInfo = watcherInfo
      this.watcherInfoIndex = index
      this.userInfoAlert = true
    },
    closeAlert () {
      this.userInfoAlert = false
    },
    clickEnded () {
      this.$refs.scroller.scrollTop = this.width
    },
    toUserIndex (userid) {
      alert('toUserIndex ' + userid)
    }
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  meta () {
    return {
      title: `更多精彩小视频-就在富聊APP`
    }
  }
}
</script>

<style lang="less" scroped>
.small-video-list {
  .wrapper(@height: calc(100% - 1rem););
}
</style>
