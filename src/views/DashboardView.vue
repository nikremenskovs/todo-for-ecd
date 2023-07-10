<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "allTasks",
      "completedTasks",
      "pendingTasks",
      "overdueTasks",
    ]),
  },
};
</script>

<template>
  <section
    class="dashboard flex min-h-screen flex-col justify-center overflow-hidden"
  >
    <div class="dashboard--container mx-auto max-w-md">
      <div class="dashboard__text z-10 mb-16 text-todo-primary">
        <div class="flex justify-between">
          <h1 class="mb-8 w-3/5 font-yeseva-one text-2xl tracking-wider">
            Welcome to your Dashboard
          </h1>
          <i class="fa-solid fa-table-columns text-4xl"></i>
        </div>
        <p class="font-marmelad text-base tracking-wide">
          Here you can navigate to your tasks or create a new one!
        </p>
      </div>
      <ul class="dashboard-items z-10 space-y-4">
        <li class="dashboard-items__all">
          <BaseButton :to="{ name: 'all' }" :background="'bg-todo-secondary'">
            <i class="fa-solid fa-list-check mr-4"></i>
            All Tasks ({{ this.allTasks.length }})
          </BaseButton>
        </li>

        <li class="dashboard-items__pending">
          <BaseButton
            :to="{ name: 'pending' }"
            :background="'bg-todo-secondary'"
          >
            <i class="fa-solid fa-list-ul mr-4"></i>
            Pending Tasks ({{ this.pendingTasks.length }})
          </BaseButton>
        </li>

        <li class="dashboard-items__completed">
          <BaseButton
            :to="{ name: 'completed' }"
            :background="'bg-todo-secondary'"
          >
            <i class="fa-solid fa-check mr-4"></i>
            Completed Tasks ({{ this.completedTasks.length }})
          </BaseButton>
        </li>

        <li class="dashboard-items__overdue">
          <BaseButton :to="{ name: 'overdue' }" :background="'bg-todo-red'">
            <i class="fa-solid fa-triangle-exclamation mr-4"></i>
            Overdue Tasks ({{ this.overdueTasks.length }})
          </BaseButton>
        </li>

        <li class="dashboard-items__new">
          <BaseButton :to="{ name: 'new' }" :background="'bg-todo-green'">
            <i class="fa-solid fa-square-plus mr-4"></i>
            Create New Task
          </BaseButton>
        </li>
      </ul>
    </div>
    <router-view />
  </section>
</template>
