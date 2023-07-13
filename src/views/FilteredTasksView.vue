<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getTodos"]),
    status() {
      return this.$route.params.status;
    },
  },
};
</script>

<template>
  <NestedLayout :pageTitle="status" :tasks="this.getTodos(status)" />
</template>
