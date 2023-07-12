<script>
import useVuelidate from "@vuelidate/core";

import { required, maxLength, helpers } from "@vuelidate/validators";
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

      twoWeeksBeforeToday: new Date(
        Date.now() - 14 * 24 * 60 * 60 * 1000
      ).toISOString(),
      twoWeeksFromToday: new Date(
        Date.now() + 14 * 24 * 60 * 60 * 1000
      ).toISOString(),
      dueDateErrorMessage:
        "This must be within two weeks either way from today!",

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
        updatedTaskTitle: {
          required: helpers.withMessage(
            "Ensure you enter a task name!",
            required
          ),
          maxLength: maxLength(60),
          $lazy: true,
        },

        updatedTaskDueDate: {
          required: helpers.withMessage(
            "Ensure you enter a due date!",
            required
          ),

          minValue: helpers.withMessage(
            this.dueDateErrorMessage,
            (value) => value > this.twoWeeksBeforeToday
          ),
          maxValue: helpers.withMessage(
            this.dueDateErrorMessage,
            (value) => value < this.twoWeeksFromToday
          ),
        },

        updatedTaskDescription: {
          required: helpers.withMessage(
            "Ensure you enter description for you task!",
            required
          ),
          maxLength: maxLength(300),
          $lazy: true,
        },
      },
    };
  },

  methods: {
    ...mapActions([
      "createNewTask",
      "updateTask",
      "setTaskCompletion",
      "deleteTask",
    ]),
    updateCompletion(event) {
      const completed = event.target.checked;
      this.setTaskCompletion({ taskId: this.task.id, completed });
    },
    removeTask() {
      this.deleteTask(this.task.id);
      this.showConfirmationModal = false;
    },
    cancelDelete() {
      this.isDeleting = false;
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    discardEditChanges() {
      this.model.updatedTaskTitle = this.task.title;
      this.model.updatedTaskDescription = this.task.description;
      this.model.updatedTaskDueDate = this.task.dueDate;
      this.toggleEditing();
    },
    saveEditChanges() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const updatedTask = {
          id: this.task.id,
          title: this.model.updatedTaskTitle,
          dueDate: this.model.updatedTaskDueDate,
          description: this.model.updatedTaskDescription,
          completed: this.task.completed,
        };
        this.updateTask(updatedTask);
        this.toggleEditing();
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
    bundleErrors(errorsArray) {
      return errorsArray.reduce(
        (result, error) =>
          (result += `${result ? " & " : ""}${error.$message}`),
        ""
      );
    },
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
  <div>
    <li
      class="group mt-8 flex w-full justify-between border-b-2 border-todo-primary/25 lg:hover:border-todo-primary/75"
    >
      <input
        type="checkbox"
        name="checkbox"
        :checked="task.completed"
        :class="isEditing || isDeleting || isCloning ? 'invisible' : ''"
        class="peer h-8 w-8 appearance-none rounded-full border-2 border-todo-primary/25 checked:bg-todo-primary focus:outline-none lg:cursor-pointer lg:group-hover:border-todo-primary/75"
        @change="updateCompletion"
      />

      <label
        for=""
        class="mb-8 flex w-4/5 text-todo-primary peer-checked:font-bold"
        :class="isOverdue ? 'text-todo-red' : 'text-todo-primary'"
      >
        <div class="w-4/5 font-marmelad">
          <div v-if="isEditing" class="mb-4 flex flex-col space-y-4">
            <BaseInput
              type="text"
              :value="task.title"
              :error="bundleErrors(v$.model.updatedTaskTitle.$errors)"
              @blur="this.v$.model.updatedTaskTitle.$validate"
              v-model="model.updatedTaskTitle"
            />
            <BaseInput
              type="date"
              :error="bundleErrors(v$.model.updatedTaskDueDate.$errors)"
              @blur="this.v$.model.updatedTaskDueDate.$validate"
              v-model="model.updatedTaskDueDate"
            />
            <BaseInput
              type="text"
              :value="task.description"
              :error="bundleErrors(v$.model.updatedTaskDescription.$errors)"
              @blur="this.v$.model.updatedTaskDescription.$validate"
              v-model="model.updatedTaskDescription"
            />
            <div class="flex h-12 space-x-4">
              <BaseButton :background="'bg-todo-green'" @click="saveEditChanges"
                >Save</BaseButton
              >
              <BaseButton
                :background="'bg-todo-red'"
                @click="discardEditChanges"
                >Discard</BaseButton
              >
            </div>
          </div>

          <div v-else-if="isDeleting">
            <p class="mb-8 font-yeseva-one text-2xl text-todo-primary">
              Would you like to delete this task?
            </p>
            <div class="flex h-12 space-x-4">
              <BaseButton @click="removeTask" :background="'bg-todo-green'">
                Yes
              </BaseButton>
              <BaseButton @click="cancelDelete" :background="'bg-todo-red'">
                No
              </BaseButton>
            </div>
          </div>

          <div v-else-if="isCloning">
            <p class="mb-8 font-yeseva-one text-2xl text-todo-primary">
              Would you like to clone this task?
            </p>
            <div class="flex h-12 space-x-4">
              <BaseButton @click="cloneTask" :background="'bg-todo-green'">
                Yes
              </BaseButton>
              <BaseButton
                @click="isCloning = false"
                :background="'bg-todo-red'"
              >
                No
              </BaseButton>
            </div>
          </div>

          <div v-else :class="task.completed ? 'line-through' : ''">
            <h2 class="text-xl font-bold">
              {{ task.title }}
            </h2>
            <p class="mb-4">Due: {{ task.dueDate }}</p>
            <p class="mb-4">
              {{ task.description }}
            </p>
          </div>

          <div
            :class="isEditing || isDeleting || isCloning ? 'invisible' : ''"
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
    <!-- <ConfirmationModal v-if="showConfirmationModal">
      <div
        class="flex h-full flex-col items-center justify-evenly p-6 text-center"
      >
        <p class="font-yeseva-one text-2xl text-todo-white">
          Are you sure you want to delete this item?
        </p>
        <div class="flex w-full justify-around space-x-4">
          <BaseButton @click="removeTask" :background="'bg-todo-green'">
            Yes
          </BaseButton>
          <BaseButton @click="cancelDelete" :background="'bg-todo-red'">
            No
          </BaseButton>
        </div>
      </div>
    </ConfirmationModal> -->
  </div>
</template>
