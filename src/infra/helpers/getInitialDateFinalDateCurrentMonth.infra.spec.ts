import { GetInitialDateFinalDateCurrentMonthHelper } from "./getInitialDateFinalDateCurrentMonth.infra";

describe("GetInitialDateFinalDateCurrentMonthHelper", () => {
  const helper = new GetInitialDateFinalDateCurrentMonthHelper();

  const mockDate = (isoDate: string) => {
    jest.useFakeTimers().setSystemTime(new Date(isoDate));
  };

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return initial and final date for current month if no params passed", () => {
    mockDate("2024-06-15T00:00:00Z");

    const { initialDate, finalDate } = helper.execute();

    const expectedInitial = new Date("6-01-2024").getTime();
    const expectedFinal = new Date("7-01-2024").getTime() - 60 * 60 * 24;

    expect(initialDate).toBe(expectedInitial);
    expect(finalDate).toBe(expectedFinal);
  });

  it("should return initial and final date for passed month and year", () => {
    const { initialDate, finalDate } = helper.execute("FEV", 2025);

    const expectedInitial = new Date("2-01-2025").getTime();
    const expectedFinal = new Date("3-01-2025").getTime() - 60 * 60 * 24;

    expect(initialDate).toBe(expectedInitial);
    expect(finalDate).toBe(expectedFinal);
  });

  it("should fallback to current year if year is invalid", () => {
    mockDate("2024-10-10T00:00:00Z");

    const { initialDate, finalDate } = helper.execute("MAR", 2020);

    const expectedInitial = new Date("3-01-2024").getTime();
    const expectedFinal = new Date("4-01-2024").getTime() - 60 * 60 * 24;

    expect(initialDate).toBe(expectedInitial);
    expect(finalDate).toBe(expectedFinal);
  });

  it("should handle December correctly and roll over to next year", () => {
    const { initialDate, finalDate } = helper.execute("DEZ", 2024);

    const expectedInitial = new Date("12-01-2024").getTime();
    const expectedFinal = new Date("01-01-2025").getTime() - 60 * 60 * 24;

    expect(initialDate).toBe(expectedInitial);
    expect(finalDate).toBe(expectedFinal);
  });

  it("should handle when only month is provided", () => {
    mockDate("2025-05-10T00:00:00Z");

    const { initialDate, finalDate } = helper.execute("AGO");

    const expectedInitial = new Date("8-01-2025").getTime();
    const expectedFinal = new Date("9-01-2025").getTime() - 60 * 60 * 24;

    expect(initialDate).toBe(expectedInitial);
    expect(finalDate).toBe(expectedFinal);
  });

  it("should handle when only year is provided", () => {
    mockDate("2024-03-10T00:00:00Z");

    const { initialDate, finalDate } = helper.execute(undefined, 2025);

    const expectedInitial = new Date("3-01-2025").getTime();
    const expectedFinal = new Date("4-01-2025").getTime() - 60 * 60 * 24;

    expect(initialDate).toBe(expectedInitial);
    expect(finalDate).toBe(expectedFinal);
  });

  it("should return correct for both params undefined", () => {
    mockDate("2025-07-20T00:00:00Z");

    const { initialDate, finalDate } = helper.execute(undefined, undefined);

    const expectedInitial = new Date("7-01-2025").getTime();
    const expectedFinal = new Date("8-01-2025").getTime() - 60 * 60 * 24;

    expect(initialDate).toBe(expectedInitial);
    expect(finalDate).toBe(expectedFinal);
  });
});
