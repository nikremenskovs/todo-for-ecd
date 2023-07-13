<script>
export default {
  props: {
    to: {
      type: String,
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
    class="homepage__CTA flex h-12 w-full items-center justify-center rounded-xl font-marmelad text-base tracking-widest text-todo-white shadow-xl"
    :to="this.to ? this.to : ''"
    :class="this.background"
    :exact-active-class="'border-4 border-todo-primary'"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>
