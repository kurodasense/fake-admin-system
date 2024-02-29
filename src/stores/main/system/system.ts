import { defineStore } from "pinia";
import type { ISystemState } from "./types";
import { getPageListData } from "@/service/main/system/system";

const useSystemStore = defineStore("system", {
  state: (): ISystemState => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  getters: {
    pageListData: (state) => {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount: (state) => {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  actions: {
    async getPageListAction(payload: any) {
      // 1. 获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `${pageName}/list`;
      // 2. 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      // 3. 存储数据到state
      const { list, totalCount } = pageResult.data;
      switch (pageName) {
        case "users":
          this.usersList = list;
          this.usersCount = totalCount;
          break;
        case "role":
          this.roleList = list;
          this.roleCount = totalCount;
          break;
        case "goods":
          this.goodsList = list;
          this.goodsCount = totalCount;
          break;
        case "menu":
          this.menuList = list;
          this.menuCount = totalCount;
          break;
      }
    }
  }
});
export default useSystemStore;
