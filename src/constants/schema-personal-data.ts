import emailValidation from "@constants/email-validation";
import validationErrors from "@constants/validation-errors";
import * as yup from "yup";

// Schema for validation of Personal data Form
const schemaPersonalData = yup.object({
  email: yup
    .string()
    .required(validationErrors.required())
    .test(
      "noWhitespace",
      validationErrors.noWhitespace(),
      (value) => !value.includes(" ")
    )
    .test("hasAtSymbol", validationErrors.missingAtSymbol(), (value) =>
      value.includes("@")
    )
    .test("hasDomain", validationErrors.missingDomain(), (value) => {
      const emailParts = value.split("@");
      return emailParts.length === 2 && emailParts[1].trim() !== "";
    })
    .matches(emailValidation, validationErrors.invalidEmailFormat()),
  firstName: yup
    .string()
    .required("This field is required")
    .matches(
      /^[A-Za-z]+(?:-[A-Za-z]+)*$/,
      "First name must contain only letters (may be devided by hyphen)"
    ),
  lastName: yup
    .string()
    .required("This field is required")
    .matches(
      /^[A-Za-z]+(?:-[A-Za-z]+)*$/,
      "Last name must contain only letters (may be devided by hyphen)"
    ),
  dateOfBirth: yup
    .date()
    .typeError("Date is required")
    .required("This field is required")
    .test("date-test", "You must be at least 13 years old", (value) => {
      const today = new Date();
      const userDate = new Date(value);
      const userYear = userDate.getFullYear();
      const userMonth = userDate.getMonth();
      const userDay = userDate.getDate();

      const age = today.getFullYear() - userYear;

      if (
        today.getMonth() < userMonth ||
        (today.getMonth() === userMonth && today.getDate() < userDay)
      ) {
        return age - 1 >= 13;
      }

      return age >= 13;
    }),
});

export default schemaPersonalData;
