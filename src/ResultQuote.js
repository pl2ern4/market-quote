import React from 'react';
import { Button } from 'react-bootstrap';

export default function ResultQuote(params){
    return (
        <div className="grey-background result-quote">
            {!params.quote &&
                <div className="result-Error">
                    Sorry currency not Supportive
                </div>
            }
            { params.quote &&
                <>
                    <span className="ofx-rate-heading">OFX Customer Rate</span>
                    <p><span className="rate">{params.quote.CustomerRate}</span></p>
                    <div className="converted-amount">
                        <Amount 
                            text='From' 
                            currencyCode={params.fromCurrencyCode} 
                            currencyAmount={params.quote.CustomerAmount}/>
                        <Amount 
                            text='To' 
                            currencyCode={params.toCurrencyCode} 
                            currencyAmount={params.quote.ComparisonAmount}/>
                    </div>
                    </>
            }  
            <Button variant="primary" type="button" onClick={e=>params.getNewQuote()}>
                START NEW QUOTE
            </Button>
                
        </div>
    )
}
function Amount(params){
    return(
        <>
            <span className="align-side">{params.text}</span>
            <p>
                <span className="currency">{params.currencyCode}</span>
                <span className="amount">{params.currencyAmount}</span>
            </p>
        </>
    )
}