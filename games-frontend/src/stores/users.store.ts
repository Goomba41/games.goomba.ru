import { defineStore } from "pinia";
import axios from "axios";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({}),
  actions: {
    readAll() {
      return axios.get(`/api/users`);
    },
    readOne(id: string) {
      return axios.get(`/api/users/${id}`);
    },
  },
});
