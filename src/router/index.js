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
        path: "all",
        name: "all",
        component: () => import("../views/AllTasksView.vue"),
      },
      {
        path: "pending",
        name: "pending",
        component: () => import("../views/PendingTasksView.vue"),
      },
      {
        path: "completed",
        name: "completed",
        component: () => import("../views/CompletedTasksView.vue"),
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
