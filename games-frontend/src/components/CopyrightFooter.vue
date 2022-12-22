<template>
  <footer>
    <div class="years">
      {{ ` goomba.ru ©️ ${copyrightYearString}` }}
    </div>
  </footer>
</template>

<script lang="ts" setup>
const startYear: number = 2022;
const currentYear: number = new Date().getFullYear();
const copyrightYearString: string =
  currentYear <= startYear ? `${startYear}` : `${startYear} - ${currentYear}`;
</script>

<style lang="scss" scoped>
footer {
  height: 5%;
  background-color: #181a21;
  @apply tw-text-gray-300 tw-flex tw-flex-row tw-justify-center tw-items-center tw-text-xs;

  > * {
    @apply tw-h-full tw-flex tw-items-center tw-mr-4 last:tw-mr-0;
  }
}
</style>
