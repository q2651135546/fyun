<!--  -->
<template>
  <div class="navheader">
    <img @click="$router.go(-1)" src="@/assets/img/icon-back.png" />
    <div class="title" v-if="title">{{ title }}</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: ["title"],
};
</script>
<style lang='less' scoped>
.navheader {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  z-index: 100;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f1f2f6;
  img {
    position: absolute;
    left: 15px;
    width: 19px;
    height: 19px;
  }
  .title {
    width: 72%;
    height: auto;
    font-size: 17px;
    font-weight: 500;
    text-align: center;
    color: #333;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>