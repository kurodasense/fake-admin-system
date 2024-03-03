<template>
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseEchart from "@/base-ui/echart";
import type { IDataType } from "../types";

const props = defineProps<{
  pieData: IDataType[];
}>();
const options: any = computed(() => ({
  tooltip: {
    trigger: "item"
  },
  legend: {
    top: "1%",
    left: "center"
  },
  series: [
    {
      name: "分类数据",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2
      },
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: props.pieData
    }
  ]
}));
</script>

<style scoped lang="less"></style>
