<template>
  <div class="video-head-cover">
    <swiper class="cover-swiper" :options="swiperOption" ref="myCoverSwiper">
      <swiper-slide v-for="(value, key, index) of coverrecommendVideoInfo" :key="index">
        <SmallVideoListItem v-for="(item, index) in value" :key="index" :videoInfo="item" :index="index"></SmallVideoListItem>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <div class="replay" @click="replay">↻重播</div>
    <div class="watch-more" @click="more">查看更多</div>
  </div>
</template>

<script>
import SmallVideoListItem from './SmallVideoListItem'
export default {
  name: 'VideoHeadCover',
  components: {
    SmallVideoListItem
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        }
      },
      coverrecommendVideoInfo: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.myCoverSwiper.swiper
    }
  },
  methods: {
    replay () {
      this.$emit('replay')
    },
    more () {
      this.$emit('more')
    }
  },
  created () {
    this.$http.get(`/smallvideolist`).then((response) => {
      const temp = []
      response.data.data.forEach(element => {
        if (element.name) {
          temp.push(element)
        }
      })
      temp.sort((a, b) => {
        return b.like_num - a.like_num
      })
      this.coverrecommendVideoInfo['0'] = temp.slice(24, 27)
      this.coverrecommendVideoInfo['1'] = temp.slice(27, 30)
      this.coverrecommendVideoInfo['2'] = temp.slice(30, 33)
      this.coverrecommendVideoInfo['3'] = temp.slice(33, 36)
      this.coverrecommendVideoInfo['4'] = temp.slice(36, 39)
      this.coverrecommendVideoInfo['5'] = temp.slice(39, 42)
    })
  }
}
</script>

<style lang="less" scroped>
.video-head-cover {
  .wrapper;
  background-color: rgba(0, 0, 0, .8);
  z-index: 1;
  color: #fff;
  .cover-swiper {
    .wrapper(@top: 20vw; @height: 46vw;);
  }
  .swiper-pagination {
    bottom: .5vw;
  }
  .replay {
    .wrapper(@left: 2vw; @top: 71vw; @width: 46vw; @height: 10vw;);
    .line-height-height(10vw);
    border-radius: 10vw;
    text-align: center;
    background-color: #fff;
    color: #000;
  }
  .watch-more {
    .wrapper(@left: auto; @right: 2vw; @top: 71vw; @width: 46vw; @height: 10vw;);
    .line-height-height(10vw);
    border-radius: 10vw;
    text-align: center;
    background-color: aqua;
  }
}
</style>
