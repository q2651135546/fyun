<!--  -->
<template>
  <div class="container">
    <NavHeader title="收银台"></NavHeader>
    <div class="goods-box">
      <div class="tit">商品信息</div>
      <div class="goods-item">
        <div class="goods-thumb">
          <img src="@/assets/img/default-vip.png" />
        </div>
        <div class="goods-info">
          <div class="goods-name">{{ goods.name }}</div>
          <div class="goods-label">{{ goods.label }}</div>
          <div class="goods-charge">{{ goods.charge }}</div>
        </div>
      </div>
    </div>
    <div class="promocode-box">
      <div class="info">使用优惠码</div>
      <img src="@/assets/img/icon-prev.png" alt="" />
    </div>
    <div class="credit2-box">
      <div class="payment-item active">
        <img src="@/assets/img/payhand.png" alt="" class="icon" /><span
          >手动打款</span
        >
        <div class="sel">
          <img src="@/assets/img/selected.png" alt="" />
        </div>
      </div>
    </div>
    <div class="box-footer">
      <div class="price-box">
        总计￥<span class="big">{{ goods.charge }}</span>
      </div>
      <div class="btn-submit" @click="goToPay()">立即支付</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import NavHeader from "@/components/NavHeader.vue";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavHeader,
  },
  data() {
    //这里存放数据
    return {
      goods: {
        id: this.$route.query.goods_id,
        icon: this.$route.query.goods_thumb,
        name: this.$route.query.goods_name,
        charge: this.$route.query.goods_charge,
        label: this.$route.query.goods_label,
        type: this.$route.query.goods_type,
      },
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
    goToPay: function () {
      if (this.payment == "handPay") {
        Toast.fail("还没有此功能");
        return;
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let token = localStorage.getItem("token");
    this.$request
      .get("/api/v2/order/payments?scene=h5", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        res.data.forEach((v) => (this.payment = v.sign));
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
  .goods-box {
    width: 100%;
    height: 164px;
    background: #fff;
    margin-top: 10px;
    padding: 15px;
    .tit {
      width: 100%;
      height: 14px;
      font-size: 14px;
      font-weight: 400;
      color: #333;
      line-height: 14px;
      margin-bottom: 30px;
    }
    .goods-item {
      width: 100%;
      height: 75px;
      display: flex;
      .goods-thumb {
        width: 100px;
        height: 75px;
        border-radius: 2px;
        margin-right: 15px;
        img {
          width: 100px;
          height: 75px;
          border-radius: 2px;
        }
      }
      .goods-info {
        width: 66%;
        height: 75px;
        display: flex;
        flex-direction: column;
        .goods-name {
          width: 100%;
          height: 15px;
          font-size: 15px;
          font-weight: 600;
          color: #333;
          line-height: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
          margin-bottom: 10px;
        }
        .goods-label {
          height: 13px;
          font-size: 13px;
          font-weight: 400;
          color: #ff4d4f;
          line-height: 13px;
          margin-bottom: 18px;
        }
        .goods-charge {
          height: 15px;
          font-size: 15px;
          font-weight: 600;
          color: #fd3968;
          line-height: 15px;
        }
      }
    }
  }
  .promocode-box {
    width: 100%;
    height: 57px;
    background: #fff;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    cursor: pointer;
    .info {
      display: inline-block;
      width: auto;
      height: 15px;
      font-size: 15px;
      font-weight: 400;
      color: #333;
      line-height: 15px;
    }
    img {
      width: 19px;
      height: 19px;
    }
  }
  .credit2-box {
    width: 100%;
    height: auto;
    background: #fff;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 15px;
    .payment-item {
      width: 100%;
      height: 30px;
      display: flex;
      align-items: center;
      position: relative;
      img {
        width: 30px;
        height: 30px;
        margin-right: 15px;
      }
      span {
        height: 18px;
        font-size: 18px;
        font-weight: 400;
        color: #333;
        line-height: 18px;
      }
      .sel {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        top: 3px;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .box-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 49px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price-box {
      height: 24px;
      font-size: 16px;
      font-weight: 500;
      color: #ff4d4f;
      line-height: 24px;
      margin-left: 15px;
      .big {
        font-size: 24px;
      }
    }
    .btn-submit {
      width: 144px;
      height: 49px;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }
}
</style>