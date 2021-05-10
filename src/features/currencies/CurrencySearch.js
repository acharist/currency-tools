import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { currenciesFound } from './currenciesSlice';

export default function CurrencySearch() {
    let [value, setValue] = useState('');
    const dispatch = useDispatch();

    function handleChange(event) {
        setValue(event.target.value);
        dispatch(currenciesFound(event.target.value));
    }

    return (
        <form className="currency-search component">
            <label htmlFor="search">Поиск валюты:</label>
            <input type="text" value={value} onChange={handleChange} id="search"></input>
        </form>
    )
}