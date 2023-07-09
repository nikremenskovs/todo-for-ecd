<template>
    <section class="dashboard min-h-screen flex flex-col justify-center">
        <div class="dashboard__text mb-16">
            <h1 class="font-yeseva-one text-2xl mb-8 tracking-wider">Welcome to your Dashboard</h1>
            <p class="font-marmelad text-base  tracking-wide">Here you can navigate your tasks or create a new one!</p>
        </div>
        <ul class="dashboard-items">
            <li v-for="n in 4" class="dashboard-items__all w-full h-24 mb-8 bg-todo-secondary rounded-xl shadow-xl flex justify-between items-center">
                <div class="flex">

                    <div class="h-12 w-12 bg-todo-red" />
                    <div>
                        <h2>All Tasks</h2>
                        <p>Tasks: 0</p>
                    </div>
                </div>
                <div class="h-12 w-12 bg-todo-green" />
            </li>  
        </ul>
    </section>
</template>