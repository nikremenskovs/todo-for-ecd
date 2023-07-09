<template>
  <section class="dashboard flex min-h-screen flex-col justify-center">
    <div class="dashboard__text mb-16">
      <h1 class="font-yeseva-one mb-8 text-2xl tracking-wider">
        Welcome to your Dashboard
      </h1>
      <p class="font-marmelad text-base tracking-wide">
        Here you can navigate your tasks or create a new one!
      </p>
    </div>
    <ul class="dashboard-items">
      <li
        v-for="n in 4"
        :key="n"
        class="dashboard-items__all bg-todo-secondary mb-8 flex h-24 w-full items-center justify-between rounded-xl shadow-xl"
      >
        <div class="flex">
          <div class="bg-todo-red h-12 w-12" />
          <div>
            <h2>All Tasks</h2>
            <p>Tasks: 0</p>
          </div>
        </div>
        <div class="bg-todo-green h-12 w-12" />
      </li>
    </ul>
  </section>
</template>
