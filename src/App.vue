<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["fetchTasks"]),
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<template>
  <div id="app" class="bg-todo-white px-4">
    <router-view />
  </div>
</template>
