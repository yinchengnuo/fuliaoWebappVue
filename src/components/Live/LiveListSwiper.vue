<template>
  <swiper class="live-swiper" :options="swiperOption" ref="mySwiper" @slideChange="callback">
    <div class="swiper-scrollbar" slot="scrollbar"></div>
    <swiper-slide v-for="(item, index) of name" :key="index">
      <LiveSwiperContent :name="item"></LiveSwiperContent>
    </swiper-slide>
  </swiper>
</template>

<script>
import LiveSwiperContent from './LiveSwiperContent'
export default {
  name: 'LiveSwiper',
  components: {
    LiveSwiperContent
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
.live-swiper {
    .wrapper(@height: calc(100% - 2 * @header-height); @top: calc(2 * @header-height););
    box-sizing: border-box;
    .swiper-scrollbar {
      .wrapper(@height: 2px; @width: calc(@channels-nav-list-width * 4); @left: calc((100% - @channels-nav-list-width * 4) / 2););
      background: #fff;
      /deep/ .swiper-scrollbar-drag {
        background: #fff;
      }
      /deep/ .swiper-scrollbar-drag::after {
        content: '';
        .wrapper(@width: 40%; @left: 30%;);
        background-color: orange;
      }
    }
}
</style>
