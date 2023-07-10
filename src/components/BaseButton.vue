<script>
export default {
  props: {
    to: {
      type: Object,
      required: false,
    },
    background: {
      type: String,
      required: true,
    },
  },
  computed: {
    whatComponent() {
      return this.to ? "router-link" : "button";
    },
  },
};
</script>

<template>
  <component
    :is="whatComponent"
    class="homepage__CTA flex h-24 w-full items-center justify-center rounded-xl font-marmelad text-xl tracking-widest text-todo-white shadow-xl"
    :to="this.to ? this.to : ''"
    :class="this.background"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>
