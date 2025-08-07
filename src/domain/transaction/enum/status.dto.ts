export const StatusTransaction = {
  PAID: "PAID",
  RECEIVED: "RECEIVED",
  TO_PAY: "TO_PAY",
  TO_RECEIVE: "TO_RECEIVE",
  DUE_SOON: "DUE_SOON",
  DUE_DAY: "DUE_DAY",
  OVERDUE: "OVERDUE",
} as const;

export const StatusTransactionLabel = {
  DUE_SOON: "Próximo ao Vencimento",
  DUE_DAY: "Dia do Vencimento",
  OVERDUE: "Atrasado",
  RECEIVED: 'Recebido',
  PAID: "Pago",
  TO_PAY: "Pendente",
  TO_RECEIVE: "Pendente",
} as const;

export const StatusByTransactionType = {
  BILL: "BILL",
  RECEIVABLE: "RECEIVABLE",
} as const;

export const StatusByTransactionTypeLabel = {
  BILL: "Pagamento",
  RECEIVABLE: "Recebimento",
} as const;
