import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    children: [
      {
        path: "tasks/:status",
        name: "tasks",
        component: () => import("../views/FilteredTasksView.vue"),
      },
      {
        path: "new",
        name: "new",
        component: () => import("../views/CreateNewTaskView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
