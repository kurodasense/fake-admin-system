<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
    </page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
          ref="elTreeRef"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import PageModal from "@/components/page-modal";
import { modalConfig } from "./config/modal.config";
import { usePageModal } from "@/hooks/use-page-modal";
import useRootStore from "@/stores";
import { menuMapLeafKeys } from "@/utils/map-menus";
import { ElTree } from "element-plus";

const rootStore = useRootStore();

// 1. 处理pageModal的hook
const elTreeRef = ref<InstanceType<typeof ElTree>>();
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item.menuList);
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false);
  });
};
const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  undefined,
  editCallback
);

const menus = computed(() => rootStore.entireMenu);

const otherInfo = ref({});
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys;
  const halfCheckedKeys = data2.halfCheckedKeys;
  const menuList = [...checkedKeys, ...halfCheckedKeys];
  otherInfo.value = { menuList };
  console.log(menuList);
};
</script>

<style scoped lang="less">
.role {
  width: 100%;
}
.menu-tree {
  margin-left: 25px;
}
</style>
