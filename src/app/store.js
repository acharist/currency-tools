import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from '../features/currencies/currenciesSlice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
  },
});
