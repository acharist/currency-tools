import React, { useState } from "react";
import arr from './arr.svg';
import PriceChanges from './PriceСhanges';
import financial from '../../utilities/financial';

function calculateDiff(current, previous) {
    if(typeof current === 'number' && typeof previous === 'number') {
        const result = {
            verdict: null,
            difference: Math.abs(current - previous)
        }
        
        current > previous ? result.verdict = 'increase' : result.verdict = 'decline';

        return result;
    } else {
        throw new Error('The type of both function arguments must be numeric');
    }
}

export default function Сurrency({ currency }) {
    const [value, setValue] = useState(currency.Value);
    const [charCodes, setCharCodes] = useState({ basic: currency.CharCode, quoted: 'RUB' });

    let { verdict, difference } = calculateDiff(financial(currency.Value),
                                                financial(currency.Previous));

    function hangleSwitch() {
        // НЕ КОРРЕКТНО!!!
        value === currency.Value ? setValue(financial(currency.Nominal / currency.Value)) : setValue(currency.Value);
        setCharCodes({
            basic: charCodes.basic === currency.CharCode ? 'RUB' : currency.CharCode,
            quoted: charCodes.quoted === 'RUB' ? currency.CharCode : 'RUB'
        })
    }

    return (
        <div className="currency component">
            <h4 className="currency__name">{currency.Name}</h4>
            <div className="currency-relation">
                <div className="currency-relation__left">
                    <span className="currency__basic-nominal">{currency.Nominal + ' '}</span>
                    <span className="currency__basic-char-code">{charCodes.basic}</span>
                </div>
                <img src={arr} alt="arrows" className="switcher" onClick={hangleSwitch} />
                <div className="currency-relation__right">
                    <span className="currency__quoted-value">{value + ' '}</span>
                    <span className="currency__quoted-char-code">{charCodes.quoted}</span>
                </div>
                <PriceChanges verdict={verdict} difference={difference}/>
            </div>
        </div>
    )
}