import React, { useState, useContext } from 'react';
 import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap'
import { right } from '@popperjs/core';
import { UserContext } from '../UserContext';
import { get } from 'http';
import { log } from 'util';
import { useStateWithCallbackLazy } from 'use-state-with-callback';



function Convert() {

    const [convertAmount, setConvertAmount] = useStateWithCallbackLazy(0);
    const [currencyTo, setCurrencyTo] = useStateWithCallbackLazy({symbol:null, fullName:null, persianName:null});
    const [currencyFrom, setCurrencyFrom] = useStateWithCallbackLazy({symbol:null, fullName:null, persianName:null});
    const [currencyAvailable, setCurrencyAvailable] = useState(0);
    const { currencyList, karmozd, user } = useContext(UserContext);
    let karmozdAmount = 0;
    let conversionResult = 0;
    const ratio = {
        "BTC-LTC": 10,
        "BTC-MTC": 20,
        "BTC-STC": 30,
        "BTC-WTC": 40
    }   
    
    const computePrices = e=>{
        
        if(!currencyFrom.symbol || !currencyTo.symbol || !convertAmount) return;
        let key = `${currencyFrom.symbol}-${currencyTo.symbol}`
        let rate = ratio[key];
        
        conversionResult = Math.round(1000*(rate * convertAmount) || 0)/1000;
        karmozdAmount =  Math.round(1000* karmozd * (convertAmount / 0.1))/ 1000 || 0;
    }
    const changeConvertAmount = e=>{
        
        let enteredValue = e.target.value;
        
        if(currencyAvailable)
            enteredValue = Math.min(enteredValue, currencyAvailable);
        
        setConvertAmount(enteredValue);

    }
    const changeCurrencyFrom = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.fullName==selectedCurrency)[0];
        let sym = selectedCurrency.symbol;
        let av = Object.keys(user.currencies).includes(sym) && user.currencies[sym] || 0;
        setConvertAmount(Math.min(convertAmount, av));
        setCurrencyFrom(selectedCurrency);
        setCurrencyAvailable (av);   

    }
    const changeCurrencyTo = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.fullName==selectedCurrency)[0];
        setCurrencyTo(selectedCurrency);
    }
    computePrices();
    return (
        <>
            <style type="text/css">
                {`
                    .form-label{
                        padding-right: 4px;
                    }
                `}
            </style>
            
            <Card>
                <Card.Header >
                    <Card.Title>تبدیل</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="buy-sell-widget">
                        <form method="post" name="myform" className="currency_validate row">
                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label" htmlFor="currency_amount">مقدار</label>
                                <input type="text" pattern="[0-9]*\.{0,1}[0-9]*" name="currency_amount" className="form-control" value={convertAmount} onChange={ changeConvertAmount }
                                    placeholder="100" />          
                            </div>

                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label">ارز </label>
                                <select name='currency' className="form-control" onChange={changeCurrencyFrom} value={currencyFrom.fullName}>
                                    <option value={0}>انتخاب</option>
                                    { 
                                        currencyList.map((c, idx)=>{
                                            return Object.keys(user.currencies).includes(c.symbol) && <option key={idx} value={c.fullName}> {c.persianName}</option>
                                        })
                                    }
                                  
                                </select>
                            </div>
                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label">را به ارز </label>
                                <select name='currency' className="form-control" aria-describedby={"#convertionResult"} onChange={changeCurrencyTo}
                                 value={currencyTo.fullName}>
                                    <option value={0}>انتخاب</option>
                                    { 
                                        currencyList.map((c, idx)=>{
                                            return c.fullName!=currencyFrom.fullName &&
                                                  <option key={idx} value={c.fullName}> {c.persianName}</option>
                                        })
                                    }
                                </select>
                                {/* {
                                    currencyTo.symbol &&
                                    <small id="convertionResult" className="form-text text-muted">
                                        { conversionResult } {" "} { currencyTo.persianName } دریافت خواهید کرد
                                    </small>
                                } */}
                            </div>

                            <div className="col-12 row">
                                
                                <div className="col-12 col-md-8" style={{paddingLeft: 0}}>
                                    <div className="col-12 row mb-3">
                                        <div className=" col-xl-6 mb-0" style={{paddingLeft: 0}}>
                                            <label className="form-label" htmlFor="currency_amount_available">موجودی</label>
                                            <input type="text" name="currency_amount_available" className="form-control pe-none" value={currencyAvailable} 
                                                placeholder="" /> 
                                        </div>
                                        <div className="col-4 align-items-end d-flex px-0">
                                            { currencyFrom.symbol &&
                                                <button type="button" className="btn-outline-success bg-transparent  text-white px-2 py-2 me-4" onClick={e=>setConvertAmount(currencyAvailable)}>
                                                    <small className="text-nowrap">انتخاب کل موجودی</small>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-12 row mb-3">
                                        <div className=" col-xl-6 mb-0" style={{paddingLeft: 0}}>
                                            <label className="form-label" htmlFor="karmozd">کارمزد</label>
                                            <input type="text" name="karmozd" className="form-control pe-none " value={karmozdAmount} 
                                                placeholder="" /> 
                                        </div>
                                    </div>
                                    <div className=" col-xl-12 row ">
                                        <div className=" col-xl-6 mb-0" style={{paddingLeft: 0}}>
                                            <label className="form-label" htmlFor="conversion-result">دریافتی شما</label>
                                            <input type="text" name="conversion-result" className="form-control pe-none" value={conversionResult} 
                                                placeholder="" /> 
                                        </div>
                                        <div className="col-4 align-items-end d-flex px-0">
                                            {conversionResult!=0 && <span className="px-3 text-white" style={{height: 45+"px", lineHeight: 45+"px"}}>{ currencyTo.symbol }</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 row flex-column justify-content-between p-0">
                                    <div className="col-12 p-3">
                                        { conversionResult!=0 &&
                                            <div className="text-center">
                                                <small>قیمت خرید هر { currencyTo.persianName }</small>
                                                <h1 className="text-success mt-4">
                                                    { ratio[currencyFrom.symbol +"-"+currencyTo.symbol] }
                                                </h1>
                                                <small>با پرداخت
                                                    <span className="text-success px-1">{ convertAmount}</span>
                                                    { currencyFrom.persianName }
                                                    <span className="text-success px-1">{ conversionResult }</span>
                                                    <span className="px-1">{ currencyTo.persianName }</span>
                                                    دریافت می کنید
                                                </small>
                                            </div>
                                        }
                                    
                                    </div>
                                    <div className="col-12 p-0">
                                        <div className="d-flex justify-content-between align-items-end p-0 ">
                                            {/* <div className=" col-xl-6 mb-0" style={{paddingLeft: 0}}>
                                                <label className="form-label" htmlFor="conversion-result">دریافتی شما</label>
                                                <input type="text" name="conversion-result" className="form-control pe-none" value={conversionResult} 
                                                    placeholder="" /> 
                                            </div> */}
                                            <i></i>
                                            <button type="submit" name="submit"
                                                className="btn btn-success px-5 w-100" disabled={!convertAmount || !currencyFrom.symbol || !currencyTo.symbol}>تبدیل کن</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            


                        </form>
                    </div>
    
                </Card.Body>
            </Card>
        </>
    )
}
export default Convert;


