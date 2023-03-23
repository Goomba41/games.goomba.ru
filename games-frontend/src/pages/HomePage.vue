<template>
  <main class="page-wrapper">
    <SteamProfileBlock :user="authStore.user" />

    <!-- <div class="game"></div>
    <div class="game"></div>
    <div class="game"></div>
    <div class="game"></div> -->

    <!-- <button @click="test()">test</button> -->
    <button @click="signOut()" class="tw-text-white">sign out</button>
    <!-- <textarea name="" id="" cols="30" rows="10" v-model="userJSON" /> -->
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

    <!-- <div style="color: yellow">
      {{ loadingStore.loading }} <br /><br />
      {{ authStore.loading }}<br /><br />
      {{ loadingStore.loading && authStore.loading }}
    </div> -->
  </main>
</template>

<script lang="ts" setup>
import SteamProfileBlock from "@/blocks/SteamProfileBlock.vue";

import { useAuthStore } from "@/stores/auth.store";
import { useUsersStore } from "@/stores/users.store";
import { useLoadingStore } from "@/stores/loading.store";

const authStore = useAuthStore();
const usersStore = useUsersStore();
const loadingStore = useLoadingStore();

// const userJSON = JSON.stringify(authStore.user, undefined, 4);

function test() {
  usersStore.readAll().then((response: any) => {
    console.log(response);
  });
}
function signOut() {
  authStore.signOut();
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  @apply tw-px-6;

  
}
</style>
