import { renderHook, act } from "@testing-library/react";
import { useDatePicker } from "./useDatePicker.hook";
import { addDays } from "date-fns";
import { DatePickerProps } from "../datePicker.types";

describe("useDatePicker hook", () => {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const afterTomorrow = addDays(today, 2);

  it("should set single date selection", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useDatePicker({ mode: "single", onChange, placeholder: "Select a date" })
    );

    act(() => {
      result.current.handleSelect(today);
    });

    expect(onChange).toHaveBeenCalledWith(today);
    expect(result.current.selected).toEqual(today);
    expect(result.current.formatLabel).toBe(today.toLocaleDateString("pt-BR"));
    expect(result.current.open).toBe(false);
  });

  it("should set date range selection", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() =>
      useDatePicker({ mode: "range", onChange, placeholder: "Select range" })
    );

    const range = { from: today, to: tomorrow };

    act(() => {
      result.current.handleSelect(range);
    });

    expect(onChange).toHaveBeenCalledWith(range);
    expect(result.current.selected).toEqual(range);
    expect(result.current.formatLabel).toBe(
      `${today.toLocaleDateString("pt-BR")} → ${tomorrow.toLocaleDateString(
        "pt-BR"
      )}`
    );
    expect(result.current.open).toBe(false);
  });

  it("should reset range if user clicks again after full range selected", () => {
    const onChange = jest.fn();
    const initialRange = { from: today, to: tomorrow } as Pick<
      DatePickerProps,
      "value"
    >;
    const { result } = renderHook(() =>
      useDatePicker({
        mode: "range",
        onChange,
        value: initialRange as Date,
        placeholder: "Select range",
      })
    );

    act(() => {
      result.current.handleSelect({ from: afterTomorrow, to: undefined });
    });

    expect(onChange).toHaveBeenCalledWith({ from: undefined, to: undefined });
  });

  it("should respect min and max dates", () => {
    const minDate = today;
    const maxDate = afterTomorrow;

    const { result } = renderHook(() =>
      useDatePicker({
        mode: "single",
        onChange: jest.fn(),
        minDate,
        maxDate,
        placeholder: "Pick date",
      })
    );

    expect(
      result.current.setMinimumAndMaximumDate(addDays(afterTomorrow, 1))
    ).toBe(true);
    expect(result.current.setMinimumAndMaximumDate(today)).toBe(false);
  });

  it("should use placeholder when no date is selected", () => {
    const { result } = renderHook(() =>
      useDatePicker({
        mode: "single",
        onChange: jest.fn(),
        placeholder: "Pick date",
      })
    );

    expect(result.current.formatLabel).toBe("Pick date");
  });

  it("should format partial range correctly", () => {
    const { result } = renderHook(() =>
      useDatePicker({
        mode: "range",
        onChange: jest.fn(),
        placeholder: "Pick range",
        value: { from: today, to: undefined } as unknown as Date,
      })
    );

    expect(result.current.formatLabel).toBe(
      `Início: ${today.toLocaleDateString("pt-BR")}`
    );
  });
});
