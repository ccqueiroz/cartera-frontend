"use client";

import { BillsPayableMonthListDTOAdpatedToPresentation } from "@/domain/bill/bill.dto";
import { createContext, useContext } from "react";
import {
  FetchNextPageDTO,
  UseIninityQueryBillsPayableMonthInput,
} from "../billsPayableMonth.types";
import { useInfiniteQueryBillsPayableMonth } from "./hook/useInfiniteQueryBillsPayableMonth.hook";
import { HttpError } from "@/domain/http/http.erro.entitie";

interface BillsPayableMonthFetchingContextProps {
  isLoading: boolean;
  showListBillsPayableMonth: Array<BillsPayableMonthListDTOAdpatedToPresentation>;
  totalElementsShowListBills: number;
  hasNextPage: boolean;
  error: HttpError | null;
  fetchNextPage: FetchNextPageDTO;
}

const BillsPayableMonthFetchingContext =
  createContext<BillsPayableMonthFetchingContextProps | null>(null);

type BillsPayableMonthFetchingProviderProps =
  UseIninityQueryBillsPayableMonthInput & { children: React.ReactNode };

const BillsPayableMonthFetchingProvider = ({
  children,
  initialDate,
  finalDate,
  getBillsPayableMonth,
}: BillsPayableMonthFetchingProviderProps) => {
  const {
    showListBillsPayableMonth,
    isLoading,
    totalElementsShowListBills,
    hasNextPage,
    error,
    fetchNextPage,
  } = useInfiniteQueryBillsPayableMonth({
    initialDate,
    finalDate,
    getBillsPayableMonth,
  });

  return (
    <BillsPayableMonthFetchingContext.Provider
      value={{
        showListBillsPayableMonth,
        isLoading,
        totalElementsShowListBills,
        hasNextPage,
        error,
        fetchNextPage,
      }}
    >
      {children}
    </BillsPayableMonthFetchingContext.Provider>
  );
};

const useBillsPayableMonthFetching = () => {
  const context = useContext(BillsPayableMonthFetchingContext);
  if (!context) {
    throw new Error(
      "useBillsPayableMonthFetching must be used within a BillsPayableMonthFetchingProvider"
    );
  }
  return context;
};

export { BillsPayableMonthFetchingProvider, useBillsPayableMonthFetching };
