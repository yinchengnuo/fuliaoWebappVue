<template>
  <a
    href="http://down.ipaychat.com/echat.apk"
    download="http://down.ipaychat.com/echat.apk"
    class="watch-more">
    下载 UU-Watch App, 看更多{{name}}直播
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
  position: relative;
  box-sizing: border-box;
  border: 1px solid black;
  width: 100%;
  float: left;
  border-radius: 16px;
  text-align: center;
 .line-height-height(30px);
 background-color: #f40;
 color: #fff;
}
</style>
