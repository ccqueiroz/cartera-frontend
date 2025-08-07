"use client";

import { useCallback, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { UseIninityQueryBillsPayableMonthOutput } from "../../../billsPayableMonth.types";
import { useDebounce } from "@/app/hooks/useDebouce.hook";
import { useDynamicOverscan } from "@/app/hooks/useDynamicOverscan.hook";
import { createObserverCallback } from "@/app/utils/useObserverCallback.utils";

const ITEM_HEIGHT = 74;
const GAP = 8;
const ESTIMATED_SIZE = ITEM_HEIGHT + GAP;
const SPINNER_HEIGHT = 40;

export const useInfiniteScrollBillsPayableMonth = ({
  fetchNextPage,
  hasNextPage,
  isLoading,
  totalElementsShowListBills,
}: UseIninityQueryBillsPayableMonthOutput) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const overscan = useDynamicOverscan(parentRef, ESTIMATED_SIZE);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage
      ? totalElementsShowListBills + 1
      : totalElementsShowListBills,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) =>
      hasNextPage && index === totalElementsShowListBills
        ? SPINNER_HEIGHT
        : ESTIMATED_SIZE,
    overscan,
    debug: true,
  });

  const { debounce, cancel } = useDebounce();

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      createObserverCallback(
        fetchNextPage,
        hasNextPage,
        isLoading,
        parentRef,
        debounce
      )(entries);
    },
    [fetchNextPage, hasNextPage, isLoading, parentRef, debounce]
  );

  useEffect(() => {
    const observerTarget = observerRef.current;
    const scrollRef = parentRef.current;
    if (!observerTarget || !scrollRef) return;

    const observer = new IntersectionObserver(observerCallback, {
      root: scrollRef,
      threshold: 0,
    });

    observer.observe(observerTarget);

    return () => {
      observer.unobserve(observerTarget);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowVirtualizer.getVirtualItems().length, observerCallback]);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    parentRef,
    observerRef,
    rowVirtualizer,
    gapRow: GAP,
    virtualItems: rowVirtualizer.getVirtualItems(),
  };
};
