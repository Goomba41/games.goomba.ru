import { defineStore } from "pinia";

import type { UserStats } from "@/utils/types";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    stats: {} as UserStats,
  }),
  actions: {
    readOne(id: string) {
      return this.$axios.get(`/api/users/${id}`);
    },
    readGlobalStats(id: string) {
      return this.$axios.get(`/api/users/${id}/stats/global`);
    },
  },
});
