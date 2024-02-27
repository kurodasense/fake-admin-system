import { defineStore } from "pinia";
import type { ISystemState } from "./types";
import { getPageListData } from "@/service/main/system/system";
const useSystemStore = defineStore("system", {
  state: (): ISystemState => {
    return {
      userList: [],
      userCount: 0
    };
  },
  actions: {
    async getPageListAction(payload: any) {
      // 1. 对页面发送请求
      const pageResult = await getPageListData(payload.pageUrl, payload.queryInfo);
      const { list, totalCount } = pageResult.data;
      this.userList = list;
      this.userCount = totalCount;
    }
  }
});
export default useSystemStore;
