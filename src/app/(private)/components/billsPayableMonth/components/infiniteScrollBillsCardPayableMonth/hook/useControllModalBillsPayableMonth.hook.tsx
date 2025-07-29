import { globalModalStore } from "@/app/store/globalModal/globalModal.store";
import {
  BillDTO,
  BillsPayableMonthListDTOAdpatedToPresentation,
} from "@/domain/bill/bill.dto";
import { MouseEventHandler, useCallback } from "react";
import { ContentModalBillsPayableMonth } from "../../modalBillsPayableMonth/components/modalContent/contentModalBillsPayableMonth.components";
import { DescriptionModalBillsPayableMonth } from "../../modalBillsPayableMonth/components/modalDescription/descriptionModalBillsPayableMonth.components";
import { UpdateBillPayableMonthSchemaType } from "@/infra/schemas/bill/updateBillPayableMonth.schema";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";

export const useControllModalBillsPayableMonth = (
  showListBillsPayableMonth: Array<BillsPayableMonthListDTOAdpatedToPresentation>,
  updateBillPayable: (
    data: UpdateBillPayableMonthSchemaType
  ) => Promise<HandleResponseDTO<BillDTO>>
) => {
  const handleOpenModalBillToModalBillPayableMonth = useCallback(
    (bill: BillsPayableMonthListDTOAdpatedToPresentation) => {
      globalModalStore.openModal({
        states: {
          btnSuccessStartDesabled: true,
        },
        header: {
          title: "Relatório de Despesa",
          description: () => (
            <DescriptionModalBillsPayableMonth
              billDate={bill.billDateFormated || ""}
              descriptionBill={bill.descriptionBill}
            />
          ),
        },
        content: () => (
          <ContentModalBillsPayableMonth
            bill={bill}
            updateBillPayable={updateBillPayable}
          />
        ),
        footer: {
          btnCancelAction: "Cancelar",
          btnConfirmAction: {
            children: "Salvar",
            form: {
              type: "submit",
              idForm: `form-update-bill-payable-${bill.id}`,
            },
          },
        },
      });
    },
    [updateBillPayable]
  );

  const handleSetBillToModalBillPayableMonth: MouseEventHandler<HTMLDivElement> =
    useCallback(
      (event) => {
        const target = event.currentTarget;
        const index = target.getAttribute("data-index");
        if (index) {
          const bill = showListBillsPayableMonth[+index];
          handleOpenModalBillToModalBillPayableMonth(bill);
        }
      },
      [handleOpenModalBillToModalBillPayableMonth, showListBillsPayableMonth]
    );

  return {
    handleSetBillToModalBillPayableMonth,
  };
};
