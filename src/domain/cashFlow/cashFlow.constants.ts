export const NotificationCashFlowHealthKeys = {
  "hight-surplus": "hight-surplus",
  "modarate-surplus": "modarate-surplus",
  balance: "balance",
  "moderate-deficit": "moderate-deficit",
  "severe-deficit": "severe-deficit",
  "moderate-deficit-mobile": "moderate-deficit-mobile",
  "severe-deficit-mobile": "severe-deficit-mobile",
  fallback: "fallback",
} as const;

export const NotificationCashFlowHealth = {
  "hight-surplus": "Excelente! Saldo positivo de R$ {totalBalance}.",
  "modarate-surplus":
    "Bom trabalho! Saldo permanece positivo R$ {totalBalance}.",
  balance: "Saldo está equilibrado em R$ {totalBalance}.",
  "moderate-deficit":
    "⚠️ Atenção: suas despesas ultrapassaram as receitas em {percentBalance}%. Saldo atual de –R$ {totalBalance}.",
  "severe-deficit":
    "🚨 Cuidado! Suas despesas foram {percentBalance}% maiores que a receita. Déficit de R$ {totalBalance}.",
  "moderate-deficit-mobile":
    "⚠️ Atenção: Gastos superaram a receita em {percentBalance}%. Saldo atual de –R$ {totalBalance}.",
  "severe-deficit-mobile":
    "🚨 Cuidado! Gastos em alta. {percentBalance}% acima da receita. Déficit de R$ {totalBalance}.",
  fallback: "Não foi possível identificar a saúde do seu fluxo de caixa.",
} as const;
