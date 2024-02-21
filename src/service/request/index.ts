import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { HYRequestConfig, HYRequestInterceptors } from "./type";
import { ElLoading } from "element-plus";

const DEFAULT_LOADING = true;

class HYRequest {
  instance: AxiosInstance; // axios实例
  interceptors?: HYRequestInterceptors; // 拦截器
  showLoading: boolean;
  loading?: any;

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);
    // 保存额外的基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.interceptors = config.interceptors;
    // 添加可选的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("all request success");
        // 添加loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据",
            background: "rgba(0, 0, 0, 0.5)"
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        setTimeout(() => {
          this.loading?.close();
        }, 3000);
        console.log("all response success");
        return res.data;
      },
      (err) => {
        return err;
      }
    );
  }
  // 请求
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对config的处理
      // 如果有拦截器就用它
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as InternalAxiosRequestConfig);
      }

      if (config.showLoading == false) this.showLoading = config.showLoading;

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          this.showLoading = DEFAULT_LOADING;

          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default HYRequest;
