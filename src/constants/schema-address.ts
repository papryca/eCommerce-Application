import * as yup from "yup";

// Schema for validation of addresses in form
const schemaAddress = yup.object({
  streetName: yup
    .string()
    .required("This field is required")
    .min(1, "Street must contain at least one character"),
  city: yup
    .string()
    .required("This field is required")
    .min(1, "Must contain at least one character")
    .matches(
      /^[A-Za-z\s]+(?:-[A-Za-z\s]+)*$/,
      "City must contain only letters (may be devided by hyphen)"
    ),
  country: yup.string().required("This field is required"),
  postalCode: yup
    .string()
    .required("This field is required")
    .test("postcode-test", (value, validationContext) => {
      const {
        createError,
        parent: { country },
      } = validationContext;

      if (country === "AT" && !value.match(/^[0-9]{4,4}$/)) {
        return createError({ message: "Postcode must contain 4 digits" });
      }

      if (country === "BY" && !value.match(/^[0-9]{6,6}$/)) {
        return createError({ message: "Postcode must contain 6 digits" });
      }

      if (country === "PL" && !value.match(/^([0-9]{2,2})-([0-9]{3,3})$/)) {
        return createError({
          message: "Postcode must contain only digits in format xx-xxx",
        });
      }

      if (country === "US" && !value.match(/^[0-9]{5,5}$/)) {
        return createError({ message: "Postcode must contain 5 digits" });
      }

      return true;
    }),
});

export default schemaAddress;
