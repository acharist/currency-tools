import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from '../features/currencies/currenciesSlice';
import converterReducer from '../features/converter/converterSlice';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    converter: converterReducer,
  },
});
