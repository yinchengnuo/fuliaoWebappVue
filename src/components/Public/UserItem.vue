<template>
  <div @click="toTVLive" class="user-item" :style="{ background: 'url(' + userInfo.bgpic + ') no-repeat center', backgroundSize: '47vw'}">
    <span class="info">
      <span class="name">{{ userInfo.name }}</span>
      <span class="level">{{ userInfo.vlevel > userInfo.mlevel ? 'v' + userInfo.vlevel : 'm' + userInfo.mlevel }}</span>
      <span class="city">{{ name == '杭州' ? userInfo.city : '' }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'UserItem',
  props: ['userInfo', 'name'],
  methods: {
    toTVLive () {
      this.$router.push({
        name: this.$route.name === 'LiveOne' ? 'LiveTwo' : 'LiveOne',
        params: { userInfo: this.userInfo }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-item {
  .wrapper(@position: relative; @top: auto; @width: 47vw; @height: 47vw; );
  margin-left: 2vw;
  margin-bottom: 2vw;
  float: left;
  border-radius: 8px;
  .info {
    .wrapper( @top: 39vw; @height: 8vw;);
    line-height: 8vw;
    box-sizing: border-box;
    padding-left: 2vw;
    color: #fff;
    border-radius: 8px;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .7));
    .level {
      background: #f40;
      margin-left: 1vw;
    }
    .city {
      float: right;
      font-size: 1vw;
      margin-right: 2vw;
    }
  }
}
</style>
