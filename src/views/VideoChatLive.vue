<template>
<div class="vidoe-chat-live">
    <Header :name="userInfo.name"></Header>
    <Play class="play" @clicked="play"></Play>
    <video v-show="show" :src="userInfo.hqStreamUrl.replace('rtmp', 'http') + '.m3u8'" class="video-player" ref="player"></video>
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
    <div class="chatwith">
      <div class="top">邀TA视频聊</div>
      <div class="bottom">{{userInfo.videoenergy}}能量/分钟</div>
    </div>
    <transition name="fade" @before-leave="beforeLeave">
      <div v-show="userLeaved" class="user-leaved">该用户视频聊已接通，当前不在坐等状态了哦~</div>
    </transition>
</div>
</template>

<script>
import Header from '../components/Public/Header'
import Play from '../components/Public/IconFont/Play'
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
    beforeLeave () {
      this.$router.replace({
        name: 'VideoChat',
        params: { index: this.index }
      })
    },
    toUserIndex () {
      this.$router.replace({
        name: 'UserIndex',
        params: { id: this.userInfo.videoRoomId }
      })
    }
  },
  mounted () {
    this.$refs.player.addEventListener('erroe', () => {
      this.userLeaved = true
      setTimeout(() => {
        this.userLeaved = false
      }, 1000)
    })
    this.$refs.player.addEventListener('ended', () => {
      this.userLeaved = true
      setTimeout(() => {
        this.userLeaved = false
      }, 1000)
    })
  },
  meta () {
    return {
      title: `${this.userInfo.name}正在富聊坐等你来视频聊`
    }
  }
}
</script>

<style lang="less" scoped>
.vidoe-chat-live {
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
      background-color: rgba(0, 0, 0, .6)
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
