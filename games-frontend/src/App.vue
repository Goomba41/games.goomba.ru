<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <YearsNavigator />
      </nav>
      <button @click="steamLogin">
        <awesome-icon icon="fa-brands fa-steam" />
      </button>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";

import YearsNavigator from "@/components/YearsNavigator.vue";

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

function steamLogin() {
  authStore.login();
}

// async function issuerDiscover() {
//   const steamIssuer = await Issuer.discover("https://accounts.google.com");
//   console.log(
//     "Discovered issuer %s %O",
//     steamIssuer.issuer,
//     steamIssuer.metadata
//   );
// }

onMounted(() => {
  authStore.initUserManager();
  authStore.getUser().then((user) => {
    console.log(user);
  });
});
</script>

<style scoped></style>
