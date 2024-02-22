// https://documenter.getpostman.com/view/12387168/TzsfmQvw
// http://123.207.32.32:5000
// service 统一出口
import HYRequest from "./request";

const hyRequest = new HYRequest({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT
});
export default hyRequest;
