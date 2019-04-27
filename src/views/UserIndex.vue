<template>
    <div class="user-index" @scroll="scroll">
      <Back class="back"  @clicked="back" :style="{ opacity: -0.1 + (top / headheight)}"></Back>
      <Header class="header" v-show="top < (headheight * 0.6)" :name="userInfo.name" :style="{ opacity: 1.1 - (top / headheight)}"></Header>
      <div class="headpic" :style="{ transform: 'translateY(' + computedTop + 'px)'}">
        <HeadPicSwiper :userInfo="userInfo"></HeadPicSwiper>
        <NameSexLevel :userInfo="userInfo"></NameSexLevel>
        <div v-if="userInfo.introduction" class="sign">{{userInfo.introduction}}</div>
      </div>
      <UserIndexContent :userInfo="userInfo"></UserIndexContent>
      <VideoChatButton></VideoChatButton>
    </div>
</template>

<script>
import Back from '../components/Public/IconFont/Back'
import Header from '../components/Public/Header'
import VideoChatButton from '../components/Public/VideoChatButton'
import HeadPicSwiper from '../components/UserIndex/HeadPicSwiper'
import NameSexLevel from '../components/UserIndex/NameSexLevel'
import UserIndexContent from '../components/UserIndex/UserIndexContent'
export default {
  name: 'UserIndex',
  components: {
    HeadPicSwiper,
    Back,
    Header,
    VideoChatButton,
    NameSexLevel,
    UserIndexContent
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical'
      },
      headheight: 0,
      top: document.body.offsetWidth,
      userInfo: {
        name: '甜心柠',
        sex: 0,
        headpic: [
          'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512580885_3d84976b-062f-44e8-b324-cefc88dedf41_org.jpg@!fc_640_640',
          'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512594493_54dd47e5-7874-485b-b050-c88f9eaf0049_org.jpg@!fc_640_640',
          'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512614512_d08117b8-83c3-4dd9-8456-6fdb4e5ea6e1_org.jpg@!fc_640_640',
          'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512624923_29e97e33-0b10-44cc-95be-e6ed807650e0_org.jpg@!fc_640_640',
          'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512637003_a8ddb0ad-7a05-4a2d-90e2-422ed9d58a05_org.jpg@!fc_640_640',
          'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512649766_3cdfe078-d73c-4e86-bf4e-abef49e4950e_org.jpg@!fc_640_640',
          'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512658632_d2abd280-b0e8-43b0-b6b0-a7ba73092faa_org.jpg@!fc_640_640',
          'http://img2.96friend.cn/d3/photos/2019/03/25/19/pic_1553512669241_56476096-7f19-491b-8858-ebeb4c2e6247_org.jpg@!fc_640_640'
        ],
        videointropath: 'http://qqfeed.inke.cn/mp4/MTUzNDY2NTI3ODQ3NiM3NzcjbXA0-1.mp4?iksource=1',
        Mlevel: 9,
        Vlevel: 6,
        introduction: '小哥哥，来找我玩呗🤐',
        age: 18,
        type: '双子座',
        localtion: '杭州市',
        lables: ['美容师', '00后', '萝莉']
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    scroll (e) {
      let top = this.$el.getElementsByClassName('user-index-content')[0].getBoundingClientRect().top
      this.top = top
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    computedTop () {
      return Math.floor((this.headheight - this.top) / 2.3)
    }
  },
  mounted () {
    this.top = this.headheight = this.$el.getElementsByClassName('headpic')[0].offsetHeight
  },
  beforeRouteLeave (to, from, next) {
    this.$store.state.UserIndexScrollTop = this.$el.scrollTop
    this.$store.state.UserIndexUserinfo = this.userinfo
    next()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'VideoIntroduction') {
      next(vm => {
        vm.$el.scrollTop = vm.$store.state.UserIndexScrollTop
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="less" scroped>
.user-index {
  .wrapper(@overflow: auto;);
  .back {
    .wrapper(@position: fixed; @width: .6rem; @height: .6rem;);
    font-size: .6rem;
    z-index: 3;
  }
  .header {
    position: fixed;
    z-index: 2;
  }
  .headpic {
    float: left;
    width: 100%;
    padding-top: 100vw;
    .sign {
      min-height: 0.6rem;
      box-sizing: border-box;
      padding-left: 2vw;
      border-bottom: 4px solid #eee;
      line-height: calc(0.6rem - 4px);
    }
  }
}
</style>
