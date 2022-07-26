<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
Vue.use(Button);
export default {
  data: function () {
    return {};
  },
  created() {},
};
</script>

<style lang="less">
</style>
