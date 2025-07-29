import { useInfiniteQuery } from "@tanstack/react-query";
import {
  FetchNextPageDTO,
  UseIninityQueryBillsPayableMonthInput,
} from "../../billsPayableMonth.types";
import { getNextPageParam } from "./utils/getNextPageParam.utils";
import { HttpError } from "@/domain/http/http.erro.entitie";
import { useMemo, useRef } from "react";
import { flatMapResponseListDTO } from "@/app/utils/flatMapResponseListDTO.utils";
import { ConvertTimestampInDateHelper } from "@/infra/helpers/convertTimestampInDate.infra";
import { adapterBillsToPresentation } from "./utils/adapterBillsToPresentation.utils";

type UseInfiniteQueryBillsPayableMonthProps =
  UseIninityQueryBillsPayableMonthInput;

export const useInfiniteQueryBillsPayableMonth = ({
  initialDate,
  finalDate,
  getBillsPayableMonth,
}: UseInfiniteQueryBillsPayableMonthProps) => {
  const convertTimeStampInDate = useRef(new ConvertTimestampInDateHelper());
  const { data, fetchNextPage, error, isFetching, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["bills_payable_month", { initialDate, finalDate }],
      initialPageParam: { initialDate, finalDate, page: 0, size: 8 },
      queryFn: async ({ pageParam }) => await getBillsPayableMonth(pageParam),
      getNextPageParam: (lastPage, allPages) =>
        getNextPageParam(lastPage, allPages, initialDate, finalDate),
      staleTime: 30_000,
      refetchOnWindowFocus: true,
    });

  const dataBillsPayableMonth = useMemo(() => {
    const flatMapResponse = flatMapResponseListDTO(data);

    const flatMapContent = adapterBillsToPresentation(
      flatMapResponse.content,
      convertTimeStampInDate.current
    );

    return {
      ...flatMapResponse,
      content: flatMapContent,
      totalElements: flatMapContent.length,
    };
  }, [data]);

  return {
    isLoading: isFetching,
    hasNextPage,
    fetchNextPage: fetchNextPage as unknown as FetchNextPageDTO,
    error: error as HttpError | null,
    totalElementsShowListBills: dataBillsPayableMonth.totalElements,
    showListBillsPayableMonth: dataBillsPayableMonth.content,
  };
};
