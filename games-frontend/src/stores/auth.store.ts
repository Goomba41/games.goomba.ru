import { defineStore } from "pinia";
import axios from "axios";

type TProviders = "steam" | "google" | "github" | "microsoft" | "twitch";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({}),
  actions: {
    signin(provider: TProviders = "steam") {
      switch (provider) {
        case "steam":
          window.location.href = `/api/auth/${provider}`;
          break;

        default:
          console.log("no steam");
          axios.get(`/api/auth/${provider}`);
          break;
      }
    },
    register(provider: "steam" = "steam") {
      switch (provider) {
        case "steam":
          window.location.href = `/api/auth/${provider}/registration`;
          break;

        default:
          console.log("no steam");
          axios.get(`/api/auth/${provider}`);
          break;
      }
    },
  },
});
