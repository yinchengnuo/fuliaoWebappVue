<template>
    <a href="http://down.ipaychat.com/echat.apk" download="http://down.ipaychat.com/echat.apk" class="video-chat-button">下载富聊APP，邀请TA视频聊</a>
</template>

<script>
export default {
  name: 'VideoChatButton'
}
</script>

<style lang="less" scroped>
.video-chat-button {
    .wrapper(@position: fixed; @height: 10vw; @top: auto; @bottom: 2vw;);
    text-align: center;
    background: orangered;
    color: #fff;
    font-size: 6vw;
    line-height: 10vw;
    border-radius: 16px;
    opacity: .8;
    z-index: 2;
}
</style>
