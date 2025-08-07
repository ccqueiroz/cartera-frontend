import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { useRecoverPassword } from "./useRecoverPassword.hook";
import { RecoverPasswordSchemaType } from "@/infra/schemas/auth/recoverPassword.schema";
import { toast } from "sonner";
import userEvent from "@testing-library/user-event";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe("useRecoverPassword", () => {
  const recoverPasswordMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useRecoverPassword({ recoverPassword: recoverPasswordMock })
    );

    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBeFalsy();
  });

  it("should submit form and call recoverPassword successfully", async () => {
    const formData: RecoverPasswordSchemaType = {
      email: "test@email.com",
    };

    recoverPasswordMock.mockResolvedValueOnce({
      success: true,
      data: { email: "test@email.com" },
    });

    const { result } = renderHook(() =>
      useRecoverPassword({ recoverPassword: recoverPasswordMock })
    );

    act(() => {
      result.current.register("email");
    });

    act(() => {
      result.current.control._formValues.email = formData.email;
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(recoverPasswordMock).toHaveBeenCalledWith(formData);
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      DomainMessageList.EMAIL_HAS_BEEN_SEND_TO_RECOVER_PASSWORD.replace(
        "{complement}",
        "test@email.com"
      )
    );
  });

  it("should show toast on failed recoverPassword", async () => {
    const formData: RecoverPasswordSchemaType = {
      email: "test@email.com",
    };

    recoverPasswordMock.mockResolvedValueOnce({
      success: false,
      error: "Invalid E-mail",
    });

    const { result } = renderHook(() =>
      useRecoverPassword({ recoverPassword: recoverPasswordMock })
    );

    act(() => {
      result.current.control._formValues.email = formData.email;
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(recoverPasswordMock).toHaveBeenCalledWith(formData);
    expect(toast.error).toHaveBeenCalledWith("Invalid E-mail");
  });

  it("should not call signIn on validation error", async () => {
    const FormComponent = () => {
      const { register, handleSubmit } = useRecoverPassword({
        recoverPassword: recoverPasswordMock,
      });

      return (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="email" {...register("email")} />
          <button type="submit">Submit</button>
        </form>
      );
    };

    render(<FormComponent />);

    userEvent.type(screen.getByPlaceholderText("email"), "invalid");

    await userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(recoverPasswordMock).not.toHaveBeenCalled();
    });
  });
});
