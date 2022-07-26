<!--  -->
<template>
  <div class="container">
    <NavHeader title="我的消息"></NavHeader>
    <div class="message-list">
      <div class="message-item" v-for="item in list" :key="item.id">
        <div class="content">{{ item.data.message }}</div>
        <div class="date">{{ getTime(item.created_at) }}</div>
      </div>
      <div class="drop">
        <span>已经到底了</span>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavHeader from "@/components/NavHeader.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { NavHeader },
  data() {
    //这里存放数据
    return {
      list: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$request
      .get("/api/v2/member/messages", {
        params: {
          page: 1,
          page_size: 999,
        },
      })
      .then((res) => {
        this.list = res.data.data;
      })
      .catch((err) => console.log(err));
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
.message-list {
  float: left;
  height: calc(100vh - 50px);
  overflow: scroll;
}
.container {
  box-sizing: border-box;
  padding-top: 50px;
  background: #f6f6f6;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
.drop {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #cccccc;
  font-size: 14px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.message-item {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .content {
    width: 100%;
    height: auto;
    float: left;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.3);
    line-height: 20px;
    margin-bottom: 10px;
    word-break: break-all;
  }

  .date {
    width: 100%;
    height: auto;
    float: left;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.3);
  }

  &.readed {
    .content {
      color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>