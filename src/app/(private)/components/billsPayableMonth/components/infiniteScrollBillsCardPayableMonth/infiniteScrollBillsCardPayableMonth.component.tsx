"use client";

import { ListBillsPayableMonthViewProps } from "../../billsPayableMonth.types";
import { memo } from "react";
import { InfiniteScrollBillsPayableMonthView } from "./infiniteScrollBillsCardPayableMonth.view";
import { useInfiniteScrollBillsPayableMonth } from "./hook/useInfiniteScrollBillsPayableMonth.hook";
import { useBillsPayableMonthFetching } from "../../context/billsPayableMonthFetching.provider";
import { useControllModalBillsPayableMonth } from "./hook/useControllModalBillsPayableMonth.hook";
import { updateBillPayable } from "../../billsPayableMont.service";
type InfiniteScrollBillsCardPayabaleMonthProps = ListBillsPayableMonthViewProps;

const InfiniteScrollBillsCardPayableMonthComponent = ({
  hasNextPage,
  error,
  fetchNextPage,
}: InfiniteScrollBillsCardPayabaleMonthProps) => {
  const { isLoading, totalElementsShowListBills, showListBillsPayableMonth } =
    useBillsPayableMonthFetching();

  const { handleSetBillToModalBillPayableMonth } =
    useControllModalBillsPayableMonth(
      showListBillsPayableMonth,
      updateBillPayable
    );

  const {
    parentRef,
    observerRef,
    rowVirtualizer,
    gapRow,
    virtualItems,
  } = useInfiniteScrollBillsPayableMonth({
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    totalElementsShowListBills,
  });

  return (
    <InfiniteScrollBillsPayableMonthView
      parentRef={parentRef}
      observerRef={observerRef}
      rowVirtualizer={rowVirtualizer}
      gapRow={gapRow}
      listBills={showListBillsPayableMonth}
      hasMore={hasNextPage}
      isLoading={isLoading}
      virtualItems={virtualItems}
      handleClick={handleSetBillToModalBillPayableMonth}
    />
  );
};

export const InfiniteScrollBillsCardPayableMonth = memo(
  InfiniteScrollBillsCardPayableMonthComponent
);
