import {
  BillsPayableMonthListDTO,
  BillsPayableMonthOutPutDTO,
} from "@/domain/Bill/bill.dto";
import { MergeArrayByIdFactory } from "@/factories/infra/merge-arrays-by-id.factory";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { ListBillsCardPayableMonthProps } from "../list-bills-card-payable-month.component";
import { useVirtualizer } from "@tanstack/react-virtual";

const VISIBLE_WINDOW = 6;
const ITEM_HEIGHT = 74;
const GAP = 8;
const ESTIMATED_SIZE = ITEM_HEIGHT + GAP;

type StateReducer = {
  content: Array<BillsPayableMonthOutPutDTO>;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasMore: boolean;
  isLoadingList: boolean;
};

type ActionsDispatch =
  | { type: "SET_BILLS"; payload: BillsPayableMonthListDTO }
  | { type: "LOADING_LIST"; payload: boolean }
  | { type: "RESET"; payload: StateReducer };

const dispatchListBills = (state: StateReducer, action: ActionsDispatch) => {
  switch (action.type) {
    case "SET_BILLS":
      return {
        ...state,
        hasMore:
          state.content.length + action.payload.content.length <
          action.payload.totalElements,
        content: MergeArrayByIdFactory().execute(
          state.content,
          action.payload.content
        ),
        page: action.payload.page,
        size: action.payload.size,
        totalElements: action.payload.totalElements,
      };
    case "LOADING_LIST":
      return { ...state, isLoadingList: action.payload };
    case "RESET":
      return { ...state, payload: action.payload };
    default:
      return state;
  }
};

export const useInfinityScrollListBillsPayableMonth = ({
  initialDataBillsCardPayableMonth,
  initialDate,
  finalDate,
  getBillsPayableMonth,
}: Omit<ListBillsCardPayableMonthProps, "updateBillPayable">) => {
  const [state, dispatch] = useReducer<
    (state: StateReducer, action: ActionsDispatch) => StateReducer
  >(dispatchListBills, {
    content: initialDataBillsCardPayableMonth.content,
    page: initialDataBillsCardPayableMonth.page,
    size: initialDataBillsCardPayableMonth.size,
    totalElements: initialDataBillsCardPayableMonth.totalElements,
    totalPages: initialDataBillsCardPayableMonth.totalPages,
    hasMore:
      initialDataBillsCardPayableMonth.content.length <
      initialDataBillsCardPayableMonth.totalElements,
    isLoadingList: false,
  });

  const isMountedComponent = useRef(false);

  const fetchGetBillsPayableMonth = useCallback(async () => {
    if (state.isLoadingList || !isMountedComponent.current) return;

    dispatch({
      type: "LOADING_LIST",
      payload: true,
    });

    const nextPage = state.page + 1;
    await getBillsPayableMonth({
      initialDate,
      finalDate,
      page: nextPage,
      size: 8,
    })
      .then((data) => {
        if (!data?.success || !isMountedComponent.current) return;

        const { content, page, size, totalElements, totalPages } = data.data;

        dispatch({
          type: "SET_BILLS",
          payload: {
            content: content,
            page: page,
            size: size,
            totalElements: totalElements,
            totalPages: totalPages,
            ordering: null,
          },
        });
      })
      .finally(() => {
        dispatch({
          type: "LOADING_LIST",
          payload: false,
        });
      });
  }, [getBillsPayableMonth, initialDate, finalDate, state.isLoadingList]);

  const parentRef = useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: state.hasMore ? state.content.length + 1 : state.content.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_SIZE,
    overscan: VISIBLE_WINDOW,
    debug: process.env.NODE_ENV === "development",
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const [lastitem] = [...virtualItems].reverse();

    if (!lastitem) return;

    if (
      lastitem.index >= state.content.length - 1 &&
      state.hasMore &&
      !state.isLoadingList
    ) {
      fetchGetBillsPayableMonth();
    }
  }, [
    state.content,
    state.hasMore,
    state.page,
    state.totalPages,
    state.isLoadingList,
    fetchGetBillsPayableMonth,
    virtualItems,
  ]);

  useEffect(() => {
    isMountedComponent.current = true;

    return () => {
      dispatch({
        type: "RESET",
        payload: {
          content: initialDataBillsCardPayableMonth.content,
          page: initialDataBillsCardPayableMonth.page,
          size: initialDataBillsCardPayableMonth.size,
          totalElements: initialDataBillsCardPayableMonth.totalElements,
          totalPages: initialDataBillsCardPayableMonth.totalPages,
          hasMore:
            initialDataBillsCardPayableMonth.content.length <
            initialDataBillsCardPayableMonth.totalElements,
          isLoadingList: false,
        },
      });
      isMountedComponent.current = false;
    };
  }, []);

  return {
    VISIBLE_WINDOW,
    GAP,
    rowVirtualizer,
    parentRef,
    ...state,
  };
};
