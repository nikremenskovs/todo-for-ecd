<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["overdueTasks"]),
  },
};
</script>

<template>
  <BaseTasksView :pageTitle="'Overdue'" :tasks="this.overdueTasks" />
</template>
