import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: "My first task",
        dueDate: "30/03/2024",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: "My second task",
        dueDate: "30/03/1991",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: "My third task",
        dueDate: "30/03/1991",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: false,
        editing: false,
      },
      {
        id: 4,
        title: "My fourth task",
        dueDate: "30/03/1991",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: true,
        editing: false,
      },
      {
        id: 5,
        title: "My fifth task",
        dueDate: "30/03/1991",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: true,
        editing: false,
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
  mutations: {
    updateTaskCompletion(state, { taskId, completed }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = completed;
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    setTaskCompletion({ commit }, { taskId, completed }) {
      //api to server here?
      commit("updateTaskCompletion", { taskId, completed });
    },
    deleteTask({ commit }, taskId) {
      commit("deleteTask", taskId);
    },
  },
  modules: {},
});
