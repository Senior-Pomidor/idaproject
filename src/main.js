import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import vClickOutside from "v-click-outside";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// глобальный испоррт стилей
import "@/styles/main.scss";

Vue.config.productionTip = false;


Vue.use(Vuelidate)
Vue.use(vClickOutside)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
