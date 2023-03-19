<template>
  <button :class="`provider-button ${provider}`" :disabled="disabled">
    <awesome-icon
      class="provider-button__icon"
      :icon="`fa-brands fa-${provider}`"
      fixed-width
    />
  </button>
</template>

<script lang="ts" setup>
defineProps({
  provider: {
    type: String,
    required: true,
    validator(value: string) {
      return ["steam", "google", "github", "microsoft", "twitch"].includes(
        value
      );
    },
  },
  disabled: Boolean,
});
</script>

<style lang="scss" scoped>
.provider-button {
  @apply tw-text-gray-300 tw-text-4xl tw-h-20 tw-w-20 tw-text-center tw-rounded-2xl;

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
</style>
