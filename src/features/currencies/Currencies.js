import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit'

//Components
import CurrencySearch from './CurrencySearch';
import Currency from './Сurrency';

//Slice
import { fetchCurrencies } from './currenciesSlice';

export default function Currencies() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.currencies.status);
    const currencies = useSelector(state => state.currencies.filteredData);
    const error = useSelector(state => state.currencies.error);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchCurrencies());
        }
    }, [status, dispatch]);

    let content;

    if(status === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if(status === 'succeeded') {
        content = currencies.map((currency) => <Currency currency={currency} key={nanoid()}/>)
    } else if(status === 'faild') {
        content = <div>{error}</div>
    }

    return (
        <div className="currencies">
            <CurrencySearch/>
            <div className="currencies__container">
                {content}
            </div>
        </div>

    )
}