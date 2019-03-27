<template>
  <div class="live-one" @scroll="scroll" ref="scroller">
      <VideoHeader></VideoHeader>
      <div class="videopic" :style="{ background: 'url(' + videoInfo.cover + ') no-repeat center', backgroundSize: '100%'}">
        <RoomInfo :userInfo="userInfo" liveEnded="1"></RoomInfo>
        <Play class="play"></Play>
        <div class="video-des">{{videoInfo.name}}</div>
        <a href="http://down.ipaychat.com/echat.apk" download="http://down.ipaychat.com/echat.apk" class="chat-with">和TA聊聊&gt; </a>
        <div class="video-sociaty">
          <Liked class="icon"></Liked>
          <div class="num">{{videoInfo.like_num}}</div>
          <Comments class="icon"></Comments>
          <div class="num">{{Math.floor(Math.random() * 1000)}}</div>
          <Fowared class="icon"></Fowared>
          <div class="num">{{Math.floor(Math.random() * 1000)}}</div>
          <Gift class="icon"></Gift>
          <div class="num">{{Math.floor(Math.random() * 1000)}}</div>
        </div>
      </div>
  </div>
</template>

<script>
import Play from '../components/Public/IconFont/Play'
import Liked from '../components/Public/IconFont/Liked'
import Comments from '../components/Public/IconFont/Comments'
import Fowared from '../components/Public/IconFont/Fowared'
import Gift from '../components/Public/IconFont/Gift'
import RoomInfo from '../components/Public/RoomInfo'
import VideoHeader from '../components/SmallVideo/VideoHeader'
export default {
  name: 'LiveOne',
  components: {
    Play,
    Liked,
    Comments,
    Fowared,
    Gift,
    RoomInfo,
    VideoHeader
  },
  data () {
    return {
      videoInfo: this.$route.params.videoInfo ? this.$route.params.videoInfo : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].videoInfo,
      userInfo: {},
      scrollTop: 0,
      activeClass: this.$route.params.videoInfo ? 0 : JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].activeClass,
      recommendVideoInfo: {
        '热门视频': [],
        '活动视频': []
      },
      show: false,
      app: 0,
      width: 0,
      Quark: window.navigator.userAgent.match(/Quark/),
      Baidu: window.navigator.userAgent.match(/Baidu/),
      yinchengnuo: this.$store.state.yinchengnuo,
      watcherInfo: {},
      watcherInfoIndex: 0,
      userInfoAlert: false,
      liveEnded: false,
      time: 0
    }
  },
  computed: {
    navlist () {
      return Object.keys(this.recommendUserInfo)
    }
  },
  methods: {
    slider (active) {
      this.activeClass = active
    },
    change (index) {
      this.activeClass = index
    },
    play () {
      if (!this.liveEnded) {
        this.show = true
        this.$refs.player.play()
      }
    },
    scroll () {
      this.scrollTop = this.$refs.scroller.scrollTop
    },
    alert (watcherInfo, index) {
      this.watcherInfo = watcherInfo
      this.watcherInfoIndex = index
      this.userInfoAlert = true
    },
    closeAlert () {
      this.userInfoAlert = false
    },
    clickEnded () {
      this.$refs.scroller.scrollTop = this.width
    },
    toUserIndex (userid) {
      alert('toUserIndex ' + userid)
    }
  },
  mounted () {
    // if (!this.$route.params.userInfo) {
    //   this.$refs.scroller.scrollTop = JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].scrollTop
    // }
    // this.width = document.body.offsetWidth
    // this.app = document.body.offsetWidth * 3 - this.$refs.scroller.offsetHeight + 30
    // this.$refs.player.addEventListener('ended', () => {
    //   this.liveEnded = true
    //   this.show = false
    // })
    // this.$refs.player.addEventListener('error', () => {
    //   this.liveEnded = true
    //   this.show = false
    // })
  },
  created () {
    const getRecommendVideoInfo = () => {
      this.$http.get(`http://39.96.73.206:8888/smallvideoinfo?id=${this.$route.params.videoInfo.feed_id}`).then((response) => {
        console.log(response.data.data.feed_info.user)
        const user = {}
        user.name = response.data.data.feed_info.user.nick
        user.userid = response.data.data.feed_info.user.id
        user.userpic = response.data.data.feed_info.user.portrait
        this.userInfo = user
        // this.recommendUserInfo['热门直播'] = response.data.info.sort(() => {
        //   return Math.random() - 0.5
        // }).slice(0, 8)
      })
      this.$http.get(`http://39.96.73.206:8888/smallvideolist`).then((response) => {
        const temp = []
        response.data.data.forEach(element => {
          if (element.name) {
            temp.push(element)
          }
        })
        temp.sort((a, b) => {
          return b.like_num - a.like_num
        })
        if (temp.length % 3) {
          temp.shift()
          if (temp.length % 3) {
            temp.shift()
          }
        }
        this.recommendVideoInfo['热门视频'] = temp
        // this.recommendUserInfo['热门直播'] = response.data.info.sort(() => {
        //   return Math.random() - 0.5
        // }).slice(0, 8)
      })
    }
    // this.$http.get(`http://39.96.73.206:8888/smallvideolist`).then((response) => {
    //   const temp = response.data.data
    //   temp.sort((a, b) => {
    //     return b.like_num - a.like_num
    //   })
    //   if (temp.length % 3) {
    //     temp.shift()
    //     if (temp.length % 3) {
    //       temp.shift()
    //     }
    //   }
    //   this.smallVideoData = temp
    // })
    if (this.$route.params.videoInfo) {
      getRecommendVideoInfo()
    } else {
      const s = JSON.parse(window.sessionStorage.getItem('fuliaoLiveSession'))[`${window.history.state.time}`].recommendUserInfo
      if (s) {
        this.recommendUserInfo['热门直播'] = s['热门直播']
        this.recommendUserInfo['才艺直播'] = s['才艺直播']
      } else {
        getRecommendVideoInfo()
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    // const leaveSession = window.sessionStorage.getItem('fuliaoLiveSession')
    // const oldLeaveSession = JSON.parse(leaveSession)
    // oldLeaveSession[`${this.time}`].recommendUserInfo = this.recommendUserInfo
    // oldLeaveSession[`${this.time}`].activeClass = this.activeClass
    // oldLeaveSession[`${this.time}`].scrollTop = this.$refs.scroller.scrollTop
    // window.sessionStorage.setItem('fuliaoLiveSession', JSON.stringify(oldLeaveSession))
    next()
  },
  meta () {
    return {
      title: `的富聊小视频`
    }
  }
}
</script>

<style lang="less" scroped>
.video-head-cover {
}
</style>
