<template>
  <div class="container">
    <template v-if="isLogin">
      <div class="top-nav">
        <div
          class="nav-item"
          @click="init(item.key)"
          :class="{ active: item.key === form.nav }"
          v-for="item in navs"
          :key="item.key"
        >
          <div class="item-text">{{ item.name }}</div>
          <div class="item-dot"></div>
        </div>
      </div>
      <div class="gray"></div>
      <div class="KPItem">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getItem()"
        >
          <KPCourseItemStudy
            v-for="item in list"
            :key="item.id"
            :item="item"
          ></KPCourseItemStudy>
        </van-list>
      </div>
      <div class="drop">
        <span>已经到底了</span>
      </div>
    </template>

    <template v-else>
      <div class="empty-box">
        <div class="image-empty-item">
          <img src="@/assets/img/img-placeholder.png" />
        </div>
      </div>
      <div class="btn-login-box">
        <div
          class="btn-login"
          @click="
            $router.push({
              name: 'login',
              query: {
                url: url,
              },
            })
          "
        >
          登录查看
        </div>
      </div>
    </template>
    <KPFootNav type="study"></KPFootNav>
  </div>
</template>

<script>
import KPFootNav from "@/components/KPFootNav.vue";
import KPCourseItemStudy from "@/components/KPCourseItemStudy.vue";
import Vue from "vue";
import { List } from "vant";

Vue.use(List);

export default {
  components: {
    KPFootNav,
    KPCourseItemStudy,
  },
  data() {
    return {
      loading: false,
      finished: false,
      isLogin: false,
      page: 0,
      url: window.location.href,
      navs: [
        {
          name: "订阅课程",
          key: "course",
        },
        {
          name: "收藏课程",
          key: "collect",
        },
      ],
      form: {
        nav: "course",
        courseType: "vod",
      },
      list: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getLike() {
      this.$request
        .get("/api/v2/member/courses/like", {
          params: {
            page: this.page,
            page_size: 5,
          },
        })
        .then((res) => {
          this.list = [...this.list, ...res.data.data];
          this.loading = false;
          if (res.data.total <= 5) this.finished = true;
        })
        .catch((err) => console.log(err));
    },
    getCourses() {
      if (!this.isLogin) return;
      this.$request
        .get("/api/v2/member/courses", {
          params: {
            page: this.page,
            page_size: 5,
          },
        })
        .then((res) => {
          this.list = [...this.list, ...res.data.data];
          this.loading = false;
          if (res.data.total <= 5) this.finished = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getItem() {
      this.page++;
      if (this.form.nav === "course") this.getCourses();
      else this.getLike();
    },
    init(key) {
      this.finished = false;
      this.form.nav = key || this.form.nav;
      this.list = [];
      this.page = 0;
      this.getItem();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.isLogin = localStorage.getItem("h5-token") == null ? false : true;
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

<style lang="less" scoped>
.container {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
}
.empty-box {
  width: 100%;
  height: auto;
  float: left;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
  img {
    width: 120px;
    height: 120px;
  }
}

.top-nav {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  padding-top: 17px;
  padding-bottom: 8px;
  background-color: white;

  .nav-item {
    flex: 1;
    position: relative;

    .item-text {
      width: 100%;
      height: auto;
      float: left;
      font-size: 16px;
      font-weight: 400;
      color: #666666;
      line-height: 16px;
      text-align: center;
      padding-bottom: 9px;
    }

    .item-dot {
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -5px;
      width: 10px;
      height: 3px;
      background: white;
      border-radius: 2px;
    }

    &.active {
      .item-text {
        color: #333333;
        font-weight: 600;
      }

      .item-dot {
        background-color: #3ca7fa;
      }
    }
  }
}
.gray {
  float: left;
  width: 100%;
  height: 10px;
  background: #f3f6f9;
}

.btn-login-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;

  .btn-login {
    width: 100%;
    height: 46px;
    box-sizing: border-box;
    line-height: 46px;
    background: #3ca7fa;
    border-radius: 4px;
    float: left;
    text-align: center;
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
}
.drop {
  display: inline-block;
  width: 100%;
  text-align: center;
  color: #cccccc;
  font-size: 14px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.KPItem {
  padding: 15px;
  float: left;
  overflow-y: scroll;
  height: calc(100vh - 113px);
}
</style>
