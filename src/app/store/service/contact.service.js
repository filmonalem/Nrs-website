'use client';

import { ApiRequest } from "../common/ServiceHooks";



export const addContact = async (data) =>
  await ApiRequest('POST', 'contact', data);


export const fetchContacts = async ({ page = 1, limit = 10 } = {}) => {
  const url = `contact?page=${page}&limit=${limit}`;
  return await ApiRequest('GET', url);
};

export const fetchContactById = async (contactId) =>
  await ApiRequest('GET', `contact/${contactId}`);


export const updateContactById = async ({ contactId, updateData }) => {
  try {
    const response = await ApiRequest('PUT', `contact/update/${contactId}`, updateData);
    return response;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update contact';
  }
};
export const deleteContactById = async (contactId) =>
  await ApiRequest('DELETE', `contact/delete/${contactId}`);