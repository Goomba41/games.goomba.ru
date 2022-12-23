<template>
  <div class="page-wrapper">
    <button @click="test()">test</button>
    <button @click="signout()">signout</button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";
import { useUsersStore } from "@/stores/users.store";

const router = useRouter();

const usersStore = useUsersStore();
const authStore = useAuthStore();

function test() {
  usersStore.readAll().then((response: any) => {
    console.log(response);
  });
}
function signout() {
  authStore.signout().then(async (response: any) => {
    console.log(response);
    await authStore.sync();
    router.push({ name: "login" });
  });
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: #181a21;
}
</style>
