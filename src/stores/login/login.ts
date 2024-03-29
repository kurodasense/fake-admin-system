import { defineStore } from "pinia";
import type { ILoginState } from "./type";
import {
  accountLoginRequest,
  requsetUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login";
import type { IAccount } from "@/service/login/types";
import localCache from "@/utils/cache";
import router from "@/router";
import { mapMenusToPermissions } from "@/utils/map-menus";
import useRootStore from "..";
const useLoginStore = defineStore("login", {
  state: (): ILoginState => {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    };
  },
  getters: {},
  actions: {
    async accountLoginAction(payload: IAccount) {
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      this.token = token;
      localCache.setCache("token", token);

      // 发送初始化的请求(完整的role/department)
      const rootState = useRootStore();
      rootState.getInitialDataAction();

      // 2. 请求用户信息
      const userInfoResult = await requsetUserInfoById(id);
      const userInfo = userInfoResult.data;
      this.userInfo = userInfo;
      localCache.setCache("userInfo", userInfo);

      // 3. 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      this.userMenus = userMenus;
      localCache.setCache("userMenus", userMenus);

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus);
      this.permissions = permissions;
      localCache.setCache("permissions", permissions);
      // 4.跳转到首页
      router.push("/main");
    },
    loadLocalLogin() {
      const token = localCache.getCache("token");
      if (token) {
        this.token = token;
        const rootState = useRootStore();
        rootState.getInitialDataAction();
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) this.userInfo = userInfo;
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) this.userMenus = userMenus;
      const permissions = localCache.getCache("permissions");
      if (permissions) this.permissions = permissions;
    }
  }
});
export default useLoginStore;
