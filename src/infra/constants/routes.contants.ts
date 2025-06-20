export const ROUTES = {
  PUBLIC: {
    home: "/home",
    login: "/login",
    register_account: "/register",
    recover_password: "/recover-password",
  },
  PRIVATE: {
    dashboard: "/",
  },
} as const;
