<template>
  <div class="video-thr" @scroll="scroll" ref="scroller">
    <VideoHeader></VideoHeader>
    <video v-show="show" ref="player" :src="videoInfo.url" :class="(Quark || Baidu) ? 'video-player scroll-video-player': scrollTop > 20 ? 'video-player scroll-video-player' : 'video-player'"></video>
    <div class="videopic" :style="{ background: 'url(' + videoInfo.cover + ') no-repeat center', backgroundSize: '100%'}">
      <VideoHeadCover v-if="videoEnded" @replay="play" @more="more"></VideoHeadCover>
      <RoomInfo @toUserIndex="toUserIndex" :userInfo="userInfo" liveEnded="1"></RoomInfo>
      <Play class="play-video" @clicked="play"></Play>
      <div class="video-des">{{videoInfo.name}}</div>
      <a @click="toAbout" class="chat-with">和TA聊聊&gt; </a>
      <div @click="toAbout" class="video-sociaty">
        <Liked class="icon"></Liked>
        <div class="num">{{videoInfo.like_num}}</div>
        <Comments class="icon"></Comments>
        <div class="num">123</div>
        <Fowared class="icon"></Fowared>
        <div class="num">456</div>
        <Gift class="icon"></Gift>
        <div class="num">789</div>
      </div>
    </div>
    <SwiperNav class="swiper-nav" :navlist="navlist" :activeClass="activeClass" @change="change"></SwiperNav>
    <VideoRecommendSwiper :activeClass="activeClass" :recommendVideoInfo="recommendVideoInfo" @slide="slider"></VideoRecommendSwiper>
    <Header class="header" name="返回首页" to="SmallVideoList"></Header>
    <transition name="alert-app">
      <OpenInApp v-show="scrollTop > 20 && scrollTop < app"></OpenInApp>
    </transition>
  </div>
</template>

<script>
import Play from '../components/Public/IconFont/Play'
import Liked from '../components/Public/IconFont/Liked'
import Comments from '../components/Public/IconFont/Comments'
import Fowared from '../components/Public/IconFont/Fowared'
import Gift from '../components/Public/IconFont/Gift'
import RoomInfo from '../components/Public/RoomInfo'
import Header from '../components/Public/Header'
import SwiperNav from '../components/Public/SwiperNav'
import VideoHeader from '../components/SmallVideo/VideoHeader'
import VideoHeadCover from '../components/SmallVideo/VideoHeadCover'
import VideoRecommendSwiper from '../components/SmallVideo/VideoRecommendSwiper'
import OpenInApp from '../components/Public/OpenInApp'
export default {
  name: 'VideoThr',
  components: {
    Play,
    Liked,
    Header,
    Comments,
    Fowared,
    Gift,
    RoomInfo,
    VideoHeader,
    VideoHeadCover,
    SwiperNav,
    OpenInApp,
    VideoRecommendSwiper
  },
  data () {
    return {
      videoInfo: this.$route.params.videoInfo ? this.$route.params.videoInfo : JSON.parse(window.sessionStorage.getItem('fuliaoVideoSession'))[`${window.history.state.time}`].videoInfo,
      userInfo: {},
      scrollTop: this.$route.params.videoInfo ? 0 : JSON.parse(window.sessionStorage.getItem('fuliaoVideoSession'))[`${window.history.state.time}`].scrollTop,
      activeClass: this.$route.params.videoInfo ? 0 : JSON.parse(window.sessionStorage.getItem('fuliaoVideoSession'))[`${window.history.state.time}`].activeClass,
      recommendVideoInfo: {
        '热门视频': [],
        '最新视频': []
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
      videoEnded: false,
      time: 0
    }
  },
  computed: {
    navlist () {
      return Object.keys(this.recommendVideoInfo)
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
      this.videoEnded = false
      this.show = true
      this.$refs.player.play()
    },
    scroll () {
      this.scrollTop = this.$refs.scroller.scrollTop
    },
    more () {
      this.$refs.scroller.scrollTop = this.width + 50
    },
    toUserIndex (userid) {
      this.$router.push({
        name: 'UserIndex'
      })
    },
    toAbout () {
      this.$router.push({
        name: 'About'
      })
    }
  },
  mounted () {
    this.$refs.scroller.scrollTop = this.scrollTop
    this.width = document.body.offsetWidth
    this.app = document.body.offsetWidth * 3 - this.$refs.scroller.offsetHeight + 30
    this.$refs.player.addEventListener('ended', () => {
      this.videoEnded = true
      this.show = false
    })
  },
  created () {
    const getRecommendVideoInfo = () => {
      const idSession = window.sessionStorage.getItem('fuliaoVideoSession')
      const idobj = JSON.parse(idSession)
      this.$http.get(`http://39.96.73.206:8888/smallvideoinfo?id=${idobj[`${this.time}`].videoInfo.feed_id}`).then((response) => {
        const user = {}
        user.name = response.data.data.feed_info.user.nick
        user.userid = response.data.data.feed_info.user.id
        user.userpic = response.data.data.feed_info.user.portrait
        this.userInfo = user
      })
      this.$http.get(`http://39.96.73.206:8888/smallvideolist`).then((response) => {
        const temp = []
        response.data.data.forEach(element => {
          if (element.name) {
            temp.push(element)
          }
        })
        temp.sort((a, b) => {
          return b.like_num - a.like_num
        })
        if (temp.length % 3) {
          temp.shift()
          if (temp.length % 3) {
            temp.shift()
          }
        }
        this.recommendVideoInfo['热门视频'] = temp.slice(0, 12)
        this.recommendVideoInfo['最新视频'] = temp.slice(12, 24)
      })
    }
    const enterSession = window.sessionStorage.getItem('fuliaoVideoSession')
    const time = +new Date()
    this.time = time
    history.replaceState({ time }, null)
    const enterData = {
      videoInfo: this.videoInfo
    }
    const oldEnterSession = JSON.parse(enterSession)
    oldEnterSession[`${time}`] = enterData
    window.sessionStorage.setItem('fuliaoVideoSession', JSON.stringify(oldEnterSession))
    if (this.$route.params.videoInfo) {
      getRecommendVideoInfo()
    } else {
      const s = JSON.parse(window.sessionStorage.getItem('fuliaoVideoSession'))[`${window.history.state.time}`].recommendVideoInfo
      if (s) {
        this.recommendVideoInfo['热门视频'] = s['热门视频']
        this.recommendVideoInfo['最新视频'] = s['最新视频']
      } else {
        getRecommendVideoInfo()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    const leaveSession = window.sessionStorage.getItem('fuliaoVideoSession')
    const oldLeaveSession = JSON.parse(leaveSession)
    oldLeaveSession[`${this.time}`].recommendVideoInfo = this.recommendVideoInfo
    oldLeaveSession[`${this.time}`].userInfo = this.userInfo
    oldLeaveSession[`${this.time}`].activeClass = this.activeClass
    oldLeaveSession[`${this.time}`].scrollTop = this.scrollTop
    window.sessionStorage.setItem('fuliaoVideoSession', JSON.stringify(oldLeaveSession))
    next()
  },
  meta () {
    return {
      title: this.userInfo.name ? `${this.userInfo.name}的富聊小视频` : '富聊小视频'
    }
  }
}
</script>

<style lang="less" scroped>
.video-thr {
  .wrapper(@overflow: auto;);
  .video-player {
    .wrapper(@position: fixed);;
    z-index: 2;
  }
  .scroll-video-player {
    height: calc(62vw + 1rem);
  }
  .videopic {
    .wrapper(@top: 1rem; @height: 100vw;);
    .video-des {
      .wrapper(@top: auto; @bottom: 0; @height: 14vw;);
      box-sizing: border-box;
      padding: 2vw 28vw 2vw 2vw;
      line-height: 3.3vw;
      text-indent: 2em;
      font-size: 3vw;
      color: #fff;
      z-index: 1;
      background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .6));
    }
    .play-video {
      .iconfont-play;
    }
    .video-sociaty {
      .wrapper(@width: 14vw; @left: auto; @right: 0; @top: auto;);
      box-sizing: border-box;
      padding: 14vw 2vw 2vw 2vw;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, .6));
      .icon {
        display: block;
        .iconfont;
        color: #fff;
      }
      .num {
        line-height: 8vw;
        text-align: center;
        height: 8vw;
        color: #fff;
      }
    }
    .chat-with {
      .wrapper(@width: 24vw; @height: 10vw; @left: auto; @top: auto; @right: 2vw; @bottom: 2vw;);
      border-radius: 10vw;
      line-height: 10vw;
      text-align: center;
      color: #fff;
      z-index: 1;
      background: linear-gradient(to right, rgba(115, 255, 0, 0.9), rgba(0, 153, 255, 0.7));
    }
  }
  .swiper-nav {
    top: calc(1rem + 100vw);
    padding-left: 2vw;
  }
  .header {
    top: calc(1rem + 100vw + @header-height + 45.22vw * 4 + 2vw + @header-height)
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
}
</style>
