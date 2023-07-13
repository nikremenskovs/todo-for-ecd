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
    getTodos: (state) => (status) => {
      let filteredTasks = state.tasks.filter((task) => {
        let today, year, month, day, dueDate;
        switch (status) {
          case "completed":
            return task.completed;
          case "pending":
            return !task.completed;
          case "overdue":
            today = new Date();
            [year, month, day] = task.dueDate.split("-");
            dueDate = new Date(year, month - 1, day);
            return !task.completed && dueDate <= today;
          default:
            return true;
        }
      });
      return filteredTasks;
    },
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload;
    },
    deleteTask(state, payload) {
      state.tasks = state.tasks.filter((task) => task.docId !== payload);
    },
    updateTask(state, data) {
      const index = state.tasks.findIndex((task) => task.docId === data.docId);
      if (index !== -1) {
        state.tasks.splice(index, 1, data);
      }
    },
  },
  actions: {
    async fetchTasks(context) {
      const allTasks = await getTasksFirestore();
      context.commit("setTasks", allTasks);
    },

    async deleteTask(context, docId) {
      await deleteTaskFirestore(docId);
      context.commit("deleteTask", docId);
    },
    async createNewTask(context, data) {
      await postTaskFirestore(data);
      context.dispatch("fetchTasks");
    },
    async updateTask(context, data) {
      const { docId, ...relevantData } = data;
      await putTaskFirestore(docId, relevantData);
      context.commit("updateTask", data);
    },
  },
});
