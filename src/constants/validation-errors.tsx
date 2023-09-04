const validationErrors = {
  required: () => "This field is required",
  min: (count: number) =>
    `This field must contain more than ${count} characters`,
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
  missingDomain: () =>
    "Email address must contain a domain name (e.g., example.com)",
  missingAtSymbol: () => "Email address must contain an '@' symbol",
  invalidEmailFormat: () =>
    "Email address must be properly formatted (e.g., user@example.com)",
  onlyLetters: () =>
    "This field must contain only letters (may be devided by hyphen)",
  dateRequired: () => "Date is required",
  ageRestriction: () => "You must be at least 13 years old",
  postcodeFormat: (country: string) => {
    switch (country) {
      case "AT":
        return "Postcode must contain 4 digits";
      case "BY":
        return "Postcode must contain 6 digits";
      case "PL":
        return "Postcode must contain only digits in format xx-xxx";
      case "US":
        return "Postcode must contain 5 digits";
      default:
        return "Invalid postcode format";
    }
  },
};

export default validationErrors;
