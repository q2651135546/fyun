<template>
  <div class="container">
    <div class="navTab">
      <img src="@/assets/img/icon-search.png" alt="" class="search" />
      <input type="text" placeholder="搜索关键词" class="input" />
    </div>
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="#007aff">
        <van-swipe-item v-for="item in slides" :key="item.src">
          <a :href="item.href">
            <img v-lazy="item.src" alt="" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="navs">
      <div
        @click.stop="goToDetail(item)"
        v-for="item in navs.items"
        :key="item.href"
        class="navs-item"
      >
        <img :src="item.src" alt="" />
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
    <div class="blank">
      <KPBlank :height="blank.height" :bgColor="blank.bgcolor"></KPBlank>
    </div>
    <div class="gzh">
      <div class="mask" v-show="showQRcode" @click="showQRcode = !showQRcode">
        <div class="modal" @click.stop>
          <img src="@/assets/img/topright.png" class="top-right" />
          <div class="title">关注公众号</div>
          <div class="body">
            <div class="qrcode">
              <img
                src="http://1.14.239.98/storage/images/U3T40JNtxr2NAeANirU6irLs6fLF8iOKEDhxKBl3.jpg"
              />
            </div>
          </div>
          <div class="tip">长按二维码识别或截图保存</div>
        </div>
      </div>
      <div class="gzh-left">
        <div class="avatar">
          <img :src="gzh.logo" alt="" />
        </div>
        <div class="info">
          <div class="info-top">
            {{ gzh.name }}
          </div>
          <div class="info-bottom">{{ gzh.desc }}</div>
        </div>
      </div>
      <div class="gzh-right">
        <div class="gzh-right-btn" @click="showQRcode = !showQRcode">关注</div>
      </div>
    </div>
    <div class="index-section-box">
      <div class="index-section-title">
        <div class="index-section-title-text">{{ courseInfo.title }}</div>
        <div class="more" @click.stop="$router.push({ path: '/vod' })">
          <span>查看全部</span>
        </div>
      </div>
      <div class="index-section-body">
        <KPCourseItem
          v-for="i in courseInfo.items"
          :key="i.id"
          :item="i"
        ></KPCourseItem>
      </div>
    </div>
    <TechSupport></TechSupport>
    <KPFootNav type="home"></KPFootNav>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload } from "vant";
import KPBlank from "@/components/KPBlank.vue";
import KPCourseItem from "@/components/KPCourseItem.vue";
import TechSupport from "@/components/TechSupport.vue";
import KPFootNav from "@/components/KPFootNav.vue";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    KPBlank,
    KPCourseItem,
    TechSupport,
    KPFootNav,
  },
  data() {
    //这里存放数据
    return {
      blocks: [],
      slides: [],
      navs: [],
      blank: [],
      gzh: [],
      courseInfo: [],
      showQRcode: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goToDetail: function (item) {
      this.$router.push({
        path: "/vod/detail",
        query: {
          id: item.href.split("?")[1].split("=")[1],
        },
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    try {
      let res = await this.$request.get("/api/v2/viewBlock/page/blocks", {
        params: {
          platform: "h5",
          page_name: "h5-page-index",
        },
      });
      this.blocks = res.data;
      res.data.forEach((item) => {
        if (item.sign === "slider") this.slides = item.config_render;
        if (item.sign === "grid-nav") this.navs = item.config_render;
        if (item.sign === "blank") this.blank = item.config_render;
        if (item.sign === "h5-gzh-v1") this.gzh = item.config_render;
        if (item.sign === "h5-vod-v1") this.courseInfo = item.config_render;
      });
    } catch (error) {
      console.log(error);
    }
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
@keyframes window-open {
  0% {
    transform: translateY(120px);
  }
  to {
    transform: translateY(0);
  }
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  overflow-x: hidden;
  overflow-y: scroll;
  .navTab {
    width: 100%;
    height: 1.333333rem;
    background: #fff;
    position: relative;
    display: flex;
    padding: 0.213333rem 0.4rem;
    .search {
      width: 0.426667rem;
      height: 0.426667rem;
      position: absolute;
      top: 0.453333rem;
      left: 0.986667rem;
      cursor: pointer;
    }

    .input {
      width: 100%;
      height: 0.906667rem;
      background: #f5f5f5;
      border-radius: 0.453333rem;
      outline: none;
      border: none;
      padding-left: 1.333333rem;
      font-size: 0.373333rem;
    }
  }
  .banner {
    width: 100%;
    margin-top: 0;
    padding: 0.266667rem 0.4rem;
    height: 3.6rem;
    overflow: hidden;
    background: #fff;
    img {
      width: 100%;
      height: 3.066667rem;
    }
  }
  .navs {
    display: flex;
    padding: 0.133333rem;
    background-color: white;
    .navs-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        height: 1.333333rem;
        width: 1.333333rem;
      }
    }
  }
  .gzh {
    width: 100%;
    height: auto;
    padding: 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mask {
      position: fixed;
      z-index: 999;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      .modal {
        position: fixed;
        z-index: 999;
        width: 200px;
        height: 236px;
        top: calc(50% - 118px);
        left: calc(50% - 100px);
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        -webkit-animation: window-open 0.3s;
        animation: window-open 0.3s;
        display: flex;
        flex-direction: column;
        .top-right {
          position: absolute;
          top: 0.08rem;
          right: 0;
          width: 1.706667rem;
          height: 1.786667rem;
        }

        .title {
          width: 100%;
          margin-top: 20px;
          height: 14px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          line-height: 14px;
          text-align: center;
        }

        .body {
          width: 100%;
          margin-top: 20px;
          height: 120px;
          display: flex;
          justify-content: center;
          .qrcode {
            width: 3.2rem;
            height: 3.2rem;
            img {
              width: 3.2rem;
              height: 3.2rem;
            }
          }
        }

        .tip {
          width: 100%;
          margin-top: 0.533333rem;
          height: 0.32rem;
          font-size: 0.32rem;
          font-weight: 400;
          color: #999;
          line-height: 0.32rem;
          text-align: center;
        }
      }
    }
    .gzh-left {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 0.266667rem;
        img {
          width: 1.333333rem;
          height: 1.333333rem;
          border-radius: 50%;
        }
      }

      .info {
        .info-top {
          width: 100%;
          height: 20px;
          font-size: 15px;
          font-weight: 500;
          color: #171923;
          line-height: 20px;
          margin-top: 5px;
          overflow: hidden;
        }

        .info-bottom {
          width: 100%;
          height: 12px;
          font-size: 12px;
          font-weight: 400;
          color: #999;
          line-height: 12px;
          margin-top: 8px;
          overflow: hidden;
        }
      }
    }

    .gzh-right {
      .gzh-right-btn {
        width: 1.546667rem;
        height: 0.64rem;
        line-height: 0.64rem;
        background: #3ca7fa;
        border-radius: 12px;
        font-size: 0.373333rem;
        font-weight: 400;
        color: #fff;
        text-align: center;
      }
    }
  }
  .index-section-box {
    width: 100%;
    margin-top: 0.266667rem;
    background: #fff;
    padding: 0.666667rem 0.4rem 0.533333rem 0.4rem;
    display: flex;
    flex-direction: column;
    .index-section-title {
      width: 100%;
      height: 0.506667rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.666667rem;
      .index-section-title-text {
        height: 0.506667rem;
        font-size: 0.506667rem;
        font-weight: 600;
        color: #333;
        line-height: 0.506667rem;
      }

      .more {
        display: inline-block;
        width: auto;
        height: 0.346667rem;
        font-size: 0.346667rem;
        font-weight: 400;
        color: #999;
        line-height: 0.346667rem;
        cursor: pointer;
      }
    }

    .index-section-body {
      width: 100%;
    }
  }
}
</style>