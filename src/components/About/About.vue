<template>
<div class="about">
  <swiper class="about-swiper" :options="swiperOption">
    <swiper-slide v-for="(item, index) in data" :key="index">
      <div class="page" :style="{background: item.pageBgColor, color: index === 2 ? '#e96967' : index === 4 ? '#000' : '#fff'}">
        <div class="index" v-if="index === 0">
          <transition name="logo">
            <img v-if="enter" :src="item.logo" class="log">
          </transition>
          <div class="page-name index-name">{{item.pageName}}</div>
          <div class="page-des index-des">{{ item.pageDes.split('0')[0] }} <ICountUp class="num" :endVal="endVal"></ICountUp> {{ item.pageDes.split('0')[1] }}</div>
          <transition name="download">
            <a v-if="enter" class="download index-download" :href="ios ? 'http://www.ipaychat.com/index_m_new.html' : 'http://down.ipaychat.com/echat.apk'">免费下载富聊</a>
          </transition>
          <img :src="item.pageImg" class="page-img index-img">
        </div>
        <div v-if="index != 0" class="page-name">{{item.pageName}}</div>
        <div v-if="index != 0" class="page-des">{{item.pageDes}}</div>
        <img v-if="index != 0" :src="item.pageImg" class="page-img">
        <a v-if="index != 0" class="download" :href="ios ? 'http://www.ipaychat.com/index_m_new.html' : 'http://down.ipaychat.com/echat.apk'">免费下载富聊</a>
        <div v-if="index < 4" class="down">↓</div>
      </div>
    </swiper-slide>
  </swiper>
  <img @click="showErweima" src="../../assets/images/kefuimg.png" class="kefu">
  <div v-show="showCover" @click="hideErweima" class="cover">
    <img src="../../assets/images/erweima.jpg" @click.stop="1" alt="" class="erweima">
  </div>
</div>
</template>

<script>
import ICountUp from 'vue-countup-v2'
export default {
  name: 'About',
  components: {
    ICountUp
  },
  methods: {
    showErweima () {
      this.showCover = true
    },
    hideErweima () {
      this.showCover = false
    }
  },
  data () {
    return {
      endVal: 0,
      swiperOption: {
        direction: 'vertical'
      },
      ios: window.navigator.userAgent.match(/iPhone/) ? 1 : 0,
      enter: false,
      showCover: false,
      data: [
        {
          logo: require('../../assets/images/fuliaologo.png'),
          pageName: '遇见你， 一起聊',
          pageDes: '这里有0人等待与你相遇。',
          pageBgColor: '#f2f2f2',
          pageImg: require('../../assets/images/aboutbottom.png')
        },
        {
          pageName: '创意小视频',
          pageDes: '精彩十五秒，好玩的都在这里',
          pageBgColor: '#e96967',
          pageImg: require('../../assets/images/phone1.png')
        },
        {
          pageName: '直播间PK',
          pageDes: 'pk互动，让你刺激与心跳',
          pageBgColor: '#f2f2f2',
          pageImg: require('../../assets/images/phone2.png')
        },
        {
          pageName: '一对一视频畅聊',
          pageDes: '与心动的Ta一对一，聊你所爱，爱你所聊',
          pageBgColor: '#e96967',
          pageImg: require('../../assets/images/phone3.png')
        },
        {
          pageName: '开心交友 暖心聊',
          pageDes: '来富聊遇到心动的Ta,男士首登立送50元！',
          pageBgColor: '#ffdc61',
          pageImg: require('../../assets/images/phone4.png')
        }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.enter = true
      vm.endVal = 31536703
    })
  },
  deactivated () {
    this.endVal = 0
    this.enter = false
  },
  meta () {
    return {
      title: `关于富聊`
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes updown
{
    from {
        transform: translateY(.2rem)
    }
    to {
        transform: rotateZ(-360deg)
    }
}
.about {
  .wrapper(@height: calc(100% - 1rem););
  .about-swiper {
    .wrapper;
    .page {
      .wrapper;
      text-align: center;
      .log {
        width: 60vw;
        margin-top: 20vw;
      }
      .page-name {
        font-size: .6rem;
        margin: .6rem 0 .1rem;
      }
      .page-des {
        padding-bottom: .6rem;
      }
      .page-img {
        width: 100%;
      }
      .download {
        display: block;
        width: 4rem;
        height: 1rem;
        margin: .6rem auto 0;
        line-height: 1rem;
        background-color: #fff;
        border-radius: 1rem;
        color: #e96967;
        font-size: .4rem;
      }
      .index-name, .index-des, .index-download, .index-img {
        .wrapper(@height: auto; @top: auto;);
      }
      .index-img {
        bottom: 0;
      }
      .index-download {
        bottom: 1rem;
        z-index: 1;
        width: 4rem;
        left: 50%;
        margin-left: -2rem;
      }
      .index-name {
        bottom: 3rem;
        z-index: 1;
      }
      .index-des {
        bottom: 2rem;
        z-index: 1;
        .num {
          display: inline-block;
          width: 1.5rem;
        }
      }
    }
  }
  .kefu {
    .wrapper(@width: 1rem; @height: auto; @left: auto; @right: 2vw;);
    z-index: 1;
  }
  .erweima {
    .wrapper(@width: 50vw; @height: auto; @left: 50%; @top: 50%;);
    margin: -25vw 0 0 -25vw;
  }
  .cover {
    .wrapper;
    z-index: 1;
    background-color: rgba(0, 0, 0, .6);
  }
  .down {
    .wrapper(@position: fixed; @height: 1rem; @top: auto; @bottom: 0;);
    text-align: center;
    line-height: 1rem;
    font-weight: bold;
    animation: updown 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}
.logo-enter-active, .logo-leave-active {
  transition: transform 1.5s;
}
.logo-enter, .logo-leave-to {
  transform: scale(0);
}
.download-enter-active, .download-leave-active {
  transition: transform .5s;
}
.download-enter, .download-leave-to {
  transform: translateY(2rem);
}
</style>
