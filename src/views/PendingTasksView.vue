<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["pendingTasks"]),
  },
};
</script>

<template>
  <BaseTasksView :pageTitle="'Pending'" :tasks="this.pendingTasks" />
</template>
