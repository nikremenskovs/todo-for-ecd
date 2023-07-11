import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: "My first task",
        dueDate: "2023-07-01",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: false,
      },
      {
        id: 2,
        title: "My second task",
        dueDate: "2023-07-02",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: false,
      },
      {
        id: 3,
        title: "My third task",
        dueDate: "2023-07-20",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: false,
      },
      {
        id: 4,
        title: "My fourth task",
        dueDate: "2023-07-04",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: true,
      },
      {
        id: 5,
        title: "My fifth task",
        dueDate: "2023-07-05",
        description:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea aspernatur praesentium earum ex asperiores numquam enim hic magnam quae vero.",
        completed: true,
      },
    ],
  },
  getters: {
    allTasks(state) {
      return state.tasks
        .slice()
        .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
    },
    completedTasks(state) {
      return state.tasks
        .filter((task) => task.completed)
        .slice()
        .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
    },
    pendingTasks(state) {
      return state.tasks
        .filter((task) => !task.completed)
        .slice()
        .sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
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
    updateTaskCompletion(state, { taskId, completed }) {
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = completed;
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    createNewTask(state, payload) {
      state.tasks.push(payload);
    },
  },
  actions: {
    setTaskCompletion(context, { taskId, completed }) {
      //api to server here?
      context.commit("updateTaskCompletion", { taskId, completed });
    },
    deleteTask(context, taskId) {
      context.commit("deleteTask", taskId);
    },
    createNewTask(context, data) {
      const newTaskId = crypto.randomUUID();
      const newTaskData = {
        id: newTaskId,
        title: data.taskTitle,
        dueDate: data.taskDueDate,
        description: data.taskDescription,
        completed: data.taskCompleted,
      };
      context.commit("createNewTask", newTaskData);
    },
  },
});
