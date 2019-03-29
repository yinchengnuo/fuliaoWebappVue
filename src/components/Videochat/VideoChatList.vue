<template>
<div class="vidoe-chat-list">
    <Header name="视频聊"></Header>
    <div class="video-chat-list-content" @scroll="scroll" ref="scroller">
      <video :src="testUrl" class="test" ref="testPlayer" muted></video>
      <div class="wrapper" ref="scrollerContent">
        <div class="header-pic"></div>
        <VideoChatListItem v-for="(item, index) in userInfo" :key="index" :userInfo="item" :index="index" @toVideoChat="toVideoChat"></VideoChatListItem>
        <TextLoading v-show="userInfo.length && page"></TextLoading>
        <a v-show="!page" href="http://down.ipaychat.com/echat.apk" download="http://down.ipaychat.com/echat.apk" class="watch-more">下载富聊APP, 和美女视频聊>>> </a>
      </div>
    </div>
    <ToTop v-show="scrollTop > 10" class="to-top" @clicked="toTop"></ToTop>
    <transition name="fade">
      <div v-show="userLeaved" class="user-leaved">该用户视频聊已接通，当前不在坐等状态了哦~</div>
    </transition>
</div>
</template>

<script>
import Header from '../Public/Header'
import TextLoading from '../Public/TextLoading'
import ToTop from '../Public/IconFont/ToTop'
import VideoChatListItem from './VideoChatListItem'
export default {
  name: 'VideoChatList',
  components: {
    ToTop,
    Header,
    TextLoading,
    VideoChatListItem
  },
  data () {
    return {
      userInfo: [],
      page: 1,
      scrollTop: 0,
      height: 0,
      animationSize: 234,
      getLock: true,
      testUrl: '',
      userLeaved: false,
      nowUserInfo: {}
    }
  },
  methods: {
    scroll () {
      this.scrollTop = this.$refs.scroller.scrollTop
      let n = Math.floor(this.scrollTop / 1500)
      if (n) {
        this.animationSize = 234 * (n + 1)
      } else {
        this.animationSize = 234
      }
      if (this.$refs.scrollerContent.offsetHeight - this.height - this.$refs.scroller.scrollTop < 0) {
        this.get()
      }
    },
    toTop () {
      let timer = 0
      const start = () => {
        this.$refs.scroller.scrollTop = this.scrollTop -= this.animationSize
        if (this.scrollTop > this.animationSize) {
          timer = window.requestAnimationFrame(start)
        } else {
          this.$refs.scroller.scrollTop = this.scrollTop = 0
          window.cancelAnimationFrame(timer)
        }
      }
      timer = window.requestAnimationFrame(start)
    },
    get () {
      if (this.getLock) {
        this.getLock = false
        if (this.page) {
          this.$http.get(`http://39.96.73.206:8888/videochatlist?page=${this.page}`).then((response) => {
            this.userInfo = this.userInfo.concat(response.data.info)
            this.page++
            if (response.data.info.length < 1) {
              this.page = 0
            }
            this.getLock = true
          })
        }
      }
    },
    toVideoChat (index) {
      this.nowUserInfo = this.userInfo[index]
      this.$refs.testPlayer.pause()
      this.testUrl = this.nowUserInfo.streamurl.replace('rtmp', 'http') + '.m3u8'
      this.$refs.testPlayer.play()
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.height = this.$refs.scroller.offsetHeight
    this.$refs.testPlayer.addEventListener('ended', () => {
      this.testText = 'ended'
      this.userLeaved = true
      setTimeout(() => {
        this.userLeaved = false
      }, 1000)
    })
    this.$refs.testPlayer.addEventListener('error', () => {
      this.testText = 'error'
      this.userLeaved = true
      setTimeout(() => {
        this.userLeaved = false
      }, 1000)
    })
    this.$refs.testPlayer.addEventListener('play', () => {
      this.testText = 'play'
    })
  },
  meta () {
    return {
      title: `更多精彩小视频-就在富聊APP`
    }
  }
}
</script>

<style lang="less" scoped>
.vidoe-chat-list {
  .wrapper(@height: calc(100% - 1rem););
  .video-chat-list-content {
    .test {
      .wrapper(@height: auto;);
    }
    .wrapper(@top: @header-height; @height: calc(100% - @header-height); @overflow: scroll;);
    .header-pic {
      .wrapper(@position: relative; @width: 96vw; @height: 30vw; @left: 2vw; @top: 0;);
      background: url('~@/assets/images/videochatheader.jpg') no-repeat center;
      background-size: 100%;
      border-radius: 8px;
    }
    .watch-more {
      display: block;
      position: relative;
      left: 0;
      top: auto;
      right: auto;
      bottom: 0;
      width: 100%;
      height: 0.6rem;
      overflow: hidden;
      line-height: 0.6rem;
      text-align: center;
    }
  }
  .to-top {
    .iconfont-to-top;
    bottom: 30vw;
  }
  .user-leaved {
    .wrapper(@width: 70vw; @height: 6vw; @top: 50%; @left: 15vw;);
    z-index: 1;
    color: #fff;
    font-size: 2vw;
    line-height: 6vw;
    text-align: center;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, .6)
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
