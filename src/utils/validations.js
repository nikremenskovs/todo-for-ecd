import { required, maxLength, helpers } from "@vuelidate/validators";

const twoWeeksBeforeToday = new Date(
  Date.now() - 14 * 24 * 60 * 60 * 1000
).toISOString();

const twoWeeksFromToday = new Date(
  Date.now() + 14 * 24 * 60 * 60 * 1000
).toISOString();
const dueDateErrorMessage =
  "This must be within two weeks either way from today!";

export const titleValidator = {
  required: helpers.withMessage("Ensure you enter a task name!", required),
  maxLength: maxLength(60),
  $lazy: true,
};

export const dueDateValidator = {
  required: helpers.withMessage("Ensure you enter a due date!", required),

  minValue: helpers.withMessage(
    dueDateErrorMessage,
    (value) => value > twoWeeksBeforeToday
  ),
  maxValue: helpers.withMessage(
    dueDateErrorMessage,
    (value) => value < twoWeeksFromToday
  ),
};

export const descriptionValidator = {
  required: helpers.withMessage(
    "Ensure you enter description for you task!",
    required
  ),
  maxLength: maxLength(300),
  $lazy: true,
};

export const statusValidator = {
  required: helpers.withMessage("Status is required!", required),
};

export const bundleValidationErrors = (errorsArray) => {
  return errorsArray.reduce(
    (result, error) => (result += `${result ? " & " : ""}${error.$message}`),
    ""
  );
};
