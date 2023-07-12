<script>
import useVuelidate from "@vuelidate/core";

import { required, maxLength, helpers } from "@vuelidate/validators";

export default {
  emits: ["form-data"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      twoWeeksBeforeToday: new Date(
        Date.now() - 14 * 24 * 60 * 60 * 1000
      ).toISOString(),
      twoWeeksFromToday: new Date(
        Date.now() + 14 * 24 * 60 * 60 * 1000
      ).toISOString(),
      dueDateErrorMessage:
        "This must be within two weeks either way from today!",

      model: {
        title: "",
        dueDate: "",
        description: "",
        completed: null,
      },
      errors: {
        title: "",
        dueDate: "",
        description: "",
        completed: "",
      },
    };
  },

  validations() {
    return {
      model: {
        title: {
          required: helpers.withMessage(
            "Ensure you enter a task name!",
            required
          ),
          maxLength: maxLength(60),
          $lazy: true,
        },

        dueDate: {
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

        description: {
          required: helpers.withMessage(
            "Ensure you enter description for you task!",
            required
          ),
          maxLength: maxLength(300),
          $lazy: true,
        },

        completed: {
          required: helpers.withMessage("Status is required!", required),
        },
      },
    };
  },
  methods: {
    bundleErrors(errorsArray) {
      return errorsArray.reduce(
        (result, error) =>
          (result += `${result ? " & " : ""}${error.$message}`),
        ""
      );
    },
    submitForm() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit("form-data", this.model);
      }
    },
  },
};
</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col space-y-10 px-4">
    <BaseInput
      type="text"
      placeholder="Your goal is..?"
      :error="bundleErrors(v$.model.title.$errors)"
      @blur="this.v$.model.title.$validate"
      v-model.trim="model.title"
    />
    <BaseInput
      type="textarea"
      placeholder="Describe your plan..."
      :error="bundleErrors(v$.model.description.$errors)"
      @blur="this.v$.model.description.$validate"
      v-model.trim="model.description"
    />
    <BaseInput
      type="date"
      :error="bundleErrors(v$.model.dueDate.$errors)"
      @blur="this.v$.model.dueDate.$validate"
      v-model="model.dueDate"
    />

    <div>
      <select
        :error="bundleErrors(v$.model.completed.$errors)"
        @blur="this.v$.model.completed.$validate"
        v-model="model.completed"
        :class="v$.model.completed.$error ? 'border-2 border-todo-red' : ''"
        class="mb-2 h-12 w-full rounded-xl bg-todo-yellow/50 px-2 font-marmelad text-xl text-todo-primary"
      >
        <option :value="null" disabled>Select status</option>
        <option :value="true">Completed</option>
        <option :value="false">Pending</option>
      </select>
      <p
        class="font-yeseva-one text-sm tracking-wider text-todo-red/75"
        v-if="v$.model.completed.$error"
      >
        {{ bundleErrors(v$.model.completed.$errors) }}
      </p>
    </div>
    <BaseButton :background="'bg-todo-green'">Submit</BaseButton>
  </form>
</template>
