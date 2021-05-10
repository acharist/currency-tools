import React from "react";
import arrUp from './arr-up.svg';
import arrDown from './arr-down.svg';
import financial from '../../utilities/financial';

export default function PriceСhanges({ verdict, difference }) {
    let content;

    if(verdict === 'increase') {
        content = <div className="increase">
            <img src={arrUp} alt="increase" />
            <span>{financial(difference)}</span>
        </div>
    } else {
        content = <div className="decline">
            <img src={arrDown} alt="decline" />
            <span>{financial(difference)}</span>
        </div>
    }

    return (
        <div className="price-difference">
            {content}
        </div>
    )
}