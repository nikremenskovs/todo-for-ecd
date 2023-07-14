<script>
import useVuelidate from "@vuelidate/core";

import {
  titleValidator,
  dueDateValidator,
  descriptionValidator,
  bundleValidationErrors,
} from "@/utils/validations";

import { mapActions } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      isDeleting: false,
      isCloning: false,

      model: {
        updatedTaskTitle: this.task.title,
        updatedTaskDescription: this.task.description,
        updatedTaskDueDate: this.task.dueDate,
      },

      errors: {
        updatedTaskTitle: "",
        updatedTaskDescription: "",
        updatedTaskDueDate: "",
      },
    };
  },

  validations() {
    return {
      model: {
        updatedTaskTitle: titleValidator,

        updatedTaskDueDate: dueDateValidator,

        updatedTaskDescription: descriptionValidator,
      },
    };
  },

  methods: {
    ...mapActions(["createNewTask", "updateTask", "deleteTask"]),
    updateCompletion(event) {
      const updateCompletionData = {
        docId: this.task.docId,
        title: this.task.title,
        dueDate: this.task.dueDate,
        description: this.task.description,
        completed: event.target.checked,
      };

      this.updateTask(updateCompletionData);
    },
    discardEditChanges() {
      this.model.updatedTaskTitle = this.task.title;
      this.model.updatedTaskDescription = this.task.description;
      this.model.updatedTaskDueDate = this.task.dueDate;
      this.isEditing = false;
    },
    saveEditChanges() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const updatedTask = {
          docId: this.task.docId,
          title: this.model.updatedTaskTitle,
          dueDate: this.model.updatedTaskDueDate,
          description: this.model.updatedTaskDescription,
          completed: this.task.completed,
        };
        this.updateTask(updatedTask);
        this.isEditing = false;
      }
    },
    cloneTask() {
      const taskToClone = {
        title: this.task.title,
        dueDate: this.task.dueDate,
        description: this.task.description,
        completed: this.task.completed,
      };
      this.createNewTask(taskToClone);
      this.isCloning = false;
    },
    bundleValidationErrors,
  },
  computed: {
    isOverdue() {
      const today = new Date();
      const [year, month, day] = this.task.dueDate.split("-");
      const dueDate = new Date(year, month - 1, day);
      return dueDate <= today && !this.task.completed;
    },
  },
};
</script>

<template>
  <li
    class="group mt-8 flex w-full justify-between border-b-2 border-todo-primary/25 lg:hover:border-todo-primary/75"
  >
    <input
      type="checkbox"
      name="checkbox"
      :checked="task.completed"
      :class="{ invisible: isEditing || isDeleting || isCloning }"
      class="peer h-8 w-8 appearance-none rounded-full border-2 border-todo-primary/25 checked:bg-todo-primary focus:outline-none lg:cursor-pointer lg:group-hover:border-todo-primary/75"
      @change="updateCompletion"
    />

    <label
      for=""
      class="mb-8 flex w-4/5 text-todo-primary peer-checked:font-bold"
      :class="{ 'text-todo-red': isOverdue }"
    >
      <div class="w-4/5 font-marmelad">
        <div v-if="isEditing" class="mb-4 flex flex-col space-y-4">
          <SharedInput
            type="text"
            :value="task.title"
            :error="bundleValidationErrors(v$.model.updatedTaskTitle.$errors)"
            @blur="this.v$.model.updatedTaskTitle.$validate"
            v-model="model.updatedTaskTitle"
          />
          <SharedInput
            type="date"
            :error="bundleValidationErrors(v$.model.updatedTaskDueDate.$errors)"
            @blur="this.v$.model.updatedTaskDueDate.$validate"
            v-model="model.updatedTaskDueDate"
          />
          <SharedInput
            type="text"
            :value="task.description"
            :error="
              bundleValidationErrors(v$.model.updatedTaskDescription.$errors)
            "
            @blur="this.v$.model.updatedTaskDescription.$validate"
            v-model="model.updatedTaskDescription"
          />
          <div class="flex h-12 space-x-4">
            <SharedButton :background="'bg-todo-green'" @click="saveEditChanges"
              >Save</SharedButton
            >
            <SharedButton
              :background="'bg-todo-red'"
              @click="discardEditChanges"
              >Discard</SharedButton
            >
          </div>
        </div>

        <div v-else-if="isDeleting">
          <p class="mb-8 font-yeseva-one text-2xl text-todo-primary">
            Would you like to delete this task?
          </p>
          <div class="flex h-12 space-x-4">
            <SharedButton
              @click="deleteTask(task.docId)"
              :background="'bg-todo-green'"
            >
              Yes
            </SharedButton>
            <SharedButton
              @click="isDeleting = false"
              :background="'bg-todo-red'"
            >
              No
            </SharedButton>
          </div>
        </div>

        <div v-else-if="isCloning">
          <p class="mb-8 font-yeseva-one text-2xl text-todo-primary">
            Would you like to clone this task?
          </p>
          <div class="flex h-12 space-x-4">
            <SharedButton @click="cloneTask" :background="'bg-todo-green'">
              Yes
            </SharedButton>
            <SharedButton
              @click="isCloning = false"
              :background="'bg-todo-red'"
            >
              No
            </SharedButton>
          </div>
        </div>

        <div v-else :class="{ 'line-through': task.completed }">
          <h2 class="text-xl font-bold">
            {{ task.title }}
          </h2>
          <p class="mb-4">Due: {{ task.dueDate }}</p>
          <p class="mb-4">
            {{ task.description }}
          </p>
        </div>

        <div
          :class="{ invisible: isEditing || isDeleting || isCloning }"
          class="task-card__actions flex w-1/3 space-x-4 text-xl"
        >
          <i
            class="fa-solid fa-trash-can lg:cursor-pointer"
            @click="isDeleting = true"
          ></i>
          <i
            class="fa-regular fa-clone lg:cursor-pointer"
            @click="isCloning = true"
          ></i>
          <i
            class="fa-solid fa-pen-to-square lg:cursor-pointer"
            @click="isEditing = true"
          ></i>
        </div>
      </div>
    </label>
  </li>
</template>
