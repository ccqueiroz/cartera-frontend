import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { Usecase } from "../usecase";
import { MonthlySummaryCashFlowOutputDTO } from "@/domain/cashFlow/cashFlow.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";
import { CashFlowGetMonthlySummaryService } from "@/service/cashFlow/getMonthlySummary.service";

type InputDTO = { year: number; month: number; paid?: boolean };

export class CashFlowMonthlySummaryUseCase
  implements
    Usecase<
      InputDTO,
      Promise<HandleResponseDTO<MonthlySummaryCashFlowOutputDTO>>
    >
{
  constructor(
    private readonly handleResponseGateway: HandleResponseGateway,
    private readonly cashFlowGetMonthlySummaryService: CashFlowGetMonthlySummaryService
  ) {}

  private getTotalAmountType(fixedValue: number, variableValue: number) {
    return fixedValue + variableValue;
  }

  private getTotalBalance(totalInvoices: number, totalExpenses: number) {
    return totalInvoices - totalExpenses;
  }

  async execute({
    month,
    year,
    paid,
  }: InputDTO): Promise<HandleResponseDTO<MonthlySummaryCashFlowOutputDTO>> {
    const response = await this.handleResponseGateway.execute(() =>
      this.cashFlowGetMonthlySummaryService.execute({ month, year, paid })
    );

    if (!response.success) return response;
    const totalInvoices = this.getTotalAmountType(
      response.data.fixedIncome,
      response.data.variableRevenue
    );
    const totalExpenses = this.getTotalAmountType(
      response.data.fixedExpenses,
      response.data.variableExpenses
    );
    const totalBalance = this.getTotalBalance(totalInvoices, totalExpenses);

    return {
      ...response,
      data: {
        ...response.data,
        totalInvoices,
        totalExpenses,
        totalBalance,
      },
    };
  }
}
