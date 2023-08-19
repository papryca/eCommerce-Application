const validationErrors = {
  required: () => "This field is required",
  min: (count: number) => `Must be more than ${count} characters`,
  uppercase: () =>
    "This field must contain at least one uppercase letter (A-Z)",
  lowercase: () =>
    "This field must contain at least one lowercase letter (a-z)",
  digit: () => "This field must contain at least one digit (0-9)",
  specialChar: () =>
    "This field must contain at least one special character (!@#$%^&*)",
  noWhitespace: () =>
    "This field must not contain leading or trailing whitespace",
  invalidFormat: () => "Invalid format",
};

export default validationErrors;
