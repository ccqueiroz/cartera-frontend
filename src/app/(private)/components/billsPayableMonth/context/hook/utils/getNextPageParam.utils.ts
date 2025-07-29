import { BillsPayableMonthInfiniteQueryData } from "../../../billsPayableMonth.types";

export const getNextPageParam = (
  lastPage: BillsPayableMonthInfiniteQueryData,
  allPages: Array<BillsPayableMonthInfiniteQueryData>,
  initialDate: number,
  finalDate: number
) => {
  if (!lastPage.success) return undefined;

  const nextPage = lastPage.data.page + 1;

  if (nextPage >= lastPage.data.totalPages) return undefined;

  const firstPage = allPages[0];

  if (!firstPage.success) return undefined;

  return {
    initialDate,
    finalDate,
    page: nextPage,
    size: lastPage.data.size,
  };
};
