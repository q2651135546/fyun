<!-- 底部的导航部分 -->
<template>
  <div class="footer">
    <div class="item" @click.stop="handleClick('home')">
      <img
        v-if="type === 'home'"
        src="@/assets/img/icon-home-h@2x.png"
        alt=""
      />
      <img v-else src="@/assets/img/icon-home-n@2x.png" alt="" />
      <span>首页</span>
    </div>
    <div class="item" @click.stop="handleClick('study')">
      <img
        v-if="type === 'study'"
        src="@/assets/img/icon-study-h@2x.png"
        alt=""
      />
      <img v-else src="@/assets/img/icon-study-n@2x.png" alt="" /><span
        >在学</span
      >
    </div>
    <div class="item" @click.stop="handleClick('member')">
      <img
        v-if="type === 'member'"
        src="@/assets/img/icon-me-h@2x.png"
        alt=""
      />
      <img v-else src="@/assets/img/icon-me-n@2x.png" alt="" /><span>我的</span>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: ["type"],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  methods: {
    handleClick: function (name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>
<style lang='less' scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 53px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 50px;
  .item {
    height: 53px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    img {
      width: 28px;
      height: 28px;
      margin-bottom: 3px;
    }
    span {
      height: 11px;
      font-size: 11px;
      font-weight: 400;
      color: #333333;
      line-height: 11px;
      text-align: center;
    }
  }
}
</style>