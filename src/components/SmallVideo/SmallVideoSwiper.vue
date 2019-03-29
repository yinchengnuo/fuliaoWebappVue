<template>
  <swiper v-if="swiperShow" class="small-video-swiper" :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item, index) of imgs" :key="index">
        <img :src="item" class="img">
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: 'SmallVideoSwiper',
  data () {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'my-bullet-active'
        }
      },
      imgs: [
        require('../../assets/images/1.jpg'),
        require('../../assets/images/2.jpg'),
        require('../../assets/images/3.jpg'),
        require('../../assets/images/4.jpg'),
        require('../../assets/images/5.jpg')
      ],
      swiperShow: false
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  activated () {
    this.swiperShow = true
  },
  deactivated () {
    this.swiperShow = false
  }
}
</script>

<style lang="less" scoped>
.small-video-swiper {
    .wrapper(@position: relative; @top: @header-height; @height: 25vw;);
    margin-bottom: 1vw;
    .img {
        width: 100%;
        height: 100%;
    }
    /deep/.my-bullet-active {
        background: #fff;
        opacity: 1;
    }
}
</style>
