<template>
<div class="app-index">
  <div class="index-nav" ref="nav">
      <router-link class="nav-item live-list" to="/LiveList" replace tag="span">直播</router-link>
      <router-link class="nav-item small-video" to="/SmallVideoList" replace tag="span">小视频</router-link>
      <router-link class="nav-item robot-chat" to="/VideoChat" replace tag="span">视频聊</router-link>
      <router-link class="nav-item about-me" to="/About" replace tag="span">关于富聊</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
</div>
</template>

<script>
export default {
  name: 'AppIndex',
  watch: {
    '$route' (to, from) {
      if (to.name === 'LiveList') {
        this.$el.getElementsByClassName('live-list')[0].click()
      } else if (to.name === 'SmallVideoList') {
        this.$el.getElementsByClassName('small-video')[0].click()
      } else if (to.name === 'VideoChat') {
        this.$el.getElementsByClassName('robot-chat')[0].click()
      } else if (to.name === 'About') {
        this.$el.getElementsByClassName('about-me')[0].click()
      }
    }
  }
}
</script>

<style lang="less" scroped>
.app-index {
  .wrapper;
  .index-nav {
    .wrapper(@position: fixed; @top: auto; @bottom: 0px; @height: 1rem;);
    display: flex;
    justify-content: space-around;
    z-index: 2;
    .live-list {
      .index-nav-item(@urlone: "live.png"; @urltwo: "onlive.png";);
    }
    .small-video {
      .index-nav-item(@urlone: "smallvideo.png"; @urltwo: "onsmallvideo.png"; @size: .45rem;);
    }
    .robot-chat {
      .index-nav-item(@urlone: "videochat.png"; @urltwo: "onvideochat.png";);
    }
    .about-me {
      .index-nav-item(@urlone: "about.png"; @urltwo: "onabout.png";);
    }
  }
}
</style>
