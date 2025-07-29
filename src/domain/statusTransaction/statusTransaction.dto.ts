export const StatusTransaction = {
  PENDING: "PENDING",
  DUE_SOON: "DUE_SOON",
  DUE_DAY: "DUE_DAY",
  OVERDUE: "OVERDUE",
  PAID: "PAID",
} as const;

export const StatusTransactionLabel = {
  PENDING: "Pendente",
  DUE_SOON: "Próximo ao vencimento",
  DUE_DAY: "Dia do vencimento",
  OVERDUE: "Atrasado",
  PAID: "Pago",
} as const;

export const StatusByTransactionType = {
  BILL: "BILL",
  RECEIVABLE: "RECEIVABLE",
} as const;

export const StatusByTransactionTypeLabel = {
  BILL: "Pagamento",
  RECEIVABLE: "Recebimento",
} as const;
