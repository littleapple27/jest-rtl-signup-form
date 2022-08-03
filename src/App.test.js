import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type } from "@testing-library/user-event/dist/type";
import App from "./App";

//Jest Hooks
beforeEach(() => {
  //rendering component to test
  console.log("this will run before each test");
  render(<App />);
});

afterEach(() => {
  console.log("this wil run after each test");
});

beforeAll(() => {
  console.log("run once before all of the tests");
});

afterAll(() => {
  console.log("run once after all of the tests");
});

//helper functions
const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox", { name: /email/i });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickSubmitBtn = () => {
  const submitBtnElement = screen.getByRole("button");
  fireEvent.click(submitBtnElement);
  return submitBtnElement;
};

//describe block
describe(
  ("initial render of inputs check",
  () => {
    //test block
    test("expect inputs to be empty on initial render", () => {
      //rendering component to test
      //find specific element
      //assertion, assert what is expected to happen
      expect(screen.getByRole("textbox").value).toBe("");
      expect(screen.getByLabelText("Password").value).toBe("");
      expect(screen.getByLabelText(/confirm password/i).value).toBe("");
    });
  })
);

describe(
  ("tests typing into form components",
  () => {
    test("should be able to type into email input", () => {
      const { emailInputElement } = typeIntoForm({
        email: "testemail@email.com",
      });
      expect(emailInputElement.value).toBe("testemail@email.com");
    });

    test("should be able to type into password input", () => {
      const { passwordInputElement } = typeIntoForm({ password: "abc123" });
      expect(passwordInputElement.value).toBe("abc123");
    });

    test("should be able to type into confirmPassword input", () => {
      const { confirmPasswordInputElement } = typeIntoForm({
        confirmPassword: "abc123",
      });
      expect(confirmPasswordInputElement.value).toBe("abc123");
    });
  })
);

describe("error handling tests", () => {
  test("should show email error message on invalid email", () => {
    expect(
      screen.queryByText(/The email address is invalid/i)
    ).not.toBeInTheDocument();

    typeIntoForm({ email: "testemailemail.com" });
    clickSubmitBtn();

    expect(
      screen.queryByText(/The email address is invalid/i)
    ).toBeInTheDocument();
  });

  test("should show invalid password error message", () => {
    expect(
      screen.queryByText(/Password should contain 5 or more characters./i)
    ).not.toBeInTheDocument();

    typeIntoForm({ email: "test@email.com", password: "abc" });
    clickSubmitBtn();

    expect(
      screen.queryByText(/Password should contain 5 or more characters/i)
    ).toBeInTheDocument();
  });

  test("should show password do not match error message", () => {
    expect(
      screen.queryByText(/The passwords do not match./i)
    ).not.toBeInTheDocument();

    typeIntoForm({
      email: "test@email.com",
      password: "abc123",
      confirmPassword: "abc456",
    });
    clickSubmitBtn();

    expect(
      screen.queryByText(/The passwords do not match./i)
    ).toBeInTheDocument();
  });

  test("all valid inputs", () => {
    typeIntoForm({
      email: "test@email.com",
      password: "abc123",
      confirmPassword: "abc123",
    });
    clickSubmitBtn();

    expect(
      screen.queryByText(/The email address is invalid/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Password should contain 5 or more characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/The passwords do not match./i)
    ).not.toBeInTheDocument();
  });
});
