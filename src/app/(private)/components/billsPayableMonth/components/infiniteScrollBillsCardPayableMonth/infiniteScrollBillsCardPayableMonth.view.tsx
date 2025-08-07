"use client";

import { UseInfiniteScrollBillsPayableMonthOutput } from "../../billsPayableMonth.types";
import { BillCardPayableMonth } from "../billCardPayableMonth/billCardPayableMonth.component";
import { BillsPayableMonthListDTOAdpatedToPresentation } from "@/domain/bill/bill.dto";
import { memo, MouseEventHandler } from "react";
import { CardNotFoundData } from "../../../cardFoundData/cardNotFoundData.component";
import { NeonSpinner } from "@/app/components/core/neonSpinner/neonSpinner.component";
import { cn } from "@/app/utils/cn.utils";
import { VirtualItem } from "@tanstack/react-virtual";
import { SkeletonBillingCard } from "../../../billingCard/skeletonBillingCard.component";

type InfiniteScrollBillsPayableMonthViewObserverProps =
  UseInfiniteScrollBillsPayableMonthOutput & {
    listBills: Array<BillsPayableMonthListDTOAdpatedToPresentation>;
    isLoading: boolean;
    virtualItems: VirtualItem[];
    hasMore: boolean;
    handleClick: MouseEventHandler<HTMLDivElement>;
  };

export const InfiniteScrollBillsPayableMonthView = memo(
  ({
    parentRef,
    observerRef,
    rowVirtualizer,
    gapRow,
    listBills,
    isLoading,
    hasMore,
    virtualItems,
    handleClick,
  }: InfiniteScrollBillsPayableMonthViewObserverProps) => {
    return (
      <div
        ref={parentRef}
        className="relative w-full h-[400px] overflow-y-auto scroll-smooth overscroll-contain"
      >
        <div
          className="w-[98%] mx-auto relative"
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {virtualItems.map((row) => {
            const bill = listBills[row.index];
            const callToSpinner = row.index >= listBills.length;

            const virtualItemProps = {
              role: "listitem",
              "aria-setsize": listBills.length,
              "aria-posinset": row.index + 1,
            };

            if (callToSpinner) {
              return (
                <div
                  key={row.key}
                  ref={observerRef}
                  style={{
                    height: `${row.size - gapRow}px`,
                    transform: `translateY(${row.start}px)`,
                    position: "absolute",
                    width: "100%",
                  }}
                  className="flex items-center justify-center"
                  {...virtualItemProps}
                >
                  <div className="w-7 h-7 flex items-center justify-center opacity-85">
                    <NeonSpinner />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={row.key}
                style={{
                  transform: `translateY(${row.start}px)`,
                  position: "absolute",
                  width: "100%",
                  height: `${row.size - gapRow}px`,
                }}
                className={cn(`top-0 left-0`)}
                {...virtualItemProps}
              >
                <BillCardPayableMonth
                  bill={bill}
                  index={row.index}
                  onClick={handleClick}
                />
              </div>
            );
          })}

          {!isLoading && !hasMore && virtualItems.length === 0 && (
            <CardNotFoundData
              text="Não há contas a serem pagas."
              variant="dark"
              className="min-h-[400px]"
            />
          )}

          {isLoading && !hasMore && virtualItems.length === 0 && (
            <SkeletonBillingCard amountCards={5} />
          )}
        </div>
      </div>
    );
  }
);

InfiniteScrollBillsPayableMonthView.displayName =
  "InfiniteScrollBillsPayableMonthView";
