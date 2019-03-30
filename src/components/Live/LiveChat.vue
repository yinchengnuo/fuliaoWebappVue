<template>
  <div class="live-chat">
      <a @click="toAbout">
        <Comments class="item white"></Comments>
        <Leter class="item white"></Leter>
        <GiftColor class="item"></GiftColor>
      </a>
      <a class="chat-with" @click="toAbout">主播邀你来聊天> </a>
  </div>
</template>

<script>
import Comments from '../Public/IconFont/Comments'
import Leter from '../Public/IconFont/Leter'
import GiftColor from '../Public/IconFont/GiftColor'
export default {
  name: 'LiveChat',
  components: {
    Comments,
    Leter,
    GiftColor
  },
  methods: {
    toAbout () {
      this.$router.push({
        name: 'About'
      })
    }
  }
}
</script>

<style lang="less" scroped>
.live-chat {
    .wrapper(@height: 10vw; @left: 2vw; @width: 96vw; @top: auto; @bottom: 2vw;);
    .item {
        .iconfont;
        display: inline-block;
        font-size: 5vw;
        border-radius: 50%;
        margin-right: 2vw;
        background-color: rgba(0, 0, 0, .3);
        color: #f40;
    }
    .white {
        color: #fff;
    }
    .chat-with {
        float: right;
        border-radius: 10vw;
        line-height: 10vw;
        width: 38vw;
        text-align: center;
        color: #fff;
        background: linear-gradient(to right, rgba(255, 0, 0, .9) , rgba(0, 0, 255, .7));
    }
}
</style>
