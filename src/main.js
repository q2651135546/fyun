import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* 1. 引入项目初始化样式 */
/* 1.1 @ 脚手架项目别称，代表 src目录 
   1.2 webpack 处理
*/
import "@/assets/styles/reset.css";
/* 2. 引入移动端适配库 lib-flexible */
import "lib-flexible";
// 3. 引入请求库，并且挂在Vue 原型上面，以后每个Vue实例中，可以直接引用请求实例
import instance from "@/api/instance";
Vue.config.productionTip = false;
Vue.prototype.$request = instance;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.title) document.title = to.meta.title;
  if (to.meta.auth) {
    let token = localStorage.getItem("h5-token");
    if (token) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          url: window.location.href,
        },
      });
    }
  } else {
    next();
  }
});

Vue.prototype.getTime = (time) => {
  let data = ((new Date().getTime() - new Date(time).getTime()) / 1000) >>> 0;
  let te = "秒";
  if (data < 10) {
    return "刚刚";
  } else if (data < 60) {
  } else if (data < 3600) {
    data = data / 60;
    te = " 分钟";
  } else if (data < 86400) {
    data = data / 3600;
    te = " 小时";
  } else if (data < 604800) {
    data = data / 86400;
    te = " 天";
  } else if (data < 2592000) {
    data = data / 604800;
    te = " 周";
  } else if (data < 31536000) {
    data = data / 2592000;
    te = " 个月";
  } else if (data >= 31536000) {
    data = data / 31536000;
    te = " 年";
  }
  data = data >>> 0;
  return `${data}${te}前`;
};
