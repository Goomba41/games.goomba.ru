import { defineStore } from "pinia";
// import axios from "axios";

import type { IUser } from "./users.store";

type TProviders = "steam" | "google" | "github" | "microsoft" | "twitch";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null as null | IUser,
    authenticated: false as boolean,
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
    signOut() {
      return this.$axios.get(`/api/auth/sign-out`);
    },
    async sync() {
      const state: any = await this.$axios
        .get(`/api/auth/check`)
        .then((response: any) => response.data);
      if (state.authenticated) {
        this.user = state.user;
        this.authenticated = state.authenticated;
      } else {
        this.user = null;
        this.authenticated = false;
      }

      return state;
    },
  },
});
