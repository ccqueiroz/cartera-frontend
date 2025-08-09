"use client";

import { cn } from "@/app/utils/cn.utils";
import React from "react";
import { MonthDatePick } from "@/app/components/core/monthDatePicker/monthDatePicker.component";
import { observer } from "mobx-react-lite";
import { dashboardAnalysisPeriodStore } from "@/app/store/dashBoardAnalysisPeriod/dashBoardAnalysisPeriod.store";

const AnlysisPeriodComponent = observer(() => {
  const store = dashboardAnalysisPeriodStore;
  return (
    <div className={cn("flex gap-4")}>
      <MonthDatePick
        date={store.date}
        onMonthSelect={store.setDate}
        minDate={store.minDate}
        maxDate={store.maxDate}
      />
    </div>
  );
});

const AnalysisPeriod = AnlysisPeriodComponent;

export { AnalysisPeriod };
