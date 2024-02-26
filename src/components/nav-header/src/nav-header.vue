<template>
  <div class="nav-header">
    <el-icon size="40" @click="handleFoldClick" class="fold-menu">
      <Expand v-if="isFold" />
      <Fold v-else />
    </el-icon>
    <div class="content">
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserInfo from "./user-info.vue";
const emit = defineEmits(["foldChange"]);
const isFold = ref(false);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
