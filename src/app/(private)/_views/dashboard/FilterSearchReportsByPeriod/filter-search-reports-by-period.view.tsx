import { NeonButton } from "@/components/core/NeonButton/neon-button.component";
import { DatePicker } from "@/components/core/DatePicker/date-picker.component";

export const FilterSearchReportsByPeriod = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center gap-3 mt-3 md:mt-0">
      <DatePicker mode="range" />

      <NeonButton variant="blue" className="w-full">Nova Transação</NeonButton>
    </div>
  );
};
