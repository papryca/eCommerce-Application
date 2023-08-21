import emailValidation from "@constants/email-validation";
import validationErrors from "@constants/validation-errors";
import * as yup from "yup";

// Schema for validation of Login Form
const schemaLogin = yup.object({
  email: yup
    .string()
    .required(validationErrors.required())
    .matches(emailValidation, validationErrors.invalidFormat()),
  password: yup
    .string()
    .required(validationErrors.required())
    .matches(/[A-Z]/, validationErrors.uppercase())
    .matches(/[a-z]/, validationErrors.lowercase())
    .matches(/\d/, validationErrors.digit())
    .matches(/[!@#$%^&*]/, validationErrors.specialChar())
    .test(
      "noWhitespace",
      validationErrors.noWhitespace(),
      (value) => !value.includes(" ")
    )
    .min(8, validationErrors.min(8)),
});

export default schemaLogin;
