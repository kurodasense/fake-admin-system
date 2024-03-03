<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </card>
      </el-col>
      <el-col :span="10">
        <card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </card>
      </el-col>
      <el-col :span="7">
        <card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </card>
      </el-col>
      <el-col :span="12">
        <card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import useDashboardStore from "@/stores/main/analysis/dashboard";
import Card from "@/base-ui/card";
import { PieEchart, RoseEchart, LineEchart, BarEchart, mapEchart } from "@/components/page-echarts";
import { computed, ref } from "vue";

const dashboardStore = useDashboardStore();
// 请求数据
dashboardStore.getDashboardDataAction();
// 获取数据
const categoryGoodsCount = computed(() => {
  return dashboardStore.categoryGoodsCount.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }));
});
const categoryGoodsSale = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];
  const categoryGoodsSale = dashboardStore.categoryGoodsSale;
  for (const item of categoryGoodsSale) {
    xLabels.push(item.name);
    values.push(item.goodsCount);
  }
  return { xLabels, values };
});

// const categoryGoodsFavor = ref({});

const categoryGoodsFavor = computed(() => {
  const xLabels: string[] = [];
  const values: any[] = [];
  const categoryGoodsFavor = dashboardStore.categoryGoodsFavor;
  for (const item of categoryGoodsFavor) {
    xLabels.push(item.name);
    values.push(item.goodsFavor);
  }
  console.log(xLabels, values);
  return { xLabels, values };
});

const addressGoodsSale = computed(() => {
  return dashboardStore.addressGoodsSale.map((item) => {
    return { name: item.address, value: item.count };
  });
});
</script>

<style scoped>
.dashboard {
  width: 100%;
  .content-row {
    margin-top: 20px;
  }
}
</style>
