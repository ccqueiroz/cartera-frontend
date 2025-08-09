import { makeAutoObservable } from "mobx";

export class DashboardAnalysisPeriodStore {
  private currentDate: Date = new Date();
  private monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  currentMonth: string = "";
  isCurrentMonth: boolean = true;
  date: Date = new Date();
  minDate: Date = new Date(2025, 0, 1);
  maxDate: Date = new Date(this.currentDate.getFullYear(), 11, 31);

  constructor() {
    makeAutoObservable(this);
    this.getFormattedPeriod(this.currentDate);
    this.setDate = this.setDate.bind(this);
  }

  private setIsCurrentMonth(date: Date) {
    this.isCurrentMonth =
      date.getMonth() + 1 === this.currentDate.getMonth() + 1 &&
      date.getFullYear() === this.currentDate.getFullYear();
  }

  private getFormattedPeriod(date: Date) {
    this.currentMonth = this.isCurrentMonth
      ? "do Mês"
      : `de ${this.monthNames[date.getMonth()]}/${date.getFullYear()}`;
  }

  setDate(date: Date) {
    this.setIsCurrentMonth(date);
    this.getFormattedPeriod(date);
    this.date = date;
  }
}

export const dashboardAnalysisPeriodStore = new DashboardAnalysisPeriodStore();
