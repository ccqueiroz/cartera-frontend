import { renderHook, act } from "@testing-library/react";
import { useMonthCalendar } from "./useMonthCalendar.hook";

const makeMonth = (number: number) => ({
  number,
  name: `Month-${number}`,
});

describe("useMonthCalendar", () => {
  it("should set initial year from selectedMonth", () => {
    const selectedDate = new Date(2022, 5);
    const { result } = renderHook(() =>
      useMonthCalendar({ selectedMonth: selectedDate })
    );

    expect(result.current.menuYear).toBe(2022);
    expect(result.current.selectedMonthNumber).toBe(5);
  });

  it("should set initial year to current year if selectedMonth not provided", () => {
    const currentYear = new Date().getFullYear();
    const { result } = renderHook(() => useMonthCalendar({}));
    expect(result.current.menuYear).toBe(currentYear);
    expect(result.current.selectedMonthNumber).toBeUndefined();
  });

  it("should update menuYear when setMenuYear is called", () => {
    const { result } = renderHook(() => useMonthCalendar({}));
    act(() => {
      result.current.setMenuYear(2030);
    });
    expect(result.current.menuYear).toBe(2030);
  });

  it("should disable month if above maxDate", () => {
    const maxDate = new Date(2023, 5); // Jun 2023
    const { result } = renderHook(() =>
      useMonthCalendar({
        selectedMonth: new Date(2023, 0),
        maxDate,
      })
    );
    act(() => {
      result.current.setMenuYear(2024); // above max year
    });
    expect(result.current.isDisabled(makeMonth(0))).toBe(true);

    act(() => {
      result.current.setMenuYear(2023); // same year, month > max
    });
    expect(result.current.isDisabled(makeMonth(6))).toBe(true);
  });

  it("should disable month if below minDate", () => {
    const minDate = new Date(2023, 5); // Jun 2023
    const { result } = renderHook(() =>
      useMonthCalendar({
        selectedMonth: new Date(2023, 6),
        minDate,
      })
    );
    act(() => {
      result.current.setMenuYear(2022); // below min year
    });
    expect(result.current.isDisabled(makeMonth(11))).toBe(true);

    act(() => {
      result.current.setMenuYear(2023); // same year, month < min
    });
    expect(result.current.isDisabled(makeMonth(4))).toBe(true);
  });

  it("should disable month if in disabledDates", () => {
    const disabledDates = [new Date(2025, 3)]; // Apr 2025
    const { result } = renderHook(() =>
      useMonthCalendar({
        selectedMonth: new Date(2025, 0),
        disabledDates,
      })
    );
    act(() => {
      result.current.setMenuYear(2025);
    });
    expect(result.current.isDisabled(makeMonth(3))).toBe(true);
  });

  it("should not disable allowed month", () => {
    const { result } = renderHook(() =>
      useMonthCalendar({
        selectedMonth: new Date(2025, 0),
      })
    );
    expect(result.current.isDisabled(makeMonth(5))).toBe(false);
  });
  
  it("should call onMonthSelect with correct date", () => {
    const onMonthSelect = jest.fn();
    const { result } = renderHook(() =>
      useMonthCalendar({
        selectedMonth: new Date(2025, 0),
        onMonthSelect,
      })
    );
    act(() => {
      result.current.handleMonthSelect(makeMonth(7)); // August
    });
    expect(onMonthSelect).toHaveBeenCalledWith(new Date(2025, 7));
  });

  it("should not fail if onMonthSelect is undefined", () => {
    const { result } = renderHook(() =>
      useMonthCalendar({
        selectedMonth: new Date(2025, 0),
      })
    );
    act(() => {
      result.current.handleMonthSelect(makeMonth(5));
    });
  });
});
