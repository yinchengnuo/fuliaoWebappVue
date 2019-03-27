<template>
  <swiper class="video-recommend-swiper" :options="swiperOption" ref="mySwiper" @slideChange="callback">
    <div class="swiper-scrollbar" slot="scrollbar"></div>
    <swiper-slide class="item">
      <SmallVideoListItem v-for="(item, index) in recommendVideoInfo['热门视频']" :key="index" :videoInfo="item" :index="index"></SmallVideoListItem>
      <div class="white"></div>
      <WatchMore name="热门小视频"></WatchMore>
    </swiper-slide>
    <swiper-slide class="item">
        2333
        <WatchMore name="活动小视频"></WatchMore>
    </swiper-slide>
  </swiper>
</template>

<script>
import SmallVideoListItem from './SmallVideoListItem'
import WatchMore from '../Public/WatchMore'
export default {
  name: 'VideoRecommendSwiper',
  components: {
    SmallVideoListItem,
    WatchMore
  },
  props: ['activeClass', 'name', 'recommendVideoInfo'],
  data () {
    return {
      swiperOption: {
        scrollbar: {
          el: '.swiper-scrollbar'
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
    callback () {
      this.$emit('slide', this.swiper.activeIndex)
    }
  },
  mounted () {
    this.swiper.slideTo(this.activeClass)
  },
  watch: {
    activeClass (n, o) {
      this.swiper.slideTo(n)
    }
  }
}
</script>

<style lang="less" scoped>
.video-recommend-swiper {
    .wrapper(@height: auto; @top: calc(100vw + @header-height + 1rem););
    box-sizing: border-box;
    .swiper-scrollbar {
      .wrapper(@height: 2px; @width: calc(@channels-nav-list-width * 2); @left: 2vw;);
      background: #fff;
      /deep/ .swiper-scrollbar-drag {
        background: #fff;
      }
      /deep/ .swiper-scrollbar-drag::after {
        content: '';
        .wrapper(@width: 80%; @left: 10%;);
        background-color: orange;
      }
    }
    .item {
        box-sizing: border-box;
        border-top: 2vw solid #fff;
        .white {
            .wrapper(@height: @header-height; @top: auto; @bottom: calc(@header-height + 1vw););
            background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
        }
    }
}
</style>
