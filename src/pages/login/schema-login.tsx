import * as yup from "yup";

import emailValidation from "../../constants/email-validation";

// Schema for validation of Login Form
const schemaLogin = yup.object({
  email: yup
    .string()
    .required("This field is required")
    .matches(emailValidation, "Invalid email format"),
  password: yup
    .string()
    .required("This field is required")
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter (A-Z)"
    )
    .matches(
      /[a-z]/,
      "Password must contain at least one lowercase letter (a-z)"
    )
    .matches(/\d/, "Password must contain at least one digit (0-9)")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character (!@#$%^&*)"
    )
    .test(
      "noWhitespace",
      "Password must not contain leading or trailing whitespace",
      (value) => !value.includes(" ")
    )
    .min(8, "Must be more than 8 characters"),
});

export default schemaLogin;
