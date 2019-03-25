<template>
  <div class="live-two" @scroll="scroll" ref="scroller">
    <video v-if="show" ref="player" :src="userInfo.streamUrl.replace('rtmp', 'http') + '.m3u8'" :style="{ height: videoHeight}" class="video-player"></video>
    <div class="userpic" :style="{ background: 'url(' + userInfo.bgpic + ') no-repeat center', backgroundSize: '150%'}">
      <LiveInfo @toUserIndex="toUserIndex" :userInfo="userInfo" :watcherInfo="yinchengnuo" @showPeople="alert"></LiveInfo>
      <Play class="play" @clicked="play"></Play>
      <LiveChat></LiveChat>
      <LiveBurrage></LiveBurrage>
      <LiveUserInfo v-show="videoHeight == '62vw' && show" @toUserIndex="toUserIndex" :userInfo="userInfo"></LiveUserInfo>
    </div>
    <transition name="alert">
      <LiveWatcherInfoAlert v-show="userInfoAlert" @close="closeAlert" @toUserIndex="toUserIndex" :watcherInfo="watcherInfo" :watcherInfoIndex="watcherInfoIndex"></LiveWatcherInfoAlert>
    </transition>
    <SwiperNav class="swiper-nav" :navlist="navlist" :activeClass="activeClass" @change="change"></SwiperNav>
    <LiveRecommendSwiper :activeClass="activeClass" :recommendUserInfo="recommendUserInfo" @slide="slider"></LiveRecommendSwiper>
    <Header class="header"></Header>
  </div>
</template>

<script>
import Header from '../components/Public/Header'
import Play from '../components/Public/IconFont/Play'
import LiveInfo from '../components/Live/LiveInfo'
import LiveChat from '../components/Live/LiveChat'
import SwiperNav from '../components/Public/SwiperNav'
import LiveBurrage from '../components/Live/LiveBurrage'
import LiveUserInfo from '../components/Live/LiveUserInfo'
import LiveRecommendSwiper from '../components/Live/LiveRecommendSwiper'
import LiveWatcherInfoAlert from '../components/Live/LiveWatcherInfoAlert'
export default {
  name: 'LiveOne',
  components: {
    Play,
    Header,
    LiveInfo,
    LiveChat,
    SwiperNav,
    LiveBurrage,
    LiveUserInfo,
    LiveRecommendSwiper,
    LiveWatcherInfoAlert
  },
  data () {
    return {
      userInfo: this.$route.params.userInfo ? this.$route.params.userInfo : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[0].userInfo,
      activeClass: this.$route.params.userInfo ? 0 : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[0].activeClass,
      navlist: ['热门直播', '才艺直播'],
      show: false,
      videoHeight: '100vh',
      yinchengnuo: this.$store.state.yinchengnuo,
      watcherInfo: {},
      watcherInfoIndex: 0,
      userInfoAlert: false
    }
  },
  computed: {
    recommendUserInfo () {
      if (this.$route.params.userInfo) {
        let a = this.$store.state.liveListInfo['推荐'].slice(0, 9999)
        let b = this.$store.state.liveListInfo['才艺'].slice(0, 9999)
        return {
          '热门直播': a.sort(() => {
            return Math.random() - 0.5
          }).slice(0, 8),
          '才艺直播': b.sort(() => {
            return Math.random() - 0.5
          }).slice(0, 8)
        }
      } else {
        return JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[0].recommendUserInfo
      }
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
      this.show = true
      setTimeout(() => {
        this.$refs.player.play()
      }, 123)
    },
    scroll () {
      if (this.$refs.scroller.scrollTop > 20) {
        this.videoHeight = '62vw'
      } else {
        this.videoHeight = '100vh'
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
    toUserIndex (userid) {
      console.log('toUserIndex', userid)
    }
  },
  mounted () {
    if (!this.$route.params.userInfo) {
      this.$refs.scroller.scrollTop = JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[0].scrollTop
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const enterSession = window.sessionStorage.getItem('fuliaoLiveSession')
      const enterData = {
        userInfo: vm.userInfo,
        recommendUserInfo: vm.recommendUserInfo
      }
      if (vm.$route.params.userInfo) {
        if (enterSession) {
          const oldEnterSession = JSON.parse(enterSession)
          oldEnterSession.unshift(enterData)
          window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(oldEnterSession))
        } else {
          const arr = []
          arr.unshift(enterData)
          window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(arr))
        }
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    const leaveSession = window.sessionStorage.getItem('fuliaoLiveSession')
    const oldLeaveSession = JSON.parse(leaveSession)
    if (to.params.userInfo) {
      oldLeaveSession[0].activeClass = this.activeClass
      oldLeaveSession[0].scrollTop = this.$refs.scroller.scrollTop
      window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(oldLeaveSession))
    } else {
      oldLeaveSession.shift()
      window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(oldLeaveSession))
    }
    next()
  },
  meta () {
    return {
      title: `${this.userInfo.name}正在富聊直播`
    }
  }
}
</script>

<style lang="less" scroped>
.live-two {
  .video-player {
    .wrapper(@position: fixed; @height: 100vw;);
  }
  .wrapper(@overflow: auto;);
  .userpic {
    .wrapper(@height: 100vw;);
    .play {
      .iconfont-play;
    }
  }
  .swiper-nav {
    top: 100vw;
    padding-left: 2vw;
  }
  .header {
    top: calc(100vw + @header-height + 49vw * 4 + 2vw + @header-height);
  }
  .alert-enter-active, .alert-leave-active {
    transition: all .3s;
  }
  .alert-enter{
    transform: translateY(20vh);
  }
  .alert-leave-to {
    transform: translateY(100vh);
  }
}
</style>
