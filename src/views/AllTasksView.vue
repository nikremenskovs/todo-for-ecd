<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["allTasks"]),
  },
};
</script>

<template>
  <BaseTasksView :pageTitle="'All'" :tasks="this.allTasks" />
</template>
