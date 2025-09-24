export const getStockReport = async (data) => {
  
  const url = `stock?startDate=${data?.startDate}&endDate=${data?.endDate}&invoiceNo=${data?.invoiceNo}`;
  return ApiRequest("GET", url, ( data =data));
};

export const getSalesReport = async (data) => {
  const url = `sales?startDate=${data.startDate}&endDate=${data.endDate}&invoiceNo=${data?.invoiceNo}`;
  return ApiRequest("GET", url, data);
};

export const getPaymentReport = async (data) => {
  const url = `payments?startDate=${data.startDate}&endDate=${data.endDate}&invoiceNo=${data?.invoiceNo}`;
  return ApiRequest("GET", url, data);
};
