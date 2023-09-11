import { IUserFullDataResponse } from "@interfaces/user-response";
import ProfileEstimation from "@pages/profile/profile-estimation";
// import { render, screen } from "@testing-library/react";
import { fireEvent, render, screen } from "@testing-library/react";
// screen

const user = {
  version: 1,
  email: "1@1.com",
  firstName: "Ellen",
  lastName: "J",
  dateOfBirth: new Date("1987-09-07"),
  addresses: [
    {
      id: "vr70NCq9",
      streetName: "Main",
      postalCode: "1111",
      city: "Vienna",
      country: "AT",
    },
    {
      id: "-wFr8t72",
      streetName: "Main",
      postalCode: "1111",
      city: "Vienna",
      country: "AT",
    },
  ],
  billingAddressIds: ["vr70NCq9"],
  shippingAddressIds: ["-wFr8t72"],
  defaultBillingAddressId: "-wFr8t72",
  defaultShippingAddressId: "",
} as IUserFullDataResponse;
const disabled = true;

test("user profile component rendering", () => {
  render(<ProfileEstimation userData={user} isDisabled={disabled} />);

  // checks presense of personal data form
  const formElement = screen.getByTestId("form");
  expect(formElement).toBeInTheDocument();

  // checks that a button to reset password is in form
  const accordion = screen.getByTestId("accordion");
  const resetPasswordButton = screen.getByTestId("password");
  expect(accordion).toContainElement(resetPasswordButton);

  // checks that form fields values correspond with recieved user data
  expect(formElement).toHaveFormValues({
    email: "1@1.com",
    firstName: "Ellen",
    lastName: "J",
  });
});

test("password-popup opening on click on password button", () => {
  render(<ProfileEstimation userData={user} isDisabled={disabled} />);

  // checks if popup opens on click on password button
  fireEvent.click(screen.getByTestId("password"));
  const passwordPopup = screen.getByTestId("password-modal");
  expect(passwordPopup).toBeVisible();

  // checks if password input is enabled
  const passwordInput = screen.getByTestId("password-input");
  expect(passwordInput).toBeEnabled();

  // checks if popup closes on click on calcel button
  fireEvent.click(screen.getByTestId("calcel"));
  expect(passwordPopup).not.toBeVisible();
});
