import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({}),
  actions: {
    signin(provider: "steam" = "steam") {
      axios.get(`/api/auth/${provider}`);
    },
    test() {
      axios.get(`/api/users`);
    },
  },
});
