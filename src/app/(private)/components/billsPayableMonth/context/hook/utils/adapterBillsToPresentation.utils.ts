import { adapterCategoryToSlugDescription } from "@/app/utils/adapterCategoryToSlugDescription.utils";
import { adapterNumberToNumberCurrencyFormated } from "@/app/utils/adapterNumberToNumberCurrencyFormated.utils";
import {
  BillsPayableMonthListDTOAdpatedToPresentation,
  BillsPayableMonthOutPutDTO,
} from "@/domain/bill/bill.dto";
import { ConvertTimestampInDateHelper } from "@/infra/helpers/convertTimestampInDate.infra";

export const adapterBillsToPresentation = (
  bills: Array<BillsPayableMonthOutPutDTO>,
  convertHelper: ConvertTimestampInDateHelper
): Array<BillsPayableMonthListDTOAdpatedToPresentation> => {
  const result = [];

  for (const bill of bills) {
    result.push({
      ...bill,
      categoryDescription: adapterCategoryToSlugDescription(
        bill.categoryDescription
      ),
      amountFormated: adapterNumberToNumberCurrencyFormated(bill.amount),
      billDateFormated: convertHelper.execute(bill.billDate, "DD/MM/AAAA"),
    });
  }

  return result;
};
