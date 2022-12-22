import { defineStore } from "pinia";

type TProviders = "steam" | "google" | "github" | "microsoft" | "twitch";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({}),
  actions: {
    signin(provider: TProviders = "steam") {
      switch (provider) {
        case "steam":
          window.location.href = `/api/auth/${provider}/signin`;
          break;

        default:
          break;
      }
    },
    signup(provider: "steam" = "steam") {
      switch (provider) {
        case "steam":
          window.location.href = `/api/auth/${provider}/signup`;
          break;

        default:
          break;
      }
    },
  },
});
