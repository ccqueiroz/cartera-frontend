import {
  FormatDates,
  FormatDateValues,
} from "@/domain/core/helpers/convertTimestampInDate.dto";
import { ConvertTimestampInDateGateway } from "@/domain/core/helpers/convertTimestampInDate.gateway";

export class ConvertTimestampInDateHelper
  implements ConvertTimestampInDateGateway
{
  execute(date: number, formatDate: FormatDateValues): string {
    const newDate = new Date(date);

    const formatting = {
      [FormatDates["DD/MM/AAAA"]]: Intl.DateTimeFormat("pt-BR").format(newDate),
      [FormatDates["MM/AAAA"]]: Intl.DateTimeFormat("pt-BR")
        .format(newDate)
        ?.slice(3, 12),
      [FormatDates["DD/MM"]]: Intl.DateTimeFormat("pt-BR")
        .format(newDate)
        ?.slice(0, 5),
      [FormatDates["WEAK-DAY"]]: Intl.DateTimeFormat("pt-PT", {
        weekday: "long",
      }).format(newDate),
      [FormatDates["DAY"]]: newDate.getDate().toString(),
      [FormatDates["MONTH"]]: Intl.DateTimeFormat("pt-PT", {
        month: "long",
      }).format(newDate),
      [FormatDates["YEAR"]]: newDate.getFullYear().toString(),
    };

    return formatting[formatDate] ?? "";
  }
}
