<script>
import CreateNewTaskForm from "@/components/CreateNewTaskForm.vue";
import { mapActions } from "vuex";

export default {
  components: { CreateNewTaskForm },
  methods: {
    ...mapActions(["createNewTask"]),
    saveFormData(data) {
      this.createNewTask(data);
      this.$router.push("/dashboard/tasks/all");
    },
  },
};
</script>

<template>
  <BaseNestedWrapper :pageTitle="'New'">
    <CreateNewTaskForm @form-data="saveFormData" />
  </BaseNestedWrapper>
</template>
