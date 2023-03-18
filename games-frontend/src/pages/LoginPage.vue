<template>
  <div class="page-wrapper">
    <h1 class="tw-mt-auto">Войти</h1>
    <div class="providers-wrapper">
      <button class="provider-button steam" @click="authStore.signIn()">
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-steam"
          fixed-width
        />
      </button>
      <button
        class="provider-button google"
        disabled
        @click="authStore.signIn('google')"
      >
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-google"
          fixed-width
        />
      </button>
      <button
        class="provider-button github"
        disabled
        @click="authStore.signIn('github')"
      >
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-github"
          fixed-width
        />
      </button>
      <button
        class="provider-button microsoft"
        disabled
        @click="authStore.signIn('microsoft')"
      >
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-microsoft"
          fixed-width
        />
      </button>
      <button
        class="provider-button twitch"
        disabled
        @click="authStore.signIn('twitch')"
      >
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-twitch"
          fixed-width
        />
      </button>
    </div>
    <h3 class="tw-pt-12 tw-pb-6">или зарегистрироваться</h3>
    <button
      @click="authStore.signUp()"
      class="provider-button register-button tw-mb-auto"
    >
      <awesome-icon icon="fa-brands fa-steam" fixed-width />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { VueCookies } from "vue-cookies";
import { useToast } from "vue-toastification";

import { useAuthStore } from "@/stores/auth.store";
import { inject } from "vue";

const toast = useToast();
const authStore = useAuthStore();

const $cookies = inject<VueCookies>("$cookies");

const key: string = "Unauthorized";

if ($cookies && $cookies.isKey(key)) {
  const value = $cookies!.get(key);
  console.log(value);

  toast.warning("Пользователь не найден в системе, пройдите регистрацию");

  $cookies!.remove("Unauthorized");
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: radial-gradient(rgba(24, 26, 33, 0) 0%, #181a21 100%) fixed
      no-repeat,
    url(@/assets/images/login_bg.jpg) center center no-repeat, #181a21;

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
    // tw-justify-center tw-flex tw-flex-row tw-flex-wrap tw-grid-cols-4;
  }

  .provider-button {
    @apply tw-text-gray-300 tw-text-4xl tw-h-20 tw-w-20 tw-text-center tw-rounded-2xl;
    //  tw-mr-3 last:tw-mr-0

    &.steam {
      background: linear-gradient(
        90deg,
        theme("colors.sky.400") 0%,
        theme("colors.blue.700") 100%
      );

      &:hover {
        background: linear-gradient(
          90deg,
          theme("colors.sky.400") 30%,
          theme("colors.blue.700") 100%
        );
      }
    }

    &.google {
      background: linear-gradient(90deg, #dd4b39 0%, #902113 100%);

      &:hover {
        background: linear-gradient(90deg, #dd4b39 30%, #902113 100%);
      }
    }

    &.github {
      background: linear-gradient(90deg, #999999 0%, #211111 100%);

      &:hover {
        background: linear-gradient(90deg, #999999 30%, #211111 100%);
      }
    }

    &.microsoft {
      background: linear-gradient(90deg, #f65314 0%, #a03207 100%);

      &:hover {
        background: linear-gradient(90deg, #f65314 30%, #a03207 100%);
      }
    }

    &.twitch {
      background: linear-gradient(90deg, #9146ff 0%, #5017a6 100%);

      &:hover {
        background: linear-gradient(90deg, #9146ff 30%, #5017a6 100%);
      }
    }

    &.register-button {
      background: linear-gradient(
        90deg,
        theme("colors.emerald.400") 0%,
        theme("colors.green.700") 100%
      );

      &:hover {
        background: linear-gradient(
          90deg,
          theme("colors.emerald.400") 30%,
          theme("colors.green.700") 100%
        );
      }
    }

    &:disabled {
      @apply tw-text-gray-300;

      background: linear-gradient(
        90deg,
        theme("colors.gray.400") 0%,
        theme("colors.gray.700") 100%
      );

      &:hover {
        background: linear-gradient(
          90deg,
          theme("colors.gray.400") 30%,
          theme("colors.gray.700") 100%
        );
      }
    }
  }
}
</style>
