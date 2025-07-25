import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { useLogin } from "./useLogin.hook";
import { LoginSchemaType } from "@/infra/schemas/auth/login.schema";
import { toast } from "sonner";
import userEvent from "@testing-library/user-event";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("useLogin", () => {
  const signInMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useLogin({ keepSessionCookieValue: true, signIn: signInMock })
    );

    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBeFalsy();
  });

  it("should submit form and call signIn successfully", async () => {
    const formData: LoginSchemaType = {
      email: "test@email.com",
      password: "123456",
      keepSession: true,
    };

    signInMock.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() =>
      useLogin({ keepSessionCookieValue: true, signIn: signInMock })
    );

    act(() => {
      result.current.register("email");
      result.current.register("password");
      result.current.register("keepSession");
    });

    act(() => {
      result.current.control._formValues.email = formData.email;
      result.current.control._formValues.password = formData.password;
      result.current.control._formValues.keepSession = formData.keepSession;
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(signInMock).toHaveBeenCalledWith(formData);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should show toast on failed signIn", async () => {
    const formData: LoginSchemaType = {
      email: "fail@email.com",
      password: "wrongpass",
      keepSession: true,
    };

    signInMock.mockResolvedValueOnce({
      success: false,
      error: "Invalid credentials",
    });

    const { result } = renderHook(() =>
      useLogin({ keepSessionCookieValue: true, signIn: signInMock })
    );

    act(() => {
      result.current.control._formValues.email = formData.email;
      result.current.control._formValues.password = formData.password;
      result.current.control._formValues.keepSession = formData.keepSession;
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(signInMock).toHaveBeenCalledWith(formData);
    expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
  });

  it("should not call signIn on validation error", async () => {
    const FormComponent = () => {
      const { register, handleSubmit } = useLogin({
        keepSessionCookieValue: false,
        signIn: signInMock,
      });

      return (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="email" {...register("email")} />
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
          <input type="checkbox" {...register("keepSession")} />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<FormComponent />);

    userEvent.type(screen.getByPlaceholderText("email"), "invalid");

    userEvent.type(screen.getByPlaceholderText("password"), "");

    userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(signInMock).not.toHaveBeenCalled();
    });
  });
});
