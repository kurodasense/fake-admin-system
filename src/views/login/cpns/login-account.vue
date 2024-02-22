<template>
  <el-form label-width="60px" size="large" :rules="rules" :model="account" ref="formRef">
    <el-form-item label="帐号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" show-password />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { rules } from "../config/account-config";
import localCache from "@/utils/cache";
import type { FormInstance } from "element-plus";
import useLoginStore from "@/stores/login/login";
let account = reactive({
  name: localCache.getCache("name") ?? "",
  password: localCache.getCache("password") ?? ""
});
let formRef = ref<FormInstance>();
let loginStore = useLoginStore();
function loginAction(isKeepPassword: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1. 判断是否需要记住密码
      if (isKeepPassword) {
        // 本地缓存
        localCache.setCache("name", account.name);
        localCache.setCache("password", account.password);
      } else {
        localCache.deleteCache("name");
        localCache.deleteCache("password");
      }
      // 2. 开始登录验证
      loginStore.accountLoginAction({ ...account });
    }
  });
}
defineExpose({ loginAction }); // 暴露方法给父组件使用
</script>

<style scoped lang="less"></style>
