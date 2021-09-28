import React, { useState, useEffect, useRef } from 'react';
import {  Card, Modal, Button } from 'react-bootstrap'
import { fetch_currencies, update_next_refresh } from '../../redux/actions'

import { update_available_currency,
         update_convert_amount,
         update_currency_from,
         update_currency_to,
        update_detail_modal
    } from '../../redux/actions/indexConverter'
import { useSelector, useDispatch } from 'react-redux'
import Timer from './Timer'
import axios from 'axios'
import qs from 'qs'
function Convert() {
    const dispatch = useDispatch();
    const indexConverter = useSelector(state=>state.indexConverter);
    const { currencyList, convertRates } = useSelector(state=>state.currencies);
    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)
    const [interval, setInterval2] = useState(false) 
    // const {convertAmount, currencyTo, currencyFrom, currencyAvailable, showDetailModal} = indexConverter
    const [convertAmount, setConvertAmount]  = useState(0)
    const [currencyTo, setCurrencyTo]  = useState({})
    const [currencyFrom, setCurrencyFrom]  = useState({})
    const [currencyAvailable, setCurrencyAvailable]  = useState(0)
    const convertErrorMessage   = useRef("")
    const [showDetailModal, setShowDetailModal]  = useState(false)
    const [R, setR] = useState(false)
    const handleDetailModalClose = () => setShowDetailModal(false);
    const handleDetailModalShow = () => setShowDetailModal(true);
    const [convertInvalid, setConvertInvalid] = useState(0)
    
    const convertDetails= useRef({
        karmozdAmount: 0,
        fixedKarmozd: 0,
        lowCredit: "",
        endPrice: 0,
        conversionResult:0,
        convertResult: 0,
        convertErrorMessage: ""

    })
    
    
    useEffect(() => {
        const currentTime = new Date()  
        const currentTimeUnix = currentTime.getTime();//current unix timestamp
        const execTime = new Date()
        execTime.setMinutes(currentTime.getMinutes()+1)
        execTime.setSeconds(2)
        
        let timeLeft = execTime - currentTimeUnix;
        setTimeout(function() {

            if(!interval){
                setInterval(function() {
                    dispatch(update_next_refresh(new Date().getTime()))
                    dispatch(fetch_currencies());
                }, 60000)  
                setInterval2(true)
            }
    
            dispatch(update_next_refresh(new Date().getTime()))
            dispatch(fetch_currencies());
        }, timeLeft); 
        dispatch(fetch_currencies());
        dispatch(update_next_refresh(execTime.getTime()))
    }, [])
   

    //  set next refresh time on store
    

   

    const get_available = (symbol)=>{
        
        if (!wallet || !wallet.length ) return 0;
        const target = wallet.filter((item, i)=>{
            return item["service"]["small_name_slug"] === symbol
        })
        
        if (target.length > 0){
            return target[0]["balance"]
        }else{
            return 0
        }
    }
   

    const computePrices =  ()=>{
        let convertInvalid2 = false
        let lowCredit = false
        let convertErrorMessage = ""
      
        if(!currencyFrom.small_name_slug || !currencyTo.small_name_slug || !convertDetails.current.convertAmount || convertDetails.current.lowCredit){
            convertInvalid2 = true;
        } 

        let data = qs.stringify({
            'source': String(currencyFrom.id),
           'destination': String(currencyTo.id),
           'changed': "source",
           'source-price': convertAmount,
           'destination-price': '0' 
        });
      
        axios.post("https://hi-exchange.com/api/v2/order/calculator/", data, {
               headers:{
                   "Content-type": "application/x-www-form-urlencoded"
               }
           }).then(response=>{
            if (!response) throw Error("no resp")
            const {data} = response

            if(data.message){
                convertErrorMessage = data.message
                if(+data.error===1)
                    convertInvalid2 = true;
            }
            lowCredit = +data["enough_balance"] === 0
            if(lowCredit) convertInvalid2 = true
            const prec2 = Math.max(5, +data["source_decimal"] , +data["destination_decimal"])
            convertDetails.current= {
                convertErrorMessage,
                lowCredit,
                endPrice: Math.round(Math.pow(10, prec2) * +data["unit_price"])/Math.pow(10,prec2),
                karmozdAmount: data["total_fee"],
                fixedKarmozd: data["fix_fee"],
                convertResult: Number(data["destination_price"]).toLocaleString()
            }
            setConvertInvalid(convertInvalid2)
            console.log(convertDetails);
            
        }).catch(err=>{
            console.log(err);
            
        })
    }
    const changeCurrencyFrom = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.small_name_slug==selectedCurrency)[0];
        let sym = selectedCurrency.small_name_slug;
        let av = get_available(sym)
        setCurrencyFrom(selectedCurrency);
        setCurrencyAvailable(av);   

    }
    const changeCurrencyTo = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency|| selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.small_name_slug==selectedCurrency)[0];        
        setCurrencyTo(selectedCurrency)
    }
    const changeAmount = (a)=>{
        setConvertAmount(a)
    }
    useEffect(()=>{
        console.log("Rendered");
    }, [convertDetails, currencyTo,currencyFrom, convertAmount])
    console.log(convertDetails);
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
                    <Card.Title className="w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <span>تبدیل</span>
                            <Timer></Timer>
                        </div>
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="buy-sell-widget convert-widget">
                        <form method="post" name="myform" className="currency_validate row">
                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label" htmlFor="currency_amount">مقدار</label>
                                <input type="number"  name="currency_amount" className="form-control" value={convertAmount} onChange={(e)=> changeAmount(e.target.value) }
                                    placeholder="100" /> 
                                {convertDetails.current.lowCredit && <a href="wallet" className="form-text text-muted text-nowrap">
                                    <small className="text-danger">اعتبار ناکافی ! </small>
                                    <small className="text-success me-2">شارژ کیف پول</small></a>}         
                            </div>

                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label">ارز </label>
                                <select name='currency' className="form-control" onChange={changeCurrencyFrom} value={currencyFrom.small_name_slug}>
                                    <option value={undefined}>انتخاب</option>
                                    { 
                                        currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                            return  <option key={idx} value={c.small_name_slug}> {c.name}</option>
                                        })
                                    }
                                  
                                </select>
                            </div>
                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label">را به ارز </label>
                                <select name='currency' className="form-control" aria-describedby={"#convertionResult"} onChange={changeCurrencyTo}
                                 value={currencyTo.small_name_slug}>
                                    <option value={undefined}>انتخاب</option>
                                    { 
                                        currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                            return c.small_name_slug!=currencyFrom.small_name_slug &&
                                                  <option key={idx} value={c.small_name_slug}> {c.name}</option>
                                        })
                                    }
                                </select>
                                
                            </div>

                            <div className="col-12 row mx-0">
                                <div className=" col-xl-12 mb-3 d-flex align-items-center p-0">
                                    <small  htmlFor="currency_amount_available">موجودی :</small>
                                    <span className="text-success px-2 fs-4 pt-1" dir="ltr">{ currencyAvailable } {" "} { currencyFrom.small_name_slug  }</span>
                                    { currencyFrom.small_name_slug &&
                                        <div className="select-all-tooltip me-2" alt="انتخاب کل موجودی" onClick={()=>{setConvertAmount(currencyAvailable)}}>$</div>
                                    }
                                </div>
                                {!convertInvalid && <div className="col-12 mx-auto p-0" >
                                    
                                    <div className="col-12 row mb-3 mx-0">
                                        
                                        <small className="d-flex justify-content-between w-100 px-0">
                                            <span>با پرداخت</span>
                                            <span className="text-nowrap me-2">
                                                <span className="text-success px-1 fs-4">{ convertDetails.current.convertAmount}</span>
                                                { currencyFrom.name }
                                            </span>
                                            <span className="text-nowrap me-auto ms-2">
                                                <span className="text-success px-1 fs-4">{ convertDetails.current.convertResult }</span>
                                                <span className="px-1">{ currencyTo.name }</span>
                                            </span>
                                            <span>
                                            دریافت می کنید
                                            </span>
                                        </small>
                                    </div>

                                    <div className="col-12 row mb-3 mx-0">
                                        <small className="px-0">
                                            <label>کارمزد :</label>
                                            <span className="text-success px-2 fs-4">{ convertDetails.current.karmozdAmount }</span>
                                        </small>
                                    </div>

                                    <div className="col-12 row mb-3 mx-0">
                                        <small className="d-flex justify-content-between px-0">
                                            <label>قیمت تمام شده هر واحد 
                                                <i className="px-2">{ currencyTo.name }</i>
                                                :
                                            </label>
                                            <span > <span className="text-success px-2 fs-4 ">{ convertDetails.current.endPrice }</span>  <i>{ currencyFrom.name}</i></span>
                                        </small>
                                    </div>
                                    
                                   
                                </div>}
                                {convertDetails.current.convertErrorMessage !== "" ?
                                <div className="border-danger border1">
                                    <small className="text-danger" style={{fontSize: 11+"px"}}>{convertErrorMessage.current}</small>
                                </div>
                                :undefined
                                }
                                <div className=" col-12 row flex-column p-0 mt-3">
                                    <div className="d-flex  align-items-end p-0 me-auto col-6">
                                        <button type="button" name="submit" onClick={handleDetailModalShow}
                                            className="btn btn-success px-5 w-100" style={{lineHeight: 1}} disabled={!convertAmount || !currencyFrom.small_name_slug || !currencyTo.small_name_slug ||convertInvalid}>تبدیل کن</button>
                                    </div>
                                </div>
                            </div>
                            


                        </form>
                    </div>
    
                </Card.Body>
            </Card>
            <Modal show={showDetailModal} onHide={handleDetailModalClose} className="convert-detail-modal">
                <Modal.Header closeButton>
                <Modal.Title>گزارش تبدیل</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="detail-rows d-flex flex-column">
                        <div className="detail-row">
                            <span>نوع سفارش</span>
                            <span className="text-success">
                                تبدیل { currencyFrom.small_name_slug } به { currencyTo.small_name_slug }
                            </span>
                        </div>
                        <div className="detail-row">
                            <span>رمز ارز و میزان</span>
                            <span dir="ltr">
                            {convertAmount}  {currencyFrom.small_name_slug}
                            </span>  
                        </div>
                        <div className="detail-row">
                            <span>کارمزد انجام تراکنش</span>
                            <span>
                                {convertDetails.current.karmozdAmount - convertDetails.current.fixedKarmozd} {" تومان "} 
                            </span>  
                        </div>
                        <div className="detail-row">
                            <span>کارمزد انتقال</span>
                            <span>
                                { convertDetails.current.fixedKarmozd } {" تومان "} 
                            </span>  
                        </div>
                        <div className="detail-row">
                            <span>مبلغ نهایی سفارش</span>
                            <span>
                                { convertDetails.current.karmozdAmount + convertDetails.current.conversionResult  } {" تومان "} 
                            </span>  
                        </div>
                        <div className="col-12 mt-4">
                            <span>توضیحات برای کارشناسان:</span>
                            <input type="text" className="form-control"/> 
                            <small class="form-help fs-6"><i>الزامی نیست</i></small>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handleDetailModalClose}>
                    لغو
                </Button>
                <Button variant="success" onClick={handleDetailModalClose}>
                    تایید تراکنش
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Convert;


