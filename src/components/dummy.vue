<script>
import useVuelidate from "@vuelidate/core";

import { required, maxLength, helpers } from "@vuelidate/validators";

export default {
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
      dueDateErrorMessage: "It must be within two weeks either way from today!",

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
  },
};
</script>
