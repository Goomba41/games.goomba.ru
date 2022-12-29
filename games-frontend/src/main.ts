import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import Toast, { type PluginOptions, POSITION } from "vue-toastification";
import VueCookies from "vue-cookies";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// HttpClient
import axios from "@/utils/http-client";
import type { AxiosStatic } from "axios";
import VueAxios from "vue-axios";

/* import specific icons */
import {
  faGoogle,
  faSteam,
  faGithub,
  faMicrosoft,
  faTwitch,
} from "@fortawesome/free-brands-svg-icons";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "vue-toastification/dist/index.css";

library.add(faSteam, faGoogle, faGithub, faMicrosoft, faTwitch);

const options: PluginOptions = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.BOTTOM_LEFT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

declare module "pinia" {
  export interface PiniaCustomProperties {
    $axios: AxiosStatic;
  }
}

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$axios = markRaw(axios);
});

const app = createApp(App);

app.component("awesome-icon", FontAwesomeIcon);

app.use(VueAxios, axios);
app.use(Toast, options);
app.use(pinia);
app.use(router);
app.use(VueCookies);

app.provide("axios", app.config.globalProperties.axios);

app.mount("#app");
