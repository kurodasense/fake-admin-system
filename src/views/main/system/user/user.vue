<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { usePageSearch } from "@/hooks/use-page-search";
import { modalConfig } from "./config/modal.config";
import { usePageModal } from "@/hooks/use-page-modal";
import useRootStore from "@/stores";

const rootStore = useRootStore();

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();

// pageModal相关的hook逻辑
// 处理密码的逻辑
const newCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.field === "password");
  passwordItem!.isHidden = false;
};
const editCallback = () => {
  const passwordItem = modalConfig.formItems.find((item) => item.field === "password");
  passwordItem!.isHidden = true;
};

// 2. 动态添加部门和角色列表
const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems.find((item) => item.field == "departmentId");
  departmentItem!.options = rootStore.entireDepartment.map((item) => {
    return {
      title: item.name,
      value: item.id
    };
  });
  const roleItem = modalConfig.formItems.find((item) => item.field == "roleId");
  roleItem!.options = rootStore.entireRole.map((item: any) => {
    return {
      title: item.name,
      value: item.id
    };
  });
  return modalConfig;
});

// 3. 调用hook获取公共变量和函数
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  newCallback,
  editCallback
);
</script>

<style scoped lang="less">
.user {
  width: 100%;
}
</style>
