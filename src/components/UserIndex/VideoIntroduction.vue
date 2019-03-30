<template>
<div class="vidoe-introduction">
    <Header :name="userInfo.name + '的视频介绍'"></Header>
    <Play class="play" @clicked="play"></Play>
    <video src="http://www.ipaychat.com/images/home-video/02.mp4" class="video-player" ref="player" loop></video>
    <img :src="userInfo.userpic" class="bg">
    <div class="userinfo"  @click="toUserIndex">
      <img :src="userInfo.userpic" class="headerpic">
      <div class="info">
        <div class="top">
          <span class="name">{{userInfo.name}}</span>
          <span class="level">m{{userInfo.charmlevel}}</span>
          <span class="age">{{userInfo.year}}岁</span>
        </div>
        <div class="bottom">
          <span class="city">{{userInfo.city}}</span>
          <span class="id">ID:{{userInfo.videoRoomId}}</span>
        </div>
      </div>
    </div>
    <div class="chatwith" @click="toAbout">
      <div class="top">邀TA视频聊</div>
      <div class="bottom">{{userInfo.videoenergy}}能量/分钟</div>
    </div>
    3423423
</div>
</template>

<script>
import Header from '../Public/Header'
import Play from '../Public/IconFont/Play'
export default {
  name: 'VideoChatList',
  components: {
    Play,
    Header
  },
  data () {
    return {
      userInfo: this.$route.params.userInfo,
      index: this.$route.params.index,
      userLeaved: false,
      show: false
    }
  },
  methods: {
    play () {
      this.show = true
      this.$refs.player.play()
    },
    toUserIndex () {
      this.$router.go(-1)
    },
    toAbout () {
      this.$router.replace({
        name: 'About'
      })
    }
  },
  meta () {
    return {
      title: `甜心柠的视频价绍`
    }
  }
}
</script>

<style lang="less" scoped>
.vidoe-introduction {
    .wrapper;
    .play {
      .iconfont-play;
      z-index: 2;
    }
    .video-player {
        .wrapper(@top: @header-height; @height: calc(100% - @header-height - 14vw););
        z-index: 1;
    }
    .bg {
      .wrapper(@top: @header-height; @height: calc(100% - @header-height););
    }
    .user-leaved {
      .wrapper(@width: 64vw; @height: 6vw; @top: auto; @bottom: 4vw; @left: 18vw;);
      z-index: 2;
      color: #fff;
      font-size: 3vw;
      line-height: 6vw;
      text-align: center;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, .8)
    }
    .userinfo {
      .wrapper(@width: 46vw; @height: 10vw; @left: 2vw; @top: auto; @bottom: 2vw);
      border-radius: 10vw;
      background-color: rgba(0, 0, 0, .6);
      color: #fff;
      font-size: 3vw;
      .headerpic {
        width: 10vw;
        height: 10vw;
        border-radius: 10vw;
        overflow: hidden;
      }
      .info {
        .wrapper(@width: 36vw; @left: 10vw;);
        line-height: 5vw;
        span {
          margin-left: 1vw;
        }
        .level {
          background-color: #f40;
          border-radius: 1vw;
        }
      }
    }
    .chatwith {
      .wrapper(@width: 46vw; @height: 10vw; @left: auto; @right: 2vw; @top: auto; @bottom: 2vw);
      border-radius: 10vw;
      background: linear-gradient(to right, rgba(255, 0, 0, .9) , rgba(0, 0, 255, .7));
      color: #fff;
      text-align: center;
      .top {
        .wrapper(@height: 6vw;);
        font-size: 4vw;
        line-height: 6vw;
      }
      .bottom {
        .wrapper(@height: 4vw; @top: auto; @bottom: 0;);
        font-size: 2vw;
        line-height: 4vw;
      }
    }
}
</style>
