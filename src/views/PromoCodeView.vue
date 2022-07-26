<!--  -->
<template>
  <div id="content" class="container">
   <NavHeader title="我的邀请码"></NavHeader>
    <div class="promocode-box">
      <div class="item-box">
        <div class="item-left">
          <div class="value" v-if="myCode.code">{{ myCode.code }}</div>
          <div class="value" v-else>暂无</div>
          <div class="tit">我的邀请码</div>
          <div class="btn-copy" @click="copyCode()" v-if="myCode.code">
            复制
          </div>
        </div>
        <div class="item-right">
          <div class="value">￥{{ myCode.invite_user_reward }}</div>
          <div class="tit">邀请奖励金</div>
        </div>
      </div>
      <div class="info">
        <p>邀请者分享邀请链接给其他人下单成功后，将的到如下对应金额奖励：</p>
        <p>邀请人奖励：{{ myCode.invite_user_reward }}元</p>
        <p>被邀请人奖励：{{ myCode.invited_user_reward }}元</p>
        <p>订单抽成：{{ myCode.per_order_draw }}%</p>
      </div>
    </div>
    <div class="type-box">
      <div
        class="item"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: currentTab === tab.id }"
        @click="tabClick(tab.id)"
        :isOpen="false"
      >
        {{ tab.name }}
        <div class="actline" v-if="currentTab === tab.id"></div>
      </div>
    </div>
    <div class="list-box">
      <div class="none gray">
        <div class="empty-box">
          <div class="image-empty-item">
            <img src="@/assets/img/img-placeholder.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import { Toast } from "vant";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavHeader
  },
  data() {
    //这里存放数据
    return {
      tabs: [
        {
          name: "邀请记录",
          key: "record",
          id: 0,
        },
        {
          name: "资金明细",
          key: "capital",
          id: 1,
        },
        {
          name: "提现明细",
          key: "present",
          id: 2,
        },
      ],
      myCode: {},
      currentTab: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    copyCode() {
      let input = document.createElement("input");
      input.value = this.myCode.code;
      document.body.appendChild(input);
      input.select();
      document.execCommand("Copy");
      document.body.removeChild(input);
      Toast.fail("复制成功");
    },
    tabClick: function (index) {
      this.currentTab = index;
    },
    goBack: function () {
      this.$router.go(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let token = localStorage.getItem("h5-token");
    this.$request
      .get("/api/v2/member/promoCode", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res);
        this.myCode = res.data;
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
  .promocode-box {
    width: 100%;
    max-height: 355px;
    background: #1784ed;
    padding: 30px 15px 20px;
    .item-box {
      width: 345px;
      background: linear-gradient(180deg, #fff6cf, #ffeaa1);
      border-radius: 4px;
      margin: 0 auto;
      display: flex;
      .item-left {
        width: 50%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 15px;
        box-sizing: border-box;
        .value {
          width: 100%;
          font-size: 20px;
          font-weight: 500;
          color: #333;
          line-height: 20px;
          margin-bottom: 20px;
          text-align: center;
        }
        .tit {
          display: inline-block;
          width: auto;
          height: 13px;
          font-size: 13px;
          font-weight: 400;
          color: #666;
          line-height: 13px;
          margin-left: 50px;
        }
        .btn-copy {
          width: 96px;
          height: 30px;
          border-radius: 15px;
          border: 1px solid #1784ed;
          cursor: pointer;
          margin-top: 20px;
          margin-left: 50px;
          font-size: 14px;
          font-weight: 400;
          color: #1784ed;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .item-right {
        width: 50%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-right: 15px;
        box-sizing: border-box;
        .value {
          width: 100%;
          font-size: 20px;
          font-weight: 500;
          color: #333;
          line-height: 20px;
          margin-bottom: 20px;
          text-align: center;
        }
        .tit {
          display: inline-block;
          width: auto;
          height: 13px;
          font-size: 13px;
          font-weight: 400;
          color: #666;
          line-height: 13px;
          margin-left: 50px;
        }
      }
    }
    .info {
      width: 100%;
      height: 119px;
      display: flex;
      flex-direction: column;
      margin-top: 22px;
      p {
        width: 100%;
        font-size: 13px;
        font-weight: 400;
        color: #fff;
        line-height: 19px;
        margin-bottom: 8px;
      }
    }
  }
  .type-box {
    width: 100%;
    height: 54px;
    background: #fff;
    display: flex;
    text-align: center;
    justify-content: center;
    .item {
      min-width: 56px;
      height: 34px;
      cursor: pointer;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 400;
      color: #666;
      margin: 20px 32px 0;
    }
    .active {
      color: #3ca7fa;
      font-weight: 600;
      .actline {
        width: 56px;
        height: 4px;
        background: #3ca7fa;
      }
    }
  }
  .list-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    .empty-box {
      width: 100%;
      height: auto;
      text-align: center;
      padding-top: 50px;
      padding-bottom: 50px;
      .image-empty-item {
        img {
          width: 120px;
          height: 120px;
        }
      }
    }
  }
}
</style>