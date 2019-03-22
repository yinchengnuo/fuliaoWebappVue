<template>
  <swiper class="head-pic-swiper" :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item, index) of info.headpic" :key="index" :style="{ background: 'url(' + item + ') no-repeat center', backgroundSize: '100% 100%'}">
      <Play class="play" @clicked="toVideoIntro" v-if="index === 0 && info.videointropath"></Play>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import Play from '../Public//IconFont/Play'
export default {
  name: 'HeadPicSwiper',
  props: ['userinfo'],
  components: {
    Play
  },
  data () {
    return {
      info: this.userinfo,
      swiperOption: {
        loop: true,
        watchOverflow: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          renderFraction (currentClass, totalClass) {
            return `<span class=${currentClass}></span>/<span class=${totalClass}></span>`
          }
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    toVideoIntro () {
      this.$router.push({
        name: 'VideoIntroduction',
        params: {
          videointroduction: this.userinfo.videointropath,
          name: this.userinfo.name
        }
      })
    }
  },
  activated () {
    if (this.$route.params.userinfo) {
      this.info = this.$route.params.userinfo
      this.swiper.updateSlides()
    }
  },
  metaInfo: {
    title: '下载富聊APP-邀请TA视频聊-UU-Watch-看-我喜欢！'
  }
}
</script>

<style lang="less" scroped>
.head-pic-swiper {
  .wrapper(@height: 100vw;);
  .play {
    .wrapper(@left: 50%; @top: 50%; @width: 20vw; @height: 20vw;);
    margin-left: -10vw;
    margin-top: -10vw;
    z-index: 2;
    font-size: 20vw;
  }
  .swiper-pagination {
      width: auto;
      left: auto;
      right: 10vw;
      color: #fff;
      background-color: rgba(0, 0, 0, .6);
      border-radius: 8px;
  }
}
</style>
