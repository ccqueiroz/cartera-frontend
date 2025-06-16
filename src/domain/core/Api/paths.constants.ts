export const API_PATHS = {
  AUTH: {
    login: "auth/login",
    signout: "auth/signout",
    recovery_password: "auth/recovery-password",
    register_account: "auth/register-account",
  },
  PERSON_USER: {
    edit: "person-user/edit/",
  },
  PAYMENT_METHOD: {
    list_all: "payment-method/list-all",
    list_by_id: "payment-method/list-by-id/",
  },
  CATEGORY: {
    list_all: "category/list-all",
    list_by_id: "category/list-by-id/",
  },
  PAYMENT_STATUS: {
    list_all: "payment-status/list-all",
    list_by_id: "payment-status/list-by-id/",
  },
  RECEIVABLE: {
    list_all: "receivable/list-all",
    list_by_id: "receivable/list-by-id/",
    create: "receivable/create",
    edit: "receivable/edit/",
    delete: "receivable/delete/",
  },
  BILL: {
    list_all: "bill/list-all",
    list_by_id: "bill/list-by-id/",
    create: "bill/create",
    edit: "bill/edit/",
    delete: "bill/delete/",
    BY_MONTH_STATUS: "bill/by-month-status",
  },
  CASH_FLOW: {
    summary_year: "cash-flow/summary/",
  },
} as const;
