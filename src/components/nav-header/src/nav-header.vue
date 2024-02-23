<template>
  <div class="nav-header">
    <el-icon size="40" @click="handleFoldClick" class="fold-menu">
      <Expand v-if="isFold" />
      <Fold v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["foldChange"]);
const isFold = ref(false);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    cursor: pointer;
  }
}
</style>
