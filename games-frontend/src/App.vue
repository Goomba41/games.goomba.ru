<template>
  <AppHeaderVue />
  <RouterView />
  <CopyrightFooterVue />
</template>

<script setup lang="ts">
import CopyrightFooterVue from "./components/CopyrightFooter.vue";
import AppHeaderVue from "./components/AppHeader.vue";
</script>

<style scoped></style>
