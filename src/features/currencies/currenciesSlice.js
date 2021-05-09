import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    data: null,
    filteredData: null,
    error: null,
};

export const fetchCurrencies = createAsyncThunk(
    'currencies/fetchCurrencies',
    async () => {
        const responce = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        return await responce.json();
    }
);

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        currenciesFound(state, action) {
            const keyword = action.payload;
            if(state.data) {
                const currenciesFound = state.data.filter((currency) => {
                    console.log(currency)
                    return currency.CharCode === keyword || currency.NumCode === keyword;
                });

                if(currenciesFound.length) {
                    state.filteredData = currenciesFound;
                } else {
                    state.filteredData = state.data;
                }
            }
        } 
    },
    extraReducers: {
        [fetchCurrencies.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchCurrencies.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.data = Object.values(action.payload.Valute);
            state.filteredData = Object.values(action.payload.Valute);
        },
        [fetchCurrencies.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    }
});

export const { currenciesFound } = currenciesSlice.actions;

export default currenciesSlice.reducer;