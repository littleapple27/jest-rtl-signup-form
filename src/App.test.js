import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

//test block
test("expect inputs to be empty on initial render", () => {
  //rendering component to test
  render(<App />);

  //find specific element
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  //assertion, assert what is expected to happen
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type into email input", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });

  userEvent.type(emailInputElement, "testemail@email.com");
  expect(emailInputElement.value).toBe("testemail@email.com");
});

test("should be able to type into password input", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password", {
    name: /password/i,
  });

  userEvent.type(passwordInputElement, "abc123");
  expect(passwordInputElement.value).toBe("abc123");
});

test("should be able to type into confirmPassword input", () => {
  render(<App />);
  const confirmPasswordInputElement = screen.getByLabelText("Confirm Password");

  userEvent.type(confirmPasswordInputElement, "abc123");
  expect(confirmPasswordInputElement.value).toBe("abc123");
});

test("should show email error message on invalid email", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole("button");
  const emailErrorElement = screen.queryByText(/The email address is invalid/i);

  expect(emailErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInputElement, "testemailemail.com");
  fireEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(
    /The email address is invalid/i
  );
  expect(emailErrorElementAgain).toBeInTheDocument();
});
