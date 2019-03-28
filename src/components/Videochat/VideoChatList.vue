<template>
<div class="vidoe-chat-list">
    <Header name="视频聊"></Header>
    <div class="video-chat-list-content" @scroll="scroll" ref="scroller">
      <div class="wrapper" ref="scrollerContent">
        <div class="header-pic"></div>
        <VideoChatListItem v-for="(item, index) in userInfo" :key="index" :userInfo="item"></VideoChatListItem>
        <TextLoading v-show="userInfo.length"></TextLoading>
        <a v-show="!page" href="http://down.ipaychat.com/echat.apk" download="http://down.ipaychat.com/echat.apk" class="watch-more">下载富聊APP, 和美女视频聊>>> </a>
      </div>
    </div>
    <ToTop></ToTop>
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
      animationSize: 234
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
    get () {
      if (this.page) {
        this.$http.get(`http://39.96.73.206:8888/videochatlist?page=${this.page}`).then((response) => {
          this.userInfo = this.userInfo.concat(response.data.info)
          this.page++
          if (response.data.info.length < 14) {
            this.pege = 0
            console.log(this.page)
          }
        })
      }
    }
  },
  created () {
    this.get()
  },
  mounted () {
    this.height = this.$refs.scroller.offsetHeight
  },
  metaInfo: {
    title: '下载富聊APP-和美女一对一视频聊'
  }
}
</script>

<style lang="less" scoped>
.vidoe-chat-list {
  .wrapper(@height: calc(100% - 1rem););
  .video-chat-list-content {
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
}
</style>
