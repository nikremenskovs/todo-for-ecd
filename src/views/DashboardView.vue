<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getTodos"]),
  },
};
</script>

<template>
  <section
    class="dashboard flex min-h-screen flex-col justify-center overflow-hidden lg:flex-row lg:justify-around"
  >
    <div
      class="dashboard--container flex justify-center lg:mx-0 lg:mt-28 lg:w-3/5"
    >
      <div class="lg:fixed">
        <div class="dashboard__text z-10 mb-16 text-todo-primary">
          <div class="flex justify-between">
            <h1 class="mb-8 w-3/5 font-yeseva-one text-2xl tracking-wider">
              Dashboard
            </h1>
            <i class="fa-solid fa-table-columns text-4xl"></i>
          </div>
          <p class="font-marmelad text-base tracking-wide">
            Here you can navigate to your tasks or create a new one!
          </p>
        </div>
        <ul class="dashboard-items z-10 space-y-4">
          <li class="dashboard-items__all">
            <SharedButton
              :to="'/dashboard/tasks/all'"
              :background="'bg-todo-secondary'"
            >
              <i class="fa-solid fa-list-check mr-4"></i>
              All ({{ this.getTodos("all").length }})
            </SharedButton>
          </li>

          <li class="dashboard-items__pending">
            <SharedButton
              :to="'/dashboard/tasks/pending'"
              :background="'bg-todo-secondary'"
            >
              <i class="fa-solid fa-list-ul mr-4"></i>
              Pending ({{ this.getTodos("pending").length }})
            </SharedButton>
          </li>

          <li class="dashboard-items__completed">
            <SharedButton
              :to="'/dashboard/tasks/completed'"
              :background="'bg-todo-secondary'"
            >
              <i class="fa-solid fa-check mr-4"></i>
              Completed ({{ this.getTodos("completed").length }})
            </SharedButton>
          </li>

          <li class="dashboard-items__overdue">
            <SharedButton
              :to="'/dashboard/tasks/overdue'"
              :background="'bg-todo-red'"
            >
              <i class="fa-solid fa-triangle-exclamation mr-4"></i>
              Overdue ({{ this.getTodos("overdue").length }})
            </SharedButton>
          </li>

          <li class="dashboard-items__new">
            <SharedButton :to="'/dashboard/new'" :background="'bg-todo-green'">
              <i class="fa-solid fa-square-plus mr-4"></i>
              Create New
            </SharedButton>
          </li>
        </ul>
      </div>
    </div>
    <router-view class="lg:static lg:flex-grow lg:pl-16" />
  </section>
</template>
