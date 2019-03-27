<template>
  <div class="live-one" @scroll="scroll" ref="scroller">
      <VideoHeader></VideoHeader>
  </div>
</template>

<script>
import VideoHeader from '../components/SmallVideo/VideoHeader'
export default {
  name: 'LiveOne',
  components: {
    VideoHeader
  },
  data () {
    return {
      videoInfo: this.$route.params.videoInfo ? this.$route.params.videoInfo : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].videoInfo,
      scrollTop: 0,
      activeClass: this.$route.params.videoInfo ? 0 : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].activeClass,
      recommendUserInfo: {
        '热门直播': [],
        '才艺直播': []
      },
      show: false,
      app: 0,
      width: 0,
      Quark: window.navigator.userAgent.match(/Quark/),
      Baidu: window.navigator.userAgent.match(/Baidu/),
      yinchengnuo: this.$store.state.yinchengnuo,
      watcherInfo: {},
      watcherInfoIndex: 0,
      userInfoAlert: false,
      liveEnded: false,
      time: 0
    }
  },
  computed: {
    navlist () {
      return Object.keys(this.recommendUserInfo)
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
    scroll () {
      this.scrollTop = this.$refs.scroller.scrollTop
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
    // if (!this.$route.params.userInfo) {
    //   this.$refs.scroller.scrollTop = JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].scrollTop
    // }
    // this.width = document.body.offsetWidth
    // this.app = document.body.offsetWidth * 3 - this.$refs.scroller.offsetHeight + 30
    // this.$refs.player.addEventListener('ended', () => {
    //   this.liveEnded = true
    //   this.show = false
    // })
    // this.$refs.player.addEventListener('error', () => {
    //   this.liveEnded = true
    //   this.show = false
    // })
  },
  created () {
    const getRecommendUserInfo = () => {
      this.$http.get(`http://39.96.73.206:8888/moretuijian`).then((response) => {
        this.recommendUserInfo['热门直播'] = response.data.info.sort(() => {
          return Math.random() - 0.5
        }).slice(0, 8)
      })
      this.$http.get(`http://39.96.73.206:8888/morecaiyi`).then((response) => {
        this.recommendUserInfo['才艺直播'] = response.data.info.channelList.sort(() => {
          return Math.random() - 0.5
        }).slice(0, 8)
      })
    }
    if (this.$route.params.userInfo) {
      getRecommendUserInfo()
    } else {
      const s = JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].recommendUserInfo
      if (s) {
        this.recommendUserInfo['热门直播'] = s['热门直播']
        this.recommendUserInfo['才艺直播'] = s['才艺直播']
      } else {
        getRecommendUserInfo()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
    //   const enterSession = window.sessionStorage.getItem('fuliaoLiveSession')
    //   const time = +new Date()
    //   vm.time = time
    //   history.replaceState({ time }, null)
    //   const enterData = {
    //     userInfo: vm.userInfo
    //   }
    //   if (enterSession) {
    //     const oldEnterSession = JSON.parse(enterSession)
    //     oldEnterSession[`${time}`] = enterData
    //     window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(oldEnterSession))
    //   } else {
    //     const initSession = {}
    //     initSession[`${time}`] = enterData
    //     console.log(initSession)
    //     window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(initSession))
    //   }
    })
  },
  beforeRouteLeave (to, from, next) {
    // const leaveSession = window.sessionStorage.getItem('fuliaoLiveSession')
    // const oldLeaveSession = JSON.parse(leaveSession)
    // oldLeaveSession[`${this.time}`].recommendUserInfo = this.recommendUserInfo
    // oldLeaveSession[`${this.time}`].activeClass = this.activeClass
    // oldLeaveSession[`${this.time}`].scrollTop = this.$refs.scroller.scrollTop
    // window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(oldLeaveSession))
    next()
  },
  meta () {
    return {
      title: `的富聊小视频`
    }
  }
}
</script>

<style lang="less" scroped>
.live-one {
    .wrapper(@overflow: auto;);
}
</style>
