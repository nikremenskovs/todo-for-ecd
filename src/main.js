import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import SharedButton from "./components/SharedButton.vue";
import NestedLayout from "./components/NestedLayout.vue";
import SharedInput from "./components/SharedInput.vue";

Vue.config.productionTip = false;

Vue.component("SharedButton", SharedButton);
Vue.component("NestedLayout", NestedLayout);
Vue.component("SharedInput", SharedInput);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
