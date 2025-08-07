import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach } from "node:test";
import { useRegister } from "./useRegister.hook";
import { RegisterSchemaType } from "@/infra/schemas/auth/register.schema";
import { toast } from "sonner";
import userEvent from "@testing-library/user-event";
import { ROUTES } from "@/infra/constants/routes.constants";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("useRegister", () => {
  const registerMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useRegister({ registerServer: registerMock })
    );

    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBeFalsy();
  });

  it("should submit form and call registerServer successfully", async () => {
    const formData: RegisterSchemaType = {
      email: "test@email.com",
      password: "123456",
      confirmPassword: "123456",
      firstName: "Jhon",
      lastName: "Doe",
    };

    registerMock.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() =>
      useRegister({ registerServer: registerMock })
    );

    act(() => {
      result.current.register("email");
      result.current.register("password");
      result.current.register("confirmPassword");
      result.current.register("firstName");
      result.current.register("lastName");
    });

    act(() => {
      result.current.control._formValues.email = formData.email;
      result.current.control._formValues.password = formData.password;
      result.current.control._formValues.confirmPassword =
        formData.confirmPassword;
      result.current.control._formValues.firstName = formData.firstName;
      result.current.control._formValues.lastName = formData.lastName;
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(registerMock).toHaveBeenCalledWith(formData);
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      DomainMessageList.SUCCESS_REGISTERED_ACCOUNT
    );
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith(ROUTES.PRIVATE.dashboard);
  });

  it("should show toast on failed registerServer", async () => {
    const formData: RegisterSchemaType = {
      email: "test@email.com",
      password: "123456",
      confirmPassword: "123456",
      firstName: "Jhon",
      lastName: "Doe",
    };

    registerMock.mockResolvedValueOnce({
      success: false,
      error: "Invalid credentials",
    });

    const { result } = renderHook(() =>
      useRegister({ registerServer: registerMock })
    );

    act(() => {
      result.current.control._formValues.email = formData.email;
      result.current.control._formValues.password = formData.password;
      result.current.control._formValues.confirmPassword =
        formData.confirmPassword;
      result.current.control._formValues.firstName = formData.firstName;
      result.current.control._formValues.lastName = formData.lastName;
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(registerMock).toHaveBeenCalledWith(formData);
    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("should not call signIn on validation error", async () => {
    const FormComponent = () => {
      const { register, handleSubmit } = useRegister({
        registerServer: registerMock,
      });

      return (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="email" {...register("email")} />
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <input
            type="password"
            placeholder="confirmPassword"
            {...register("confirmPassword")}
          />
          <input
            type="text"
            placeholder="firstName"
            {...register("firstName")}
          />
          <input type="text" placeholder="lastName" {...register("lastName")} />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<FormComponent />);

    userEvent.type(screen.getByPlaceholderText("email"), "invalid");
    userEvent.type(screen.getByPlaceholderText("password"), "123456");
    userEvent.type(screen.getByPlaceholderText("confirmPassword"), "654321");

    await userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(registerMock).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
