import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export const selectAuthState = (state: RootState) => state.authState;

export const authStateSelector = createSelector(selectAuthState, (state) => state);
