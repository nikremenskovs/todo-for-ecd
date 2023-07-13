import Vue from "vue";
import Vuex from "vuex";

import {
  getTasksFirestore,
  postTaskFirestore,
  putTaskFirestore,
  deleteTaskFirestore,
} from "../services/firebaseServices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
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
        const [year, month, day] = task.dueDate.split("-");
        const dueDate = new Date(year, month - 1, day);
        return dueDate <= today;
      });
    },
  },
  mutations: {
    fetchTasks(state, payload) {
      state.tasks = payload;
    },
  },
  actions: {
    async fetchTasks(context) {
      const allTasks = await getTasksFirestore();
      context.commit("fetchTasks", allTasks);
    },

    async deleteTask(context, docId) {
      await deleteTaskFirestore(docId);
      context.dispatch("fetchTasks");
    },
    async createNewTask(context, data) {
      const newTaskData = {
        title: data.title,
        dueDate: data.dueDate,
        description: data.description,
        completed: data.completed,
      };
      await postTaskFirestore(newTaskData);
      context.dispatch("fetchTasks");
    },
    async updateTask(context, data) {
      const { docId, ...relevantData } = data;
      await putTaskFirestore(docId, relevantData);
      context.dispatch("fetchTasks");
    },
  },
});
