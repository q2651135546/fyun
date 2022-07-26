<!-- 课程列表每一项组件 -->
<template>
  <div class="vod-course-item" @click.stop="goToCourseDetail()">
    <div class="vod-course-item-comp">
      <div class="vod-course-thumb">
        <img :src="item.thumb" />
      </div>
      <div class="vod-course-body">
        <div class="vod-course-title">{{ item.title }}</div>
        <div class="vod-course-info">
          <div class="vod-course-sub">
            订阅时间 {{ getTime(item.published_at) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: ["item"],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goToCourseDetail: function () {
      this.$router.push({
        path: "/vod/detail",
        query: {
          id: this.item.id,
        },
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
<style lang='less' scoped>
.vod-course-item {
  width: 100%;
  display: flex;
  margin-bottom: 0.45rem;
  .vod-course-item-comp {
    width: 100%;
    height: auto;
    display: flex;
    .vod-course-thumb {
      width: 120px;
      height: 90px;
      margin-right: 10px;
      img {
        width: 120px;
        height: 90px;
        border-radius: 4px;
      }
    }

    .vod-course-body {
      flex: 1;
      padding-top: 5px;
      .vod-course-title {
        width: 100%;
        height: 40px;
        float: left;
        font-size: 15px;
        font-weight: 500;
        color: #171923;
        line-height: 20px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 15px;
      }

      .vod-course-info {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        .vod-course-sub {
          flex: 1;
          text-align: left;
          font-size: 12px;
          font-weight: 400;
          color: #999;
          line-height: 12px;
        }
      }
    }
  }
}
</style>