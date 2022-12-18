<template>
  <button @click="authStore.signin()">
    Sign in through
    <awesome-icon icon="fa-brands fa-steam" />
  </button>
  <button @click="register">
    Register through
    <awesome-icon icon="fa-brands fa-steam" />
  </button>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

function register() {
  console.log("register through steam");
}
</script>

<style lang="scss" scoped></style>
