<template>
  <swiper class="video-header-swiper" :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="(item, index) of activity" :key="index">
        <div class="name">#{{item}}#</div>
        <div class="bg">
          <img v-for="(item, index) in bgs" :key="index" :src="item" class="bg-item" >
        </div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: 'VidoHeaderSwiper',
  data () {
    return {
      swiperOption: {
        // autoplay: true,
        loop: true
      },
      activity: [
        '表情包挑战赛',
        '逆天大长腿',
        '乐器show专场',
        '古风美少女',
        '富聊好声音',
        '舞林争霸'
      ],
      bgs: [
        require('../../assets/images/11.jpg'),
        require('../../assets/images/12.jpg'),
        require('../../assets/images/13.jpg'),
        require('../../assets/images/14.jpg'),
        require('../../assets/images/15.jpg'),
        require('../../assets/images/16.jpg'),
        require('../../assets/images/17.jpg'),
        require('../../assets/images/18.jpg'),
        require('../../assets/images/19.jpg'),
        require('../../assets/images/20.jpg'),
        require('../../assets/images/21.jpg'),
        require('../../assets/images/22.jpg'),
        require('../../assets/images/23.jpg'),
        require('../../assets/images/24.jpg'),
        require('../../assets/images/25.jpg'),
        require('../../assets/images/26.jpg'),
        require('../../assets/images/27.jpg'),
        require('../../assets/images/28.jpg'),
        require('../../assets/images/29.jpg'),
        require('../../assets/images/30.jpg')
      ]
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="less" scoped>
.video-header-swiper {
    .wrapper(@width: calc(100% - 1.5rem - 2vw););
    .name {
      .wrapper;
      border-radius: 8px;
      text-align: center;
      line-height: calc(1rem - 4vw);
      z-index: 3;
      background-color: rgba(0, 0, 0, .6);
      color: #fff;
      font-weight: bold;
    }
    .bg {
      .wrapper;
      border-radius: 8px;
      white-space: nowrap;
      .bg-item {
        height: 100%;
        width: calc((1rem - 4vw) / 1.4);
      }
    }
}
</style>
