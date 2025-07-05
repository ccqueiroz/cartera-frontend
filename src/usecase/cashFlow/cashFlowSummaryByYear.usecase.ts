import {
  CashFlowByYearDTOSumary,
  typeComparisonCashFlow,
} from "@/domain/cashFlow/cashFlow.dto";
import { Usecase } from "../usecase";
import { TransformCashFlowByYearToSummaryUseCase } from "./transformCashFlowByYearToSummary.usecase";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { CashFlowSummaryByYearService } from "@/service/cashFlow/cashFlowSummaryByYear.service";

type InputDTO = {
  typeComparison: (typeof typeComparisonCashFlow)[keyof typeof typeComparisonCashFlow];
  year: number;
};

export class CashFLowSummaryByYearUseCase
  implements Usecase<InputDTO, Promise<Array<CashFlowByYearDTOSumary>>>
{
  constructor(
    private readonly handleResponseGateway: HandleResponseGateway,
    private readonly cashFlowSummaryByYearService: CashFlowSummaryByYearService,
    private readonly transformCashFlowByYearToSummaryUseCase: TransformCashFlowByYearToSummaryUseCase
  ) {}

  async execute({
    typeComparison,
    year,
  }: InputDTO): Promise<Array<CashFlowByYearDTOSumary>> {
    const response = await this.handleResponseGateway.execute(() =>
      this.cashFlowSummaryByYearService.execute({ year })
    );

    if (!response.success) return [] as Array<CashFlowByYearDTOSumary>;

    const buildSummary = this.transformCashFlowByYearToSummaryUseCase.execute({
      typeComparison,
      cashflowList: response.data,
    });

    return buildSummary;
  }
}
