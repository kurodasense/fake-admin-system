<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NavMenu } from "@/components/nav-menu";
import { NavHeader } from "@/components/nav-header";

const isCollapse = ref(false);
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold;
};
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
}
.main-content {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s linear;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
.page {
  .page-header {
    display: flex;
    align-items: center;
  }
}
</style>
