'use client';

import { ApiRequest } from '../common/ServiceHooks';
export const  PropertyStatus ={
  AVAILABLE: 'available',
  SOLD: 'sold',
  RENTED: 'rented',
  PENDING: 'pending',
}

export const addAllocation = async (data) =>
  await ApiRequest('POST', 'allocations', data);


export const fetchAllocations = async ({ page = 1, limit = 10 } = {}) => {
  const url = `allocations?page=${page}&limit=${limit}`;
  return await ApiRequest('GET', url);
};


export const fetchAllocationById = async (allocationId) =>
  await ApiRequest('GET', `allocations/${allocationId}`);


export const updateAllocationById = async ({ allocationId, updateData }) => {
  try {
    const response = await ApiRequest('PATCH', `allocations/${allocationId}`, updateData);
    return response;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update allocation';
  }
};


export const deleteAllocationById = async (allocationId) =>
  await ApiRequest('DELETE', `allocations/${allocationId}`);


export const randomAllocation = async (count = 10) =>
  await ApiRequest('POST', `allocations/random?count=${count}`);

export const getDailyAllocations = async () =>
  await ApiRequest('GET', 'allocations/daily');