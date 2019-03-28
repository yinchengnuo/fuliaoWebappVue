<template>
  <div class="live-user-info" @click="toUserIndex">
      <div class="user-name">{{userInfo.name}}</div>
      <img :src="userInfo.userpic" class="head-pic">
  </div>
</template>

<script>
export default {
  name: 'LiveBurrage',
  props: ['userInfo'],
  methods: {
    toUserIndex () {
      this.$emit('toUserIndex', this.userInfo.userid)
    }
  }
}
</script>

<style lang="less" scroped>
@keyframes rotated
{
    from {
        transform: rotateZ(-360deg)
    }
    to {
        transform: rotateZ(0)
    }
}
.live-user-info {
     .wrapper(@width: 38vw; @height: 10vw;@left: auto; @top: auto; @bottom: 14vw; @right: 2vw;);
     border-radius: 10vw;
     background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
     opacity: .9;
     .user-name {
        display: inline-block;
        line-height: 10vw;
        width: 28vw;
        color: orangered;
        text-align: center;
     }
     .head-pic {
         float: right;
         width: 10vw;
         height: 10;
         border-radius: 10vw;
         overflow: hidden;
         animation: rotated 5s;
         animation-timing-function: linear;
         animation-iteration-count: infinite;
     }
}
</style>
