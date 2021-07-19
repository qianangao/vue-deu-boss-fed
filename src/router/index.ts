import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";
import store from '@/store'
Vue.use(VueRouter);
// 解决编程式路由往同一地址跳转时会报错的情况
// const originalPush = VueRouter.prototype.push;
// const originalReplace = VueRouter.prototype.replace;
// // push
// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) {
//     return originalPush.call(this, location, onResolve, onReject);
//   }
//   return originalPush.call(this, location).catch(err => err);
// };
// // replace
// VueRouter.prototype.replace = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) {
//     return originalReplace.call(this, location, onResolve, onReject);
//   }
//   return originalReplace.call(this, location).catch(err => err);
// };
const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "@/views/login/index.vue")
  },
  {
    path: "/",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "", // 默认子路由
        name: "home",
        component: () =>
          import(/* webpackChunkName: 'home' */ "@/views/home/index.vue")
      },
      {
        path: "/role",
        name: "role",
        component: () =>
          import(/* webpackChunkName: 'role' */ "@/views/role/index.vue")
      },
      {
        path: "/menu",
        name: "menu",
        component: () =>
          import(/* webpackChunkName: 'menu' */ "@/views/menu/index.vue")
      },
      {
        path: "/menu/create",
        name: "menu-create",
        component: () =>
          import(/* webpackChunkName: 'menu-create' */ "@/views/menu/create.vue")
      },
      {
        path: "/menu/:id/edit",
        name: "menu-edit",
        component: () =>
          import(/* webpackChunkName: 'menu-or-edit' */ "@/views/menu/edit.vue")
      },
      {
        path: "/menu/:roleId/alloc-menu",
        name: "alloc-menu",
        component: () =>
          import(/* webpackChunkName: 'alloc-menu' */ "@/views/role/components/alloc-menu.vue"),
          props: true // 实现父传子props参数 与 路由传参params 参数的合并
      },
      {
        path: "/menu/:roleId/alloc-resource",
        name: "alloc-resource",
        component: () =>
          import(/* webpackChunkName: 'alloc-menu' */ "@/views/role/components/alloc-resource.vue"),
          props: true // 实现父传子props参数 与 路由传参params 参数的合并
      },
      {
        path: "/resource",
        name: "resource",
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ "@/views/resource/index.vue"
          )
      },
      {
        path: "/course",
        name: "course",
        component: () =>
          import(/* webpackChunkName: 'course' */ "@/views/course/index.vue")
      },
      {
        path: "/user",
        name: "user",
        component: () =>
          import(/* webpackChunkName: 'user' */ "@/views/user/index.vue")
      },
      {
        path: "/advert",
        name: "advert",
        component: () =>
          import(/* webpackChunkName: 'advert' */ "@/views/advert/index.vue")
      },
      {
        path: "/advert-space",
        name: "advert-space",
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ "@/views/advert-space/index.vue"
          )
      }
    ]
  },
  {
    path: "*",
    name: "404",
    component: () =>
      import(/* webpackChunkName: '404' */ "@/views/error-page/404.vue")
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
  next()
})
export default router;
