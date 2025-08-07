import { Months } from "@/domain/core/constants/months.constants";
import { GetInitialDateFinalDateCurrentMonthGateway } from "@/domain/core/helpers/getInitialDateFinalDateCurrentMonth.gateway";

export class GetInitialDateFinalDateCurrentMonthHelper
  implements GetInitialDateFinalDateCurrentMonthGateway
{
  private MS_ONE_DAY = 60 * 60 * 24;
  private LIST_MONTHS: Array<keyof typeof Months> = Object.keys(
    Months
  ) as Array<keyof typeof Months>;

  constructor() {
    this.execute = this.execute.bind(this);
    this.getCurrentMonthAndCurrentYear =
      this.getCurrentMonthAndCurrentYear.bind(this);
  }

  private getCurrentMonthAndCurrentYear() {
    const date = new Date();
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }

  execute(
    month?: keyof typeof Months,
    year?: number
  ): { initialDate: number; finalDate: number } {
    const { month: currentMonth, year: currentYear } =
      this.getCurrentMonthAndCurrentYear();

    const monthEntry = month
      ? this.LIST_MONTHS.indexOf(month) + 1
      : currentMonth;
    const yearEntry = year && year > 2023 ? year : currentYear;

    const initialDate = new Date(`${monthEntry}-01-${yearEntry}`).getTime();
    const finalDate =
      new Date(
        `${monthEntry === 12 ? "01" : monthEntry + 1}-01-${
          monthEntry === 12 ? yearEntry + 1 : yearEntry
        }`
      ).getTime() - this.MS_ONE_DAY;

    return {
      initialDate,
      finalDate,
    };
  }
}
