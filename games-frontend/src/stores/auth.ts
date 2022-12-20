import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({}),
  actions: {
    signin(provider: "steam" = "steam") {
      switch (provider) {
        case "steam":
          window.location.href = `/api/auth/${provider}`;
          break;

        default:
          axios.get(`/api/auth/${provider}`);
          break;
      }
    },
    register(provider: "steam" = "steam") {
      window.location.href = `/api/auth/${provider}`;
    },
  },
});
