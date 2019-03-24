<template>
    <span class="iconfont" @click="click">&#xe615;</span>
</template>

<script>
export default {
  name: 'Close',
  methods: {
    click () {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="less" scroped>
</style>
