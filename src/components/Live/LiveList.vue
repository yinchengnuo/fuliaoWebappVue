<template>
<div class="live-list">
    <Header name="直播"></Header>
    <SwiperNav class="live-list-nav" :navlist="navlist" :activeClass="activeClass" @change="change"></SwiperNav>
    <div class="hangzhou">附近</div>
    <LiveListSwiper :activeClass="activeClass" :name="navlist" @slide="slider"></LiveListSwiper>
</div>
</template>

<script>
import Header from '../Public/Header'
import SwiperNav from '../Public/SwiperNav'
import LiveListSwiper from './LiveListSwiper'
export default {
  name: 'LiveList',
  components: {
    Header,
    SwiperNav,
    LiveListSwiper
  },
  data () {
    return {
      activeClass: 0,
      scrollers: []
    }
  },
  beforeCreate () {
    this.$store.dispatch('getAsync', 'tuijian')
    this.$store.dispatch('getAsync', 'caiyi')
    this.$store.dispatch('getAsync', 'meili')
    this.$store.dispatch('getAsync', 'hangzhou')
  },
  computed: {
    navlist () {
      return Object.keys(this.$store.state.liveListInfo)
    }
  },
  methods: {
    slider (active) {
      this.activeClass = active
    },
    change (index) {
      this.activeClass = index
    }
  },
  beforeRouteLeave (to, from, next) {
    const contents = Array.from(this.$el.getElementsByClassName('live-swiper-content'))
    contents.forEach(element => {
      this.scrollers.push(element.scrollTop)
    })
    next()
  },
  activated () {
    const itemArr = Array.from(this.$el.getElementsByClassName('live-swiper-content'))
    for (let i = 0; i < this.scrollers.length; i++) {
      itemArr[i].scrollTop = +this.scrollers[i]
    }
    this.scrollers = []
  },
  meta () {
    return {
      title: '富聊直播-看直播-玩直播-尽在富聊APP'
    }
  }
}
</script>

<style lang="less" scoped>
.live-list {
  .wrapper(@height: calc(100% - 1rem); @overflow: auto;);
  background-color: #fff;
  .live-list-nav {
    top: @header-height;
    .line-height-height(@header-height);
    text-align: center;
    font-size: 14px;
  }
  .hangzhou {
    .wrapper(@position: fixed; @top: @header-height; @left: calc(50% + 2 * @channels-nav-list-width); @height: @header-height; @width: 10vw;);
    font-size: 8px;
    margin-left: calc(-@channels-nav-list-width / 4);
    line-height: @header-height;
  }
}
</style>
