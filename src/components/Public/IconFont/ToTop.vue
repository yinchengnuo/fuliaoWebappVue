<template>
    <span class="iconfont" @click="click">&#xe676;</span>
</template>

<script>
export default {
  name: 'Loading',
  methods: {
    click () {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="less" scroped>
</style>
