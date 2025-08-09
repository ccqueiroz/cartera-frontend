import { adapterCategoryToSlugDescription } from "@/app/utils/adapterCategoryToSlugDescription.utils";
import { adapterNumberToNumberFormated } from "@/app/utils/adapterNumberToNumberFormated.utils";
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
      amountFormated: adapterNumberToNumberFormated(bill.amount),
      billDateFormated: convertHelper.execute(bill.billDate, "DD/MM/AAAA"),
    });
  }

  return result;
};
