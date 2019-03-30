<template>
  <a @click="toAbout" class="watch-more">
    下载富聊APP, 看更多{{name === '杭州直播' ? '直播' : name}}>>>
  </a>
</template>

<script>
export default {
  name: 'WatchMore',
  props: ['name'],
  methods: {
    toAbout () {
      this.$router.push({
        name: 'About'
      })
    }
  }
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
