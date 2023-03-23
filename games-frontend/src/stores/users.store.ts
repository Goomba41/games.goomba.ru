import { defineStore } from "pinia";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({}),
  actions: {
    readAll() {
      return this.$axios.get(`/api/users`);
    },
    readOne(id: string) {
      return this.$axios.get(`/api/users/${id}`);
    },
  },
});
