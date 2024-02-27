// f5刷新时会重新执行这个文件
import "./assets/css/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import useLoginStore from "@/stores/login/login";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { mapMenusToRoutes } from "@/utils/map-menus";
import type { RouteRecordRaw } from "vue-router";
import localCache from "@/utils/cache";
import { globalRegister } from "@/global";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(globalRegister);
app.use(ElementPlus, {
  locale: zhCn
});
async function boot() {
  const routes = await mapMenusToRoutes(localCache.getCache("userMenus"));
  routes.forEach((route: RouteRecordRaw) => {
    router.addRoute("main", route);
  });
  app.use(createPinia());
  useLoginStore().loadLocalLogin();

  app.use(router).mount("#app");
}
boot();
