import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export const selectContactGroupState = (state: RootState) => state.contactGroupState;

export const contactGroupSelector = createSelector(selectContactGroupState, (state) => state);
