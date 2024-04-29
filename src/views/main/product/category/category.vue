<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="category">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="category"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />

    <page-modal
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      pageName="category"
      ref="pageModalRef"
    />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";
import { contentTableConfig } from "./config/content.config";
import { searchFormConfig } from "./config/search.config";
import { modalConfig } from "./config/modal.config";
import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModal } from "@/hooks/use-page-modal";

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal();
</script>

<style scoped lang="less">
.category {
  width: 100%;
}
</style>
