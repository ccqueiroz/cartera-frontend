import { TransformCashFlowByYearToSummaryUseCase } from "@/usecases/CashFlow/transform-cash-flow-by-year-to-summary.usecase";

export const TransformCashFlowByYearToSummaryFactoryUseCase = () =>
  new TransformCashFlowByYearToSummaryUseCase();
