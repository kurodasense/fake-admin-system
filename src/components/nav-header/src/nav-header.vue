<template>
  <div class="nav-header">
    <el-icon size="40" @click="handleFoldClick" class="fold-menu">
      <Expand v-if="isFold" />
      <Fold v-else />
    </el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import UserInfo from "./user-info.vue";
import HyBreadcrumb from "@/base-ui/breadcrumb";
import useLoginStore from "@/stores/login/login";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useRoute } from "vue-router";

const emit = defineEmits(["foldChange"]);
const isFold = ref(false);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};

// 面包屑数据
const loginStore = useLoginStore();
const route = useRoute();
const breadcrumbs = computed(() => {
  const userMenus = loginStore.userMenus;
  const currentPath = route.path;
  return pathMapBreadcrumbs(userMenus, currentPath);
});
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
