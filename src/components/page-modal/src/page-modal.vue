<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建数据" width="30%" align-center destroy-on-close>
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import HyForm from "@/base-ui/form";
import useSystemStore from "@/stores/main/system/system";

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  }
});
const systemStore = useSystemStore();
const dialogVisible = ref(false);
const formData = ref<any>({});

const handleConfirmClick = () => {
  dialogVisible.value = false;
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    systemStore.editPageDataAction({
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    });
  } else {
    // 新建
    systemStore.createPageDataAction({
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    });
    console.log("新建用户");
  }
};

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`];
    }
  }
);

defineExpose({ dialogVisible });
</script>

<style scoped lang="less"></style>
