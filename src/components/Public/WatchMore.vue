<template>
  <a
    href="http://down.ipaychat.com/echat.apk"
    download="http://down.ipaychat.com/echat.apk"
    class="watch-more">
    下载富聊APP, 看更多{{name === '杭州' ? '' : name}}直播>>>
  </a>
</template>

<script>
export default {
  name: 'WatchMore',
  props: ['name']
}
</script>

<style lang="less" scoped>
.watch-more {
  display: block;
  .wrapper(@position: relative; @height: @header-height; @top: auto; @bottom: 0;);
  line-height: @header-height;
  text-align: center;
}
</style>
