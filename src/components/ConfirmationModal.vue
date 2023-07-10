<template>
  <div>
    <div
      class="overlay fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-todo-secondary/90"
    >
      <div class="h-1/2 w-4/5 rounded-xl bg-todo-primary">
        <slot />
      </div>
    </div>
  </div>
</template>
