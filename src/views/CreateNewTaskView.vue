<script>
import CreateNewTaskForm from "@/components/CreateNewTaskForm.vue";
import { mapActions } from "vuex";

export default {
  components: { CreateNewTaskForm },
  methods: {
    ...mapActions(["createNewTask"]),
    saveFormData(data) {
      this.createNewTask(data);
      this.$router.push({ name: "all" });
    },
  },
};
</script>

<template>
  <BaseTasksView :pageTitle="'Create new task'">
    <CreateNewTaskForm @form-data="saveFormData" />
  </BaseTasksView>
</template>
