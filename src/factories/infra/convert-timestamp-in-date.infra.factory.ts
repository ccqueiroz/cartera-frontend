import { ConvertTimestampInDateHelper } from "@/infra/helpers/convert-timestamp-in-date.infra";

const convertTimeStampInDate = new ConvertTimestampInDateHelper()
  .execute;

export { convertTimeStampInDate };
