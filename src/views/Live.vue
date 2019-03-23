<template>
  <div class="live">
    <video v-if="show" ref="player" :src="userInfo.streamUrl.replace('rtmp', 'http') + '.m3u8'" class="video-player"></video>
    <div class="userpic" :style="{ background: 'url(' + userInfo.bgpic + ') no-repeat center', backgroundSize: '150%'}">
      <LiveInfo :userInfo="userInfo"></LiveInfo>
      <Play class="play" @clicked="play"></Play>
      <LiveChat></LiveChat>
    </div>
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
import LiveRecommendSwiper from '../components/Live/LiveRecommendSwiper'
export default {
  name: 'Live',
  components: {
    Play,
    Header,
    LiveInfo,
    LiveChat,
    SwiperNav,
    LiveRecommendSwiper
  },
  data () {
    return {
      userInfo: this.$route.params.userInfo,
      navlist: ['热门直播', '才艺直播'],
      activeClass: 0,
      show: false
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
      console.log(233)
      this.show = true
      setTimeout(() => {
        this.$refs.player.play()
      }, 234)
    }
  },
  meta () {
    return {
      title: `${this.userInfo.name}正在富聊直播`
    }
  }
}
</script>

<style lang="less" scroped>
.live {
  .video-player {
    .wrapper;
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
</style>
