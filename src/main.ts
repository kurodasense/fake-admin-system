import "./assets/css/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// axios
import hyRequest from "./service";
import "normalize.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(router);

app.mount("#app");

// interface DataType {
//   data: any;
//   returnCode: string;
//   success: boolean;
// }

// hyRequest
//   .get<DataType>({
//     url: "/home/multidata",
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res.data);
//     console.log(res.returnCode);
//     console.log(res.success);
//   });
