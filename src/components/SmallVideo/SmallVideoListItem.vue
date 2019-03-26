<template>
  <div class="small-video-list-item" :style="{ background: 'url(' + videoInfo.cover + ') no-repeat center', backgroundSize: '32vw'}">
      <span class="hot" v-if="index === 0 || index === 1 || index === 2">热门</span>
      <Play class="play"></Play>
      <Liked class="liked"></Liked>
      <span class="liked-num">{{videoInfo.like_num}}</span>
  </div>
</template>

<script>
import Play from '../Public/IconFont/Play'
import Liked from '../Public/IconFont//Liked'
export default {
  name: 'SmallVideoListItem',
  props: ['videoInfo', 'index'],
  components: {
    Play,
    Liked
  }
}
</script>

<style lang="less" scoped>
.small-video-list-item {
    width: 32vw;
    height: 44.22vw;
    margin: 0 0 1vw 1vw;
    float: left;
    position: relative;
    .hot {
        .wrapper(@width: 10vw; @height: 4vw; @left: 2vw; @top: 2vw; );
        text-align: center;
        line-height: 4vw;
        border-radius: 8px;
        color: #fff;
        background: linear-gradient(315deg, rgb(255, 199, 117), rgb(255, 106, 0));
    }
    .play {
        .wrapper(@width: 8vw; @height: 8vw; @left: auto; @top: 2vw; @right: 2vw;);
        .iconfont(8vw);
        color: #fff;
    }
    .liked {
        .wrapper(@width: 4vw; @height: 4vw; @left: 2vw; @top: auto; @bottom: 2vw;);
        .iconfont(4vw);
        color: #fff;
    }
    .liked-num {
        .wrapper(@width: auto; @height: 4vw; @left: 6vw; @top: auto; @bottom: 2vw;);
        color: #fff;
    }
}
</style>
