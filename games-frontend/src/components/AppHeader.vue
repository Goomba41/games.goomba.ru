<template>
  <header class="appname">
    <div class="appname__heading">
      <logo class="logo" />
      <div class="appname__text">
        <template
          v-for="letter in currentHeading.abbreviation"
          :key="letter.char"
        >
          <template v-if="letter.type === 'addition'">
            <sub>ь</sub>
          </template>
          <template v-else>{{ letter.char }}</template>
        </template>
      </div>
    </div>
    <div class="appname__subheading">
      {{ currentHeading.decoded }}
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from "vue";

import logo from "@/components/icons/AppLogotype.vue";

interface ILetter {
  char: string;
  type: "common" | "addition";
}

interface IHeading {
  abbreviation: ILetter[];
  decoded: string;
}

const headings: IHeading[] = [
  {
    abbreviation: [
      {
        char: "П",
        type: "common",
      },
      {
        char: "С",
        type: "common",
      },
      {
        char: "И",
        type: "common",
      },
      {
        char: "Н",
        type: "common",
      },
      {
        char: "А",
        type: "common",
      },
    ],
    decoded: "Персональная Статистика Игр На Аккаунте",
  },
  {
    abbreviation: [
      {
        char: "П",
        type: "common",
      },
      {
        char: "С",
        type: "common",
      },
      {
        char: "И",
        type: "common",
      },
      {
        char: "Н",
        type: "common",
      },
      {
        char: "А",
        type: "common",
      },
    ],
    decoded: "Прохождение Стим-Игр На Ачивки",
  },
  {
    abbreviation: [
      {
        char: "П",
        type: "common",
      },
      {
        char: "И",
        type: "common",
      },
      {
        char: "С",
        type: "common",
      },
      {
        char: "ь",
        type: "addition",
      },
    ],
    decoded: "Персональная Игровая Статистика",
  },
  {
    abbreviation: [
      {
        char: "П",
        type: "common",
      },
      {
        char: "И",
        type: "common",
      },
      {
        char: "З",
        type: "common",
      },
      {
        char: "Д",
        type: "common",
      },
    ],
    decoded: "Прохождение Игр За Достижения",
  },
];

let currentHeading: Ref<IHeading> = ref(getRandomHeading());

function getRandomHeading() {
  let index = Math.random() * headings.length;

  index = Math.floor(index);

  return headings[index];
}

onMounted(() => {
  let abbreviation = "";

  currentHeading.value.abbreviation.forEach((letter: ILetter) => {
    abbreviation += `${letter.char}.`;
  });

  document.title = `${abbreviation} - ${currentHeading.value.decoded}`;
});
</script>

<style lang="scss" scoped>
.appname {
  @apply tw-text-gray-300 tw-flex tw-flex-col tw-text-5xl tw-pt-10 tw-px-6;

  sub {
    @apply tw-text-base;
  }

  .logo {
    @apply tw-mr-4 tw-w-12 tw-h-12;
  }

  .appname__heading {
    @apply tw-flex tw-flex-row tw-pb-2 tw-justify-center;
    .appname__text {
      @apply tw-h-12 tw-relative tw-top-1;
    }
  }

  .appname__subheading {
    @apply tw-text-xs tw-text-center;
  }

  .appname__text,
  .appname__subheading,
  sub {
    font-family: "Pixel";
  }
}
</style>
