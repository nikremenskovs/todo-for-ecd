<script>
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
      dueDateErrorMessage:
        "This must be within two weeks either way from today!",
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
