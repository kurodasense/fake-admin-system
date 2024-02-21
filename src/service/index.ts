// service 统一出口
import HYRequest from "./request";

const hyRequest = new HYRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT
});
export default hyRequest;
