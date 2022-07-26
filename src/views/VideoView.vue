<!--  -->
<template>
  <div class="container">
    <NavHeader :title="title"></NavHeader>
    <div class="play-box">
      <div class="playing">
        <video
          poster="http://1.14.239.98/storage/images/t69BQ0UPY3oByfUAKPGKiOkEZNmSfTjCgfqRmiCW.png"
          ref="video"
          controls
        ></video>
      </div>
    </div>
    <div class="tabs">
      <div
        class="item-tab"
        v-for="(item, index) in tabs"
        :key="index"
        :class="{ active: currentTab === item.id }"
        @click="tabChange(item.id)"
        :is-scroll="false"
      >
        {{ item.name }}
        <div class="actline" v-if="currentTab === item.id"></div>
      </div>
    </div>
    <div class="course-chapter-box" v-show="currentTab === 0">
      <div
        class="chapter-item"
        v-for="(item, index) in chapters"
        :key="item.id"
      >
        <div
          class="chapter-name"
          @click="$set(configkey, index, !configkey[index])"
        >
          {{ item.title }}
          <img
            width="15"
            height="15"
            class="normaltran"
            style="float: right; cursor: pointer"
            :class="{ trans: configkey[index] === true }"
            src="@/assets/img/icon-back.png"
          />
        </div>
        <div class="chapter-videos-box" v-show="configkey[index]">
          <div
            class="video-item"
            v-for="_item in videos[item.id]"
            :class="{ active: $route.query.id == _item.id }"
            @click="gotoVideo(_item.id)"
            :key="'_' + _item.id"
          >
            <div class="video-title">
              <span class="free">试看</span>
              <span class="text">{{ _item.title }}</span>
            </div>
            <div v-if="$route.query.id == _item.id" class="video-duration">
              <img
                width="24"
                height="24"
                class="play-icon"
                src="@/assets/img/play.gif"
              />
            </div>
            <div v-else class="video-duration">
              {{ initDate(_item.duration) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="course-comments-box" v-show="currentTab === 1">
      <div v-if="comments.length > 0">
        <div class="comment-item" v-for="comment in comments" :key="comment.id">
          <div class="avatar">
            <img
              :src="commentUsers[comment.user_id].avatar"
              width="32"
              height="32"
            />
          </div>
          <div class="content">
            <div class="nickname">
              {{ commentUsers[comment.user_id].nick_name }}
            </div>
            <div class="time">{{ getTime(comment.created_at) }}</div>
            <div class="text">
              <div v-html="comment.render_content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="empty-box" v-else>
        <div class="image-empty-item">
          <img src="@/assets/img/img-placeholder.png" />
        </div>
      </div>
      <div class="bottom-bar">
        <template>
          <div class="input">
            <input
              type="text"
              placeholder-style="color:#CCC"
              v-model="comment.content"
              placeholder="请输入评论内容"
            />
          </div>
          <div
            class="comment-button"
            @click="submitComment"
            :class="{ active: comment.content.length > 0 }"
          >
            发布
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import NavHeader from "@/components/NavHeader.vue";
import { Toast } from "vant";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    NavHeader,
  },
  data() {
    //这里存放数据
    return {
      title: "",
      tabs: [
        {
          name: "目录",
          key: "chapter",
          id: 0,
        },
        {
          name: "评论",
          key: "comment",
          id: 1,
        },
      ],
      currentTab: 0,
      chapters: {},
      configkey: [true],
      videos: {},
      course: {},
      comments: [],
      commentUsers: [],
      comment: { content: "" },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitComment() {
      if (localStorage.getItem("h5-token") == null) {
        this.goToLogin();
        return;
      }
      if (this.comment.content.length < 6) {
        Toast.fail("输入字符不能少于6");
        return;
      }
      this.$request
        .post(
          "/api/v2/video/" + this.$route.query.id + "/comment",
          this.comment
        )
        .then(() => {
          this.comment.content = "";
          this.comments = [];
          this.commentUsers = [];
          this.getComments();
        })
        .catch((e) => console.log(e));
    },
    gotoVideo(id) {
      window.location.replace(
        window.location.href.split("id=")[0] + "id=" + id
      );
      this.getTitle();
      this.getVideo();
      this.getComments();
    },
    initDate(time) {
      let mm = (time / 60) % 60;
      let ss = time % 60;
      let arr = [mm, ss].map((item) => (item < 10 ? "0" + item : item));
      return `${arr[0]}:${arr[1]}`;
    },
    getTitle() {
      this.$request
        .get(`api/v2/video/${this.$route.query.id}`)
        .then((res) => {
          this.title = res.data.video.title;
          this.chapters = res.data.chapters;
          this.videos = res.data.videos;
          this.course = res.data.course;
        })
        .catch((err) => console.log(err));
    },
    getComments() {
      this.$request
        .get(`api/v2/video/${this.$route.query.id}/comments`)
        .then((res) => {
          this.comments = res.data.comments;
          this.commentUsers = res.data.users;
        })
        .catch((err) => console.log(err));
    },
    getVideo(is_try = 0) {
      this.$request
        .get(`api/v2/video/${this.$route.query.id}/playinfo?is_try=${is_try}`)
        .then((res) => {
          this.$refs.video.src = res.data.urls[0].url;
        })
        .catch((err) => console.log(err));
    },
    tabChange(id) {
      this.currentTab = id;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getTitle();
    this.getComments();
    this.getVideo();
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
  height: calc(100vh - 50px);
  overflow-y: scroll;
  margin-top: 50px;
}
.play-box {
  width: 100%;
  height: auto;
  float: left;
  background-color: #000;
  position: relative;
  .playing {
    width: 100%;
    height: auto;
    padding: 15px 0 10px;
    ::v-deep video {
      width: 100%;
      vertical-align: middle;
    }
  }
}
.tabs {
  width: 100%;
  height: 55px;
  float: left;
  box-sizing: border-box;
  z-index: 999;
  background: rgb(255, 255, 255);
  box-shadow: 0px 2px 4px 0px rgba(204, 204, 204, 0.2);
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  padding: 20px 100px;
  .item-tab {
    display: inline-block;
    width: auto;
    height: 15px;
    font-size: 15px;
    font-weight: 400;
    color: #333333;
    line-height: 15px;
    cursor: pointer;
    position: relative;

    &.active {
      font-weight: 600;
      color: #3ca7fa;
    }
    .actline {
      width: 20px;
      height: 3px;
      background: #3ca7fa;
      border-radius: 3px;
      position: absolute;
      left: 5px;
      top: 25px;
    }
  }
}
.course-chapter-box {
  padding: 10px 15px 15px 15px;

  .chapter-item {
    width: 100%;
    height: auto;
    float: left;

    .chapter-name {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 15px;
      color: #333333;
      font-weight: bold;
      margin-bottom: 20px;
      margin-top: 10px;

      .normaltran {
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
      }

      .trans {
        -webkit-transform: rotate(270deg);
        -moz-transform: rotate(270deg);
        -o-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
      }
    }

    .chapter-videos-box {
      display: block;
      width: 100%;
      height: auto;
      float: left;
    }
  }

  .video-item {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    line-height: 36px;
    box-sizing: border-box;
    padding: 0 10px 0 10px;
    background: #f6f6f6;
    border-radius: 4px;

    .video-title {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #333;

      .free {
        padding: 2px 4px;
        background-color: #04c877;
        border-radius: 2px;
        color: white;
        font-size: 12px;
        margin-right: 10px;
      }
    }

    .video-duration {
      width: auto;
      height: auto;
      font-size: 12px;
      margin-left: 10px;
      color: #999999;
    }

    &.active {
      .video-title {
        .text {
          color: #3ca7fa;
        }
      }
    }
  }
}

.course-comments-box {
  width: 100%;
  height: auto;
  float: left;
  color: #333333;
  line-height: 21px;
  box-sizing: border-box;
  padding: 20px 15px 50px 15px;
  .comment-item {
    width: 100%;
    height: auto;
    float: left;
    margin-top: 0px;
    margin-bottom: 30px;
    display: flex;

    .avatar {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      img {
        border-radius: 50%;
      }
    }

    .content {
      flex: 1;
      position: relative;

      .nickname {
        width: 100%;
        height: auto;
        float: left;
        font-size: 12px;
        box-sizing: border-box;
        color: #999999;
        margin-top: 5px;
        margin-bottom: 13px;
      }

      .time {
        position: absolute;
        font-size: 10px;
        color: #999999;
        right: 15px;
        top: 6px;
      }

      .text {
        width: 100%;
        height: auto;
        float: left;
        font-size: 14px;
        line-height: 1.2;
        color: #333;
      }
    }
  }
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
.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 11;
  width: 100%;
  height: 53px;
  box-sizing: border-box;
  background-color: white;
  border-top: 1px solid rgba(#000, 0.1);
  display: flex;
  box-sizing: border-box;
  padding-left: 15px;
  padding-right: 15px;

  .input {
    flex: 1;
    padding-top: 10px;

    input {
      width: 100%;
      height: 22px;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
      box-sizing: border-box;
      margin-top: 8px;
      border: none;

      &:focus {
        outline: none;
      }
    }
  }

  .comment-button {
    width: auto;
    height: 33px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
    line-height: 33px;

    padding-left: 15px;
    padding-top: 10px;

    &.active {
      color: #1784ed;
    }
  }
}
</style>