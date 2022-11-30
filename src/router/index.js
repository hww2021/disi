import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index"),
    meta: { title: "登录", noLayout: true },
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index"),
    meta: { title: "首页", icon: "el-icon-s-home" },
    children: [
      {
        path: "/home/hq",
        name: "HQ",
        component: () => import("@/views/home/hq/index"),
        meta: { title: "报表" },
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/settings/index"),
    meta: { title: "系统设置", icon: "el-icon-s-tools" },
    children: [
      {
        path: "/settings/roles",
        name: "Roles",
        component: () => import("@/views/settings/roles/index"),
        meta: { title: "角色管理" },
        children: [
          {
            path: "/settings/roles",
            name: "RoleHome",
            component: () => import("@/views/settings/roles/RoleHome.vue"),
            meta: { title: "角色管理", hide: true },
          },
          {
            path: "/settings/add/:id",
            name: "AddRole",
            component: () => import("@/views/settings/roles/AddRole.vue"),
            meta: { title: "添加角色", showHeader: true },
          },
        ],
      },
      {
        path: "/settings/users",
        name: "Users",
        component: () => import("@/views/settings/users/index"),
        meta: { title: "用户管理" },
      },
    ],
  },
  //配置路由为空的重定向
  {
    path: "",
    redirect: { name: "HQ" },
    meta: { title: "为空的重定向到首页", noLayout: true },
  },
  //配置路径未找到的路由
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/views/notFound/index"),
    meta: { title: "你访问的页面找不到了", noLayout: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLogin = store.getters["login/getIsLogin"];
  if (!isLogin && to.name !== "Login") {
    next("/login");
  }
  next();
});

export default router;
