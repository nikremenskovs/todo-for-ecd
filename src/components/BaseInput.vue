<template>
  <input
    class="h-12 rounded-xl bg-todo-yellow/50 px-2 font-marmelad text-xl text-todo-primary placeholder:text-todo-primary"
    v-bind="$attrs"
    @input="$emit('input', $event.target.value)"
  />
</template>
