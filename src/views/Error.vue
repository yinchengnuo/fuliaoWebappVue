<template>
    <div class="error">
        对不起！当前设备不支持访问本页面！请使用<strong>移动</strong>设备（即设备屏幕宽度小于等于768CSS像素）上的浏览器访问本页。如有给您带来不便，敬请谅解！
    </div>
</template>

<style lang="less">
.error {
  .wrapper;
  box-sizing: border-box;
  background-color: aquamarine;
  text-align: center;
  font-size: 1rem;
  font-style: italic;
  line-height: 8vh;
  strong {
      font-weight: bold;
      color: blueviolet;
  }
}
</style>
