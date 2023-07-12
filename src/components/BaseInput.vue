<script>
export default {
  name: "BaseInput",
  props: {
    error: {
      type: String,
      required: false,
      default: "",
    },
  },

  emits: ["update:modelValue"],
};
</script>

<template>
  <div>
    <input
      class="mb-2 h-12 w-full rounded-xl bg-todo-yellow/50 px-2 font-marmelad text-xl text-todo-primary placeholder:text-todo-primary"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    />
    <p
      class="font-yeseva-one text-sm tracking-wider text-todo-red/75"
      v-if="this.error"
    >
      {{ error }}
    </p>
  </div>
</template>
