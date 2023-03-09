import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from './features/auth';

export const store = configureStore({
  reducer: {
    authState: authReducer,
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
