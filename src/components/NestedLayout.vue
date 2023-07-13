<script>
import TaskCard from "@/components/TaskCard.vue";
export default {
  components: { TaskCard },
  props: {
    pageTitle: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<template>
  <section class="absolute left-0 top-0 min-h-screen w-full bg-todo-white">
    <div
      class="fixed flex w-full justify-between rounded-b-3xl bg-todo-yellow/50 px-4 pt-4 text-todo-primary shadow-lg backdrop-blur-lg lg:left-0 lg:flex-grow lg:px-24"
    >
      <router-link to="/dashboard">
        <i class="fa-solid fa-arrow-left-long mb-4 text-4xl lg:hidden"></i>
      </router-link>

      <h1
        class="mb-4 flex flex-col font-marmelad text-4xl capitalize tracking-wide"
      >
        {{ this.pageTitle }}
      </h1>
    </div>

    <h2
      v-if="tasks.length === 0 && this.$route.path !== '/dashboard/new'"
      class="mt-28 text-center font-marmelad text-2xl tracking-wider text-todo-primary"
    >
      You have no tasks in this category
    </h2>

    <ul v-else class="mt-28 px-4">
      <TaskCard v-for="task in tasks" :key="task.docId" :task="task" />
    </ul>

    <slot />
  </section>
</template>
