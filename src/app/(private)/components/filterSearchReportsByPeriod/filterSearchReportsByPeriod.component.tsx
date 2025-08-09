import { DatePicker } from "@/app/components/core/datePicker/datePicker.component";
import { NeonButton } from "@/app/components/core/neonButton/neonButton.component";
import { AnalysisPeriod } from "./components/analysisPeriod/analysisPeriod.component";
import { Calendar } from "lucide-react";

export const FilterSearchReportsByPeriod = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mt-3 md:mt-0">
      <div className="min-w-max flex gap-2">
        <Calendar className="h-5 w-5 text-neon-blue" />
        <span className="text-muted/80 font-medium">Período de análise:</span>
      </div>
      <AnalysisPeriod />
    </div>
  );
};
