<template>
    <div class="user-index-content">
        <ul class="userinfo-nav">
            <li
              v-for="(item,index) in navlist"
              :key="index"
              :class="[activeClass == index ? 'act' : '']"
              @click="change(index)"
            >{{item}}</li>
         </ul>
         <UserinfoSwiper :userInfo="userInfo" :activeClass="activeClass" :name="navlist" @slide="slider"></UserinfoSwiper>
    </div>
</template>

<script>
import UserinfoSwiper from './UserinfoSwiper'
export default {
  name: 'UserIndexContent',
  props: ['userInfo'],
  components: {
    UserinfoSwiper
  },
  data () {
    return {
      navlist: ['资料', '小视频', '动态'],
      activeClass: 0
    }
  },
  methods: {
    change (index) {
      this.activeClass = index
    },
    slider (active) {
      this.activeClass = active
    }
  }
}
</script>

<style lang="less" scroped>
.user-index-content {
    .wrapper(@position: relative; @height: calc(100% - .6rem););
    z-index: 1;
    float: left;
    background: #fff;
    .userinfo-nav {
        .wrapper(@height: @header-height;);
        .line-height-height(@header-height);
        text-align: left;
        font-size: 14px;
        box-sizing: border-box;
        li {
            .li;
            text-align: center;
        }
    }
}
</style>
