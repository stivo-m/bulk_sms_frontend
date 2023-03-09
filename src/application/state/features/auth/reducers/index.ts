import { createReducer } from '@reduxjs/toolkit';
import { loginUser } from '../actions';

export type AuthState = {
  data: {
    user: any;
    token: string | null;
  };
  pending: boolean;
  error: any;
};

const initialState: AuthState = {
  data: { token: null, user: null },
  pending: false,
  error: null,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.pending = true;
    })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data = payload;
    })
    .addCase(loginUser.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
});

export default authReducer;
