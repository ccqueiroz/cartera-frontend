import { DashboardAnalysisPeriodStore } from "./dashBoardAnalysisPeriod.store";

describe("DashboardAnalysisPeriodStore", () => {
  let store: DashboardAnalysisPeriodStore;
  const fixedCurrentDate = new Date(2025, 7, 15);
  const RealDate = Date;

  beforeEach(() => {
    global.Date = jest.fn((...args: ConstructorParameters<typeof Date>) => {
      if (args.length) {
        return new RealDate(...args);
      }
      return fixedCurrentDate;
    }) as unknown as DateConstructor;

    global.Date.now = RealDate.now;
    global.Date.parse = RealDate.parse;
    global.Date.UTC = RealDate.UTC;

    store = new DashboardAnalysisPeriodStore();
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it("should be initialize with correct default values", () => {
    expect(store.currentMonth).toBe("do Mês");
    expect(store.isCurrentMonth).toBe(true);
    expect(store.date).toEqual(fixedCurrentDate);
    expect(store.minDate).toEqual(new Date(2025, 0, 1));
    expect(store.maxDate).toEqual(new Date(2025, 11, 31));
  });

  it("should be define correctly with 'mês atual'.", () => {
    const sameMonthDate = new Date(2025, 7, 1);
    store.setDate(sameMonthDate);

    expect(store.isCurrentMonth).toBe(true);
    expect(store.currentMonth).toBe("do Mês");
    expect(store.date).toEqual(sameMonthDate);
  });

  it("should be define correctly with 'de mês/ano' being a previous month", () => {
    const previousMonthDate = new Date(2025, 6, 1);
    store.setDate(previousMonthDate);

    expect(store.isCurrentMonth).toBe(false);
    expect(store.currentMonth).toBe("de Julho/2025");
    expect(store.date).toEqual(previousMonthDate);
  });

  it("should be define correctly with 'de mês/ano' being a previous year", () => {
    const previousYearDate = new Date(2024, 11, 1);
    store.setDate(previousYearDate);

    expect(store.isCurrentMonth).toBe(false);
    expect(store.currentMonth).toBe("de Dezembro/2024");
    expect(store.date).toEqual(previousYearDate);
  });

  it("setDate should update the date and format the period correctly", () => {
    const newDate = new Date(2025, 9, 10);
    store.setDate(newDate);

    expect(store.date).toEqual(newDate);
    expect(store.isCurrentMonth).toBe(false);
    expect(store.currentMonth).toBe("de Outubro/2025");
  });
});
