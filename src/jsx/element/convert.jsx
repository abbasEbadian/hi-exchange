import React, { useState, useEffect, useRef } from 'react';
import {  Card, Modal, Button } from 'react-bootstrap'
import { fetch_currencies, update_next_refresh, creating_order, create_order } from '../../redux/actions'
import {Link} from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import Timer from './Timer'
import axios from 'axios'
import qs from 'qs'
function Convert() {
    const dispatch = useDispatch();
    const convertDetails = useSelector(state=>state.indexConverter.details);
    const { currencyList, convertRates } = useSelector(state=>state.currencies);
    const user = useSelector(state => state.session.user)
    const wallet = useSelector(state => state.wallet.wallet)
    const [interval, setInterval2] = useState(false) 
    // const {convertAmount, currencyTo, currencyFrom, currencyAvailable, showDetailModal} = indexConverter
    const [convertAmount, setConvertAmount]  = useState(0)
    const [currencyTo, setCurrencyTo]  = useState({})
    const [currencyFrom, setCurrencyFrom]  = useState({})
    const [currencyAvailable, setCurrencyAvailable]  = useState(0)
    const [showDetailModal, setShowDetailModal]  = useState(false)
    const [convertInvalid, setConvertInvalid]  = useState(true)
    const handleDetailModalClose = () => setShowDetailModal(false);
    const handleDetailModalShow = () => setShowDetailModal(true);
    const lowCredit = useRef(false)
    const convertErrorMessage = useRef("")
    const [orderMessage, setOrderMessage] = useState("")
    

    const get_available = (symbolid)=>{
        if (!wallet || wallet.length===0 )return 0
        const target = wallet.filter((item, i)=>{
            return item&& item["service"]&&item["service"]["id"] === symbolid
        })
         return target.length > 0 ? target[0]["balance"] : 0
    }
    const convertFeeToIrt=(id, amount)=>{
        if(!currencyList || !currencyList.length) return 0;
        else{
            const c = currencyList.filter((item)=>{return item&&item.id===id})
            return c && c.length ?amount * (+c[0].show_price_irt): 0
        }
    }
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
   

    const handleDetailModalConfirm = ()=>{
        dispatch(creating_order(true))
        const _wallet = wallet && wallet.length? 
                wallet.filter(item=>item&&item.service.id === currencyTo.id).length?
                wallet.filter(item=>item&&item.service.id === currencyTo.id)[0].id:undefined:undefined
        const data= {
            source_price: convertAmount,
            destination_price: convertDetails.convertResult,
            source_asset: currencyFrom.id,
            destination_asset: currencyTo.id,
            wallet: _wallet,
            description: orderMessage,
            type:"swap" 
        }
        dispatch(create_order(data, toast, setShowDetailModal))
    }


   
    
    const computePrices =  ({
        currencyToP = currencyTo,
        currencyFromP = currencyFrom,
        convertAmountP= convertAmount,
        currencyAvailableP= currencyAvailable
    })=>{
        let convertInvalid2 = false
        lowCredit.current = false
        
        
        if(convertAmountP && currencyFromP.small_name_slug ){
            lowCredit.current =  convertAmountP > currencyAvailableP ;
            if(lowCredit.current) convertInvalid2 = true;
        }
        
        if(!currencyFromP.small_name_slug || !currencyToP.small_name_slug || !convertAmountP || lowCredit.current){
            convertInvalid2 = true;
        }
        

        if(convertInvalid2){
            setConvertInvalid(true)
            return
        }
        

        let data = qs.stringify({
            'source': String(currencyFromP.id),
           'destination': String(currencyToP.id),
           'changed': "source",
           'source-price': convertAmountP,
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
                convertErrorMessage.current = data.message
                // if(+data.error===1)
                //     convertInvalid.current = true;
            }
            const prec2 = Math.max(8, +data["source_decimal"] , +data["destination_decimal"])
            
            const d ={
                endPrice: Math.round(Math.pow(10, prec2) * +data["unit_price"])/Math.pow(10,prec2),
                karmozdAmount: data["total_fee"],
                fixedKarmozd: data["fix_fee"],
                karmozd:data["fee"],
                convertResult: Number(data["destination_price"]).toLocaleString()
            }
            setConvertInvalid(false)
            dispatch({type: "UPDATE_DETAILS", payload: d})
            
        }).catch(err=>{
            console.log(err);
            
        })
    }
    const changeCurrencyFrom = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0];
        let symid = selectedCurrency.id;
        let av = get_available(+symid)
        setCurrencyFrom(selectedCurrency);
        setCurrencyAvailable(av);   
        computePrices({
            currencyFromP: selectedCurrency,
            currencyAvailableP: av
        });

    }
    const changeCurrencyTo = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency|| selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0];        
        setCurrencyTo(selectedCurrency)
        computePrices({currencyToP: selectedCurrency});
    }
    const changeAmount = (a)=>{
        setConvertAmount(a)
        computePrices({convertAmountP: +a});
    }
    

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
                                {lowCredit.current && <Link to="/wallet" className="form-text text-muted text-nowrap">
                                    <small className="text-danger">اعتبار ناکافی ! </small>
                                    <small className="text-success me-2">شارژ کیف پول</small></Link>}         
                            </div>

                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label">ارز </label>
                                <select name='currency' className="form-control" onChange={changeCurrencyFrom} value={currencyFrom.id}>
                                    <option value={undefined}>انتخاب</option>
                                    { 
                                        currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                            return  <option key={idx} value={c.id}> {c.name}</option>
                                        })
                                    }
                                  
                                </select>
                            </div>
                            <div className="mb-3 col-xl-4 mb-0">
                                <label className="form-label">را به ارز </label>
                                <select name='currency' className="form-control" aria-describedby={"#convertionResult"} onChange={changeCurrencyTo}
                                 value={currencyTo.id}>
                                    <option value={undefined}>انتخاب</option>
                                    { 
                                        currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                            return c.id!==currencyFrom.id &&
                                                  <option key={idx} value={c.id}> {c.name}</option>
                                        })
                                    }
                                </select>
                                
                            </div>

                            <div className="col-12 row mx-0">
                                <div className=" col-xl-12 mb-3 d-flex align-items-center p-0">
                                    <small  htmlFor="currency_amount_available">موجودی :</small>
                                    <span className="text-success px-2 fs-5 pt-1" dir="ltr">{ Number(currencyAvailable).toLocaleString() } {" "} { currencyFrom.small_name_slug  }</span>
                                    { currencyFrom.small_name_slug &&
                                        <div className="select-all-tooltip me-2" alt="انتخاب کل موجودی" onClick={()=>{changeAmount(currencyAvailable)}}>$</div>
                                    }
                                </div>
                                {!convertInvalid && <div className="col-12 mx-auto p-0" >
                                    
                                    <div className="col-12 row mb-3 mx-0">
                                        
                                        <small className="d-flex justify-content-between w-100 px-0">
                                            <span>با پرداخت</span>
                                            <span className="text-nowrap me-2">
                                                <span className="text-success px-1 fs-4">{ Number(convertAmount).toLocaleString()}</span>
                                                { currencyFrom.name }
                                            </span>
                                            <span className="text-nowrap me-auto ms-2">
                                                <span className="text-success px-1 fs-4">{ convertDetails.convertResult }</span>
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
                                            <span className="text-success px-2 fs-4">{ convertDetails.karmozdAmount }</span>
                                        </small>
                                    </div>

                                    <div className="col-12 row mb-3 mx-0">
                                        <small className="d-flex justify-content-between px-0">
                                            <label>قیمت تمام شده هر واحد 
                                                <i className="px-2">{ currencyTo.name }</i>
                                                :
                                            </label>
                                            <span > <span className="text-success px-2 fs-4 ">{ convertDetails.endPrice }</span>  <i>{ currencyFrom.name}</i></span>
                                        </small>
                                    </div>
                                    
                                   
                                </div>}
                                {convertErrorMessage.current !== "" && !convertInvalid ?
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
                                تبدیل { currencyFrom.name } به { currencyTo.name }
                            </span>
                        </div>
                        <div className="detail-row">
                            <span>رمز ارز و میزان</span>
                            <span dir="ltr">
                            <span className="text-success fs-5">{convertAmount}</span>  {currencyFrom.name}
                            </span>  
                        </div>
                        <div className="detail-row">
                        <span>کارمزد انتقال</span>
                            <span>
                                {convertDetails.karmozd} {" "} { currencyTo.name }
                            </span>  
                        </div>
                        <div className="detail-row">
                        <span>کارمزد انجام تراکنش</span>

                            <span>
                                { convertDetails.fixedKarmozd } {" "} { currencyTo.name }  
                            </span>  
                        </div>
                        <div className="detail-row">
                            <span>مبلغ نهایی سفارش</span>
                            <span>
                                { Number(convertFeeToIrt(currencyTo.id , +convertDetails.karmozdAmount) + (+convertAmount)).toLocaleString()  } {" "} { currencyFrom.name } 
                            </span>  
                        </div>
                        <div className="col-12 mt-4">
                            <label className="form-label">توضیحات برای کارشناسان:</label>
                            <input type="text" className="form-control f" value={orderMessage} onChange={e=>setOrderMessage(e.target.value)}/> 
                            <small className="form-text" style={{fontSize: "11px"}}><i>الزامی نیست</i></small>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="light" onClick={handleDetailModalClose}>
                    لغو
                </Button>
                <Button variant="success" onClick={handleDetailModalConfirm}>
                    تایید تراکنش
                </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
        </>
    )
}
export default Convert;


