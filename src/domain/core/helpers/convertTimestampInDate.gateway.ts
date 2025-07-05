import { FormatDateValues } from "./convertTimestampInDate.dto";

export interface ConvertTimestampInDateGateway {
  execute(date: number, formatDate: FormatDateValues): string;
}
