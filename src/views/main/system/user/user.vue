<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content">
      <hy-table :listData="userList" :propList="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable ? "启用" : "禁用" }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </hy-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PageSearch from "@/components/page-search";
import HyTable from "@/base-ui/table";
import { searchFormConfig } from "./config/search.config";
import useSystemStore from "@/stores/main/system/system";
const systemStore = useSystemStore();
systemStore.getPageListAction({ pageUrl: "/users/list", queryInfo: { offset: 0, size: 100 } });
const userList = computed(() => systemStore.userList);
const userCount = computed(() => systemStore.userCount);

const propList = [
  { prop: "name", label: "用户名", minWidth: "100" },
  { prop: "realname", label: "真实姓名", minWidth: "100" },
  { prop: "cellphone", label: "手机号码", minWidth: "100" },
  { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
  { prop: "createAt", label: "创建时间", minWidth: "250", slotName: "createAt" },
  { prop: "updateAt", label: "更新时间", minWidth: "250", slotName: "updateAt" }
];
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
