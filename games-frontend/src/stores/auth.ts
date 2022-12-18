import { defineStore } from "pinia";

import { User, UserManager } from "oidc-client-ts";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    userManagerSettings: {
      steam: {
        authority: "https://steamcommunity.com/openid",
        client_id: "B9A7895AFEE1428F9CB5542D50BEE12D",
        redirect_uri: "http://localhost:5173/openid/callback",
        client_secret: "",
        post_logout_redirect_uri: "http://localhost:5173/login",
      },
    },
    userManager: null as null | UserManager,
  }),
  actions: {
    initUserManager(provider: "steam" = "steam") {
      this.userManager = new UserManager(this.userManagerSettings[provider]);
      console.log(this.userManager);
    },
    getUser(): Promise<User | null> {
      return this.userManager
        ? this.userManager.getUser()
        : new Promise((resolve) => {
          resolve(null);
        });
    },
    login(): Promise<void> {
      if (this.userManager) {
        return this.userManager.signinRedirect();
      }

      console.error(`User Manager doesn't exist`);
      return new Promise((resolve) => {
        return resolve(undefined);
      });
    },
    // renewToken(): Promise<User> {
    //   return this.userManager.signinSilent();
    // },
    // logout(): Promise<void> {
    //   return this.userManager.signoutRedirect();
    // },
  },
});
