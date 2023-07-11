<script>
import ConfirmationModal from "@/components/ConfirmationModal.vue";
export default {
  components: { ConfirmationModal },
  data() {
    return {
      showConfirmationModal: false,
    };
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateCompletion(event) {
      const completed = event.target.checked;
      this.$store.dispatch("setTaskCompletion", {
        taskId: this.task.id,
        completed,
      });
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task.id);
      this.showConfirmationModal = false;
    },
    cancelDelete() {
      this.showConfirmationModal = false;
    },
  },
  computed: {
    isOverdue() {
      const today = new Date();
      const [day, month, year] = this.task.dueDate.split("-");
      const dueDate = new Date(year, month - 1, day);
      return dueDate <= today && !this.task.completed;
    },
  },
};
</script>

<template>
  <div>
    <li
      class="group mt-8 flex w-full justify-between border-b-2 border-todo-primary/25 lg:hover:border-todo-primary/75"
    >
      <input
        type="checkbox"
        name="checkbox"
        :checked="task.completed"
        class="peer h-8 w-8 appearance-none rounded-full border-2 border-todo-primary/25 checked:bg-todo-primary focus:outline-none lg:cursor-pointer lg:group-hover:border-todo-primary/75"
        @change="updateCompletion"
      />

      <label
        for=""
        class="mb-8 flex w-4/5 text-todo-primary peer-checked:font-bold lg:cursor-pointer"
        :class="[
          isOverdue ? 'text-todo-red' : 'text-todo-primary',
          task.completed ? 'line-through' : '',
        ]"
      >
        <div class="w-4/5 font-marmelad">
          <h2 class="text-xl font-bold">
            {{ task.title }}
          </h2>
          <p class="mb-4">Due: {{ task.dueDate }}</p>
          <p class="mb-4">
            {{ task.description }}
          </p>
          <div class="task-card__actions flex w-1/3 space-x-4 text-xl">
            <i
              class="fa-solid fa-trash-can"
              @click="showConfirmationModal = true"
            ></i>
            <i class="fa-regular fa-clone"></i>
            <i class="fa-solid fa-pen-to-square"></i>
          </div>
        </div>
      </label>
    </li>
    <ConfirmationModal v-if="showConfirmationModal">
      <div
        class="flex h-full flex-col items-center justify-evenly p-6 text-center"
      >
        <p class="font-yeseva-one text-2xl text-todo-white">
          Are you sure you want to delete this item?
        </p>
        <div class="flex w-full justify-around space-x-4">
          <BaseButton @click="deleteTask" :background="'bg-todo-green'">
            Yes
          </BaseButton>
          <BaseButton @click="cancelDelete" :background="'bg-todo-red'">
            No
          </BaseButton>
        </div>
      </div>
    </ConfirmationModal>
  </div>
</template>
