<template>
  <div @click="toVideoChat" class="video-chat-list-item" :style="{ background: 'url(' + userInfo.userpic + ') no-repeat center', backgroundSize: '47vw'}">
    <span class="info">
      <div class="top">
        <span class="name">{{ userInfo.name }}</span>
        <span class="level">{{ userInfo.faceLevel > userInfo.charmlevel ? 'v' + userInfo.faceLevel : 'm' + userInfo.charmlevel }}</span>
        <span class="sex-age">{{ userInfo.sex ? `♂·${userInfo.year}岁` : `♀·${userInfo.year}岁` }}</span>
      </div>
      <div class="bottom">
        <span class="left">{{ userInfo.videoenergy }}能量/分钟</span>
        <span class="right">{{ userInfo.city }}</span>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'VideoChatListItem',
  props: ['userInfo', 'index'],
  methods: {
    toVideoChat () {
      this.$emit('toVideoChat', this.index)
    }
  }
}
</script>

<style lang="less" scoped>
.video-chat-list-item {
  .wrapper(@position: relative; @top: auto; @width: 47vw; @height: 47vw; );
  margin-left: 2vw;
  margin-bottom: 2vw;
  float: left;
  border-radius: 8px;
  .info {
    .wrapper(@top: 31vw; @height: 16vw;);
    line-height: 8vw;
    box-sizing: border-box;
    padding-left: 2vw;
    color: #fff;
    border-radius: 8px;
    font-size: .25rem;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .7));
    .level, .sex-age {
      background: #f40;
      border-radius: 2px;
      margin-left: .5vw;
      padding: 0 .5vw;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
      margin-right: 2vw;
    }
  }
}
</style>
