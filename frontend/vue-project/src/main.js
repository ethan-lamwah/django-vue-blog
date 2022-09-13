import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import apolloClient from "@/apollo-config";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faXmark, faUser, faThumbsUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./index.css";

const pinia = createPinia();
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(pinia);
app.use(router);

// adding fontawesome
library.add(faBars, faXmark, faUser, faThumbsUp, faArrowDown, faEnvelope, faCommentDots, faGithub, faLinkedin);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
