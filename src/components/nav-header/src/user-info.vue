<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CircleClose" @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useLoginStore from "@/stores/login/login";
import localCache from "@/utils/cache";
import { useRouter } from "vue-router";
const loginStore = useLoginStore();
const router = useRouter();
const name = computed(() => loginStore.userInfo.name);

const handleExitClick = () => {
  localCache.deleteCache("token");
  router.push("/main");
};
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  &:focus-visible {
    outline: unset;
  }
}
</style>
