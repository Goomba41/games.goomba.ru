<template>
  <div class="page-wrapper" v-if="!loadingStore.loading">
    <button @click="test()">test</button>
    <button @click="signOut()">sign out</button>
    <textarea name="" id="" cols="30" rows="10" v-model="userJSON" />
    <div
      :class="[
        authStore.user?.communityvisibilitystate === 3
          ? 'tw-text-green-900'
          : 'tw-text-red-900',
        'profile-state',
      ]"
    >
      {{ authStore.user?.communityvisibilitystate === 3 }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";
import { useUsersStore } from "@/stores/users.store";
import { useLoadingStore } from "@/stores/loading.store";

const router = useRouter();

const authStore = useAuthStore();
const usersStore = useUsersStore();
const loadingStore = useLoadingStore();

const userJSON = JSON.stringify(authStore.user, undefined, 4);

function test() {
  usersStore.readAll().then((response: any) => {
    console.log(response);
  });
}
function signOut() {
  authStore.signOut().then(async (response: any) => {
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
