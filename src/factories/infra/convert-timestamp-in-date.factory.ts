import { ConvertTimestampInDateHelper } from "@/infra/helpers/convert-timestamp-in-date.infra";

const convertTimeStampInDateFactory = new ConvertTimestampInDateHelper()
  .execute;

export { convertTimeStampInDateFactory };
