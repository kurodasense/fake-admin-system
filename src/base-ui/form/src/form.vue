<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="hy-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in props.formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle">
              <template v-if="item.type == 'input' || item.type == 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type == 'password'"
                  v-bind="{ ...item.otherOptions }"
                />
              </template>
              <template v-else-if="item.type == 'select'">
                <el-select :placeholder="item.placeholder" v-bind="{ ...item.otherOptions }">
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                    style="width: 100%"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type == 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="{ ...item.otherOptions }"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from "vue";
import type { IFormItem } from "../types";
const props = defineProps({
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: { type: String, default: "100px" },
  itemStyle: {
    type: Object,
    default: () => ({ padding: "10px 40px" })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  }
});
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
  .form-item {
    padding: 5px 30px;
  }
}
</style>
