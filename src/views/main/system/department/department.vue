<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="department"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="department"
      :modalConfig="modalConfigRef"
    />
  </div>
</template>

<script lang="ts" setup>
import PageModal from "@/components/page-modal";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { usePageModal } from "@/hooks/use-page-modal";
import { usePageSearch } from "@/hooks/use-page-search";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";
import useRootStore from "@/stores";
import { computed } from "vue";

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal();

const rootStore = useRootStore();

// 动态添加modal的上级部门列表显示(默认为parentId)
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find((item) => item.field == "parentId");
  departmentItem!.options = rootStore.entireDepartment.map((item) => {
    return {
      title: item.name,
      value: item.id
    };
  });
  return modalConfig;
});
</script>

<style scoped lang="less">
.department {
  width: 100%;
}
</style>
