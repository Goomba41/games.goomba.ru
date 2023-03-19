<template>
  <main class="page-wrapper">
    <h1>Войти</h1>
    <div class="providers-wrapper">
      <ProviderButton provider="steam" @click="authStore.signIn()" />
      <ProviderButton provider="google" disabled />
      <ProviderButton provider="github" disabled />
      <ProviderButton provider="microsoft" disabled />
      <ProviderButton provider="twitch" disabled />
    </div>
    <h3 class="tw-pt-12 tw-pb-6">или зарегистрироваться</h3>

    <ProviderButton
      class="register-button"
      provider="steam"
      @click="authStore.signUp()"
    />
  </main>
</template>

<script lang="ts" setup>
import type { VueCookies } from "vue-cookies";
import { useToast } from "vue-toastification";

import { useAuthStore } from "@/stores/auth.store";
import { inject } from "vue";

import ProviderButton from "@/components/buttons/ProviderButton.vue";

const toast = useToast();
const authStore = useAuthStore();

const $cookies = inject<VueCookies>("$cookies");

const key: string = "Unauthorized";

if ($cookies && $cookies.isKey(key)) {
  toast.warning("Пользователь не найден в системе, пройдите регистрацию");

  $cookies!.remove("Unauthorized");
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: radial-gradient(rgba(24, 26, 33, 0) 0%, #181a21 100%) fixed
      no-repeat,
    url(@/assets/images/login_bg.jpg) center center no-repeat, #181a21;

  > *:first-child {
    @apply tw-mt-auto;
  }

  > *:last-child {
    @apply tw-mb-auto;
  }

  h1,
  h3 {
    @apply tw-text-gray-300;
  }

  h1 {
    @apply tw-text-4xl tw-font-semibold tw-pb-10;
  }

  h3 {
    @apply tw-text-sm;
  }

  .providers-wrapper {
    grid-template-columns: repeat(auto-fill, 5rem);
    @apply tw-px-6 tw-grid tw-auto-cols-max tw-grid-flow-row tw-gap-2 tw-place-content-center max-[480px]:tw-w-full min-[480px]:tw-max-w-[480px];
  }
}
</style>
