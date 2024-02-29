<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu"> </page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";
</script>

<style scoped></style>
