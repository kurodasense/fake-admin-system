<template>
  <div class="page-serach">
    <hy-form v-bind="props.searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="Refresh" @click="handleResetClick"> 重置</el-button>
          <el-button type="primary" :icon="Search"> 搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script setup lang="ts">
import HyForm from "@/base-ui/form";
import { Refresh, Search } from "@element-plus/icons-vue";
import { ref } from "vue";

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true
  }
});
// 双向绑定的属性应该是由配置文件的field来决定
// 1. formData中的属性应该动态来决定
const formItems = props.searchFormConfig?.formItems ?? [];
const formOriginData: any = {};
for (const item of formItems) {
  formOriginData[item.field] = "";
}
const formData = ref(formOriginData);

// 2
const handleResetClick = () => {
  formData.value = formOriginData;
};
</script>

<style scoped lang="less">
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
