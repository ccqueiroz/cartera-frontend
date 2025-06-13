import { FormatDateValues } from "./convert-timestamp-in-date.dto";

export interface ConvertTimestampInDateGateway {
  execute(date: number, formatDate: FormatDateValues): string;
}
