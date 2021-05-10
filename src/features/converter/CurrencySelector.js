import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { basicSet, quotedSet, typed, converteChanged } from './converterSlice';

// Components
import Option from './Option';

export default function CurrencySelector({ listOfcurrencies, purpose, stateCurrency }) {
    const dispatch = useDispatch();
    let converted = useSelector(state => state.converter.converted);
    let value = useSelector(state => state.typed);
    
    function handleSelectChange(event) {
        let currency = listOfcurrencies.find(currency => currency.CharCode === event.target.value);
        purpose === 'basic' ? dispatch(basicSet(currency)) : dispatch(quotedSet(currency));
        dispatch(converteChanged());
    }

    function handleInputChange(event) {
        dispatch(typed(+event.target.value));
        dispatch(converteChanged());
    }

    // A list of currencies with the default currency cut
    const filtered = listOfcurrencies.filter(currency => currency.ID !== stateCurrency.ID);

    return (
        <div className="currency-selector component">
            <h4 className="currency-selector__name">{stateCurrency.Name}</h4>
            <div className="currency-selector__container">
                <select className="currency-selector__currencies" name="currencies" onChange={handleSelectChange}>
                    {/* Setting the selected default currency first in the list */}
                    {<Option value={stateCurrency.CharCode} key={nanoid()}/>}
                    {filtered.map(currency => <Option value={currency.CharCode} key={nanoid()}/>)}
                </select>
                {/* Set the value attribute based on what type of currency selector */}
                <input className="currency-selector__value" type="text" value={purpose === 'basic' ? value : purpose === 'quoted' ? converted : ''} onChange={handleInputChange} />
            </div>
        </div>
    )
}