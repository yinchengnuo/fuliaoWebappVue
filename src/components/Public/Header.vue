<template>
  <div class="header">
    <div class="left">
      <img src="@/assets/images/logo.png">
      <img src="@/assets/images/logotext.png">
    </div>
    <div class="center" @click="toIndex">{{name}}</div>
    <a
      href="http://down.ipaychat.com/echat.apk"
      download="http://down.ipaychat.com/echat.apk"
      class="right"
    >下载APP</a>
    <div v-if="name === '富聊小视频'" class="left-right">上下滑动切换小视频，左划查看用户信息，右划查看小视频信息。现在下载富聊APP，不仅能观看更多小视频和美女直播，更会获得价值5万能量的新人大礼包。赶快点击下载和美女互动吧！！！</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['name'],
  methods: {
    toIndex () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes righttoleft {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-250vw);
  }
}
.header {
  .wrapper(@height: @header-height);
  background-color: #f2f2f2;
  text-align: center;
  z-index: 2;
  .left {
    float: left;
    img {
      height: @header-height;
    }
  }
  .center {
    .wrapper;
    .line-height-height(@header-height);
    .title;
  }
  .right {
    .line-height-height(@header-height);
    .wrapper(@width: calc(2.5 * @header-height); @left: auto; @right: 0;);
    color: #f2f2f2;
    background-color: orangered;
    border-radius: 16px;
  }
  .left-right {
    .wrapper(@width: auto; @height: 40%; @top: auto; @bottom: -12%;);
    padding-top: 4px;
    font-size: 10px;
    font-weight: bold;
    text-shadow: 1px 1px 1px purple;
    color: blue;
    white-space: nowrap;
    animation: righttoleft 25s;
    animation-iteration-count: 3;
    animation-timing-function: linear;
    transform: translateX(100vw);
  }
}
</style>
