<template>
  <div class="live-one" @scroll="scroll" ref="scroller">
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
    <LiveRecommendSwiper :activeClass="activeClass" @slide="slider"></LiveRecommendSwiper>
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
      userInfo: this.$route.params.userInfo ? this.$route.params.userInfo : this.$store.state.liveHistory[this.$store.state.liveHistory.length - 2].userInfo,
      activeClass: this.$route.params.userInfo ? 0 : this.$store.state.liveHistory[this.$store.state.liveHistory.length - 2].activeClass,
      navlist: ['热门直播', '才艺直播'],
      show: false,
      videoHeight: '100vh',
      yinchengnuo: this.$store.state.yinchengnuo,
      watcherInfo: {},
      watcherInfoIndex: 0,
      userInfoAlert: false
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
      }, 234)
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
      this.$refs.scroller.scrollTop = this.$store.state.liveHistory[this.$store.state.liveHistory.length - 2].scrollTop
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$route.params.userInfo) {
        vm.$store.state.liveHistory.push({
          userInfo: vm.userInfo,
          activeClass: vm.activeClass,
          scrollTop: vm.$refs.scroller.scrollTop
        })
      } else {
        vm.$store.state.liveHistory.pop()
        console.log(vm.$store.state.liveHistory)
      }
    })
  },
  meta () {
    return {
      title: `${this.userInfo.name}正在富聊直播`
    }
  }
}
</script>

<style lang="less" scroped>
.live-one {
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
