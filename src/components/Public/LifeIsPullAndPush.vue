<template>
    <div class="life-is-pull-and-push">
        <img class="topimg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552808687500&di=1d2ee6273a3cef6f3c5d26da39e5421d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201705%2F06%2F20170506231721_BtY42.thumb.224_0.gif">
        <div>人生，无非就是拉拉扯扯。</div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.life-is-pull-and-push {
    .wrapper(@position: fixed; @height: -70vw; @top: -70vw;);
        text-align: center;
        line-height: @header-height;
        .topimg {
            width: 60vw;
            height: 60vw;
        }
}
</style>
