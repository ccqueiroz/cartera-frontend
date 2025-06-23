import { GetInitialDateFinalDateCurrentMonthHelper } from "@/infra/helpers/get-initial-date-final-date-current-month.infra";

export const getInitialDateFinalDateCurrentMonthFactory =
  new GetInitialDateFinalDateCurrentMonthHelper().execute;
