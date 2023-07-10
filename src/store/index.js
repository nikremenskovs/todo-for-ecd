import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: "My first task",
        completed: false,
        editing: false,
        dueDate: "30/03/2024",
      },
      {
        id: 2,
        title: "My second task",
        completed: false,
        editing: false,
        dueDate: "30/03/1991",
      },
      {
        id: 3,
        title: "My third task",
        completed: false,
        editing: false,
        dueDate: "30/03/1991",
      },
      {
        id: 4,
        title: "My fourth task",
        completed: true,
        editing: false,
        dueDate: "30/03/1991",
      },
      {
        id: 5,
        title: "My fifth task",
        completed: true,
        editing: false,
        dueDate: "30/03/1991",
      },
    ],
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
    completedTasks(state) {
      return state.tasks.filter((task) => task.completed);
    },
    pendingTasks(state) {
      return state.tasks.filter((task) => !task.completed);
    },
    overdueTasks(state, getters) {
      const today = new Date();
      return getters.pendingTasks.filter((task) => {
        const [day, month, year] = task.dueDate.split("/");
        const dueDate = new Date(year, month - 1, day);
        return dueDate <= today;
      });
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
