<template>
  <el-form label-width="60px" size="large" :rules="rules" :model="account" ref="formRef">
    <el-form-item label="帐号" prop="name">
      <el-input v-model="account.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { rules } from "../config/account-config";
import type { FormInstance } from "element-plus";
let account = reactive({
  name: "",
  password: ""
});
let formRef = ref<FormInstance>();
function loginAction() {
  formRef.value?.validate((valid) => {
    console.log(valid);
  });
}
defineExpose({ loginAction }); // 暴露方法给父组件使用
</script>

<style scoped lang="less"></style>
