<template>
  <div class="page-wrapper">
    <div class="appname" title="Персональная игровая статистика">ПИС</div>

    <h1 class="tw-mt-auto">Войти</h1>
    <div class="providers-wrapper">
      <button class="provider-button steam">
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-steam"
          fixed-width
        />
      </button>
      <button class="provider-button google" disabled>
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-google"
          fixed-width
        />
      </button>
      <button class="provider-button github" disabled>
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-github"
          fixed-width
        />
      </button>
      <button class="provider-button microsoft" disabled>
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-microsoft"
          fixed-width
        />
      </button>
      <button class="provider-button vk" disabled>
        <awesome-icon
          class="provider-button__icon"
          icon="fa-brands fa-vk"
          fixed-width
        />
      </button>
    </div>
    <h3 class="tw-pt-12 tw-pb-6">или зарегистрироваться</h3>
    <button
      @click="authStore.signin()"
      class="provider-button register-button tw-mb-auto"
    >
      <awesome-icon icon="fa-brands fa-steam" fixed-width />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: radial-gradient(rgba(24, 26, 33, 0) 0%, #181a21 100%) fixed
      no-repeat,
    url(@/assets/images/login_bg.jpg) center center no-repeat, #181a21;

  @apply tw-h-full tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center;

  h1,
  h3,
  .appname {
    @apply tw-text-gray-300;
  }

  h1 {
    @apply tw-text-4xl tw-font-semibold tw-pb-10;
  }

  h3 {
    @apply tw-text-sm;
  }

  .appname {
    font-family: Pixel;
    @apply tw-text-6xl;
  }

  .providers-wrapper {
    @apply tw-px-6 tw-w-full tw-grid tw-grid-cols-4 tw-grid-flow-row tw-gap-2;
    // tw-justify-center tw-flex tw-flex-row tw-flex-wrap;
  }

  .provider-button {
    @apply tw-text-gray-300 tw-text-4xl tw-h-20 tw-w-20 tw-text-center tw-rounded-2xl;
    // tw-mr-3 last:tw-mr-0;

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
    &.vk {
      background: linear-gradient(90deg, #7a9dc7 0%, #16365c 100%);

      &:hover {
        background: linear-gradient(90deg, #7a9dc7 30%, #16365c 100%);
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
