import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import authenticationReducer from '../features/authentication/authenticationSlice';
import configReducer from '../features/config/configSlice';
import counterReducer from '../features/counter/counterSlice';
import invoiceReducer from '../features/invoice/invoiceSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authentication: authenticationReducer,
    invoice: invoiceReducer,
    config: configReducer
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
