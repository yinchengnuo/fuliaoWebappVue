<template>
    <span @click="clicked" class="iconfont">&#xe600;</span>
</template>

<script>
export default {
  name: 'Play',
  methods: {
    clicked () {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="less" scroped>
</style>
