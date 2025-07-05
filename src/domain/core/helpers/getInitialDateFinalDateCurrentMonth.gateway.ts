import { Months } from "../constants/months.constants";

export interface GetInitialDateFinalDateCurrentMonthGateway {
  execute(
    month: keyof typeof Months,
    year: number
  ): { initialDate: number; finalDate: number };
}
