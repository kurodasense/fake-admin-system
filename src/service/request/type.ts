import type { InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from "axios";

// 自定义拦截器类型
export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig; // 请求拦截
  requestInterceptorCatch?: (error: any) => any; // 请求的错误拦截
  responseInterceptor?: (res: T) => T; // 响应拦截
  responseInterceptorCatch?: (error: any) => any; // 响应的错误拦截
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>;
  showLoading?: boolean;
}
