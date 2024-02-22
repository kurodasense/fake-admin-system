import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/main" },
  { path: "/login", name: "login", component: () => import("@/views/login/login.vue") },
  { path: "/main", name: "main", component: () => import("@/views/main/main.vue") }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) return "/login";
  }
});
export default router;
