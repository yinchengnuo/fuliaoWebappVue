<template>
  <div class="video-introduction">
    <Header :name="name + '的视频介绍'"></Header>
    <!-- <video class="video-introduction-player" :src="videointroduction" loop @click="play" ></video> -->
    <video class="video-introduction-player" src="http://pili-live-rtmp.ipaychat.com/fuliao-live/255173487.m3u8" autoplay loop @click="play" ></video>
  </div>
</template>

<script>
import Header from '../components/Public/Header'
export default {
  name: 'VideoIntroduction',
  components: {
    Header
  },
  data () {
    return {
      videointroduction: this.$route.params.videointroduction,
      name: this.$route.params.name
    }
  },
  methods: {
    play () {

    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      setTimeout(() => {
        vm.$el.getElementsByTagName('video')[0].play()
      }, 123)
    })
  },
  metaInfo: {
    title: '下载富聊APP-邀请TA视频聊-UU-Watch-看-我喜欢！'
  }
}
</script>

<style lang="less" scroped>
.video-introduction {
  .wrapper;
  .video-introduction-player {
    .wrapper(@top: @header-height; @height: calc(100% - @header-height););
  }
}
</style>
