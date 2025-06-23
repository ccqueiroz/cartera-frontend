import { Months } from "../Constants/months.constants";

export interface GetInitialDateFinalDateCurrentMonthGateway {
  execute(
    month: keyof typeof Months,
    year: number
  ): { initialDate: number; finalDate: number };
}
