import { TransformCashFlowByYearToSummaryUseCase } from "@/usecases/CashFlow/transform-cash-flow-by-year-to-summary.usecase";

let transformCashFlowByYearToSummary: TransformCashFlowByYearToSummaryUseCase | null;

export const TransformCashFlowByYearToSummaryFactoryUseCase =
  (): TransformCashFlowByYearToSummaryUseCase => {
    if (!transformCashFlowByYearToSummary) {
      transformCashFlowByYearToSummary =
        new TransformCashFlowByYearToSummaryUseCase();
    }

    return transformCashFlowByYearToSummary;
  };
