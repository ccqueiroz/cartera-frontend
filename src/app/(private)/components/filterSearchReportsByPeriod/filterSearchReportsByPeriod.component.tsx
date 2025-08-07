import { DatePicker } from "@/app/components/core/datePicker/datePicker.component";
import { NeonButton } from "@/app/components/core/neonButton/neonButton.component";


export const FilterSearchReportsByPeriod = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center gap-3 mt-3 md:mt-0">
      <DatePicker mode="range" />

      <NeonButton variant="blue" className="w-full">Nova Transação</NeonButton>
    </div>
  );
};
