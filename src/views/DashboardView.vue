<template>
  <section
    class="dashboard flex min-h-screen flex-col justify-center overflow-hidden"
  >
    <div
      class="fixed left-0 top-0 h-1/3 w-full scale-125 rounded-b-full bg-todo-yellow/50"
    ></div>
    <div class="dashboard__text z-10 mb-16 text-todo-primary">
      <div class="flex justify-between">
        <h1 class="mb-8 font-yeseva-one text-2xl tracking-wider">
          Welcome to your Dashboard
        </h1>
        <i class="fa-solid fa-table-columns text-4xl"></i>
      </div>
      <p class="font-marmelad text-base tracking-wide">
        Here you can navigate to your tasks or create a new one!
      </p>
    </div>
    <ul class="dashboard-items z-10">
      <li
        class="dashboard-items__all mb-8 h-24 w-full rounded-xl bg-todo-secondary p-4 font-marmelad shadow-xl"
      >
        <router-link to="/all" class="flex h-full items-center justify-between">
          <div class="flex">
            <i class="fa-solid fa-list-check mr-4 text-2xl text-todo-white"></i>
            <div>
              <h2 class="text-todo-white">All Tasks</h2>
              <p class="text-todo-white/50">Tasks: 0</p>
            </div>
          </div>
          <i
            class="fa-solid fa-ellipsis-vertical self-start text-2xl text-todo-white"
          ></i>
        </router-link>
      </li>
      <li
        class="dashboard-items__pending mb-8 h-24 w-full rounded-xl bg-todo-secondary p-4 font-marmelad shadow-xl"
      >
        <router-link
          to="/pending"
          class="flex h-full items-center justify-between"
        >
          <div class="flex">
            <i class="fa-solid fa-list-ul mr-4 text-2xl text-todo-white"></i>
            <div>
              <h2 class="text-todo-white">Pending Tasks</h2>
              <p class="text-todo-white/50">Tasks: 0</p>
            </div>
          </div>
          <i
            class="fa-solid fa-ellipsis-vertical self-start text-2xl text-todo-white"
          ></i>
        </router-link>
      </li>
      <li
        class="dashboard-items__completed mb-8 h-24 w-full rounded-xl bg-todo-secondary p-4 font-marmelad shadow-xl"
      >
        <router-link
          to="/completed"
          class="flex h-full items-center justify-between"
        >
          <div class="flex">
            <i class="fa-solid fa-check mr-4 text-2xl text-todo-white"></i>
            <div>
              <h2 class="text-todo-white">Completed Tasks</h2>
              <p class="text-todo-white/50">Tasks: 0</p>
            </div>
          </div>
          <i
            class="fa-solid fa-ellipsis-vertical self-start text-2xl text-todo-white"
          ></i>
        </router-link>
      </li>
      <li
        class="dashboard-items__completed mb-8 h-24 w-full rounded-xl bg-todo-green p-4 font-marmelad shadow-xl"
      >
        <router-link
          to="/new"
          class="flex h-full items-center justify-center text-center"
        >
          <div class="flex flex-col">
            <h2 class="mb-2 text-xl text-todo-primary">Create a new task</h2>
            <i
              class="fa-solid fa-square-plus mr-4 text-3xl text-todo-primary"
            ></i>
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>
