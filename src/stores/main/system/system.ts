import { defineStore } from "pinia";
import type { ISystemState } from "./types";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/main/system/system";

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
    },
    async deletePageDataAction(payload: any) {
      // 1. 获取pageName和id
      // pageName -> /users
      // id --> /users/id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      // 2. 调用删除的网络请求
      await deletePageData(pageUrl);
      // 3. 重新请求最新的数据
      this.getPageListAction({ pageName, queryInfo: { offset: 0, size: 10 } });
    },
    async createPageDataAction(payload: any) {
      // 1. 创建数据的请求
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      // 2. 请求最新的数据
      this.getPageListAction({ pageName, queryInfo: { offset: 0, size: 10 } });
    },
    async editPageDataAction(payload: any) {
      // 1. 编辑数据的请求
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      // 2. 请求最新的数据
      this.getPageListAction({ pageName, queryInfo: { offset: 0, size: 10 } });
    }
  }
});
export default useSystemStore;
