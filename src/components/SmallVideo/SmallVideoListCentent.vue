<template>
  <div class="small-video-list-content">
      <SmallVideoListItem v-for="(item, index) in smallVideoData" :key="index" :videoInfo="item" :index="index"></SmallVideoListItem>
  </div>
</template>

<script>
import SmallVideoListItem from './SmallVideoListItem'
export default {
  name: 'SmallVideoListContent',
  components: {
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
    .wrapper(@top: calc(@header-height + 25vw); @height: calc(100% - @header-height - 25vw); @overflow: scroll;);
    box-sizing: border-box;
    padding-top: 1vw;
}
</style>
