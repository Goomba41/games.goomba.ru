<template>
  <div
    v-if="user && !loading"
    :class="{
      'profile-summary-wrapper': true,
      offline: user.personastate === 0,
      online: user.personastate === 1,
      afk: user.personastate === 3,
    }"
  >
    <div
      class="background"
      v-if="user.decorations.background"
      :style="
        !backgroundIsVideo(user.decorations.background)
          ? `background-size: cover; background-image: url('${user.decorations.background}')`
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
        v-if="backgroundIsVideo(user.decorations.background)"
      >
        <source :src="user.decorations.background" type="video/mp4" />
      </video>
    </div>
    <div class="profile-data">
      <div
        :class="[
          'profile-avatar-wrapper',
          user.decorations.frame ? 'framed' : 'simple',
        ]"
      >
        <div class="avatar-frame-wrapper" v-if="user.decorations.frame">
          <img
            class="frame"
            :src="user.decorations.frame"
            :alt="user.personaname"
          />
        </div>
        <img
          class="avatar"
          :src="user.decorations.avatar"
          :alt="user.personaname"
        />
      </div>

      <div class="info-wrapper">
        <div class="info">
          <div class="user">
            <div class="names">
              <a
                ref="profileLink"
                v-if="user.profileurl"
                target="_blank"
                :href="user.profileurl"
                class="nickname"
              >
                {{
                  profileLinkIsHovered || profileLinkIsPressed
                    ? getProfileName(user.profileurl)
                    : user.personaname
                }}
              </a>
              <div v-else class="nickname">
                {{ user.personaname }}
              </div>
              <div class="real-name">{{ user.realname }}</div>
            </div>

            <div class="status offline" v-if="user.personastate === 0">
              <div class="main">
                <IconDuotoneOffline width="1.5rem" height="1.5rem" />
                <span>Не в сети</span>
              </div>
              <div class="sub">{{ lastLogin }}</div>
            </div>
            <div class="status online" v-else-if="user.personastate === 1">
              <IconDuotoneOnline width="1.5rem" height="1.5rem" />
              <span>В сети</span>
            </div>
            <div class="status busy" v-else-if="user.personastate === 2">
              <IconBusy width="1.5rem" height="1.5rem" />
              <span>Занят</span>
            </div>
            <div class="status afk" v-else-if="user.personastate === 3">
              <IconAFK width="1.5rem" height="1.5rem" />
              <span title="Отошёл" class="tw-cursor-help">AFK</span>
            </div>
            <div class="status snooze" v-else-if="user.personastate === 4">
              <IconSleep width="1.5rem" height="1.5rem" />
              <span>Бездействует</span>
            </div>
          </div>

          <div class="badges">
            <div
              :class="`level ${levelClass(user.playerlevel)}`"
              v-if="user.playerlevel"
            >
              {{ user.playerlevel }}
              <IconLevel class="icon" width="1.25rem" height="1.25rem" />
            </div>
            <div class="creation" v-if="user.timecreated">
              {{ calculateYearsRegistered(user.timecreated) }}
              <IconCake class="icon" width="1.25rem" height="1.25rem" />
            </div>
          </div>
        </div>
        <div class="in-game" v-if="user.gameid">
          <IconDuotoneGamepad width="1.5rem" height="1.5rem" />
          <span class="game-title">
            {{ user.gameextrainfo }}
          </span>
        </div>
      </div>
    </div>

    <div class="profile-global-stats"></div>
  </div>

  <div v-else class="profile-summary-wrapper preloader">
    <div class="profile-data">
      <div class="profile-avatar-wrapper tw-animate-pulse">
        <div
          class="tw-flex tw-items-center tw-justify-center tw-w-full tw-bg-gray-500 tw-rounded tw-h-full"
        >
          <svg
            class="tw-w-12 tw-h-12 tw-text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path
              d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
            />
          </svg>
        </div>
      </div>

      <div class="info-wrapper tw-ml-1">
        <div class="info">
          <div class="user tw-mt-1">
            <div class="names tw-animate-pulse">
              <div
                class="tw-h-5 tw-bg-gray-500 tw-rounded-full tw-dark:bg-gray-700 tw-mb-2"
              ></div>
              <div
                class="tw-h-2 tw-bg-gray-500 tw-rounded-full tw-dark:bg-gray-700"
              ></div>
            </div>

            <div class="tw-animate-pulse">
              <div
                class="tw-h-5 tw-bg-gray-500 tw-rounded-full tw-dark:bg-gray-700 tw-mt-3"
              ></div>
              <div
                class="tw-h-2 tw-bg-gray-500 tw-rounded-full tw-dark:bg-gray-700 tw-mt-2"
              ></div>
            </div>
          </div>

          <div class="badges tw-animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="tw-text-gray-500 tw-border-gray-700"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2z"
                />
              </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="tw-text-gray-500 tw-border-gray-700"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType, type Ref } from "vue";

import humanizeDuration from "humanize-duration";
import { DateTime as dt } from "luxon";
import { useElementHover, useMousePressed } from "@vueuse/core";

import IconDuotoneGamepad from "@/components/icons/IconDuotoneGamepad.vue";
import IconDuotoneOnline from "@/components/icons/IconDuotoneOnline.vue";
import IconDuotoneOffline from "@/components/icons/IconDuotoneOffline.vue";
import IconSleep from "@/components/icons/IconSleep.vue";
import IconBusy from "@/components/icons/IconBusy.vue";
import IconAFK from "@/components/icons/IconAFK.vue";
import IconCake from "@/components/icons/IconCake.vue";
import IconLevel from "@/components/icons/IconLevel.vue";

import type { User } from "@/utils/types";
import { UserSchema } from "@/utils/types";

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: false,
    validator(value: unknown) {
      if (value !== undefined && !UserSchema.safeParse(value).success) {
        throw new TypeError(
          "Invalid prop: custom validator check failed for prop 'user'"
        );
      }

      return true;
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  if (props.user) humanReadableTime(props.user.lastlogoff);
});

const profileLink = ref();
const profileLinkIsHovered = useElementHover(profileLink);
const profileLinkIsPressed = useMousePressed({ target: profileLink }).pressed
  .value;

function backgroundIsVideo(background: string) {
  return background.split(".").reverse()[0] === "mp4";
}

function getProfileName(profileUrl: string) {
  return `@${profileUrl.split("/").reverse()[1]}`;
}

function calculateYearsRegistered(timeStamp: number) {
  return dt.now().year - dt.fromSeconds(timeStamp).year;
}

const lastLogin: Ref<string> = ref("");

function humanReadableTime(timeStamp: number) {
  const now = dt.now();
  const logoff = dt.fromSeconds(timeStamp);

  let milliseconds = now.diff(logoff).toObject().milliseconds || 0;

  setInterval(() => {
    milliseconds += 1000;

    lastLogin.value = `Был ${humanizeDuration(milliseconds, {
      language: "ru",
      largest: 1,
    })} назад`;
  }, 1000);
}

function levelClass(level: number) {
  if (level < 10) return "lvl_0";
  if (level >= 10 && level < 20) return "lvl_10";
  if (level >= 20 && level < 30) return "lvl_20";
  if (level >= 30 && level < 40) return "lvl_30";
  if (level >= 40 && level < 50) return "lvl_40";
  if (level >= 50 && level < 60) return "lvl_50";
  if (level >= 60 && level < 70) return "lvl_60";
  if (level >= 70 && level < 80) return "lvl_70";
  if (level >= 80 && level < 90) return "lvl_80";
  if (level >= 90) return "lvl_90";

  return "lvl_0";
}
</script>

<style scoped lang="scss">
.profile-global-stats {
  @apply tw-h-24 tw-rounded-b-xl tw-flex tw-flex-col tw-p-4 tw-backdrop-blur-sm tw-bg-gradient-to-b tw-from-[#181a1eb3] tw-to-[#181a1e66];
}

.profile-summary-wrapper {
  @apply tw-bg-slate-800 tw-rounded-xl tw-w-80 xl:tw-w-96 tw-mt-8 tw-mb-auto tw-flex tw-flex-col tw-relative tw-z-0;

  .profile-data {
    @apply tw-px-4 tw-pt-4 tw-pb-2;
  }

  &.online {
    box-shadow: theme("colors.teal.500") 0px 0px 0px 0px,
      theme("colors.teal.500") 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  &.offline {
    box-shadow: theme("colors.gray.400") 0px 0px 0px 0px,
      theme("colors.gray.400") 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  &.afk {
    box-shadow: theme("colors.sky.300") 0px 0px 0px 0px,
      theme("colors.sky.300") 0px 4px 4px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

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

        .status,
        .status.offline .main {
          @apply tw-flex tw-flex-row tw-font-semibold tw-text-base tw-mt-1 tw-items-center;

          & > svg {
            @apply tw-mr-2 tw-shrink-0;
          }
        }

        .status {
          &.online {
            @apply tw-text-teal-500;
          }
          &.offline {
            @apply tw-text-gray-400 tw-flex-col tw-items-start;

            .sub {
              @apply tw-text-xs tw-font-normal tw-mt-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-w-full;
            }
          }
          &.afk {
            @apply tw-text-sky-300;
          }
        }
      }

      .badges {
        @apply tw-ml-3 tw-text-slate-100 tw-text-sm;

        > * {
          @apply tw-w-8 tw-h-8 tw-rounded-full tw-mt-2 first:tw-mt-0 tw-text-center tw-font-semibold tw-bg-slate-400 tw-bg-opacity-40 tw-border-4 tw-flex tw-justify-center tw-items-center;

          > .icon {
            @apply tw-absolute tw-translate-x-3 tw-translate-y-3 tw-text-slate-200 tw-filter tw-drop-shadow-2xl;
          }
        }

        .level {
          @apply tw-border-gray-600;

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
