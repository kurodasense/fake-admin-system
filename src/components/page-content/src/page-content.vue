<template>
  <div class="page-content">
    <Table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1. header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate && pageName !== 'menu'" type="primary" @click="handleNewClick"
          >新建数据</el-button
        >
      </template>
      <!-- 2. 列中的插槽 -->
      <!-- 状态列 -->
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? "启用" : "禁用"
        }}</el-button>
      </template>
      <!-- 创建时间 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <!-- 更新时间 -->
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!-- 操作列 -->
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="edit"
            size="small"
            link
            type="primary"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="delete"
            size="small"
            link
            type="primary"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template v-for="item in otherPropsSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <!-- 3. footer中的插槽 -->
      <template #footer> </template>
    </Table>
  </div>
</template>

<script lang="ts" setup>
import Table from "@/base-ui/table";
import useSystemStore from "@/stores/main/system/system";
import { computed, inject, ref, watch } from "vue";
import { usePermission } from "@/hooks/use-permission";

const emit = defineEmits(["newBtnClick", "editBtnClick"]);

const props = defineProps({
  contentTableConfig: {
    type: Object,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
});

const $filters = inject("$filters");

const systemStore = useSystemStore();

// 双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 });

// 获取操作的权限
const isCreate = usePermission(props.pageName, "create");
const isUpdate = usePermission(props.pageName, "update");
const isDelete = usePermission(props.pageName, "delete");
const isQuery = usePermission(props.pageName, "query");

// 发送网络请求
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return;
  systemStore.getPageListAction({
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  });
};

// 从pinia中获取数据
const dataList = computed(() => systemStore.pageListData(props.pageName));
const dataCount = computed(() => systemStore.pageListCount(props.pageName));

// 获取其他的动态插槽名称
const otherPropsSlots = props.contentTableConfig.propList.filter((item: any) => {
  if (item.slotName === "status") return false;
  if (item.slotName === "createAt") return false;
  if (item.slotName === "updateAt") return false;
  if (item.slotName === "handler") return false;
  return true;
});

// 删除操作
const handleDeleteClick = (item: any) => {
  systemStore.deletePageDataAction({ pageName: props.pageName, id: item.id });
};
// 新建操作
const handleNewClick = () => {
  emit("newBtnClick");
};
// 编辑操作
const handleEditClick = (item: any) => {
  emit("editBtnClick", item);
};
watch(pageInfo, () => {
  getPageData();
});

getPageData();

defineExpose({ getPageData });
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
