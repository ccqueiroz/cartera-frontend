"use client";

import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { dashboardAnalysisPeriodStore } from "@/app/store/dashBoardAnalysisPeriod/dashBoardAnalysisPeriod.store";
import { Calculator, TrendingUp, Wallet } from "lucide-react";
import { observer } from "mobx-react-lite";
import { MonthlySummaryAccordion } from "./components/monthlySummaryAccordion/monthlySummaryAccordion.component";
import { useMonthlySummary } from "./hook/useMonthlySummary.hook";
import { CardTypeMonthlySummary } from "./components/cardTypeMonthlySummary/cardTypeMonthlySummary.component";

const MonthlySummaryContainer = observer(() => {
  const storeDashboardAnalysisPeriod = dashboardAnalysisPeriodStore;

  const { dataMonthlySummary, isFetching } = useMonthlySummary({
    date: storeDashboardAnalysisPeriod.date,
  });


  return (
    <GlassCard
      className="p-5 glass-card-hover border border-neon-lavender/20"
      variant="dark"
    >
      <div className="mb-5 w-full flex gap-1 items-center">
        <Calculator className="h-5 w-5 text-neon-purple" />
        <h2 className="font-semibold text-neon-purple">Receitas & Despesas</h2>
      </div>
      <div
        aria-label="Resumo mensal"
        className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <CardTypeMonthlySummary isLoading={isFetching} color="success">
          <div className="inline-flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-neon-green" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground/90 mb-1">
            Receitas {storeDashboardAnalysisPeriod.currentMonth}
          </h3>
          <p className="text-xl font-mono-digital font-bold text-neon-green">
            {dataMonthlySummary.totalInvoicesFormated}
          </p>
        </CardTypeMonthlySummary>

        <CardTypeMonthlySummary isLoading={isFetching} color="danger">
          <div className="inline-flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-neon-red rotate-180" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground/90 mb-1">
            Despesas {storeDashboardAnalysisPeriod.currentMonth}
          </h3>
          <p className="text-xl font-mono-digital font-bold text-neon-red">
            {dataMonthlySummary.totalExpensesFormated}
          </p>
        </CardTypeMonthlySummary>

        <CardTypeMonthlySummary isLoading={isFetching} color="info">
          <div className={"inline-flex items-center justify-center"}>
            <Wallet
              className={`h-6 w-6 ${
                dataMonthlySummary.totalBalance > 0
                  ? "text-neon-blue"
                  : "text-warning"
              }`}
            />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground/90 mb-1">
            Saldo {storeDashboardAnalysisPeriod.currentMonth}
          </h3>
          <p
            className={`text-xl font-mono-digital font-bold ${
              dataMonthlySummary.totalBalance > 0
                ? "text-neon-blue"
                : "text-warning"
            }`}
          >
            {dataMonthlySummary.totalBalanceFormated}
          </p>
        </CardTypeMonthlySummary>
      </div>
      <div>
        <MonthlySummaryAccordion
          totalExpensesFormated={dataMonthlySummary.totalExpensesFormated}
          totalInvoicesFormated={dataMonthlySummary.totalInvoicesFormated}
          totalInvoices={dataMonthlySummary.totalInvoices}
          totalExpenses={dataMonthlySummary.totalExpenses}
          fixedIncome={dataMonthlySummary.fixedIncome}
          variableRevenue={dataMonthlySummary.variableRevenue}
          fixedExpenses={dataMonthlySummary.fixedExpenses}
          variableExpenses={dataMonthlySummary.variableExpenses}
          isLoading={isFetching}
        />
      </div>
    </GlassCard>
  );
});

export { MonthlySummaryContainer };
