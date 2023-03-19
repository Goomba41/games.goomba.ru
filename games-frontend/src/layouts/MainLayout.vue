<template>
  <AppHeaderVue />
  <RouterView />
  <AppFooterVue />
</template>

<script setup lang="ts">
import AppFooterVue from "../components/AppFooter.vue";
import AppHeaderVue from "../components/AppHeader.vue";
</script>

<style scoped></style>
