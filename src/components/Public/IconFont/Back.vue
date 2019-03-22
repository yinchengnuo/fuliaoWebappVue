<template>
    <span @click="clicked" class="iconfont">&#xe60d;</span>
</template>

<script>
export default {
  name: 'Back',
  methods: {
    clicked () {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="less" scroped>
</style>
