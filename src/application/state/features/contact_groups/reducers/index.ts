import { createReducer } from '@reduxjs/toolkit';
import { ContactGroup } from '../../../../../../types';
import {
  createContactGroup,
  deleteContactGroupById,
  fetchContactGroupById,
  fetchContactGroups,
} from '../actions';

export type ContactGroupState = {
  data: {
    contactGroups: ContactGroup[];
    contactGroup: ContactGroup | null;
  };
  pending: boolean;
  error: any;
};

const initialState: ContactGroupState = {
  data: { contactGroup: null, contactGroups: [] },
  pending: false,
  error: null,
};

export const contactGroupReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchContactGroups.pending, (state) => {
      state.pending = true;
    })
    .addCase(fetchContactGroups.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data.contactGroups = payload;
    })
    .addCase(fetchContactGroups.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(fetchContactGroupById.pending, (state) => {
      state.pending = true;
    })
    .addCase(fetchContactGroupById.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data.contactGroup = payload;
    })
    .addCase(fetchContactGroupById.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(createContactGroup.pending, (state) => {
      state.pending = true;
    })
    .addCase(createContactGroup.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data.contactGroups.push(payload);
    })
    .addCase(createContactGroup.rejected, (state) => {
      state.pending = false;
      state.error = true;
    })
    .addCase(deleteContactGroupById.pending, (state) => {
      state.pending = true;
    })
    .addCase(deleteContactGroupById.fulfilled, (state, { payload }) => {
      state.pending = false;
      state.data.contactGroups = state.data.contactGroups.filter((group) => group.id != payload.id);
    })
    .addCase(deleteContactGroupById.rejected, (state) => {
      state.pending = false;
      state.error = true;
    });
});

export default contactGroupReducer;
