export const DescriptionModalBillsPayableMonth = ({
  billDate,
  descriptionBill,
}: {
  billDate: string;
  descriptionBill: string;
}) => {
  return (
    <>
      <span>{descriptionBill}</span>
      <span className="hidden sm:block">-</span>
      <span>Data de vencimento: {billDate}</span>
    </>
  );
};
