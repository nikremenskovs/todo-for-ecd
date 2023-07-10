<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isOverdue() {
      const today = new Date();
      const [day, month, year] = this.task.dueDate.split("/");
      const dueDate = new Date(year, month - 1, day);
      return dueDate <= today && !this.task.completed;
    },
  },
};
</script>

<template>
  <li
    class="group mt-8 flex w-full justify-between border-b-2 border-todo-primary/25 lg:hover:border-todo-primary/75"
  >
    <input
      type="checkbox"
      name="checkbox"
      :checked="task.completed"
      class="peer h-8 w-8 appearance-none rounded-full border-2 border-todo-primary/25 checked:bg-todo-primary focus:outline-none lg:cursor-pointer lg:group-hover:border-todo-primary/75"
    />

    <label
      for=""
      class="mb-8 flex w-4/5 text-todo-primary peer-checked:font-bold lg:cursor-pointer"
      :class="[
        isOverdue ? 'text-todo-red' : 'text-todo-primary',
        task.completed ? 'line-through' : '',
      ]"
    >
      <div class="w-4/5">
        <h2 class="font-marmelad text-xl font-bold">
          {{ task.title }}
        </h2>
        <p class="mb-4 font-marmelad">Due: {{ task.dueDate }}</p>
        <div class="task-card__actions flex w-1/3 space-x-4 text-xl">
          <i class="fa-solid fa-trash-can"></i>
          <i class="fa-regular fa-clone"></i>
          <i class="fa-solid fa-pen-to-square"></i>
        </div>
      </div>
    </label>
  </li>
</template>
