import { createApp } from "vue";
import { createPinia } from "pinia";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import {
  faGoogle,
  faSteam,
  faGithub,
  faMicrosoft,
  faVk,
} from "@fortawesome/free-brands-svg-icons";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

library.add(faSteam, faGoogle, faGithub, faMicrosoft, faVk);

const app = createApp(App);

app.component("awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
