"use server";

export async function updateBillPayable(data: FormData) {
  try {
    const { includePayment, paymentDate } = Object.fromEntries(data.entries());

    void includePayment;
    void paymentDate;
  } finally {
  }
}
