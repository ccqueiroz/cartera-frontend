"use client";

import dynamic from "next/dynamic";
import { BillsPayabaleMonthSkeleton } from "./billsPayableMonth.skeleton";
import { useBillsPayableMonthFetching } from "./context/billsPayableMonthFetching.provider";

const BillsPayableMonthView = dynamic(
  () =>
    import("./billsPayableMonth.view").then((mod) => mod.BillsPayableMonthView),
  {
    loading: () => (
      <div className="w-full">
        <BillsPayabaleMonthSkeleton />
      </div>
    ),
    ssr: false,
  }
);

export const BillsPayableMonthContainer = () => {
  const { error, fetchNextPage, hasNextPage } = useBillsPayableMonthFetching();

  return (
    <BillsPayableMonthView
      hasNextPage={hasNextPage}
      error={error}
      fetchNextPage={fetchNextPage}
    />
  );
};
