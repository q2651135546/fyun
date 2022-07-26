// es 中 import 语法，引入模块 Vue 核心库
import Vue from "vue";
// vue-router 核心库
import VueRouter from "vue-router";
// 引入一个组件
import HomeView from "../views/HomeView.vue";
// vue 中一个插件
// Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => {});
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/vod",
    name: "vod",
    component: () => import("../views/VodView.vue"),
    meta: {
      title: "录播课程",
    },
  },
  {
    path: "/vod/detail",
    name: "detail",
    component: () => import("../views/DetailView.vue"),
    meta: {
      title: "课程详情",
    },
  },
  {
    path: "/study",
    name: "study",
    component: () => import("../views/StudyView.vue"),
    meta: {
      title: "在学",
    },
  },
  {
    path: "/member",
    name: "member",
    component: () => import("../views/MemberView.vue"),
    meta: {
      title: "我的",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      title: "登录/注册",
    },
  },
  {
    path: "/MemberSetting",
    name: "MemberSetting",
    component: () => import("../views/MemberSettingView.vue"),
    meta: {
      title: "设置",
    },
  },
  {
    path: "/Messages",
    name: "Messages",
    component: () => import("../views/MessagesView.vue"),
    meta: {
      title: "我的消息",
      auth: true,
    },
  },
  {
    path: "/member/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      title: "个人资料",
    },
  },
  {
    path: "/role",
    name: "role",
    component: () => import("../views/VIPMemberView.vue"),
    meta: {
      title: "VIP会员",
      auth: true,
    },
  },
  {
    path: "/Order",
    name: "Order",
    component: () => import("../views/PayOrderView.vue"),
    meta: {
      title: "收银台",
    },
  },
  {
    path: "/member/promocode",
    name: "promocode",
    component: () => import("../views/PromoCodeView.vue"),
    meta: {
      title: "我的邀请码",
      auth: true,
    },
  },
  {
    path: "/member/myorder",
    name: "myorder",
    component: () => import("../views/MyOrderView.vue"),
    meta: {
      title: "我的订单",
      auth: true,
    },
  },
  {
    path: "/Video",
    name: "Video",
    component: () => import("../views/VideoView.vue"),
    meta: {
      title: "视频详情",
      auth: true,
    },
  },
];

// 创建一个路由的实例
const router = new VueRouter({
  routes,
});
// 通过es6 export 语法将路由模块进行导出
export default router;
