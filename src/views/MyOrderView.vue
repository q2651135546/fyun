<!--  -->
<template>
  <div id="content" class="container">
    <NavHeader title="我的订单"></NavHeader>
    <div class="order-item" v-for="item in orders" :key="item.id">
      <div class="title">
        <div class="date">{{ getTime(item.created_at) }}</div>
        <div class="status" v-text="item.status_text"></div>
      </div>
      <div class="body">
        <div class="goods">
          <div class="name" v-for="_item in item.goods" :key="_item.id">
            {{ _item.goods_name }}
          </div>
          <div class="payment" v-text="item.payment_text"></div>
        </div>
        <div class="charge" v-for="_item in item.goods" :key="_item.id">
          <span class="unit">￥</span>{{ _item.charge }}
        </div>
      </div>
    </div>

    <div class="drop">
      <span>已经到底了</span>
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
      token: "",
      orders: [],
      // goods: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goBack: function () {
      this.$router.go(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let token = localStorage.getItem("h5-token");
    this.$request
      .get("/api/v2/member/orders", {
        params: {
          page: 1,
          page_size: 999,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res);
        this.orders = res.data.data;
      });
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
<style lang='less' scoped>
.container {
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 50px;
  background: #f6f6f6;
  .order-item {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 15px;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    .title {
      width: 100%;
      height: auto;
      display: flex;
      padding-bottom: 15px;
      .date {
        flex: 1;
        font-size: 10px;
        font-weight: 400;
        color: #999;
        line-height: 10px;
      }
      .status {
        flex: 1;
        text-align: right;
        font-size: 13px;
        font-weight: 400;
        color: #999;
        line-height: 13px;
      }
    }
    .body {
      width: 100%;
      height: auto;
      display: flex;
      .goods {
        flex: 1;
        .name {
          width: 100%;
          height: auto;
          font-size: 15px;
          font-weight: 400;
          color: #333;
          line-height: 15px;
          padding-bottom: 15px;
        }
        .payment {
          width: 100%;
          height: auto;
          font-size: 10px;
          font-weight: 400;
          color: #999;
          line-height: 10px;
        }
      }
      .charge {
        width: 120px;
        height: auto;
        text-align: right;
        font-size: 20px;
        font-weight: 400;
        color: #333;
        line-height: 20px;
        padding-top: 10px;
        .unit {
          font-size: 10px;
        }
      }
    }
  }

  .drop {
    display: inline-block;
    width: 100%;
    text-align: center;
    color: #ccc;
    font-size: 14px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>