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
        taskEditing: false,
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
    <input
      type="text"
      placeholder="what are you planning to do?"
      v-model.trim="model.taskTitle"
    />
    <input
      type="textarea"
      placeholder="desribe you plan..."
      v-model.trim="model.taskDescription"
    />
    <input type="date" v-model="model.taskDueDate" />
    <select v-model="model.taskCompleted">
      <option :value="true">Completed</option>
      <option :value="false">Pending</option>
    </select>
    <BaseButton :background="'bg-todo-green'">Submit</BaseButton>
  </form>
</template>
