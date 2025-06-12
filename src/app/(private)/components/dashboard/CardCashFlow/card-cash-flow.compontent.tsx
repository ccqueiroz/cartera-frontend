import { GlassCard } from "@/components/core/GlassCard/glass-card.component";
import { cn } from "@/lib/cn.utils";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CreditCard,
  Wallet,
} from "lucide-react";

const ProventTypeEnum = {
  receivable: "receivable",
  bill: "bill",
} as const;

interface CardCashFlowProps {
  proventType: (typeof ProventTypeEnum)[keyof typeof ProventTypeEnum];
  totalAmount: number;
  financialEvents: number;
  incomeFixedCosts: number;
}

const textsByType = {
  receivable: {
    cashFlow: "Entrada de caixa",
    financialEvents: "Receita",
    incomeFixedCosts: "Investimentos",
  },
  bill: {
    cashFlow: "Saída de caixa",
    financialEvents: "Fixas",
    incomeFixedCosts: "Variáveis",
  },
} as const;

export const CardCashFlow = ({
  proventType,
  totalAmount,
  incomeFixedCosts,
  financialEvents,
}: CardCashFlowProps) => {
  return (
    <GlassCard
      className="w-full max-w-[600px] max-h-[220px] sm:max-h-[162px] p-5 animate-fade-in-up"
      style={{ animationDelay: "250ms" }}
      variant="dark"
    >
      <div className="w-full flex flex-col justify-between items-between gap-3 flex-wrap">
        <div className="flex gap-4 items-center justify-start">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center glass neon-shadow-purple">
            {proventType === ProventTypeEnum.receivable && (
              <ArrowDownToLine className="text-neon-blue" />
            )}
            {proventType === ProventTypeEnum.bill && (
              <ArrowUpFromLine className="text-neon-purple" />
            )}
          </div>
          <div>
            <h3 className="text-white text-sm font-medium">
              {textsByType[proventType].cashFlow}
            </h3>
            <p
              className={cn(
                "text-xl font-bold digital",
                `${
                  proventType === ProventTypeEnum.receivable
                    ? "text-neon-blue"
                    : "text-neon-purple"
                }`
              )}
            >
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(totalAmount)}
            </p>
          </div>
        </div>
        <div
          className={cn(
            "flex gap-1 items-start justify-between text-sm mt-4 flex-wrap",
            "sm:gap-16",
            "2xl:gap-x-12"
          )}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              {proventType === ProventTypeEnum.receivable && (
                <Wallet size={16} className="text-white/70" />
              )}
              {proventType === ProventTypeEnum.bill && (
                <CreditCard size={16} className="text-white/70" />
              )}
              <span className="text-white/70">
                {textsByType[proventType].incomeFixedCosts}
              </span>
            </div>
            <p className="digital text-white">
              {" "}
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(incomeFixedCosts)}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              {proventType === ProventTypeEnum.receivable && (
                <CreditCard size={16} className="text-white/70" />
              )}
              {proventType === ProventTypeEnum.bill && (
                <Wallet size={16} className="text-white/70" />
              )}
              <span className="text-white/70">
                {textsByType[proventType].financialEvents}
              </span>
            </div>
            <p className="digital text-white">
              {" "}
              {Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
              }).format(financialEvents)}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
