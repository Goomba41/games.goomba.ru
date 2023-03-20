<template>
  <main class="page-wrapper">
    <div class="profile-summary-wrapper">
      <div
        class="background"
        v-if="authStore.user?.decorations.background"
        :style="
          !backgroundIsVideo(authStore.user?.decorations.background)
            ? `background-size: cover; background-image: url('${authStore.user?.decorations.background}')`
            : ''
        "
      >
        <video
          class="video-background"
          playsinline
          autoplay
          muted
          loop
          disablepictureinpicture
          v-if="backgroundIsVideo(authStore.user?.decorations.background)"
        >
          <source
            :src="authStore.user?.decorations.background"
            type="video/mp4"
          />
        </video>
      </div>
      <div>
        <div
          :class="[
            'profile-avatar-wrapper',
            authStore.user?.decorations.frame ? 'framed' : 'simple',
          ]"
        >
          <div
            class="avatar-frame-wrapper"
            v-if="authStore.user?.decorations.frame"
          >
            <img
              class="frame"
              :src="authStore.user?.decorations.frame"
              :alt="authStore.user?.personaname"
            />
          </div>
          <img
            class="avatar"
            :src="authStore.user?.decorations.avatar"
            :alt="authStore.user?.personaname"
          />
        </div>
        <div class="user-info">
          <div class="names">
            <a
              ref="profileLink"
              v-if="authStore.user?.profileurl"
              target="_blank"
              :href="authStore.user?.profileurl"
              class="nickname"
            >
              {{
                profileLinkIsHovered || profileLinkIsPressed
                  ? getProfileName(authStore.user?.profileurl)
                  : authStore.user?.personaname
              }}
            </a>
            <div v-else class="nickname">{{ authStore.user?.personaname }}</div>
            <div class="real-name">{{ authStore.user?.realname }}</div>
          </div>

          <div class="status offline" v-if="authStore.user?.personastate === 0">
            <IconDuotoneOffline width="1.5rem" height="1.5rem" />
            <span>Не в сети</span>
          </div>
          <div
            class="status online"
            v-else-if="authStore.user?.personastate === 1"
          >
            <IconDuotoneOnline width="1.5rem" height="1.5rem" />
            <span>В сети</span>
          </div>
          <div
            class="status busy"
            v-else-if="authStore.user?.personastate === 2"
          ></div>
          <div
            class="status afk"
            v-else-if="authStore.user?.personastate === 3"
          >
            <IconSleep width="1.5rem" height="1.5rem" />
            <span>Нет на месте</span>
          </div>
          <div
            class="status snooze"
            v-else-if="authStore.user?.personastate === 4"
          ></div>

          <div class="in-game" v-if="authStore.user?.gameid">
            <IconDuotoneGamepad width="1.5rem" height="1.5rem" />
            <span class="game-title">
              {{ authStore.user?.gameextrainfo }}
            </span>
          </div>
        </div>
      </div>
      <div></div>
    </div>

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
import { ref } from "vue";

import { useElementHover, useMousePressed } from "@vueuse/core";

import IconDuotoneGamepad from "@/components/icons/IconDuotoneGamepad.vue";
import IconDuotoneOnline from "@/components/icons/IconDuotoneOnline.vue";
import IconDuotoneOffline from "@/components/icons/IconDuotoneOffline.vue";
import IconSleep from "@/components/icons/IconSleep.vue";

import { useAuthStore } from "@/stores/auth.store";
import { useUsersStore } from "@/stores/users.store";
import { useLoadingStore } from "@/stores/loading.store";

const authStore = useAuthStore();
const usersStore = useUsersStore();
const loadingStore = useLoadingStore();

const profileLink = ref();
const profileLinkIsHovered = useElementHover(profileLink);
const profileLinkIsPressed = useMousePressed({ target: profileLink }).pressed
  .value;

// const userJSON = JSON.stringify(authStore.user, undefined, 4);

function test() {
  usersStore.readAll().then((response: any) => {
    console.log(response);
  });
}
function signOut() {
  authStore.signOut();
}

function backgroundIsVideo(background: string) {
  return background.split(".").reverse()[0] === "mp4";
}

function getProfileName(profileUrl: string) {
  return `@${profileUrl.split("/").reverse()[1]}`;
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: #181a21;
  @apply tw-px-6;

  // .game {
  //   @apply tw-bg-slate-800 tw-rounded-xl tw-w-full tw-h-80 tw-mt-4 tw-p-4 tw-flex tw-flex-col;
  // }

  .profile-summary-wrapper {
    box-shadow: rgb(255 255 255 / 5%) 0px 6px 24px 0px,
      rgb(255 255 255 / 8%) 0px 0px 0px 1px;

    @apply tw-bg-slate-800 tw-rounded-xl tw-w-full tw-mt-8 tw-mb-auto tw-p-4 tw-flex tw-flex-col tw-relative tw-z-0;

    > div {
      @apply tw-flex tw-flex-row tw-w-full;

      > div {
        @apply tw-flex tw-flex-col;
      }
    }

    .background {
      @apply tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-z-[-1] tw-rounded-xl;

      .video-background {
        @apply tw-rounded-xl tw-w-full tw-h-full tw-object-cover tw-object-right-top;
      }
    }
  }

  .profile-avatar-wrapper {
    @apply tw-relative tw-pointer-events-none tw-w-24;

    img {
      @apply tw-block tw-w-full tw-h-full;
      -webkit-user-drag: none;
    }

    .avatar-frame-wrapper {
      @apply tw-absolute tw-w-full tw-h-full tw-z-10;

      .frame {
        transform: scale(1.22);
      }
    }

    &.simple {
      img {
        @apply tw-rounded-2xl;
      }
    }
    &.framed {
      @apply tw-m-[0.45rem];
    }
  }

  .user-info {
    @apply tw-ml-3 tw-w-1/2 tw-flex-auto;

    .nickname {
      @apply tw-font-semibold tw-text-xl tw-text-slate-200 tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden tw-w-4/5 tw-cursor-pointer;
    }
    .real-name {
      @apply tw-font-normal tw-text-xs tw-text-slate-400 tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden;
    }

    .status {
      @apply tw-flex tw-flex-row tw-font-semibold tw-text-base tw-mt-3 tw-items-center;

      & > svg {
        @apply tw-mr-2 tw-shrink-0;
      }

      &.online {
        @apply tw-text-teal-500;
      }
      &.offline {
        @apply tw-text-gray-400;
      }
      &.afk {
        @apply tw-text-sky-300;
      }
    }

    & > .in-game {
      @apply tw-flex tw-flex-row tw-text-green-500 tw-font-semibold tw-text-base tw-mt-auto;

      & > svg {
        @apply tw-mr-2 tw-shrink-0;
      }

      .game-title {
        @apply tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden;
      }
    }
  }
}
</style>
