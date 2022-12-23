import { defineStore } from "pinia";
import axios from "axios";

export interface IUser {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  realname: string;
  primaryclanid: string;
  loccountrycode: string;
  locstatecode: string;
  communityvisibilitystate: number;
  profilestate: number;
  commentpermission: number;
  lastlogoff: number;
  personastate: number;
  timecreated: number;
  personastateflags: number;
  loccityid: number;
}

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
