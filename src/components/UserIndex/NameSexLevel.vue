<template>
    <div class="name-sex-level">
        <div class="name-sex">
            <span class="name item">{{userInfo.name}}</span>
            <Mail v-if="userInfo.sex" class="mail item"></Mail>
            <Femail v-else class="femail item"></Femail>
        </div>
        <div class="level">
            <span class="nowlevel item">M{{userInfo.Mlevel}}</span>
            <span v-if="userInfo.Mlevel > 5" class="hasfather item">出师</span>
            <span class="maxlevel item">最高{{ userInfo.Mlevel >= userInfo.Vlevel ? 'M' : 'V' }}{{ userInfo.Mlevel >= userInfo.Vlevel ? userInfo.Mlevel : userInfo.Vlevel }}</span>
        </div>
    </div>
</template>

<script>
import Mail from '../Public/IconFont/Mail'
import Femail from '../Public/IconFont/Femail'
export default {
  name: 'NameSexLevel',
  props: ['userInfo'],
  components: {
    Femail,
    Mail
  }
}
</script>

<style lang="less" scroped>
.name-sex-level {
    .wrapper(@height: 15vw; @top: 85vw;);
    margin-left: 2vw;
    color: #fff;
    line-height: 7.5vw;
    .name-sex {
        .wrapper(@width: auto; @height: 7.5vw;);
        z-index: 1;
        .item {
            display: inline-block;
            font-size: 6vw;
            margin-right: 2vw;
        }
        .mail, .femail {
            background: orangered;
        }
    }
    .level {
        .wrapper(@width: auto; @top: auto; @bottom: 0; @height: 7.5vw;);
        z-index: 1;
        .item {
            display: inline-block;
            font-size: 4vw;
            line-height: 5.5vw;
            margin: 1vw 2vw 1vw 0;
            border-radius: 6px;
            padding: 0 1vw;
        }
        .nowlevel {
            background-color: orangered;
        }
        .hasfather {
            background-color: lightseagreen;
        }
        .maxlevel {
            background-color: purple;
        }
    }
}
</style>
