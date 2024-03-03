import { defineStore } from "pinia";
import type { IDashboardState } from "./types";
import {
  getCategoryGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from "@/service/main/analysis/dashboard";
const useDashboardStore = defineStore("dashboard", {
  state: (): IDashboardState => {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    };
  },
  actions: {
    async getDashboardDataAction() {
      const categoryCountResult = await getCategoryGoodsCount();
      this.categoryGoodsCount = categoryCountResult.data;

      const categorySaleResult = await getCategoryGoodsSale();
      this.categoryGoodsSale = categorySaleResult.data;

      const categoryFavorResult = await getCategoryGoodsFavor();
      this.categoryGoodsFavor = categoryFavorResult.data;

      const addressGoodsResult = await getAddressGoodsSale();
      this.addressGoodsSale = addressGoodsResult.data;
    }
  }
});

export default useDashboardStore;
