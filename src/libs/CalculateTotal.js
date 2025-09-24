export const calculateTotalPrice = (products) => {
  let total = 0;
  products.forEach((item, i) => {
    total += item.totalPrice;
  });
  return total;
};

export const summaryReport = (sales, payments) => {
  let totalCreditPrice = 0;
  let remainingCreditPrice = 0;
  let totalCashPrice = 0;

  sales.forEach((sale) => {
    const saleTotal = sale.price * sale.quantity;
    if (sale.isPaid === "CREDIT") {
      totalCreditPrice += saleTotal;
    } else if (sale.isPaid === "CASH") {
      totalCashPrice += saleTotal;
    }
  });

  payments.forEach((payment) => {
    if (payment.isPaid === "CREDIT") {
      remainingCreditPrice += payment.remainPrice;
    }
  });

  return {
    totalCreditPrice,
    remainingCreditPrice,
    totalCashPrice,
  };
};

export const calculateTotalAndRemainingPrice = (sales, payments) => {
  let totalPrice = 0;
  let remainingPrice = 0;

  sales.forEach((sale) => {
    totalPrice += sale.price * sale.quantity;
  });

  payments.forEach((payment) => {
    remainingPrice += payment.remainPrice;
  });

  return {
    totalPrice,
    remainingPrice,
  };
};
