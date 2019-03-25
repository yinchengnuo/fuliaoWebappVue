<template>
  <div @click="click" class="live-ended">{{info}}</div>
</template>

<script>
export default {
  name: 'LiveEnded',
  props: ['info'],
  methods: {
    click () {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="less" scoped>
.live-ended {
    .wrapper(@top: 76vw; @left: 10vw; @width: 80%; @height: 10vw;);
    line-height: 10vw;
    text-align: center;
    background: linear-gradient(to right, rgba(1, 217, 255, 0.9) , rgba(217, 255, 0, 0.3));
    font-size: 4vw;
    border-radius: 10vw;
    color: #fff;
}
</style>
