<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["fetchTasks"]),
  },
  mounted() {
    (async () => {
      try {
        this.fetchTasks();
      } catch {
        throw new Error("An error occurred when fetching tasks.");
      }
    })();
  },
};
</script>

<template>
  <div id="app" class="bg-todo-white px-4">
    <router-view />
  </div>
</template>
