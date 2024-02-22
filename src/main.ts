import "./assets/css/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import useLoginStore from "@/stores/login/login";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia()).use(router).mount("#app");
useLoginStore().loadLocalLogin();
