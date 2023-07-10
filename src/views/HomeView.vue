<template>
  <section
    class="homepage flex h-screen flex-col items-center justify-center text-center text-todo-primary"
  >
    <!-- make the image responsive by utilising picture tag -->
    <img
      class="homepage__image mb-12 h-64 w-64 rounded-full"
      src="@/assets/images/dashboardImage.jpg"
      alt="Homepage image with a notebook that contains a simple four step to do list where the first three items are ticked. This suggests that whoever made this list has already ticked 'Wake up', 'Make Coffee', 'Drink Coffee'. The last untiked item reads'Make more coffee"
    />
    <h1 class="homepage__heading mb-8 font-yeseva-one text-2xl tracking-wider">
      ECD To Do Assistant
    </h1>
    <p class="homepage__paragraph mb-12 font-marmelad text-base tracking-wide">
      Hello, ECD Limited colleague! Stay on top of your day and maximize
      productivity with our all-in-one to-do app, designed to streamline your
      tasks, prioritize goals, and ensure a successful and fulfilling day
    </p>
    <router-link class="homepage__CTA" to="/dashboard">GET STARTED</router-link>
  </section>
</template>
