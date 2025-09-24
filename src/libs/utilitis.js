export const changeUpper = (char) => {
  if (!char || char.length === 0) {
    return char;
  }
  return char[0].toUpperCase() + char.slice(1);
};

export const ChangeTOUpper = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const calculateVat = (price) => {
  return (price / 100) * 15;
};

export const changeTime = (getDate) => {
  var date = new Date(getDate);
  var hr = date.getUTCHours();
  var min = date.getMinutes();
  var time = hr + ":" + min;
  return time;
};

export const currentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();

  return day + "-" + month + "-" + year;
};

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
};

export const ChangeFullName = (str) => {
  if (!str) {
    return "";
  }
  const strArr = str.split(" ").map((word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  });
  return strArr.join(" ");
};

export const checkItem = (arr, productId, messageApi) => {
  const res = arr.some((el) => el.productId === productId);
  if (res) {
    return messageApi.info("Product is Available please Check");
  }
};

export const getDifferenceDate = (date) => {
  const dateCurrent = new Date();
  dateCurrent.getTime();
  const dateCurrent01 = new Date(date);
  dateCurrent.getTime();
  return (
    Math.round((dateCurrent01 - dateCurrent) / (1000 * 3600 * 24)) +
    " " +
    `${"days"}`
  );
};

export const getTotalPrice = (price) => {
  let total = 0;
  price?.map((item) => {
    total += item.totalAmount;
  });
  return total.toFixed(2);
};

export const getTotalCreditPrice = (price) => {
  let total = 0;
  price.totalCredit.forEach((item) => {
    total += item.total.Price;
  });
  return total.toFixed(2);
};

export const calculateTotalPrice = (products = []) => {
  let total = 0;
  products.forEach((item, i) => {
    total += item.totalPrice;
  });
  return total;
};

export const showTotalPrice = (products = []) => {
  let total = 0;
  products.forEach((item, i) => {
    total += item.quantity * item.price;
  });
  return total;
};

export const calculateTrend = (amount, totalAmount) => {
  return !Number(amount) && !Number(totalAmount)
    ? 0
    : ((Number(amount) / Number(totalAmount)) * 100).toFixed(2) + "%";
};

export const calculateRate = (revenue, cost) => {
  if (!revenue || !cost) return "0%";
  const rate = (((revenue - cost) / cost) * 100).toFixed(1);
  return `${rate}%`;
};

export const formatStockCode = (stockCode) => {
  if (!stockCode.startsWith("STK-")) {
    const numericPart = stockCode.replace(/\D/g, "").padStart(10, "0");
    return `STK-${numericPart}`;
  }
  return stockCode;
};

export const formatSaleCode = (saleCode) => {
  if (!saleCode.startsWith("SAL-")) {
    const numericPart = saleCode.replace(/\D/g, "").padStart(10, "0");
    return `SAL-${numericPart}`;
  }
  return saleCode;
};

const changeYear = () => {
  var date = new Date();
  var year = date.getFullYear().toString().slice(-2);
  return year;
};

export const formatCodeInvoice = (stockCode) => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  if (/^STK-\d{10}-\d{2}$/.test(stockCode)) {
    return stockCode;
  }
  const parts = stockCode.split("-");
  const mainNumber = parts[0].replace(/\D/g, "").padStart(10, "0");
  const suffix = parts[1] || currentYear;

  return `STK-${mainNumber}-${suffix}`;
};

export const formatCodeSales = (saleCode) => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  if (/^SAL-\d{10}-\d{2}$/.test(saleCode)) {
    return saleCode;
  }
  const parts = saleCode.split("-");
  const mainNumber = parts[0].replace(/\D/g, "").padStart(10, "0");
  const suffix = parts[1] || currentYear;
  return `SAL-${mainNumber}-${suffix}`;
};

export const formatInvoiceNumber = (input) => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const parts = input.split("-");
  if (parts.length < 2) return input;

  const prefix = parts[0].toUpperCase();
  if (!["SAL", "STK"].includes(prefix)) return input;

  const numberPart = parts[1];
  const yearPart = parts[2] || currentYear;

  const paddedNumber = numberPart.padStart(10, "0");
  return `${prefix}-${paddedNumber}-${yearPart}`;
};

export const getMinMaxDates = (data) => {
  const dates = data?.map((item) => new Date(item.createdAt));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  return { minDate, maxDate };
};

export const getProductHeaderInfo = (data) => {
  if (
    !data ||
    (!data.stock && !data.sale) ||
    (!data.stock[0] && !data.sale[0])
  ) {
    return { name: "____", brand: "____", code: "____", unit: "____" };
  }
  const product = data.stock[0]?.products || data.sale[0]?.products;
  return {
    name: product?.name || "____",
    brand: product?.brand || "____",
    code: product?.code || "____",
    unit: product?.unit || "____",
  };
};
