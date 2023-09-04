import emailValidation from "@constants/email-validation";
import validationErrors from "@constants/validation-errors";
import * as yup from "yup";

// Schema for validation of Registration Form
const schemaRegister = yup.object({
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
  firstName: yup
    .string()
    .required(validationErrors.required())
    .matches(/^[A-Za-z]+(?:-[A-Za-z]+)*$/, validationErrors.onlyLetters()),
  lastName: yup
    .string()
    .required(validationErrors.required())
    .matches(/^[A-Za-z]+(?:-[A-Za-z]+)*$/, validationErrors.onlyLetters()),
  birthday: yup
    .date()
    .typeError(validationErrors.dateRequired())
    .required(validationErrors.required())
    .test("date-test", validationErrors.ageRestriction(), (value) => {
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
  shippingStreet: yup
    .string()
    .required(validationErrors.required())
    .min(1, validationErrors.min(1)),
  shippingCity: yup
    .string()
    .required(validationErrors.required())
    .min(1, validationErrors.min(1))
    .matches(/^[A-Za-z\s]+(?:-[A-Za-z\s]+)*$/, validationErrors.onlyLetters()),
  shippingCountry: yup.string().required(validationErrors.required()),
  shippingPostcode: yup
    .string()
    .required(validationErrors.required())
    .test("postcode-test", (value, validationContext) => {
      const {
        createError,
        parent: { shippingCountry },
      } = validationContext;

      if (shippingCountry === "AT" && !value.match(/^[0-9]{4,4}$/)) {
        return createError({ message: validationErrors.postcodeFormat("AT") });
      }

      if (shippingCountry === "BY" && !value.match(/^[0-9]{6,6}$/)) {
        return createError({ message: validationErrors.postcodeFormat("BY") });
      }

      if (
        shippingCountry === "PL" &&
        !value.match(/^([0-9]{2,2})-([0-9]{3,3})$/)
      ) {
        return createError({
          message: validationErrors.postcodeFormat("PL"),
        });
      }

      if (shippingCountry === "US" && !value.match(/^[0-9]{5,5}$/)) {
        return createError({ message: validationErrors.postcodeFormat("US") });
      }

      return true;
    }),
  billingStreet: yup
    .string()
    .required(validationErrors.required())
    .min(1, validationErrors.min(1)),
  billingCity: yup
    .string()
    .required(validationErrors.required())
    .min(1, validationErrors.min(1))
    .matches(/^[A-Za-z\s]+(?:-[A-Za-z\s]+)*$/, validationErrors.onlyLetters()),
  billingCountry: yup.string().required(validationErrors.required()),
  billingPostcode: yup
    .string()
    .required(validationErrors.required())
    .test("postcode-test", (value, validationContext) => {
      const {
        createError,
        parent: { billingCountry },
      } = validationContext;

      if (billingCountry === "AT" && !value.match(/^[0-9]{4,4}$/)) {
        return createError({ message: validationErrors.postcodeFormat("AT") });
      }

      if (billingCountry === "BY" && !value.match(/^[0-9]{6,6}$/)) {
        return createError({ message: validationErrors.postcodeFormat("BY") });
      }

      if (
        billingCountry === "PL" &&
        !value.match(/^([0-9]{2,2})-([0-9]{3,3})$/)
      ) {
        return createError({
          message: validationErrors.postcodeFormat("PL"),
        });
      }

      if (billingCountry === "US" && !value.match(/^[0-9]{5,5}$/)) {
        return createError({ message: validationErrors.postcodeFormat("US") });
      }

      return true;
    }),
});

export default schemaRegister;
