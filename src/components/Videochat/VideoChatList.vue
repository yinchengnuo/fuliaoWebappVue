<template>
<div class="vidoe-chat-list">
    <Header name="视频聊"></Header>
    <div class="video-chat-list-content" @scroll="scroll" ref="scroller">
      <div class="wrapper" ref="scrollerContent">
        <div class="header-pic" @click="toAbout"></div>
        <VideoChatListItem v-for="(item, index) in userInfo" :key="index" :userInfo="item" :index="index" @toVideoChat="toVideoChat"></VideoChatListItem>
        <TextLoading v-show="userInfo.length && page"></TextLoading>
        <a v-show="!page" @click="toAbout" class="watch-more">下载富聊APP, 和美女视频聊>>> </a>
      </div>
    </div>
    <ToTop v-show="scrollTop > 10" class="to-top" @clicked="toTop"></ToTop>
    <transition name="fade" @before-leave="beforeLeave">
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
      userLeaved: false,
      nowUserInfo: {},
      nowIndex: 0
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
          this.$http.get(`/videochatlist?page=${this.page}`).then((response) => {
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
      this.nowIndex = index
      this.nowUserInfo = this.userInfo[index]
      this.$http.get(this.nowUserInfo.streamurl.replace('rtmp', 'http') + '.m3u8').then(() => {
        this.$router.push({
          name: 'VideoChatLive',
          params: { userInfo: this.nowUserInfo, index: this.nowIndex }
        })
      }).catch(() => {
        this.userLeaved = true
        setTimeout(() => {
          this.userLeaved = false
        }, 1000)
      })
    },
    beforeLeave () {
      this.userInfo.splice(this.nowIndex, 1)
    },
    toAbout () {
      this.$router.push({
        name: 'About'
      })
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.height = this.$refs.scroller.offsetHeight
  },
  beforeRouteLeave (to, from, next) {
    this.scrollTop = this.$el.getElementsByClassName('video-chat-list-content')[0].scrollTop
    next()
  },
  activated () {
    this.$el.getElementsByClassName('video-chat-list-content')[0].scrollTop = this.scrollTop
    if (this.$route.params.index) {
      this.userInfo.splice(this.$route.params.index, 1)
    }
  },
  watch: {
    userInfo (n) {
      if (n.length < 8) {
        this.get()
      }
    }
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
      .wrapper(@height: 0; @width: 0;);
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
    .wrapper(@width: 64vw; @height: 6vw; @top: 50%; @left: 18vw;);
    z-index: 1;
    color: #fff;
    font-size: 3vw;
    line-height: 6vw;
    text-align: center;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, .8)
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
