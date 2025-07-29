export const adapterNumberToNumberCurrencyFormated = (number: number) => {
  return Intl.NumberFormat("pt-Br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(number);
};
