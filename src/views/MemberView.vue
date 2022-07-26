<!--  -->
<template>
  <div class="container">
    <div class="user_icon">
      <div class="left_icon" @click="goToMyMessage()">
        <img src="@/assets/img/icon-message@2x.png" alt="" />
      </div>

      <div class="right_icon">
        <img
          src="@/assets/img/icon-setting@2x.png"
          @click="goToSetting()"
          alt=""
        />
      </div>
    </div>

    <div class="user_info" v-if="token" @click="goToProfile()">
      <div class="portrait">
        <img :src="pass.avatar" alt="" />
      </div>
      <div class="user-body">
        <div class="user-nickname" v-text="pass.nick_name"></div>
        <div class="role-name" v-if="pass.role && pass.role.name != null">
          {{ pass.role.name }}
        </div>
      </div>
      <div class="back">
        <img src="@/assets/img/new/back.png" alt="" />
      </div>
    </div>

    <div class="user_info" v-else @click="goToLogin()">
      <div class="portrait">
        <img src="@/assets/img/default_avatar.png" alt="" />
      </div>
      <div class="login">
        <p>请登录</p>
      </div>
      <div class="back">
        <img src="@/assets/img/new/back.png" alt="" />
      </div>
    </div>

    <div class="vip_banner" @click="goToVIPMember()">
      <img src="@/assets/img/VIPcenter@2x.png" alt="" />
    </div>

    <div class="user_item">
      <div class="account">我的账号</div>
      <div class="banner">
        <div class="grid">
          <div class="grid_item" @click="goToMyOrder()">
            <div class="icon-img">
              <img src="@/assets/img/icon-list@2x.png" alt="" />
            </div>
            <span class="name">我的订单</span>
          </div>
          <div class="grid_item" @click="goToPromoCode()">
            <div class="icon-img">
              <img src="@/assets/img/icon-money@2x.png" alt="" />
            </div>
            <span class="name">我的邀请</span>
          </div>
        </div>
      </div>
    </div>
    <TechSupport></TechSupport>
    <KPFootNav type="member"></KPFootNav>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import TechSupport from "@/components/TechSupport.vue";
import KPFootNav from "@/components/KPFootNav.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    TechSupport,
    KPFootNav,
  },
  data() {
    //这里存放数据
    return {
      url: this.$route.query.url || null,
      pass: {},
      token: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goToLogin: function () {
      this.$router.push({
        path: "/login",
        query: {
          url: window.location.href,
        },
      });
    },
    goToProfile: function () {
      this.$router.push({
        path: "/member/profile",
      });
    },
    goToPromoCode: function () {
      this.$router.push({
        path: "/member/promocode",
      });
    },
    goToMyOrder: function () {
      this.$router.push({
        path: "/member/myorder",
      });
    },
    goToSetting: function () {
      this.$router.push({
        path: "/MemberSetting",
      });
    },
    goToMyMessage: function () {
      this.$router.push({
        path: "/Messages",
      });
    },
    goToVIPMember: function () {
      this.$router.push({
        path: "/role",
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    let token = localStorage.getItem("h5-token");
    if (token != null) {
      this.token = token;
      this.$request
        .get("/api/v2/member/detail", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          // console.log(res);
          this.pass = res.data;
        });
    }

    // console.log(res);
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
  width: 100%;
  height: 100%;
  background: #f3f6f9;
  overflow-x: hidden;
  overflow-y: scroll;
  .user_icon {
    width: 100%;
    background: #fff;
    height: auto;
    box-sizing: border-box;
    padding: 20px 15px 0;
    display: flex;
    justify-content: space-between;
    > div {
      > img {
        width: 26px;
        height: 26px;
      }
    }
  }
  .user_info {
    width: 100%;
    background: #fff;
    height: auto;
    box-sizing: border-box;
    padding: 25px 15px 30px 15px;
    display: flex;
    align-items: center;
    .portrait {
      box-sizing: border-box;
      padding-right: 15px;
      > img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
    }
    .user-body {
      flex: 1;
      height: 64px;

      .user-nickname {
        width: 100%;
        height: auto;
        float: left;
        box-sizing: border-box;
        padding-top: 10px;
        padding-bottom: 15px;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        line-height: 16px;
      }
      .role-name {
        width: 100%;
        height: auto;
        float: left;
        font-size: 13px;
        font-weight: 400;
        color: #666;
        line-height: 13px;
      }
    }
    .login {
      flex: 1;
      height: 64px;
      p {
        width: 100%;
        height: auto;
        float: left;
        font-size: 16px;
        font-weight: 400;
        color: #4c4c4c;
        line-height: 64px;
      }
    }
    .back {
      > img {
        width: 12px;
        height: 12px;
      }
    }
  }
  .vip_banner {
    width: 100%;
    background: #fff;
    > img {
      height: 60px;
    }
  }
  .user_item {
    width: 100%;
    height: auto;
    float: left;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px 15px;
    margin-bottom: 10px;
    .account {
      width: 100%;
      height: auto;
      float: left;
      margin-bottom: 25px;
      font-size: 15px;
      font-weight: 600;
      color: #333;
      line-height: 15px;
    }
    .banner {
      width: 100%;
      height: auto;
      float: left;
      .grid {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        .grid_item {
          width: 100%;
          height: auto;
          float: left;
          text-align: center;
          .icon-img {
            margin-bottom: 12px;
            img {
              width: 30px;
              height: 30px;
            }
          }
          .name {
            display: block;
            width: 100%;
            height: auto;
            float: left;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            line-height: 12px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
