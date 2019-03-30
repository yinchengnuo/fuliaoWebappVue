<template>
  <div class="live-thr" @scroll="scroll" ref="scroller">
    <video v-show="show && !liveEnded" ref="player" :src="userInfo.streamUrl.replace('rtmp', 'http') + '.m3u8'" :style="{ height: (Quark || Baidu) ? '62vw': scrollTop > 20 ? '62vw' : '100vh'}" class="video-player"></video>
    <div class="userpic" :style="{ background: 'url(' + userInfo.bgpic + ') no-repeat center', backgroundSize: '150%'}">
      <RoomInfo @toUserIndex="toUserIndex" :userInfo="userInfo" :liveEnded="liveEnded" :watcherInfo="yinchengnuo" @showPeople="alert"></RoomInfo>
      <Play class="play" @clicked="play"></Play>
      <LiveChat></LiveChat>
      <transition name="live-ended">
        <LiveEnded @clicked="clickEnded" v-show="liveEnded" info="直播刚刚结束了哦，去其他直播间看看吧"></LiveEnded>
      </transition>
      <LiveBurrage v-show="!liveEnded"></LiveBurrage>
      <LiveUserInfo v-show="(Quark || Baidu) ? 1 : scrollTop > 20 && show" @toUserIndex="toUserIndex" :userInfo="userInfo"></LiveUserInfo>
    </div>
    <transition name="alert-info">
      <LiveWatcherInfoAlert v-show="userInfoAlert" @close="closeAlert" @toUserIndex="toUserIndex" :watcherInfo="watcherInfo" :watcherInfoIndex="watcherInfoIndex"></LiveWatcherInfoAlert>
    </transition>
    <SwiperNav class="swiper-nav" :navlist="navlist" :activeClass="activeClass" @change="change"></SwiperNav>
    <LiveRecommendSwiper :activeClass="activeClass" :recommendUserInfo="recommendUserInfo" @slide="slider"></LiveRecommendSwiper>
    <Header class="header" name="返回首页" to="LiveList"></Header>
    <transition name="alert-app">
      <OpenInApp v-show="scrollTop > width * 0.3 && scrollTop < app"></OpenInApp>
    </transition>
  </div>
</template>

<script>
import Header from '../components/Public/Header'
import RoomInfo from '../components/Public/RoomInfo'
import LiveChat from '../components/Live/LiveChat'
import Play from '../components/Public/IconFont/Play'
import SwiperNav from '../components/Public/SwiperNav'
import OpenInApp from '../components/Public/OpenInApp'
import LiveEnded from '../components/Public/LiveEnded'
import LiveBurrage from '../components/Live/LiveBurrage'
import LiveUserInfo from '../components/Live/LiveUserInfo'
import LiveRecommendSwiper from '../components/Live/LiveRecommendSwiper'
import LiveWatcherInfoAlert from '../components/Live/LiveWatcherInfoAlert'
export default {
  name: 'LiveThr',
  components: {
    Play,
    Header,
    RoomInfo,
    LiveChat,
    OpenInApp,
    SwiperNav,
    LiveEnded,
    LiveBurrage,
    LiveUserInfo,
    LiveRecommendSwiper,
    LiveWatcherInfoAlert
  },
  data () {
    return {
      userInfo: this.$route.params.userInfo ? this.$route.params.userInfo : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].userInfo,
      scrollTop: this.$route.params.userInfo ? 0 : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].scrollTop,
      activeClass: this.$route.params.userInfo ? 0 : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].activeClass,
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
      this.$router.push({
        name: 'UserIndex'
      })
    }
  },
  mounted () {
    this.$refs.scroller.scrollTop = this.scrollTop
    this.width = document.body.offsetWidth
    this.app = document.body.offsetWidth * 3 - this.$refs.scroller.offsetHeight + 30
    this.$refs.player.addEventListener('ended', () => {
      this.liveEnded = true
      this.show = false
    })
    this.$refs.player.addEventListener('error', () => {
      this.liveEnded = true
      this.show = false
    })
  },
  created () {
    const getRecommendUserInfo = () => {
      this.$http.get(`/moretuijian`).then((response) => {
        this.recommendUserInfo['热门直播'] = response.data.info.sort(() => {
          return Math.random() - 0.5
        }).slice(0, 8)
      })
      this.$http.get(`/morecaiyi`).then((response) => {
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
    const enterSession = window.sessionStorage.getItem('fuliaoLiveSession')
    const time = +new Date()
    this.time = time
    history.replaceState({ time }, null)
    const enterData = {
      userInfo: this.userInfo
    }
    const oldEnterSession = JSON.parse(enterSession)
    oldEnterSession[`${time}`] = enterData
    window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(oldEnterSession))
  },
  beforeRouteLeave (to, from, next) {
    const leaveSession = window.sessionStorage.getItem('fuliaoLiveSession')
    const oldLeaveSession = JSON.parse(leaveSession)
    oldLeaveSession[`${this.time}`].recommendUserInfo = this.recommendUserInfo
    oldLeaveSession[`${this.time}`].activeClass = this.activeClass
    oldLeaveSession[`${this.time}`].scrollTop = this.scrollTop
    window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(oldLeaveSession))
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
.live-thr {
  .video-player {
    .wrapper(@position: fixed; @height: 100vw;);
    z-index: 3;
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
}
.alert-info-enter-active, .alert-info-leave-active {
  transition: all .3s;
}
.alert-info-enter{
  transform: translateY(20vh);
}
.alert-info-leave-to {
  transform: translateY(100vh);
}
.alert-app-enter-active, .alert-app-leave-active {
  transition: all .5s;
}
.alert-app-enter{
  transform: translateY(70vh);
}
.alert-app-leave-to {
  transform: translateY(100vh);
}
.live-ended-enter-active, .live-ended-leave-active {
  transition: all 1s;
}
.live-ended-enter{
  transform: translateY(76vw);
}
.live-ended-leave-to {
  transform: translateY(100vh);
}
</style>
