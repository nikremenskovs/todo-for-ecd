<script>
import TaskCard from "@/components/TaskCard.vue";
import { mapGetters } from "vuex";

export default {
  components: { TaskCard },
  computed: {
    ...mapGetters(["allTasks"]),
  },
};
</script>

<template>
  <section class="absolute left-0 top-0 min-h-screen w-full bg-todo-white">
    <div
      class="fixed flex w-full justify-around rounded-b-3xl bg-todo-yellow/50 px-4 pt-4 shadow-lg backdrop-blur-lg"
    >
      <router-link to="/dashboard">
        <i class="fa-solid fa-arrow-left-long mb-4 text-4xl"></i>
      </router-link>

      <h1 class="mb-4 flex flex-col font-marmelad text-4xl tracking-wide">
        All
      </h1>
    </div>

    <ul class="mt-40 px-4">
      <TaskCard v-for="task in allTasks" :key="task.id" :task="task" />
    </ul>
  </section>
</template>
