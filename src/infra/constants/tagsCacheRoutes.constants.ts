export const TAGS_CACHE_ROUTES = {
  PERSON_USER: {
    person_user_by_id: "person_user_by_id",
    get_full_name_and_image: "get_full_name_and_image",
  },
  PAYMENT_METHOD: {
    list_all: "payment_method_list_all",
    list_by_id: "payment_method_list_by_id",
  },
  CATEGORY: {
    list_all: "category/list_all",
    list_by_id: "category_list_by_id",
  },
  PAYMENT_STATUS: {
    list_all: "payment_status_list_all",
    list_by_id: "payment_status_list_by_id",
  },
  RECEIVABLE: {
    receivables: "receivables",
    list_all: "receivable_list_all",
    list_by_id: "receivable_list_by_id",
  },
  BILL: {
    bills: "bills",
    list_all: "bill_list_all",
    list_by_id: "bill_list_by_id",
    by_month_status: "bill_by_month_status",
  },
  CASH_FLOW: {
    get_summary_year: "get_summary_year",
  },
} as const;
