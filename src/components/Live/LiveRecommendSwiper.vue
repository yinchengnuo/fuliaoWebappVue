<template>
  <swiper class="live-recommend-swiper" :options="swiperOption" ref="mySwiper" @slideChange="callback">
    <div class="swiper-scrollbar" slot="scrollbar"></div>
    <swiper-slide class="item">
      <UserItem v-for="(item, index) in recommendUserInfo['热门直播']" :key="index" :userInfo="item"></UserItem>
      <div class="white"></div>
      <WatchMore name="热门"></WatchMore>
    </swiper-slide>
    <swiper-slide class="item">
      <UserItem v-for="(item, index) in recommendUserInfo['才艺直播']" :key="index" :userInfo="item"></UserItem>
      <div class="white"></div>
      <WatchMore name="才艺"></WatchMore>
    </swiper-slide>
  </swiper>
</template>

<script>
import UserItem from '../Public/UserItem'
import WatchMore from '../Public/WatchMore'
export default {
  name: 'LiveRecommendSwiper',
  components: {
    UserItem,
    WatchMore
  },
  props: ['activeClass', 'name'],
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
    },
    recommendUserInfo () {
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
    }
  },
  methods: {
    callback () {
      this.$emit('slide', this.swiper.activeIndex)
    }
  },

  watch: {
    activeClass (n, o) {
      this.swiper.slideTo(n)
    }
  }
}
</script>

<style lang="less" scoped>
.live-recommend-swiper {
    .wrapper(@height: calc(49vw * 4 + 2vw + @header-height); @top: calc(100vw + @header-height););
    box-sizing: border-box;
    .swiper-scrollbar {
      .wrapper(@height: 2px; @width: calc(@channels-nav-list-width * 2); @left: 2vw;);
      background: #fff;
      /deep/ .swiper-scrollbar-drag {
        background: #fff;
      }
      /deep/ .swiper-scrollbar-drag::after {
        content: '';
        .wrapper(@width: 80%; @left: 5%;);
        background-color: orange;
      }
    }
    .item {
        box-sizing: border-box;
        border-top: 2vw solid #fff;
        .white {
            .wrapper(@height: @header-height; @top: auto; @bottom: calc(@header-height + 2vw););
            background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
        }
    }
}
</style>
