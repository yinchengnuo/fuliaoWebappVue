<template>
  <div class="horse-move">
    <img v-if="ismove" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552831310152&di=7ec0b4c575caccdb5f05b77e3b7d705e&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170527%2F588531d76ec745a3999b3948cf7e95e0_th.png" alt="" class="moveimg">
    <span class="movetext">~一大波美女正正在赶来~</span>
  </div>
</template>

<script>
export default {
  name: 'HorseMove',
  props: ['ismove']
}
</script>

<style lang="less" scoped>
.horse-move {
  .wrapper(@height: @header-height;);
  background: linear-gradient(#c4f6f4, #6ee9f4);
  opacity: 0.7;
  z-index: 1;
  .moveimg {
      height: 100%;
      opacity: 1;
      float: right;
  }
  .movetext {
      .wrapper(@height: @header-height;);
      text-align: center;
      line-height: @header-height;
      font-size: 16px;
      color: deeppink;
      font-weight: bold;
  }
}
</style>
