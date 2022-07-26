<template>
  <div class="container">
    <NavHeader></NavHeader>
    <div class="password-login-form">
      <div class="password-login-title">登录</div>
      <div class="item">
        <div class="name">手机号</div>
        <div class="input">
          <input
            v-model="loginForm.mobile"
            type="number"
            class="input-text"
            placeholder="请输入手机号码"
          />
          <img
            @click.stop="loginForm.mobile = ''"
            v-show="loginForm.mobile"
            src="@/assets/img/new/close.png"
            style="width: 16px; height: 16px"
          />
        </div>
      </div>
      <div class="item">
        <div class="name">密码</div>
        <div class="input">
          <input
            type="password"
            v-model="loginForm.password"
            class="input-text"
            placeholder="请输入密码"
          />
          <img
            @click.stop="loginForm.password = ''"
            v-show="loginForm.password"
            src="@/assets/img/new/close.png"
            style="width: 16px; height: 16px"
          />
        </div>
      </div>
    </div>

    <div class="box border-box mt-15 pl-60 pr-60">
      <div
        @click.stop="handleLogin"
        v-if="loginForm.mobile && loginForm.password"
        class="btn-confirm active"
      >
        登录
      </div>
      <div v-else class="btn-confirm">登录</div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import NavHeader from "@/components/NavHeader.vue";
export default {
  components: {
    NavHeader,
  },
  data() {
    return {
      url: this.$route.query.url || "",
      loginForm: {
        mobile: "",
        password: "",
      },
    };
  },
  mounted: function () {},
  computed: {},
  methods: {
    // 处理注册登录
    handleLogin: function () {
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.loginForm.mobile)) {
        Toast.fail("手机密码格式不符合要求！");
        return;
      }
      this.$request
        .post("/api/v2/login/password", {
          mobile: this.loginForm.mobile,
          password: this.loginForm.password,
        })
        .then((res) => {
          if (res.code === 0) {
            localStorage.setItem("h5-token", res.data.token);
            if (this.url) window.location.replace(this.url);
            else this.$router.push({ path: "/member" });
          }
        })
        .catch((err) => {
          Toast.fail("登录失败了！");
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
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
  background: #fff;
}

.mr-5 {
  margin-right: 5px;
}

.mr-10 {
  margin-right: 10px;
}

.ml-5 {
  margin-left: 5px;
}

.ml-10 {
  margin-left: 10px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-15 {
  margin-top: 15px;
}

.pl-30 {
  padding-left: 15px;
}

.pr-30 {
  padding-right: 15px;
}

.pl-60 {
  padding-left: 30px;
}

.pr-60 {
  padding-right: 30px;
}

.box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
}
.btn-confirm {
  width: 100%;
  height: 48px;
  background-color: rgba(#3ca7fa, 0.6);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  &.active {
    background: #3ca7fa;
  }
}

.password-login-form {
  width: 100%;
  height: auto;
  float: left;
  margin-top: 0px;
  background-color: white;
  box-sizing: border-box;
  padding: 30px 30px 0 30px;
  .password-login-title {
    width: 100%;
    height: 24px;
    font-size: 24px;
    font-weight: 500;
    color: #171923;
    line-height: 24px;
    box-sizing: border-box;
    margin-bottom: 30px;
  }

  .item {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding: 6px 0;
    display: flex;
    border-bottom: 1px solid #f4faff;
    margin-bottom: 50px;

    .name {
      min-width: 48px;
      height: auto;
      font-size: 16px;
      font-weight: 400;
      color: #333333;
      line-height: 36px;
      margin-right: 25px;
    }

    .input {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      box-sizing: border-box;
      align-items: center;

      .input-text {
        max-width: 200px;
        height: 36px;
        float: left;
        box-sizing: border-box;
        outline: none;
        color: #333333;
        font-size: 16px;
        border: none;
      }
    }
    .captcha {
      width: 90px;
      height: 36px;
      padding-top: 0px;
      margin-left: 19px;
      img {
        width: 90px;
        display: inline-block;
        overflow: hidden;
        position: relative;
      }
    }
  }
}
</style>
