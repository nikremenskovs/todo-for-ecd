<script>
import CreateNewTaskForm from "@/components/CreateNewTaskForm.vue";
import { mapActions } from "vuex";

export default {
  components: { CreateNewTaskForm },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["createNewTask"]),
    async saveFormData(data) {
      try {
        this.isLoading = true;
        await this.createNewTask(data);
        this.isLoading = false;
        this.$router.push("/dashboard/tasks/all");
      } catch {
        this.isLoading = false;
        throw new Error("An error occurred when fetching tasks.");
      }
    },
  },
};
</script>

<template>
  <NestedLayout :pageTitle="'New'">
    <div
      v-if="isLoading"
      class="mx-auto flex h-12 w-12 animate-spin text-todo-primary"
    >
      <img src="../assets/icons/270-ring.svg" alt="spinner ring 270 degrees" />
    </div>
    <CreateNewTaskForm v-else @form-data="saveFormData" />
  </NestedLayout>
</template>
