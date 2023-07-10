import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import BaseButton from "./components/BaseButton.vue";
import BaseTasksView from "./components/BaseTasksView.vue";

Vue.config.productionTip = false;

Vue.component("BaseButton", BaseButton);
Vue.component("BaseTasksView", BaseTasksView);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
