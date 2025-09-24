
import { createSlice } from '@reduxjs/toolkit';
import {
  handleFulfilled,
  handlePending,
  handleRejected,
} from '../common/common';
import {
  addContact,
  deleteContactById,
  fetchContactById,
  fetchContacts,
  updateContactById,
} from '../service/contact.service';
import { CreateGenericAsyncThunk } from '../common/ServiceHooks';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: true,
  contacts: [],
  contact: null,
  total: 0,
  hasMessage: '',
  hasError: '',
};

export const addContactReducer = CreateGenericAsyncThunk('contact/create', addContact);
export const getAllContactsReducer = CreateGenericAsyncThunk('contact/list', fetchContacts);
export const getContactByIdReducer = CreateGenericAsyncThunk('contact/getById', fetchContactById);
export const updateContactReducer = CreateGenericAsyncThunk('contact/update', updateContactById);
export const deleteContactReducer = CreateGenericAsyncThunk('contact/delete', deleteContactById);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.contact = null;
      state.hasMessage = '';
      state.hasError = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContactReducer.pending, handlePending)
      .addCase(addContactReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        if (!Array.isArray(state.contacts)) {
          state.contacts = [];
        }
        const newContact = action.payload.data || action.payload;
        console.log('Add contact payload:', newContact);
        state.contacts.unshift(newContact);
        state.hasMessage = action.payload.message || 'Contact created successfully';
      })
      .addCase(addContactReducer.rejected, (state, action) => {
        handleRejected(state, action);
        console.error('Add contact error:', action.payload);
      })

      .addCase(getAllContactsReducer.pending, handlePending)
      .addCase(getAllContactsReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        const payload = action.payload.data || action.payload;
        console.log('Fetch contacts payload:', payload);
        state.contacts = Array.isArray(payload) ? payload : [];
        state.total = action.payload.total || payload.length || 0;
      })
      .addCase(getAllContactsReducer.rejected, (state, action) => {
        handleRejected(state, action);
        console.error('Fetch contacts error:', action.payload);
      })

      .addCase(getContactByIdReducer.pending, handlePending)
      .addCase(getContactByIdReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        const contact = action.payload.data || action.payload;
        console.log('Fetch contact by ID payload:', contact);
        state.contact = contact;
      })
      .addCase(getContactByIdReducer.rejected, (state, action) => {
        handleRejected(state, action);
        console.error('Fetch contact by ID error:', action.payload);
      })
      
.addCase(updateContactReducer.pending, handlePending)
      .addCase(updateContactReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        const updatedContact = action.payload.data || action.payload;
        console.log('Update contact payload:', updatedContact);
        if (updatedContact && updatedContact.contactId) {
          state.contacts = state.contacts.map((contact) =>
            contact.contactId === updatedContact.contactId ? updatedContact : contact
          );
          state.contact = updatedContact;
          state.hasMessage = action.payload.message || 'Contact status updated successfully';
        } else {
          console.error('Invalid update payload:', updatedContact);
          state.hasError = 'Invalid response from server';
        }
      })
      .addCase(updateContactReducer.rejected, (state, action) => {
        handleRejected(state, action);
        console.error('Update contact error:', action.payload);
        state.hasError = action.payload || 'Failed to update contact status';
      })

      .addCase(deleteContactReducer.pending, handlePending)
      .addCase(deleteContactReducer.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        console.log('Delete contact payload:', action.payload);
        state.contacts = state.contacts.filter((contact) => contact.contactId !== action.meta.arg);
        state.hasMessage = action.payload.message || 'Contact deleted successfully';
      })
      .addCase(deleteContactReducer.rejected, (state, action) => {
        handleRejected(state, action);
        console.error('Delete contact error:', action.payload);
      });
  },
});

export const { resetContactState } = contactSlice.actions;

export const isLoading = (state) => state.contact.isLoading;
export const isError = (state) => state.contact.isError;
export const isSuccess = (state) => state.contact.isSuccess;
export const contacts = (state) => state.contact.contacts;
export const contact = (state) => state.contact.contact;
export const total = (state) => state.contact.total;
export const hasMessage = (state) => state.contact.hasMessage;
export const hasError = (state) => state.contact.hasError;

const { reducer } = contactSlice;
export default reducer;