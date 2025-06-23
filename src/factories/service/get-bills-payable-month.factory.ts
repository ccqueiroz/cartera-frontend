import { httpInfraFactory } from "../infra/http.infra.factory";
import { GetBillsPayableMonthService } from "@/service/Bill/get-bills-payable-month.service";

export const getBillsPayableMonthServiceFactory = () =>
  new GetBillsPayableMonthService(httpInfraFactory().get);
