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
  },
  actions: {
    async fetchTasks(context) {
      const allTasks = await getTasksFirestore();
      context.commit("setTasks", allTasks);
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
