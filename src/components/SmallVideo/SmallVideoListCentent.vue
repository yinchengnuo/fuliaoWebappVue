<template>
  <div class="small-video-list-content">
      <SmallVideoListItem v-for="(item, index) in smallVideoData" :key="index" :videoInfo="item" :index="index"></SmallVideoListItem>
      <WatchMore name="小视频"></WatchMore>
  </div>
</template>

<script>
import WatchMore from '../Public/WatchMore'
import SmallVideoListItem from './SmallVideoListItem'
export default {
  name: 'SmallVideoListContent',
  components: {
    WatchMore,
    SmallVideoListItem
  },
  data () {
    return {
      smallVideoData: []
    }
  },
  created () {
    this.$http.get(`http://39.96.73.206:8888/smallvideolist`).then((response) => {
      const temp = response.data.data
      temp.sort((a, b) => {
        return b.like_num - a.like_num
      })
      if (temp.length % 3) {
        temp.shift()
        if (temp.length % 3) {
          temp.shift()
        }
      }
      this.smallVideoData = temp
    })
  }
}
</script>

<style lang="less" scoped>
.small-video-list-content {
    .wrapper(@top: calc(@header-height + 26vw); @height: calc(100% - @header-height - 26vw); @overflow: scroll;);
}
</style>
