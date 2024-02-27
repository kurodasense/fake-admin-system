<template>
  <div class="page-content">
    <hy-table :listData="dataList" v-bind="contentTableConfig">
      <!-- 1. header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
      </template>
      <!-- 2. 列中的插槽 -->
      <template #status="scope">
        <el-button plain size="small" :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? "启用" : "禁用"
        }}</el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button icon="edit" size="small" link type="primary">编辑</el-button>
          <el-button icon="delete" size="small" link type="primary">删除</el-button>
        </div>
      </template>
      <!-- 3. footer中的插槽 -->
      <template #footer>
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts" setup>
import HyTable from "@/base-ui/table";
import useSystemStore from "@/stores/main/system/system";
import { computed, inject } from "vue";

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
systemStore.getPageListAction({ pageName: props.pageName, queryInfo: { offset: 0, size: 100 } });
const dataList = computed(() => systemStore.pageListData(props.pageName));
// const userCount = computed(() => systemStore.userCount);
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
