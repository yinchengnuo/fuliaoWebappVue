<template>
  <div class="live">
    2131231
    <!-- <Header :name="channels[now].name"></Header>
    <video ref="video" class="live-video" :src="channels[now].m3u8" :poster="channels[now].headpic" controls x5-video-player-type="h5"></video>
    <div class="live-origin">直播源地址：{{channels[now].m3u8}}</div>
    <div class="channellist">
      <UserItem @changechannel="changechannel" v-for="(item, index) in channels" :index="index" :key="index" v-show="index != now" :channel="item"></UserItem>
      <WatchMore :name="name"></WatchMore>
    </div>
    <div @click="toindex" class="back">×</div> -->
  </div>
</template>

<script>
import UserItem from '../components/Public/UserItem'
import WatchMore from '../components/Public/WatchMore'
import Header from '../components/Public/Header'
export default {
  name: 'Live',
  components: {
    UserItem,
    WatchMore,
    Header
  },
  methods: {
    toindex () {
      this.$router.go(-1)
    },
    changechannel (index) {
      this.now = index
    }
  },
  data () {
    return {
      channels: this.$route.params.channels,
      now: this.$route.params.index,
      name: this.$route.params.name
    }
  },
  watch: {
    now (n, o) {
      setTimeout(() => {
        this.$refs.video.play()
      }, 233)
    }
  },
  metaInfo: {
    title: '电视直播-UU-Watch-看-我喜欢！'
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      setTimeout(() => {
        vm.$refs.video.play()
      }, 233)
    })
  }
}
</script>

<style lang="less" scroped>
.live {
  .wrapper;
  .live-video {
    .wrapper(@height: @video-height; @top: @header-height;);
  }
  .live-origin {
    .wrapper(@height: 8vw; @top: calc(@video-height + @header-height); @overflow: auto;);
    color: #f40;
    box-sizing: border-box;
    border: 1px solid #aaa;
    border-radius: 8px;

  }
  .channellist {
    .wrapper(@height: calc(100% - @video-height - @header-height - 8vw); @top: calc(@video-height + @header-height + 8vw); @overflow: auto;);
  }
  .back {
    .wrapper(@position: fixed; @width: 10vw; @height: 10vw; @left: auto; @top: auto; @right: 0; @bottom: 0;);
    border: 2px solid black;
    text-align: center;
    line-height: 10vw;
    border-radius: 50%;
    font-size: 8vw;
  }
}
</style>
