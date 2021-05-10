import { createSlice } from '@reduxjs/toolkit';
import financial from '../../utilities/financial';

const initialState = {
    currencies: {
        basic: null,
        quoted: null,
    },
    typed: 0,
    converted: 0,
};

const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
        basicSet(state, action) {
            const currency = action.payload;
            if(currency) {
                state.currencies.basic = currency;
            }
        },
        quotedSet(state, action) {
            const currency = action.payload;
            if(currency) {
                state.currencies.quoted = currency;
            }
        },
        currenciesSwapped(state) {
            const basic = state.currencies.basic;
            const quoted = state.currencies.quoted;
            state.currencies.basic = quoted;
            state.currencies.quoted = basic;
        },
        typed(state, action) {
            if(!isNaN(action.payload)) {
                state.typed = action.payload;
            }
        },
        converteChanged(state) {
            const basic = state.currencies.basic;
            const quoted = state.currencies.quoted;
            if(basic && quoted) {
                state.converted = financial((basic.Value * state.typed) / quoted.Value);
            }
        }
    }
});

export const { basicSet, quotedSet, currenciesSwapped, converteChanged, typed } = converterSlice.actions;

export default converterSlice.reducer;