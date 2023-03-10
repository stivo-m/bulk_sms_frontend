import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';
import { contactGroupReducer } from './features/contact_groups';

export const store = configureStore({
  reducer: {
    authState: authReducer,
    contactGroupState: contactGroupReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
