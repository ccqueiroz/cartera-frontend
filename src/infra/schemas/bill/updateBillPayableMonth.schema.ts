import { z } from "zod";
import { MESSAGES_SCHEMA_VALIDATIONS } from "../constants/messages-validations.schema";

export const updateBillPayableMonthSchema = z
  .object({
    billId: z.string().nonempty(MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD),
    includePayment: z.boolean(),
    includePaymentDate: z.date().optional(),
  })
  .refine(
    (data) => {
      if (!data.includePayment) return true;
      return data.includePaymentDate instanceof Date;
    },
    {
      message: MESSAGES_SCHEMA_VALIDATIONS.REQUIRED_FIELD,
      path: ["includePaymentDate"],
    }
  );

export type UpdateBillPayableMonthSchemaType = z.infer<
  typeof updateBillPayableMonthSchema
>;
