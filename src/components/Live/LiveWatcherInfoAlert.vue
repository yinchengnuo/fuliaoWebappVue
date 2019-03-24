<template>
  <div class="live-watcher-info-alert">
      <Close class="close" @clicked="close"></Close>
      <div class="head-pic center">
          <img @click="toIndex" :src="watcherInfo.userpic" class="pic">
      </div>
      <div class="name-sex-age center">
          <span class="name">{{watcherInfo.name}}（{{watcherInfoIndex}}）</span>
          <Mail class="mail" v-if="watcherInfo.sex"></Mail>
          <Femail class="femail" v-else></Femail>
          <span class="age">{{watcherInfo.age}}岁</span>
      </div>
      <div class="id-city center">富聊ID：{{watcherInfo.userid}} {{watcherInfo.city ? '|' : ''}} {{watcherInfo.city}}</div>
      <div class="sign center">{{watcherInfo.sign}}</div>
      <div class="lable center" v-if="watcherInfo.lable">
          <span class="tag" v-for="(item, index) in watcherInfo.lable" :key="index">{{item}}</span>
      </div>
      <div class="society">
          <span class="focus">关注：{{watcherInfo.focus}}</span>|
          <span class="fans">粉丝：{{watcherInfo.fans}}</span>
          <span class="send">送出：{{watcherInfo.send}}万能量</span>|
          <span class="featurn">财气值：{{watcherInfo.featurn}}万</span>
      </div>
      <div class="bottom">
          <a href="http://down.ipaychat.com/echat.apk" download="http://down.ipaychat.com/echat.apk">
            <span class="focus">关注</span>
          </a>
          <a href="http://down.ipaychat.com/echat.apk" download="http://down.ipaychat.com/echat.apk">
            <span class="it">@TA</span>
          </a>
          <a @click="toIndex">
            <span class="index">主页</span>
          </a>
      </div>
  </div>
</template>

<script>
import Close from '../Public/IconFont/Close'
import Mail from '../Public/IconFont/Mail'
import Femail from '../Public/IconFont/Femail'
export default {
  name: 'LiveWatcherInfoAlert',
  components: {
    Close,
    Mail,
    Femail
  },
  props: ['watcherInfo', 'watcherInfoIndex'],
  methods: {
    toIndex () {
      this.$emit('toUserIndex', this.watcherInfo.userid)
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.live-watcher-info-alert {
  .wrapper(@position: fixed; @height: 60vh; @width: 80vw; @left: 10vw; @top: 20vh;);
  z-index: 2;
  background-color: #fff;
  box-sizing: border-box;
  padding: 2vw;
  border-radius: 8px;
  .close {
      .wrapper(@left: auto; @right: 2vw; @top: 2vw;);
      .iconfont(6vw);
  }
  .center {
      text-align: center;
      line-height: 3vh;
      font-size: 2vh;
      margin: 1vh 0;
  }
  .head-pic {
      height: 10vh;
      margin-top: 8vw;
      text-align: center;
      .pic {
          width: 10vh;
          height: 10vh;
          border-radius: 50%;
          overflow: hidden;
      }
  }
  .name-sex-age {
      height: 3vh;
      font-size: 2.5vh;
      span {
          margin: 0 .5vh;
      }
  }
  .lable {
      height: 4vh;
      line-height: 4vh;
      margin: 2vh 0;
      span {
          display: inline-block;
          margin: 0 1vh;
          border-radius: 6vh;
          background-color: rgb(134, 237, 255);
          padding: 0 2vh;
          color: #fff;
      }
      span:first-child {
          background-color: pink;
      }
      span:last-child {
          background-color: rgb(106, 51, 196);
      }
  }
  .society {
      height: 12vh;
      line-height: 6vh;
      span {
          display: inline-block;
          width: 49%;
          height: 6vh;
          box-sizing: border-box;
          padding-left: 2vw;
      }
      span:nth-child(even) {
          width: auto;
      }
      span:nth-child(3), span:nth-child(4) {
          color: orange;
      }
  }
  .bottom {
      .wrapper(@height: 6vh; @left: 2vw; @width: 76vw; @top: auto; @bottom: 2vw;);
      border-top: 1px solid #ccc;
      text-align: center;
      line-height: 6vh;
      span {
          margin: 0 8vw;
      }
  }
}
</style>
