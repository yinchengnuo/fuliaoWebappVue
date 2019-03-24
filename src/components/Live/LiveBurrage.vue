<template>
  <div class="live-burrage">
      <div class="content" ref="scroller">
        <div class="list" v-for="(item, index) in list" :key="index">
            <a href="http://down.ipaychat.com/echat.apk" download="http://down.ipaychat.com/echat.apk">游客{{item}}</a>：<span class="info">来了</span></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'LiveBurrage',
  data () {
    return {
      list: [9527, 8341]
    }
  },
  mounted () {
    const timer = () => {
      let time = Math.floor(Math.random() * 10000)
      if (this.list.length > 10) {
        this.list.shift()
      }
      this.list.push(time)
      setTimeout(timer, time)
    }
    setTimeout(timer, Math.floor(Math.random() * 10000))
  }
}
</script>

<style lang="less" scroped>
.live-burrage {
    .wrapper(@width: 50vw; @height: 24vw;@left: 2vw; @top: auto; @bottom: 14vw; @overflow: auto;);
    .content {
        .wrapper(@height: auto; @top: auto; @bottom: 0;);
    }
    .list {
        line-height: 4vw;
        .info {
            color: #fff;
        }
    }
}
</style>
