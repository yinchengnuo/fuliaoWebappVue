<template>
  <div class="live-swiper-content" @scroll="scroll" ref="scroller">
    <div class="wrapper" ref="scrollerContent">
      <UserItem v-for="(item, index) in liveListInfo" :key="index" :userInfo="item" :name="name"></UserItem>
    </div>
  </div>
</template>

<script>
import UserItem from '../Public/UserItem'
export default {
  name: 'LiveSwiperContent',
  props: ['liveListInfo', 'name'],
  components: {
    UserItem
  },
  data () {
    return {
      getMore: false,
      height: 0
    }
  },
  methods: {
    scroll (e) {
      if (this.$refs.scrollerContent.offsetHeight - this.height - this.$refs.scroller.scrollTop < 0) {
        if (this.name === '推荐') {
          this.$emit('get', 'tuijian')
        } else if (this.name === '魅力') {
          this.$emit('get', 'meili')
        } else if (this.name === '才艺') {
          this.$emit('get', 'caiyi')
        } else if (this.name === '杭州') {
          this.$emit('get', 'hangzhou')
        }
      }
    }
  },
  mounted () {
    this.height = this.$refs.scroller.offsetHeight
  }
}
</script>

<style lang="less" scoped>
.live-swiper-content {
  .wrapper(@overflow: auto;);
  border-top: 8px solid #fff;
  .wrapper {
    float: left;
  }
}
</style>
