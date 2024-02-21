import axios, { type AxiosResponse } from "axios";
import { BASE_URL, BASE_NAME, apiKey, baseUrl } from "./request/config";
console.log(BASE_URL, BASE_NAME, apiKey, baseUrl);
axios.defaults.baseURL = "http://httpbin.org";
axios.defaults.timeout = 10000;
axios
  .all([
    axios.get("/get", { params: { name: "why", age: 18 } }),
    axios.post("/post", { data: { name: "why", age: 18 } })
  ])
  .then((res) => {
    console.log(res);
    console.log(res[0].data);
  })
  .catch((err) => {
    console.log(err);
  });
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log("error");
    return err;
  }
);
axios.interceptors.response.use(
  (res) => {
    console.log("success");
    return res;
  },
  (err) => {
    return err;
  }
);
