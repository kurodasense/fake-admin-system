<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        />
      </template>
      <template #oldPrice="scope">{{ "￥" + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import { contentTableConfig } from "./config/content.config";
import PageContent from "@/components/page-content";
</script>

<style scoped></style>
