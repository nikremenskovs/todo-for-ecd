import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Todo - Home",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: {
      title: "Todo - Dashboard",
    },
    children: [
      {
        path: "tasks/:status",
        name: "tasks",
        component: () => import("../views/FilteredTasksView.vue"),
        meta: {
          title: "Todo - Tasks",
        },
      },
      {
        path: "new",
        name: "new",
        component: () => import("../views/CreateNewTaskView.vue"),
        meta: {
          title: "Todo - New",
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, __, next) => {
  document.title = `${to.meta.title}`;
  next();
});
export default router;
