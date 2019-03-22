<template>
<div class="live-list">
    <Header name="直播"></Header>
    <ul class="live-list-nav">
    <li
        v-for="(item,index) in navlist"
        :key="index"
        :class="[activeClass == index ? 'act' : '']"
        @click="change(index)"
    >
      {{item}}
    </li>
    <span class="hangzhou">附近</span>
    </ul>
    <LiveSwiper :activeClass="activeClass" @slide="slider" @get="getting" :liveListInfo="liveListInfo"></LiveSwiper>
    <Loading v-show="getMore" class="loading"></Loading>
</div>
</template>

<script>
import Header from '../Public/Header'
import LiveSwiper from './LiveSwiper'
import Loading from '../Public/IconFont/Loading'
export default {
  name: 'LiveList',
  components: {
    Header,
    LiveSwiper,
    Loading
  },
  data () {
    return {
      activeClass: 0,
      liveListInfo: {
        '推荐': [],
        '魅力': [],
        '才艺': [],
        '杭州': []
      },
      scrollers: [],
      tuijianpage: 1,
      meilipage: 1,
      caiyipage: 1,
      hangzhoupage: 1,
      getMore: false
    }
  },
  mounted () {
    this.get('tuijian')
    this.get('meili')
    this.get('caiyi')
    this.get('hangzhou')
  },
  computed: {
    navlist () {
      if (this.liveListInfo) {
        return Object.keys(this.liveListInfo)
      } else {
        return []
      }
    }
  },
  methods: {
    slider (active) {
      this.activeClass = active
    },
    change (index) {
      this.activeClass = index
    },
    get (channel) {
      if (channel === 'tuijian') {
        if (this.tuijianpage) {
          this.getMore = true
          this.$http.get(`http://39.96.73.206:8888/tuijian?page=${this.tuijianpage}`).then((response) => {
            this.liveListInfo['推荐'] = this.liveListInfo['推荐'].concat(response.data.info.channelList)
            this.getMore = false
            this.tuijianpage++
            if (response.data.info.channelList.length < 10) {
              this.tuijianpage = 0
            }
          })
        }
      } else if (channel === 'meili') {
        if (this.meilipage) {
          this.getMore = true
          this.$http.get(`http://39.96.73.206:8888/meili?page=${this.meilipage}`).then((response) => {
            this.liveListInfo['魅力'] = this.liveListInfo['魅力'].concat(response.data.info)
            this.getMore = false
            this.meilipage++
            if (response.data.info.length < 10) {
              this.meilipage = 0
            }
          })
        }
      } else if (channel === 'caiyi') {
        if (this.caiyipage) {
          this.getMore = true
          this.$http.get(`http://39.96.73.206:8888/caiyi?page=${this.caiyipage}`).then((response) => {
            this.liveListInfo['才艺'] = this.liveListInfo['才艺'].concat(response.data.info)
            this.getMore = false
            this.caiyipage++
            if (response.data.info.length < 10) {
              this.caiyipage = 0
            }
          })
        }
      } else if (channel === 'hangzhou') {
        if (this.hangzhoupage) {
          this.getMore = true
          this.$http.get(`http://39.96.73.206:8888/hangzhou?page=${this.hangzhoupage}`).then((response) => {
            this.liveListInfo['杭州'] = this.liveListInfo['杭州'].concat(response.data.info)
            this.getMore = false
            this.hangzhoupage++
            if (response.data.info.length < 10) {
              this.hangzhoupage = 0
            }
          })
        }
      }
    },
    getting (name) {
      this.get(name)
    }
  },
  beforeRouteLeave (to, from, next) {
    const contents = Array.from(this.$el.getElementsByClassName('live-swiper-content'))
    contents.forEach(element => {
      this.scrollers.push(element.scrollTop)
    })
    next()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const itemArr = Array.from(vm.$el.getElementsByClassName('live-swiper-content'))
      for (let i = 0; i < vm.scrollers.length; i++) {
        itemArr[i].scrollTop = +vm.scrollers[i]
      }
      vm.scrollers = []
    })
  },
  meta () {
    return {
      title: '富聊直播-看直播-玩直播-尽在富聊APP'
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
.live-list {
  .wrapper(@height: calc(100% - 1rem); @overflow: auto;);
  background-color: #fff;
  .live-list-nav {
    .wrapper(@height: @header-height; @top: @header-height;);
    .line-height-height(@header-height);
    text-align: center;
    font-size: 14px;
    li {
      .li;
    }
    .hangzhou {
      font-size: 8px;
      margin-left: calc(-@channels-nav-list-width / 5)
    }
  }
  .loading {
    .wrapper(@width: 10vw; @height: 10vw; @left: 45vw; @top:auto; @bottom: 0;);
    z-index: 2;
    color: #fff;
    .iconfont;
    border-radius: 50%;
    background: radial-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .7));
    animation: rotate 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
</style>
