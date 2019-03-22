<template>
    <div class="user-index" @scroll="scroll">
      <Back class="back"  @clicked="back" :style="{ opacity: -0.1 + (top / headheight)}"></Back>
      <Header class="header" v-show="top < (headheight * 0.6)" :name="userinfo.name" :style="{ opacity: 1.1 - (top / headheight)}"></Header>
      <div class="headpic" :style="{ transform: 'translateY(' + computedTop + 'px)'}">
        <HeadPicSwiper :userinfo="userinfo"></HeadPicSwiper>
        <NameSexLevel :userinfo="userinfo"></NameSexLevel>
        <div v-if="userinfo.introduction" class="sign">{{userinfo.introduction}}</div>
      </div>
      <UserIndexContent :userinfo="userinfo"></UserIndexContent>
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
      top: document.body.offsetWidth
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
    userinfo () {
      return this.$route.params.userinfo ? this.$route.params.userinfo : this.$store.state.UserIndexUserinfo
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    computedTop () {
      return Math.floor((this.headheight - this.top) / 1.8)
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
