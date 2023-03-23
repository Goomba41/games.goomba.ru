import { defineStore } from "pinia";

import type { User } from "@/utils/types";

type TProviders = "steam" | "google" | "github" | "microsoft" | "twitch";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: undefined as undefined | User,
    authenticated: false as boolean,
    loading: false as boolean,
  }),
  actions: {
    signIn(provider: TProviders = "steam") {
      switch (provider) {
        case "steam":
          window.location.href = `/api/auth/${provider}/sign-in`;
          break;

        default:
          break;
      }
    },
    signUp(provider: "steam" = "steam") {
      switch (provider) {
        case "steam":
          window.location.href = `/api/auth/${provider}/sign-up`;
          break;

        default:
          break;
      }
    },
    async signOut() {
      try {
        this.loading = true;

        const response = await this.$axios.get(`/api/auth/sign-out`);
        if (response.status === 200 && response.data.logout) {
          this.user = undefined;
          this.authenticated = response.data.logout;

          this.$router.push({ name: "login" });
        } else {
          // TODO ошибка выхода toaster
        }
      } finally {
        this.loading = false;
      }
    },
    async sync() {
      try {
        this.loading = true;

        const response = await this.$axios.get(`/api/auth/check`);
        if (response.status === 200 && response.data) {
          if (response.data.authenticated) {
            this.user = response.data.user;
            this.authenticated = response.data.authenticated;
          } else {
            this.user = undefined;
            this.authenticated = false;
          }
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
