export const BASE_API_PATHS = {
  AUTH: {
    login: "auth/login",
    signout: "auth/signout",
    recovery_password: "auth/recovery-password",
    register_account: "auth/register-account",
    revalidate_session: 'auth/refresh-token'
  },
  PERSON_USER: {
    edit: "person-user/edit/:id",
    list_by_user_id: "/api/person-user/list-by-user-id/:id",
  },
  PAYMENT_METHOD: {
    list_all: "payment-method/list-all",
    list_by_id: "payment-method/list-by-id/:id",
  },
  CATEGORY: {
    list_all: "category/list-all",
    list_by_id: "category/list-by-id/:id",
  },
  PAYMENT_STATUS: {
    list_all: "payment-status/list-all",
    list_by_id: "payment-status/list-by-id/:id",
  },
  RECEIVABLE: {
    list_all: "receivable/list-all",
    list_by_id: "receivable/list-by-id/:id",
    create: "receivable/create",
    edit: "receivable/edit/:id",
    delete: "receivable/delete/:id",
  },
  BILL: {
    list_all: "bill/list-all",
    list_by_id: "bill/list-by-id/:id",
    create: "bill/create",
    edit: "bill/edit/:id",
    delete: "bill/delete/:id",
    by_month_status: "bill/by-month-status",
  },
  CASH_FLOW: {
    summary_year: "cash-flow/summary/:year",
  },
} as const;
