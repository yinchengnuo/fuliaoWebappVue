<template>
  <div class="video-header">
      <VideoHeaderSwiper></VideoHeaderSwiper>
      <a @click="toAbout" class="join">查看活动</a>
  </div>
</template>

<script>
import VideoHeaderSwiper from './VideoHeaderSwiper'
export default {
  name: 'VidoHeader',
  components: {
    VideoHeaderSwiper
  },
  data () {
    return {
      activity: [
        '表情包挑战赛',
        '逆天大长腿',
        '乐器show专场',
        '古风美少女',
        '富聊好声音',
        '舞林争霸'
      ]
    }
  },
  methods: {
    toAbout () {
      this.$router.push({
        name: 'About'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.video-header {
    .wrapper(@height: 1rem;);
    box-sizing: border-box;
    border: 2vw solid #f2f2f2;
    background-color: #f2f2f2;
    .join {
        .wrapper(@left: auto; @right: 0; @width: 1.5rem; @height: .5rem; @top: 50%;);
        margin-top: -.25rem;
        text-align: center;
        line-height: .5rem;
        border-radius: .6rem;
        color: #fff;
        background: rgb(0, 225, 255);
    }
}
</style>
