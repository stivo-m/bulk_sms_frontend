import { createAsyncThunk } from '@reduxjs/toolkit';
import { InferType } from 'yup';
import { contactGroupValidationSchema } from '../../../../../core/validations/contact_group_validation';
import axios from '../../../../utils/axios';

/**
 * Used for fetching a list of contact groups
 */
export const fetchContactGroups = createAsyncThunk('contacts/groups', async () => {
  try {
    const response = await axios.get('/contact-groups');
    return response.data;
  } catch (error) {
    throw error;
  }
});

/**
 * Used for fetching a specific contact group
 */
export const fetchContactGroupById = createAsyncThunk('contacts/groups/id', async (id: string) => {
  try {
    const response = await axios.get(`/contact-groups/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

/**
 * Used for deleting a specific contact group
 */
export const deleteContactGroupById = createAsyncThunk(
  'contacts/groups/delete',
  async (id: string) => {
    try {
      const response = await axios.delete(`/contact-groups/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

/**
 * Used for creating a contact group
 */
export const createContactGroup = createAsyncThunk(
  'contacts/groups/post',
  async (input: InferType<typeof contactGroupValidationSchema>) => {
    try {
      const response = await axios.post(`/contact-groups`, input);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
