<!--  -->
<template>
  <div class="container">
    <NavHeader title="VIP会员"></NavHeader>
    <div class="user-info">
      <div class="avatar">
        <img :src="detail.avatar" alt="" />
      </div>
      <div class="role-info">
        <div class="info">
          <div>您的{{ role.name }}{{ detail.role_expired_at }}到期</div>
          <div>购买后将会有效期顺延</div>
        </div>
      </div>
    </div>
    <div class="role-item-box">
      <div
        class="role-item"
        v-for="item in roles"
        :class="{ active: roleId === item.id }"
        @click="roleId = item.id"
        :key="item.id"
      >
        <div class="name" v-text="item.name"></div>
        <div class="price"><span class="small">￥</span>{{ item.charge }}</div>
        <div class="desc">
          <div v-text="role.description"></div>
        </div>
      </div>
    </div>
    <div class="bottom-bar" @click="goOrder()">购买会员</div>
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
    NavHeader,
  },
  data() {
    //这里存放数据
    return {
      roles: [],
      role: {},
      detail: {},
      roleId: 0,
      list: [],
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
    goOrder() {
      if (this.roleId === 0) {
        Toast.fail("请选择需要购买的会员");
        return;
      }
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].id === this.roleId) {
          this.list = this.roles[i];
          break;
        }
      }
      this.$router.push({
        name: "Order",
        query: {
          goods_id: this.list.id,
          goods_name: this.list.name,
          goods_label: "VIP会员",
          goods_charge: this.list.charge,
          goods_type: "role",
        },
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let token = localStorage.getItem("h5-token");
    this.$request
      .get("/api/v2/roles", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res);
        this.roles = res.data;
      });
    this.$request
      .get("/api/v2/member/detail", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res);
        this.detail = res.data;
        this.list = res.data;
        this.role = res.data.role;
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
  box-sizing: border-box;
  padding-top: 50px;
  background: #f6f6f6;
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  .user-info {
    width: 100%;
    height: auto;
    display: flex;
    padding: 20px 15px;
    box-sizing: border-box;
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: #fff;
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      > img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .role-info {
      padding-top: 4px;
      margin-left: 15px;
      flex: 1;
      font-size: 13px;
      font-weight: 400;
      color: #333;
      line-height: 20px;
    }
  }
  .role-item-box {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 15px;
    .role-item {
      width: calc(50% - 5px);
      height: auto;
      padding: 15px;
      box-sizing: border-box;
      border-radius: 8px;
      margin-bottom: 15px;
      border: 1px solid #fff;
      background-color: #fff;
      &.active {
        border: 1px solid #e1a500;
        background: #ffeded;
      }
      .name {
        width: 100%;
        height: auto;
        float: left;
        font-size: 14px;
        font-weight: 600;
        color: #e1a500;
        line-height: 14px;
        margin-bottom: 20px;
      }
      .price {
        width: 100%;
        height: auto;
        font-size: 28px;
        font-weight: 600;
        color: #333;
        line-height: 24px;
        margin-bottom: 15px;
        .small {
          font-size: 18px;
        }
      }
      .desc {
        width: 100%;
        height: auto;
        font-size: 12px;
        font-weight: 400;
        color: #666;
        line-height: 18px;
      }
    }
  }
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 49px;
    font-size: 16px;
    background-color: #cea200;
    line-height: 49px;
    text-align: center;
    color: #fff;
  }
}
</style>