<!--  -->
<template>
  <div class="container">
    <NavHeader title="设置"></NavHeader>
    <div class="group-box">
      <div class="group-item">
        <div class="name">用户协议</div>
      </div>
      <div class="group-item">
        <div class="name">隐私协议</div>
      </div>
      <div class="group-item">
        <div class="name">关于我们</div>
      </div>
    </div>
    <div class="box" v-if="isLogin">
      <div @click="rmToken">安全退出</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavHeader from "@/components/NavHeader.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavHeader,
  },
  data() {
    //这里存放数据
    return {
      isLogin: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    rmToken() {
      localStorage.removeItem("h5-token");
      this.$router.go(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.isLogin = localStorage.getItem("h5-token") == null ? false : true;
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.container {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  box-sizing: border-box;
  background: #f6f6f6;
  padding-top: 50px;
  .group-box {
    width: 100%;
    height: auto;
    float: left;
    margin-bottom: 15px;
    background-color: white;
    margin-top: 15px;
    .group-item {
      width: 100%;
      height: auto;
      float: left;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      box-sizing: border-box;
      padding: 8px 15px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);
      .name {
        width: 150px;
        height: auto;
        float: left;
        line-height: 36px;
        font-size: 15px;
        color: #333333;
      }
    }
  }
}
.box {
  width: calc(100% - 30px);
  height: auto;
  float: left;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
  background-color: #3ca7fa;
  font-size: 15px;
  margin: 0 15px;
}
</style>