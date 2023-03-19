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
          <div class="nickname">{{ authStore.user?.personaname }}</div>
          <div class="real-name">{{ authStore.user?.realname }}</div>
          <div class="status">{{ authStore.user?.personastate }}</div>
        </div>
      </div>
      <div></div>
    </div>

    <!-- <div class="game"></div>
    <div class="game"></div>
    <div class="game"></div>
    <div class="game"></div> -->

    <!-- <button @click="test()">test</button> -->
    <button @click="signOut()">sign out</button>
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
import { useAuthStore } from "@/stores/auth.store";
import { useUsersStore } from "@/stores/users.store";
import { useLoadingStore } from "@/stores/loading.store";

const authStore = useAuthStore();
const usersStore = useUsersStore();
const loadingStore = useLoadingStore();

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
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: #181a21;
  @apply tw-px-6;

  .game {
    @apply tw-bg-slate-800 tw-rounded-3xl tw-w-full tw-h-80 tw-mt-4 tw-p-4 tw-flex tw-flex-col;
  }

  .profile-summary-wrapper {
    @apply tw-bg-slate-800 tw-rounded-3xl tw-w-full tw-mt-4 tw-p-4 tw-flex tw-flex-col tw-relative tw-z-0;

    > div {
      @apply tw-flex tw-flex-row tw-w-full;

      > div {
        @apply tw-flex tw-flex-col;
      }
    }

    .background {
      @apply tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0 tw-z-[-1] tw-rounded-3xl;

      .video-background {
        @apply tw-rounded-3xl tw-w-full tw-h-full tw-object-cover tw-object-right-top;
      }
    }
  }

  .profile-avatar-wrapper {
    @apply tw-relative tw-pointer-events-none tw-w-1/3;

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
    @apply tw-ml-3;
  }
}
</style>
