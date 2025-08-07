import {
  BillsPayableMonthListDTO,
  // BillsPayableMonthListDTOAdpatedToPresentation,
  InputGetBillsPayableMonth,
} from "@/domain/bill/bill.dto";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { HttpError } from "@/domain/http/http.erro.entitie";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { Virtualizer } from "@tanstack/react-virtual";
import { RefObject } from "react";

// infiniteQuery
export type BillsPayableMonthInfiniteQueryData =
  HandleResponseDTO<BillsPayableMonthListDTO>;

export type FetchNextPageDTO = (
  options?: FetchNextPageOptions
) => Promise<
  InfiniteQueryObserverResult<BillsPayableMonthInfiniteQueryData, HttpError>
>;

export type UseIninityQueryBillsPayableMonthInput = {
  initialDate: number;
  finalDate: number;
  getBillsPayableMonth: (
    queries: InputGetBillsPayableMonth,
    signal?: AbortSignal | undefined
  ) => Promise<HandleResponseDTO<BillsPayableMonthListDTO>>;
};

// InfiniteScroll
export type UseIninityQueryBillsPayableMonthOutput = {
  error: HttpError | null;
  fetchNextPage: FetchNextPageDTO;
  hasNextPage: boolean;
  isLoading: boolean;
  totalElementsShowListBills: number;
};

export type UseInfiniteScrollBillsPayableMonthOutput = {
  parentRef: RefObject<HTMLDivElement | null>;
  observerRef: RefObject<HTMLDivElement | null>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  gapRow: number;
};

// list components
export type ListBillsPayableMonthViewProps = Pick<
  UseIninityQueryBillsPayableMonthOutput,
  "hasNextPage" | "error" | "fetchNextPage"
>;
