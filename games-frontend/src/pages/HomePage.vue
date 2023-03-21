<template>
  <main class="page-wrapper">
    <div
      :class="{
        'profile-summary-wrapper': true,
        offline: authStore.user?.personastate === 0,
        online: authStore.user?.personastate === 1,
        afk: authStore.user?.personastate === 3,
      }"
    >
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

        <div class="info-wrapper">
          <div class="info">
            <div class="user">
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
                <div v-else class="nickname">
                  {{ authStore.user?.personaname }}
                </div>
                <div class="real-name">{{ authStore.user?.realname }}</div>
              </div>

              <div
                class="status offline"
                v-if="authStore.user?.personastate === 0"
              >
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
                <span
                  title="Away From Keyboard (Нет на месте)"
                  class="tw-cursor-help"
                  >AFK</span
                >
              </div>
              <div
                class="status snooze"
                v-else-if="authStore.user?.personastate === 4"
              ></div>
            </div>

            <div class="badges">
              <div
                :class="{
                  level: true,
                  lvl_0: authStore.user.playerlevel < 10,
                  lvl_10:
                    authStore.user.playerlevel >= 10 &&
                    authStore.user.playerlevel < 20,
                  lvl_20:
                    authStore.user.playerlevel >= 20 &&
                    authStore.user.playerlevel < 30,
                  lvl_30:
                    authStore.user.playerlevel >= 30 &&
                    authStore.user.playerlevel < 40,
                  lvl_40:
                    authStore.user.playerlevel >= 40 &&
                    authStore.user.playerlevel < 50,
                  lvl_50:
                    authStore.user.playerlevel >= 50 &&
                    authStore.user.playerlevel < 60,
                  lvl_60:
                    authStore.user.playerlevel >= 60 &&
                    authStore.user.playerlevel < 70,
                  lvl_70:
                    authStore.user.playerlevel >= 70 &&
                    authStore.user.playerlevel < 80,
                  lvl_80:
                    authStore.user.playerlevel >= 80 &&
                    authStore.user.playerlevel < 90,
                  lvl_90: authStore.user.playerlevel >= 90,
                }"
                v-if="authStore.user?.playerlevel"
              >
                {{ authStore.user?.playerlevel }}
              </div>
              <div class="creation" v-if="authStore.user?.timecreated">
                {{ calculateYearsRegistered(authStore.user?.timecreated) }}
              </div>
            </div>
          </div>
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

import { DateTime as dt } from "luxon";
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

function calculateYearsRegistered(timeStamp: number) {
  return dt.now().year - dt.fromSeconds(timeStamp).year;
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  @apply tw-px-6;

  .profile-summary-wrapper.online {
    box-shadow: theme("colors.teal.500") 0px 0px 0px 0px,
      theme("colors.teal.500") 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }
  .profile-summary-wrapper.offline {
    box-shadow: theme("colors.gray.400") 0px 0px 0px 0px,
      theme("colors.gray.400") 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }
  .profile-summary-wrapper.afk {
    box-shadow: theme("colors.sky.300") 0px 0px 0px 0px,
      theme("colors.sky.300") 0px 4px 4px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  .profile-summary-wrapper {
    @apply tw-bg-slate-800 tw-rounded-xl tw-w-80 xl:tw-w-96 tw-mt-8 tw-mb-auto tw-p-4 tw-flex tw-flex-col tw-relative tw-z-0;

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
    @apply tw-relative tw-pointer-events-none tw-w-[5.6rem];

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

  .info-wrapper {
    @apply tw-flex-1 tw-w-0;

    .info {
      @apply tw-ml-3 tw-flex-auto tw-flex tw-flex-row;

      .user {
        @apply tw-flex-1 tw-w-0;

        .names {
          .nickname {
            @apply tw-font-semibold tw-text-xl tw-text-slate-200 tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden tw-cursor-pointer tw-block;
          }
          .real-name {
            @apply tw-font-normal tw-text-xs tw-text-slate-400 tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden;
          }
        }

        .status {
          @apply tw-flex tw-flex-row tw-font-semibold tw-text-base tw-mt-1 tw-items-center;

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
      }

      .badges {
        @apply tw-ml-3 tw-text-slate-100;

        > * {
          @apply tw-w-8 tw-h-8 tw-rounded-full tw-mt-2 first:tw-mt-0 tw-bg-blue-50 tw-text-center tw-font-semibold tw-bg-slate-400 tw-bg-opacity-40 tw-border-4;
        }

        .level {
          &.lvl_0 {
            border-color: #9b9b9b;
          }
          &.lvl_10 {
            border-color: #c02942;
          }

          &.lvl_20 {
            border-color: #d95b43;
          }

          &.lvl_30 {
            border-color: #fecc23;
          }

          &.lvl_40 {
            border-color: #467a3c;
          }

          &.lvl_50 {
            border-color: #4e8ddb;
          }

          &.lvl_60 {
            border-color: #7652c9;
          }

          &.lvl_70 {
            border-color: #c252c9;
          }

          &.lvl_80 {
            border-color: #542437;
          }

          &.lvl_90 {
            border-color: #997c52;
          }
        }

        .creation {
          @apply tw-border-amber-500;
        }
      }
    }

    .in-game {
      @apply tw-flex tw-flex-row tw-text-green-500 tw-font-semibold tw-text-base tw-ml-3 tw-mt-2;

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
