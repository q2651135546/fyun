<!--  -->
<template>
  <div class="container">
    <div class="meedu-filter-box">
      <div class="filter-box">
        <div class="filter-back" @click="$router.go(-1)">
          <img class="back" src="../assets/img/icon-back.png" />
        </div>
        <div class="filter-title">录播课程</div>
        <div class="filter-button">
          <div
            class="button-text"
            @click.stop="shadowBox = !shadowBox"
            :class="{ active: activeId2 !== 0 }"
          >
            <span>筛选</span>
            <img src="../assets/img/icon-filter.png" />
          </div>
          <div
            class="category2-box"
            v-show="shadowBox"
            @click.stop="shadowBox = !shadowBox"
          >
            <div
              class="item"
              :class="{ active: activeId2 === 0 }"
              @click="getCategoryId(0)"
            >
              全部
            </div>
            <div
              class="item"
              v-for="item in categoryItem"
              :key="item.id"
              :class="{ active: activeId2 === item.id }"
              @click="getCategoryId(item.id)"
            >
              {{ item.name }}
            </div>
          </div>
          <div
            class="meedu-shadow-box"
            v-show="shadowBox"
            @click.stop="shadowBox = !shadowBox"
          ></div>
        </div>
      </div>
      <div class="category1-box">
        <div
          class="item"
          v-for="(item, index) in scenes"
          :key="index"
          :class="{ active: activeId1 === index }"
          @click="getFree(index, item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="vod-course-list">
      <div class="gray"></div>
      <KPCourseItem
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></KPCourseItem>
      <div class="drop" v-show="isBottom">
        <span>已经到底了</span>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import KPCourseItem from "@/components/KPCourseItem.vue";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    KPCourseItem,
  },
  data() {
    //这里存放数据
    return {
      scenes: [
        {
          id: "",
          name: "全部",
        },
        {
          id: "free",
          name: "免费",
        },
      ],
      shadowBox: false,
      categoryItem: [],
      activeId1: 0,
      activeId2: 0,
      list: [],
      isBottom: false,
      free: "",
      categoryId: 0,
      page: 1,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getCourseList: function () {
      return this.$request.get("/api/v2/courses", {
        params: {
          page: this.page,
          page_size: 10,
          category_id: this.categoryId,
          scene: this.free,
        },
      });
    },
    ScrollToBottomEvt() {
      if (this.isBottom) return;
      const el = document.querySelector(".vod-course-list");
      const toBottom = el.scrollHeight - el.offsetHeight - el.scrollTop;
      if (toBottom < 10) {
        this.page = 2;
        this.getCourseList()
          .then((res) => {
            this.list.push(...res.data.data);
          })
          .catch((err) => console.log(err));
        this.isBottom = true;
      }
    },
    init() {
      this.page = 1;
      this.isBottom = false;
      this.list = [];
      this.getCourseList(1, 10)
        .then((res) => {
          if (res.data.data.length < 10) this.isBottom = true;
          this.list = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    getFree(index, free) {
      this.activeId1 = index;
      this.free = free;
      this.init();
    },
    getCategoryId(id) {
      this.activeId2 = id;
      this.categoryId = id;
      this.init();
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$request
      .get("/api/v2/course_categories")
      .then((res) => {
        this.categoryItem = res.data;
      })
      .catch((err) => console.log(err));
    this.init();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    window.addEventListener("scroll", this.ScrollToBottomEvt, true);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    window.removeEventListener("scroll", this.ScrollToBottomEvt, true);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.meedu-shadow-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 997;
  background-color: rgba(#000, 0.3);
}

.meedu-filter-box {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 0px 15px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  .filter-box {
    width: 100%;
    height: 50px;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .filter-back {
      width: 24px;
      height: 24px;
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .filter-title {
      width: 72%;
      height: 18px;
      font-size: 18px;
      font-weight: 500;
      color: #171923;
      line-height: 18px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .category1-box {
    width: 100%;
    height: 50px;
    background: #ffffff;
    display: flex;
    align-items: center;
    .item {
      width: auto;
      height: auto;
      float: left;
      font-size: 16px;
      color: #666666;
      margin-right: 16px;

      &.active {
        color: #3ca7fa;
        font-weight: bolder;
      }
    }
  }

  .filter-button {
    width: auto;
    height: auto;
    position: relative;

    .button-text {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      cursor: pointer;
      display: flex;
      align-items: center;

      &.active {
        color: #3ca7fa;
      }
      img {
        width: 24px;
        height: 24px;
        margin-left: 5px;
      }
    }

    .category2-box {
      position: absolute;
      top: 30px;
      right: 0;
      z-index: 10080;
      width: 166px;
      height: auto;
      box-sizing: border-box;
      padding: 0 15px;
      border-radius: 5px;
      background-color: white;

      .item {
        width: 100%;
        height: auto;
        float: left;
        font-size: 14px;
        color: #333333;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.active {
          color: #3ca7fa;
          font-weight: bold;
        }
      }
    }
  }
}
.container {
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
.vod-course-list {
  width: 100vw;
  height: calc(100vh - 100px);
  overflow-y: scroll;
}
.vod-course-item {
  width: 100%;
  height: auto;
  float: left;
  box-sizing: border-box;
  padding: 15px;
  margin-bottom: 0;
}
.gray {
  float: left;
  width: 100%;
  height: 10px;
  background: #f3f6f9;
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
</style>