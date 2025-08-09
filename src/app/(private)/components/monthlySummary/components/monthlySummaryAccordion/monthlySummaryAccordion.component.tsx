import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Separator } from "@/app/components/ui/separator";
import { CardAnalysisTypeAmountPercent } from "../../../cardAnalysisTypeAmountPercent/cardAnalysisTypeAmountPercent.component";
import { Calendar, Repeat, TrendingDown, TrendingUp } from "lucide-react";
import { TotalBalance } from "../totalBalance/totalBalance.component";

type MonthlySummaryAccordionProps = {
  totalExpensesFormated: string;
  totalInvoicesFormated: string;
  totalInvoices: number;
  totalExpenses: number;
  fixedIncome: number;
  variableRevenue: number;
  fixedExpenses: number;
  variableExpenses: number;
  isLoading: boolean;
};

export const MonthlySummaryAccordion = ({
  totalExpensesFormated,
  totalInvoicesFormated,
  totalInvoices,
  totalExpenses,
  fixedIncome,
  variableRevenue,
  fixedExpenses,
  variableExpenses,
  isLoading,
}: MonthlySummaryAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="w-full h-full mt-2">
            <h3 className="text-sm text-muted/80 font-medium text-left">
              Classificação por tipo
            </h3>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <div className="w-full">
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2 mb-6">
              <CardAnalysisTypeAmountPercent
                type="Receita Fixa"
                descriptionType="Salário, aposentadoria, etc."
                color="success"
                totalAmount={totalInvoices}
                amount={fixedIncome}
                icon={Calendar}
                isLoading={isLoading}
              />
              <CardAnalysisTypeAmountPercent
                type="Receita Variável"
                descriptionType="Freelancers, vendas, bônus, etc."
                color="success"
                totalAmount={totalInvoices}
                amount={variableRevenue}
                icon={TrendingUp}
                isLoading={isLoading}
              />

              <CardAnalysisTypeAmountPercent
                type="Despesas Fixas"
                descriptionType="Aluguel, financiamento, etc."
                color="danger"
                totalAmount={totalExpenses}
                amount={fixedExpenses}
                icon={Repeat}
                isLoading={isLoading}
              />
              <CardAnalysisTypeAmountPercent
                type="Despesas Variável"
                descriptionType="Lazer, shopping, etc."
                color="warning"
                totalAmount={totalExpenses}
                amount={variableExpenses}
                icon={TrendingDown}
                isLoading={isLoading}
              />
            </div>
            <Separator orientation="horizontal" />
            <div className="w-full h-12 flex justify-between items-center mt-3">
              <TotalBalance
                color="success"
                isLoading={isLoading}
                title="Total Receitas"
                amount={totalInvoicesFormated}
                dir="left"
              />
              <Separator orientation="vertical" />
              <TotalBalance
                color="danger"
                isLoading={isLoading}
                title="Total Despesas"
                amount={totalExpensesFormated}
                dir="right"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
