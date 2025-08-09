export const adapterNumberToNumberFormated = (
  number: number,
  type: "percent" | "currency" | "decimal" | "unit" = "currency",
  minimumFractionDigits: number = 2
) => {
  return new Intl.NumberFormat("pt-Br", {
    style: type,
    currency: "BRL",
    minimumFractionDigits,
  }).format(number);
};
