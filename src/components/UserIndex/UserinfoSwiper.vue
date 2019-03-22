<template>
  <swiper class="userinfo-swiper" :options="swiperOption" ref="mySwiper">
    <swiper-slide>
        <div class="baseinfo infolist">
            <div class="title">{{userinfo.sex ? '他' : '她'}}的资料</div>
            <div class="baseinfo-item">年龄&nbsp;&nbsp;&nbsp;&nbsp;{{userinfo.age}}岁</div>
            <div class="baseinfo-item">星座&nbsp;&nbsp;&nbsp;&nbsp;{{userinfo.type}}</div>
            <div class="baseinfo-item">城市&nbsp;&nbsp;&nbsp;&nbsp;{{userinfo.localtion}}</div>
        </div>
        <div class="tags infolist" v-if="userinfo.lables.length">
            <div class="title">{{userinfo.sex ? '他' : '她'}}的标签</div>
            <div class="taglist baseinfo-item">
              <span class="tag-item" v-for="(item, index) in userinfo.lables" :key="index">{{item}}</span>
            </div>
        </div>
        <div class="sz infolist">
            <div class="title">{{userinfo.sex ? '他' : '她'}}的私照</div>
        </div>
        <div class="group infolist">
            <div class="title">{{userinfo.sex ? '他' : '她'}}的群</div>
        </div>
        <div class="sign infolist">
            <div class="title">个人介绍</div>
        </div>
    </swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
</template>

<script>
export default {
  name: 'UserinfoSwiper',
  props: ['userinfo'],
  data () {
    return {
      swiperOption: {
        scrollbar: {
          el: '.swiper-scrollbar'
        }
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  }
}
</script>

<style lang="less" scroped>
.userinfo-swiper {
    .wrapper(@overflow: auto; @height: calc(100% - @header-height); @top: @header-height;);
    box-sizing: border-box;
    padding-top: .1rem;
    .infolist {
      .wrapper(@position: relative; @top: auto; @left: auto; @height: auto;);
      padding: 0 .3rem .3rem;
      box-sizing: border-box;
      .baseinfo-item {
        height: @header-height;
        line-height: @header-height;
        .tag-item {
          background: orangered;
          border-radius: 6px;
          margin-right: 6px;
          padding: 0 6px;
          color: #fff;
        }
      }
    }
    .title {
        height: @header-height;
        line-height: @header-height;
        font-size: .3rem;
        font-weight: bold;
        margin-bottom: .2rem;
    }
    .swiper-scrollbar {
      .wrapper( @height: 2px; @width: calc(@channels-nav-list-width * 3););
      background: #fff;
      /deep/ .swiper-scrollbar-drag {
        background: #fff;
        width: @channels-nav-list-width;
      }
      /deep/ .swiper-scrollbar-drag::after {
        content: '';
        .wrapper(@width: 40%; @left: 30%;);
        background-color: orange;
      }
    }
}
</style>
