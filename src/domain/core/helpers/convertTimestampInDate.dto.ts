export const FormatDates = {
  "DD/MM/AAAA": "DD/MM/AAAA",
  "MM/AAAA": "MM/AAAA",
  "DD/MM": "DD/MM",
  "WEAK-DAY": "WEAK-DAY",
  DAY: "DAY",
  MONTH: "MONTH",
  YEAR: "YEAR",
} as const;

export type FormatDateValues = (typeof FormatDates)[keyof typeof FormatDates];
