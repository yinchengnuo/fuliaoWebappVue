<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive include="AppIndex">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      this.transitionName = to.meta.index > from.meta.index ? 'slide-left' : 'slide-right'
    }
  }
}
</script>

<style lang="less" scroped>
#app {
  .wrapper;
  .slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
    transition: all .3s;
  }
  .slide-left-enter, .slide-right-leave-to {
    transform: translateX(100vw);
  }
  .slide-left-leave-to, .slide-right-enter {
    transform: translateX(-100vw);
  }
}
</style>
