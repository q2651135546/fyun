<!--  -->
<template>
  <div class="container">
    <NavHeader title="个人中心"></NavHeader>
    <div class="user-avatar">
      <div class="value">
        <img :src="user.avatar" />
        <!-- <input class="input-avatar" type="file" accept="image/*" /> -->
      </div>
      <div class="name">点击更换头像</div>
    </div>
    <div class="form-box">
      <div class="tit">账户信息</div>
      <div class="group-item">
        <div class="name">昵称</div>
        <div class="value">
          <span>{{ user.nick_name }}</span>
          <img src="@/assets/img/new/back@2x.png" class="arrow" />
        </div>
      </div>

      <div class="group-item">
        <div class="name">绑定手机号</div>
        <div class="value">
          <span v-if="user.is_bind_mobile === 1">{{
            user.mobile.substr(0, 3) + "****" + user.mobile.substr(7)
          }}</span>
          <span class="un" v-else>点击绑定</span>
          <img src="@/assets/img/new/back@2x.png" class="arrow" />
        </div>
      </div>
      <div class="group-item">
        <div class="name">修改密码</div>
        <div class="value">
          <span v-if="user.is_password_set === 1">已设置</span>
          <span class="un" v-else>设置密码</span>
          <img src="@/assets/img/new/back@2x.png" class="arrow" />
        </div>
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
  components: {
    NavHeader,
  },
  data() {
    //这里存放数据
    return {
      user: {},
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    uploadAvatar() {},
    changeNickname() {},
    bindMobile() {},
    changeMobile() {},
    changePassword() {},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$request.get("/api/v2/member/detail").then((res) => {
      this.user = res.data;
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
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  padding-top: 50px;
}
.user-avatar {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  .value {
    width: 64px;
    height: 64px;
    float: left;
    position: relative;
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    .input-avatar {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
  }

  .name {
    width: auto;
    height: 13px;
    font-size: 13px;
    font-weight: 400;
    color: #666666;
    line-height: 13px;
    margin-top: 15px;
  }
}
.form-box {
  width: 100%;
  height: auto;
  float: left;
  margin-bottom: 50px;
  background-color: white;
  .tit {
    width: 100%;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    line-height: 16px;
    margin-bottom: 10px;
  }

  .group-item {
    width: 100%;
    height: 56px;
    float: left;
    display: flex;
    box-sizing: border-box;
    padding: 8px 20px;
    border-bottom: 1px solid #f3f6f9;

    .name {
      width: 150px;
      height: 40px;
      float: left;
      line-height: 40px;
      font-size: 16px;
      color: #333333;
    }

    .value {
      flex: 1;
      height: 40px;
      text-align: right;
      font-size: 14px;
      color: #666666;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .un {
        color: #c1c4cb;
      }
      .arrow {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-left: 15px;
      }
      .u-image,
      u-image {
        display: inline-block;
      }

      input {
        display: inline-block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border: 0;
        text-align: right;
        outline: none;
        font-size: 14px;

        &::placeholder {
          color: #c1c4cb;
        }
      }
    }

    .captcha {
      width: auto;
      height: auto;
      line-height: 40px;
      margin-left: 30px;

      .u-image {
        display: inline-block;
      }
    }

    .buttons {
      width: auto;
      height: auto;
      line-height: 40px;
      margin-left: 30px;

      .send-sms-button,
      .promo-code-check-button {
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin-top: 3px;
        text-align: center;
        color: white;
        background-color: #3ca7fa;
        font-size: 14px;
        border-radius: 3px;
        float: left;
      }

      .promo-code-check-button {
        width: 50px;
      }
    }
  }
}
</style>