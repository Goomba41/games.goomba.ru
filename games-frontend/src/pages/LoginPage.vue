<template>
  <button @click="authStore.signin()">
    Sign in through
    <awesome-icon icon="fa-brands fa-steam" />
  </button>
  <button @click="authStore.test()">Test API</button>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
