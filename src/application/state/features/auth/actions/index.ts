import { createAsyncThunk } from '@reduxjs/toolkit';
import { InferType } from 'yup';
import { userLoginValidationSchema } from '../../../../../core/validations/auth_validations';
import axios from '../../../../utils/axios';

/**
 * Used for user login
 */
export const loginUser = createAsyncThunk(
  'users/login',
  async (input: InferType<typeof userLoginValidationSchema>) => {
    try {
      const response = await axios.post('/users/login', input);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
