<!--  -->
<template>
  <div class="container">
    <NavHeader title="个人中心"></NavHeader>
    <div class="user-avatar">
      <div class="value">
        <img :src="detail.avatar" />
        <input
          type="file"
          @change="avatarClick($event)"
          accept="image/*"
          class="input-avatar"
        />
      </div>
      <div class="name">点击更换头像</div>
    </div>
    <div class="form-box">
      <div class="tit">账户信息</div>

      <div class="group-item">
        <div class="name">昵称</div>
        <div class="value">
          <span v-text="detail.nick_name"></span>
          <img src="@/assets/img/icon-prev.png" class="arrow" />
        </div>
      </div>

      <div class="group-item">
        <div class="name">绑定手机号</div>
        <div class="value">
          <span v-if="detail.mobile">{{
            detail.mobile.substr(0, 3) + "****" + detail.mobile.substr(7)
          }}</span>
          <img src="@/assets/img/icon-prev.png" class="arrow" />
        </div>
      </div>
      <div class="group-item">
        <div class="name">修改密码</div>
        <div class="value">
          <span class="un">设置密码</span>
          <img src="@/assets/img/icon-prev.png" class="arrow" />
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
    NavHeader,
  },
  data() {
    //这里存放数据
    return {
      token: "",
      detail: {},
      Input: {
        flie: "",
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
    avatarClick: function (e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      this.$request.post("/api/v2/member/detail/avatar", formData).then(() => {
        Toast.success("已更换");
        this.$router.go(0);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    let token = localStorage.getItem("h5-token");
    this.$request
      .get("/api/v2/member/detail", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.detail = res.data;
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
<style lang='less'  scoped>
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
  .user-avatar {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 50px;
    .value {
      width: 64px;
      height: 64px;
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
      color: #666;
      line-height: 13px;
      margin-top: 15px;
    }
  }
  .form-box {
    width: 100%;
    height: auto;
    margin-bottom: 50px;
    .tit {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding-left: 20px;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      line-height: 16px;
      margin-bottom: 10px;
    }
    .group-item {
      width: 100%;
      height: 56px;
      display: flex;
      box-sizing: border-box;
      padding: 8px 20px;
      border-bottom: 1px solid #f3f6f9;
      .name {
        width: 150px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333;
      }
      .value {
        flex: 1;
        height: 40px;
        text-align: right;
        font-size: 14px;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        img {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-left: 15px;
        }
        .un {
          color: #c1c4cb;
        }
      }
    }
  }
}
</style>