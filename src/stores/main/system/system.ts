import { defineStore } from "pinia";
import type { ISystemState } from "./types";
import { getPageListData } from "@/service/main/system/system";

const useSystemStore = defineStore("system", {
  state: (): ISystemState => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    };
  },
  getters: {
    pageListData: (state) => {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    }
  },
  actions: {
    async getPageListAction(payload: any) {
      // 1. 获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `${pageName}/list`;
      // switch (pageName) {
      //   case "users":
      //     pageUrl = "/users/list";
      //     break;
      //   case "role":
      //     pageUrl = "/role/list";
      //     break;
      // }
      // 2. 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      console.log(pageResult);
      // 3. 存储数据到state
      const { list, totalCount } = pageResult.data;
      // const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      switch (pageName) {
        case "users":
          this.usersList = list;
          this.usersCount = totalCount;
          break;
        case "role":
          this.roleList = list;
          this.roleCount = totalCount;
          break;
      }
    }
  }
});
export default useSystemStore;
