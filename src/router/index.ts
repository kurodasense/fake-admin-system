import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { mapMenusToRoutes } from "@/utils/map-menus";
import useLoginStore from "@/stores/login/login";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/main" },
  { path: "/login", name: "login", component: () => import("@/views/login/login.vue") },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue")
    // children: [] => 根据userMenus来动态决定
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue")
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (token == null) return "/login";
  }
  const loginStore = useLoginStore();
  mapMenusToRoutes(loginStore.userMenus).then((routes) => {
    routes.forEach((route: RouteRecordRaw) => {
      router.addRoute("main", route);
    });
  });
});
export default router;
