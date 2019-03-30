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
  props: ['userInfo'],
  components: {
    Play
  },
  data () {
    return {
      info: this.userInfo,
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
      this.userInfo.videoRoomId = 2630778
      this.userInfo.charmlevel = 9
      this.userInfo.userpic = 'http://img2.ipaychat.com/d3/photos/2019/03/25/19/pic_1553512580885_3d84976b-062f-44e8-b324-cefc88dedf41_org.jpg@!fc_640_640'
      this.userInfo.city = '杭州市'
      this.$router.push({
        name: 'VideoIntroduction',
        params: {
          userInfo: this.userInfo
        }
      })
    }
  },
  activated () {
    if (this.$route.params.userInfo) {
      this.info = this.$route.params.userInfo
      this.swiper.updateSlides()
    }
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
