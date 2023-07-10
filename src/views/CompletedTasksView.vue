<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["completedTasks"]),
  },
};
</script>

<template>
  <BaseTasksView :pageTitle="'Completed'" :tasks="this.completedTasks" />
</template>
