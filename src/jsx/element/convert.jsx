import React, { useContext } from 'react';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap'
import { UserContext } from '../UserContext';

import { update_available_currency,
         update_convert_amount,
         update_currency_from,
         update_currency_to,
        update_detail_modal} from '../../redux/actions/indexConverter'
import { useSelector, useDispatch } from 'react-redux'


function Convert() {
    const dispatch = useDispatch();
    const indexConverter = useSelector(state=>state.indexConverter);
    const currencies = useSelector(state=>state.currencies);

    const { currencyList, convertRates } = currencies;
    const {convertAmount, currencyTo, currencyFrom, currencyAvailable, showDetailModal} = indexConverter
    const { karmozd, user } = useContext(UserContext);
    const handleDetailModalClose = () => dispatch(update_detail_modal(false));
    const handleDetailModalShow = () => dispatch(update_detail_modal(true));;

    let karmozdAmount = 0;
    let conversionResult = 0;
    let endPrice = 0;
    let convertInvalid = true;



    const computePrices = e=>{
        if(convertAmount && currencyFrom.small_name_slug )
            convertInvalid =  convertAmount > currencyAvailable ;

        if(!currencyFrom.small_name_slug || !currencyTo.small_name_slug || !convertAmount) return;
        let key = `${currencyFrom.small_name_slug}/${currencyTo.small_name_slug}`
        let rate = convertRates[key];
        const RR = Math.pow(10,Math.max(currencyFrom.decimal, currencyTo.decimal)) || 3
        
        
        conversionResult = Math.round(RR*(rate * convertAmount) || 0)/RR;
        karmozdAmount =  Math.round(RR* karmozd * conversionResult)/ RR || 0;
        endPrice = Math.round(RR * convertAmount/conversionResult)/ RR ;
    }
    const changeCurrencyFrom = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.small_name_slug==selectedCurrency)[0];
        let sym = selectedCurrency.small_name_slug;
        let av = Object.keys(user.currencies).includes(sym) && user.currencies[sym] || 0;
        dispatch(update_currency_from(selectedCurrency));
        dispatch(update_available_currency(av));   

    }
    const changeCurrencyTo = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.small_name_slug==selectedCurrency)[0];
        dispatch(update_currency_to(selectedCurrency));
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
                    <div className="buy-sell-widget convert-widget">
                        <form method="post" name="myform" className="currency_validate row">
                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label" htmlFor="currency_amount">مقدار</label>
                                <input type="number"  name="currency_amount" className="form-control" value={convertAmount} onChange={(e)=> dispatch(update_convert_amount(e.target.value)) }
                                    placeholder="100" /> 
                                {convertInvalid && <a href="wallet" className="form-text text-muted text-nowrap">
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
                                    <span className="text-success px-2 fs-4 pt-1" dir="ltr">{ currencyAvailable } {" "} { currencyFrom.small_name_slug }</span>
                                    { currencyFrom.small_name_slug &&
                                        <div className="select-all-tooltip me-2" alt="انتخاب کل موجودی" onClick={()=>{dispatch(update_convert_amount(currencyAvailable))}}>$</div>
                                    }
                                </div>
                                {!convertInvalid && <div className="col-12 mx-auto p-0" >
                                    
                                    <div className="col-12 row mb-3 mx-0">
                                        
                                        <small className="d-flex justify-content-between w-100 px-0">
                                            <span>با پرداخت</span>
                                            <span className="text-nowrap me-2">
                                                <span className="text-success px-1 fs-4">{ convertAmount}</span>
                                                { currencyFrom.name }
                                            </span>
                                            <span className="text-nowrap me-auto ms-2">
                                                <span className="text-success px-1 fs-4">{ conversionResult }</span>
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
                                            <span className="text-success px-2 fs-4">{ karmozdAmount }</span>
                                        </small>
                                    </div>

                                    <div className="col-12 row mb-3 mx-0">
                                        <small className="d-flex justify-content-between px-0">
                                            <label>قیمت تمام شده هر واحد 
                                                <i className="px-2">{ currencyTo.name }</i>
                                                :
                                            </label>
                                            <span > <span className="text-success px-2 fs-4 ">{ endPrice }</span>  <i>{ currencyFrom.name}</i></span>
                                        </small>
                                    </div>
                                    
                                   
                                </div>}
                                <div className=" col-12 row flex-column p-0 mt-3">
                                    <div className="d-flex  align-items-end p-0 me-auto col-6">
                                        <button type="button" name="submit" onClick={handleDetailModalShow}
                                            className="btn btn-success px-5 w-100" style={{lineHeight: 1}} disabled={!convertAmount || !currencyFrom.small_name_slug || !currencyTo.small_name_slug || convertInvalid}>تبدیل کن</button>
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
                                {karmozdAmount} {" تومان "} 
                            </span>  
                        </div>
                        <div className="detail-row">
                            <span>کارمزد انتقال</span>
                            <span>
                                { 5000 } {" تومان "} 
                            </span>  
                        </div>
                        <div className="detail-row">
                            <span>مبلغ نهایی سفارش</span>
                            <span>
                                { karmozdAmount*20000 } {" تومان "} 
                            </span>  
                        </div>
                        <div className="detail-row">
                            <span>وضعیت کیف پول</span>
                            <span  className="text-danger">
                                موجودی ناکافی
                            </span>  
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


