import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "all-tasks",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
  {
    path: "/all",
    name: "all",
    component: () => import("../views/AllTasksView.vue"),
  },
  {
    path: "/pending",
    name: "pending",
    component: () => import("../views/PendingTasksView.vue"),
  },
  {
    path: "/completed",
    name: "completed",
    component: () => import("../views/CompletedTasksView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
