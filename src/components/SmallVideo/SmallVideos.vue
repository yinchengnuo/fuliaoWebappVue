<template>
  <swiper class="small-video" :options="swiperOption" ref="mySwiper" @slideChange="callback">
    <LifeIsPullAndPush></LifeIsPullAndPush>
    <swiper-slide v-for="(item, index) of smallvideos" :key="index" :style="{ background: 'url(' + item.bgpath + ') no-repeat center', backgroundSize: '100% 100%'}">
      <transition name="fade" @after-enter="afterEnter">
        <HorseMove v-if="ismove" :ismove="ismove"></HorseMove>
      </transition>
      <Header name="富聊小视频"></Header>
      <Play class="play" v-if="index == 0" @clicked="play"></Play>
      <v-touch @swipeleft="startmove(index, item)" @swiperight="back">
        <video class="small-video-player" :src="item.smallvideopath" loop @click="play" ></video>
      </v-touch>
    </swiper-slide>
  </swiper>
</template>

<script>
import Play from '../Public/IconFont/Play'
import Header from '../Public/Header'
import HorseMove from '../Public/HorseMove'
import LifeIsPullAndPush from '../Public/LifeIsPullAndPush'
export default {
  name: 'SmallVideos',
  components: {
    Header,
    HorseMove,
    Play,
    LifeIsPullAndPush
  },
  data () {
    return {
      smallvideos: [],
      swiperOption: {
        direction: 'vertical'
      },
      now: 0,
      ismove: false,
      moving: 0,
      videoinfo: {}
    }
  },
  methods: {
    callback () {
      this.now = this.swiper.activeIndex
    },
    startmove (index, item) {
      this.videoinfo = item
      this.moving = index
      this.ismove = true
    },
    play () {
      if (this.$el.getElementsByTagName('video')[this.now].paused) {
        this.$el.getElementsByTagName('video')[this.now].play()
      } else {
        this.$el.getElementsByTagName('video')[this.now].pause()
      }
    },
    afterEnter () {
      this.$router.push({
        name: 'UserIndex',
        params: { userinfo: this.videoinfo }
      })
    },
    back () {
      this.$router.go(-1)
    }
  },
  watch: {
    now (n, o) {
      this.$el.getElementsByTagName('video')[o].pause()
      this.$el.getElementsByTagName('video')[n].play()
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    this.$http.get('http://39.96.73.206:8888/smallvideos').then((response) => {
      this.smallvideos = response.data
      setTimeout(() => {
        this.$el.getElementsByTagName('video')[this.now].play()
      }, 123)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$el.getElementsByTagName('video')[this.now].pause()
    this.ismove = false
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      setTimeout(() => {
        vm.$el.getElementsByTagName('video')[vm.now].play()
      }, 123)
    })
  },
  metaInfo: {
    title: '下载富聊APP-看更多美女小视频-UU-Watch-看-我喜欢！'
  }
}
</script>

<style lang="less" scoped>
.small-video {
  .wrapper;
  .small-video-player {
    .wrapper(@top: @header-height; @height: @small-video-height;);
    z-index: 2;
  }
  .play {
    .wrapper(@left: 50%; @top: 50%; @width: 20vw; @height: 20vw;);
    margin-left: -10vw;
    margin-top: -10vw;
    font-size: 20vw;
    color: #ccc;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: transform .6s linear;
}
.fade-enter, .fade-leave-to {
  transform: translateX(-100vw);
}
</style>
