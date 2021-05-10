import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import convert from './convert.svg'

import { fetchCurrencies } from '../currencies/currenciesSlice';
import { basicSet, quotedSet, currenciesSwapped, converteChanged } from './converterSlice';

//Components
import CurrencySelector from './CurrencySelector';

export default function Converter() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.currencies.status);
    const currencies = useSelector(state => state.currencies.data);
    const error = useSelector(state => state.currencies.error);
    const basicCurrency = useSelector(state => state.converter.currencies.basic);
    const quotedCurrency = useSelector(state => state.converter.currencies.quoted);

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchCurrencies());
        }
    }, [status, dispatch]);

    let content;

    if(status === 'loading') {
        content = <div className="loader">Loading...</div>
    } else if(status === 'succeeded') {
        //Selection of default currencies, if there are none in the store
        let defaultBasicCurrency = basicCurrency || currencies[0];
        let defaultQuotedCurrency = quotedCurrency || currencies[1];

        //Set default currenciest to store
        dispatch(basicSet(defaultBasicCurrency));
        dispatch(quotedSet(defaultQuotedCurrency));

        content = <div className="converter">
            <CurrencySelector listOfcurrencies={currencies} purpose="basic" stateCurrency={basicCurrency}/>
            <button className="convert" onClick={() => { dispatch(currenciesSwapped()); dispatch(converteChanged()); }}>
                <img src={convert}/>
            </button>
            <CurrencySelector listOfcurrencies={currencies} purpose="quoted" stateCurrency={quotedCurrency}/>
        </div>
    } else if(status === 'faild') {
        content = <div>{error}</div>
    }

    return (
        <>
          {content}  
        </>
    )
}