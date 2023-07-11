<script>
export default {
  emits: ["form-data"],
  data() {
    return {
      model: {
        taskId: null,
        taskTitle: "",
        taskDueDate: "",
        taskDescription: "",
        taskCompleted: null,
      },
    };
  },
  methods: {
    submitForm() {
      this.$emit("form-data", this.model);
    },
  },
};
</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col space-y-10 px-4">
    <BaseInput
      type="text"
      placeholder="Your goal is..?"
      v-model.trim="model.taskTitle"
    />
    <BaseInput
      type="textarea"
      placeholder="Desribe your plan..."
      v-model.trim="model.taskDescription"
    />
    <BaseInput type="date" v-model="model.taskDueDate" />

    <select
      v-model="model.taskCompleted"
      class="h-12 rounded-xl bg-todo-yellow/50 px-2 font-marmelad text-xl text-todo-primary"
    >
      <option :value="null" disabled>Select status</option>
      <option :value="true">Completed</option>
      <option :value="false">Pending</option>
    </select>
    <BaseButton :background="'bg-todo-green'">Submit</BaseButton>
  </form>
</template>
