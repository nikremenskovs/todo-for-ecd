<script>
import useVuelidate from "@vuelidate/core";

import {
  titleValidator,
  dueDateValidator,
  descriptionValidator,
  statusValidator,
  bundleValidationErrors,
} from "@/utils/validations";

export default {
  emits: ["form-data"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
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
      statusOptions: [
        { value: null, label: "Select status", disabled: true },
        { value: true, label: "Completed" },
        { value: false, label: "Pending" },
      ],
    };
  },

  validations() {
    return {
      model: {
        title: titleValidator,

        dueDate: dueDateValidator,

        description: descriptionValidator,

        completed: statusValidator,
      },
    };
  },
  methods: {
    bundleValidationErrors,
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
    <SharedInput
      type="text"
      placeholder="Your goal is..?"
      :error="bundleValidationErrors(v$.model.title.$errors)"
      @blur="this.v$.model.title.$validate"
      v-model.trim="model.title"
    />
    <SharedInput
      type="textarea"
      placeholder="Describe your plan..."
      :error="bundleValidationErrors(v$.model.description.$errors)"
      @blur="this.v$.model.description.$validate"
      v-model.trim="model.description"
    />
    <SharedInput
      type="date"
      :error="bundleValidationErrors(v$.model.dueDate.$errors)"
      @blur="this.v$.model.dueDate.$validate"
      v-model="model.dueDate"
    />

    <div>
      <select
        @blur="this.v$.model.completed.$validate"
        v-model="model.completed"
        :class="{
          'border-2 border-todo-red': v$.model.completed.$error,
        }"
        class="mb-2 h-12 w-full rounded-xl bg-todo-yellow/50 px-2 font-marmelad text-xl text-todo-primary"
      >
        <option
          v-for="option in statusOptions"
          :key="option.label"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      <p
        class="font-yeseva-one text-sm tracking-wider text-todo-red/75"
        v-if="v$.model.completed.$error"
      >
        {{ bundleValidationErrors(v$.model.completed.$errors) }}
      </p>
    </div>
    <SharedButton :background="'bg-todo-green'">Submit</SharedButton>
  </form>
</template>
