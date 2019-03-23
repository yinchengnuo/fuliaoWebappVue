<template>
    <ul class="swiper-nav">
        <li
            v-for="(item,index) in navlist"
            :key="index"
            :class="[activeClass == index ? 'act' : '']"
            @click="change(index)"
        >
          {{item}}
        </li>
    </ul>
</template>

<script>
export default {
  name: 'SwiperNav',
  props: ['navlist', 'activeClass'],
  methods: {
    change (index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style lang="less" scroped>
.swiper-nav {
    .wrapper(@height: @header-height;);
    box-sizing: border-box;
    li {
        .li;
    }
}
</style>
