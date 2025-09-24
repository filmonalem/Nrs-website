import { ApiRequest } from "../common/ServiceHooks"


export const getStockWeekly = async (data) => {
    const url = `property/weekly`;
    return ApiRequest("GET", url, data);
};

export const getStockMonthly = async (data) => {
    const url = `sales/monthly`;
    return ApiRequest("GET", url, data);
};

export const getStockYearly = async (data) => {
    const url = `property/yearly`;
    return ApiRequest("GET", url, data);
};

export const getTotalSales = async (data)=>{
    const url = `sales/total`;
    return ApiRequest("GET",url,data);
}

export const getSalesWeekly = async (data) => {
    const url = `sales/weekly`;
    return ApiRequest("GET", url, data);
};

export const getSalesMonthly = async (data) => {
    const url = `sales/monthly`;
    return ApiRequest("GET", url, data);
};

export const getSalesYearly = async (data) => {
    const url = `sales/yearly`;
    return ApiRequest("GET", url, data);
};

export const getClientsSupplier = async (data) => {
    const url = `clients/supplier`;
    return ApiRequest("GET", url, data);
};
export const dailyStocks = async (data) => {
    const url = `stock/daily?searchTerm=${data}`;
    return ApiRequest("GET", "stock/daily", (data = data));
  };
  

export const getClientsCustomer = async (data) => {
    const url = `clients/customer`;
    return ApiRequest("GET", url, data);
};

export const formatStockData = (data) => {
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
};
export const getStorage = async (data) => {
    const url = `storage/size`;
    return ApiRequest("GET", url, data);
};
export const getPropertyTotal = async () => {
  return ApiRequest("GET", "properties/total");
};