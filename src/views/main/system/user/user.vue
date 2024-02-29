<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content :contentTableConfig="contentTableConfig" pageName="users" ref="pageContentRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

import { usePageSearch } from "@/hooks/use-page-search";
const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();
</script>

<style scoped lang="less"></style>
