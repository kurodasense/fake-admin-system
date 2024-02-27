<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" class="img" />
      <span v-if="!props.collapse" class="title">Vue3 + TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical-demo el-menu"
      :collapse="props.collapse"
      background-color="0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu class="el-sub-menu" :index="item.id + ''">
            <template #title>
              <el-icon><House /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                class="el-menu-item"
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <i v-if="item.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import useLoginStore from "@/stores/login/login";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@/utils/map-menus";
const loginStore = useLoginStore();
const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
});
const userMenus = computed(() => loginStore.userMenus);
const router = useRouter();

const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? "/not-found"
  });
};

let defaultValue = ref("2");
const route = useRoute();
const currentPath = route.path;
const menu = pathMapToMenu(userMenus.value, currentPath);
defaultValue = ref(menu.id + "");
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }
  .el-menu-item:hover {
    color: #fff;
  }
  .el-menu-item .is-active {
    background-color: #0a60bd;
  }
}
</style>
