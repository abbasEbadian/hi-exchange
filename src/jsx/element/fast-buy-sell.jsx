import React, { useState, useEffect, useRef } from 'react';
import {  Tab, Tabs, Form, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { creating_order, create_order } from '../../redux/actions';
import TradingViewWidget from 'react-tradingview-widget';
import { Themes } from 'react-tradingview-widget';
import qs from 'qs'
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'
import Loader from 'react-loader-spinner'
import { Constants } from '../../Constants';
function FastBuySell() {
    const dispatch = useDispatch()

    const {currencyList}  = useSelector(state => state.currencies)
    const wallet  = useSelector(state => state.wallet.wallet)
    const _creating_order  = useSelector(state => state.accounts.creating_order)
    const [tab, setTab] = useState("buy")
    const [ chartOpen, setChartOpen ] = useState(true)
    const [buyConvertAmount, setBuyConvertAmount] = useState(0)
    const [sellConvertAmount, setSellConvertAmount] = useState(0)
    const [buyConvertInvalid, setBuyConvertInvalid] = useState(0)
    const [sellConvertInvalid, setSellConvertInvalid] = useState(0)
    const [buySource, setBuySource] = useState({})
    const [sellDestination, setSellDestination ] = useState({})

    const sellConvertErrorMessage = useRef("")
    const buyConvertErrorMessage = useRef("")

    const sellAvailableCurrencyR = useRef(0)
    const buyAvailableCurrencyR = useRef(0)
    // const buySourceR = useRef({small_name_slug: undefined})
    const sellSourceR = useRef({small_name_slug: undefined})

    const buyDestinationR = useRef({small_name_slug: undefined})

    const sellDestinationR = useRef({small_name_slug: undefined})

    const buyLowCreditR = useRef(false)
    const sellLowCreditR = useRef(false)

    const buyConversionResultR = useRef(0)
    const buyConversionResultStrR = useRef(0)
    const buyEndPriceR = useRef(0)
    const buyKarmozdAmountR = useRef(0)
    const buyFixedKarmozdR = useRef(0)
    const buyTotalR = useRef(0)
    const sellConversionResultR = useRef(0)
    const sellConversionResultStrR = useRef(0)
    const sellEndPriceR = useRef(0)
    const sellKarmozdAmountR = useRef(0)
    const sellFixedKarmozdR = useRef(0)
    const sellTotalR = useRef(0)
    const buyUnitPrice = useRef(0)
    const sellUnitPrice = useRef(0)

    const buyConvertValidR = useRef(false)
    const sellConvertValidR = useRef(false)

    const buyAmountRef = useRef(0)
    // const sellConvertValidR = useRef(false)


    const [selectedChart1, setSelectedChart1] = useState()
    const [selectedChart2, setSelectedChart2] = useState()

    const [fastModal, setFastModal] = useState(false)
    const handleBuyConfirm = ()=>{
        dispatch(creating_order(true))
        const _wallet = wallet && wallet.length? 
                wallet.filter(item=>item&&item.service&&item.service.id === buySource.id).lenght?
                wallet.filter(item=>item&&item.service&&item.service.id === buySource.id)[0].id:undefined:undefined
        const data= {
            source_price: buyConversionResultStrR.current,
            destination_price: String(buyConvertAmount),
            source_asset: String(buySource.id),
            destination_asset: String(buyDestinationR.current.id),
            wallet: _wallet,
            description: "" ,
            type:"buy"
        }
        dispatch(create_order(data, toast))
    }
    const handleSellConfirm = ()=>{
        dispatch(creating_order(true))
        const _wallet = wallet && wallet.length? 
                wallet.filter(item=>item&&item.service&&item.service.id === buySource.id).lenght?
                wallet.filter(item=>item&&item.service&&item.service.id === buySource.id)[0].id:undefined:undefined
        const data= {
            source_price: String(sellConvertAmount),
            destination_price: sellConversionResultStrR.current,
            source_asset: String(sellSourceR.current.id),
            destination_asset: String(sellDestination.id),
            wallet: _wallet,
            changed:"source",
            description: "" ,
            type:"sell"
        }
        dispatch(create_order(data, toast))
    }
    


    const get_available = (symbolid)=>{
        if (!wallet || !wallet.length )return 0
        const target = wallet.filter((item, i)=>{
            return item&&item["service"]&&item["service"]["id"] === symbolid
        })
         return target.length > 0 ? target[0]["balance"] : 0
    }

    const changeBuySource = (e, selectedCurrency)=>{
        console.log(selectedCurrency);
        
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]
        let av = get_available(selectedCurrency.id)

        buyAvailableCurrencyR.current = av
        buyLowCreditR.current = false
        setBuyConvertAmount(0)
        setBuySource(selectedCurrency);
        computePrices({buyConvertAmountP: 0})
    }
    const changeBuyDestination = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]        
        buyDestinationR.current = selectedCurrency;
        buyLowCreditR.current = false
        setBuyConvertAmount(0)
        setSelectedChart1(selectedCurrency)
        computePrices({buyConvertAmountP: 0})

    }
    const changeSellDestination = (e, selectedCurrency)=>{
        selectedCurrency = currencyList.filter(c=>c.id===+selectedCurrency)[0]
        sellLowCreditR.current = false
        setSellDestination(selectedCurrency)
        setSellConvertAmount(0)
        setSelectedChart1(selectedChart2)
        computePrices({sellConvertAmountP: 0})
    }
    const changeSellSource = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]
        let av = get_available(selectedCurrency.id)
        sellSourceR.current = selectedCurrency;
        sellAvailableCurrencyR.current = av
        sellLowCreditR.current = false
        setSellConvertAmount(0)
        setSelectedChart2(selectedCurrency)

        computePrices({sellConvertAmountP: 0})
    }

    const changeBuyAmount = (value, rerender=true)=>{
        if (rerender)    
            computePrices({buyConvertAmountP: value})
        setBuyConvertAmount(value)
    }
    const changeSellAmount = (value, rerender=true)=>{
        if (rerender)    
            computePrices({sellConvertAmountP: value})
        setSellConvertAmount(value)
    }
    const computePrices = ({
        buyConvertAmountP= buyConvertAmount,
        sellConvertAmountP= sellConvertAmount,
        buyConvertAll=undefined
    })=>{
        
        if(tab === "buy"){
            
            if(!buyConvertAmountP && !buyConvertAll){
                buyEndPriceR.current =0
                buyKarmozdAmountR.current =0
                buyFixedKarmozdR.current =0
                buyConversionResultR.current =0
                buyConversionResultStrR.current = 0
                buyTotalR.current = 0
                buyLowCreditR.current = false
                buyConvertErrorMessage.current = ""

                setBuyConvertInvalid(true)
                return

            }
            const data = qs.stringify({
                'source': String(buySource.id), 
                'destination': String(buyDestinationR.current.id),
                'changed': !buyConvertAll && 'destination' || 'source',
                'source-price': buyConvertAll || '0',
                'destination-price': !buyConvertAll && buyConvertAmountP || '0'
            })
            axios.post(Constants.BASE_URL + "/api/v2/order/calculator/", data, {
               headers:{
                   "Content-type": "application/x-www-form-urlencoded"
               }
           }).then(response=>{
                if (!response) throw Error("no resp")
                const {data} = response
                if(data.message){
                    buyConvertErrorMessage.current = data.message 
                    
                }else
                    buyConvertErrorMessage.current = ""
                
                    
               
                const prec2 = Math.max(8, +data["source_decimal"] , +data["destination_decimal"])
               
                buyEndPriceR.current =  Math.round(Math.pow(10, prec2) * +data["unit_price"])/Math.pow(10,prec2)
                buyKarmozdAmountR.current =  +data["total_fee"] || 0
                buyFixedKarmozdR.current =  +data["fix_fee"] || 0
                buyConversionResultR.current =   buyConvertAmountP? +data["source_price"]: 0
                buyConversionResultStrR.current =  buyConvertAmountP? data["source_price_str"]: 0
                buyUnitPrice.current = data['unit_price']
                const a = buyConversionResultR.current
                const a2 = buyDestinationR.current.show_price_irt * buyKarmozdAmountR.current
                const a3 = buyDestinationR.current.show_price_irt * buyFixedKarmozdR.current
                
                buyTotalR.current = (a+a2+a3).toLocaleString()

                if(data.message && data.message.indexOf("خرید")!==-1){
                    buyConversionResultR.current =   "-"
                    buyConversionResultStrR.current =  "-"
                   
                }
                if(buySource.small_name_slug === "IRT"){
                    buyUnitPrice.current = Number(Number(buyUnitPrice.current).toFixed()).toLocaleString()
                }
                if(buyConvertAll){
                    changeBuyAmount(data["destination_price"], false)
                    buyConversionResultR.current = +data['source_price']
                    buyConversionResultStrR.current = data['source_price_str']
                }

                console.log(buyConversionResultR, buyConversionResultStrR);
                
                // setBuyConvertAmount(buyConvertAmountP)
                buyLowCreditR.current = +buyConversionResultR.current > +buyAvailableCurrencyR.current
                setBuyConvertInvalid(Math.random())
               
           }).catch(error=>{
               console.log(error);
           })
        }else{
            if(!sellConvertAmountP || String(sellDestination.id) === String(sellSourceR.current.id)){
                sellEndPriceR.current =0
                sellKarmozdAmountR.current =0
                sellFixedKarmozdR.current =0
                sellConversionResultR.current =0
                sellConversionResultStrR.current = 0
                sellTotalR.current = 0
                sellLowCreditR.current = false
                sellConvertErrorMessage.current = ""

                setSellConvertInvalid(true)
                return

            }
            const data = qs.stringify({
                'source': String(sellSourceR.current.id), 
                'destination': String(sellDestination.id),
                'changed': 'source',
                'source-price': sellConvertAmountP,
                'destination-price': '0' 
            })
            axios.post(Constants.BASE_URL + "/api/v2/order/calculator/", data, {
               headers:{
                   "Content-type": "application/x-www-form-urlencoded"
               }
           }).then(response=>{
                if (!response) throw Error("no resp")
                const {data} = response
                
                if(data.message){
                    sellConvertErrorMessage.current = data.message
                }else
                    sellConvertErrorMessage.current = ""
                
                    
                
                const prec2 = Math.max(8, +data["source_decimal"] , +data["destination_decimal"])
               
                sellEndPriceR.current =  Math.round(Math.pow(10, prec2) * +data["unit_price"])/Math.pow(10,prec2)
                sellKarmozdAmountR.current =  +data["total_fee"] || 0
                sellFixedKarmozdR.current =  +data["fix_fee"] || 0
                sellConversionResultR.current =  sellConvertAmountP? +data["destination_price"]: 0
                sellConversionResultStrR.current =  sellConvertAmountP? data["destination_price_str"]: 0
                sellUnitPrice.current = data['unit_price']
                const a = sellConversionResultR.current
                const a2 = sellDestination.show_price_irt * sellKarmozdAmountR.current
                const a3 = sellDestination.show_price_irt * sellFixedKarmozdR.current
                
                sellTotalR.current = (a+a2+a3).toLocaleString()

                
                // setsellConvertAmount(sellConvertAmountP)
                console.log(sellConvertAmountP , +sellAvailableCurrencyR.current)
                sellLowCreditR.current = !sellConvertAmountP || sellConvertAmountP > +sellAvailableCurrencyR.current
                setSellConvertInvalid(Math.random())
               
           }).catch(error=>{
               console.log(error);
           })
        }
    }
   useEffect(() => {
        if(!buySource.id && currencyList.length>0) changeBuySource('',Constants.USDT_CURRENCY_ID)
        if(!sellDestination.id && currencyList.length>0) changeSellDestination('',Constants.USDT_CURRENCY_ID)
        
   }, [currencyList])
   
    return (
        <div className="card">
        <div className="card-body">
            <div className="buy-sell-widget">

                <Tabs activeKey={tab} onSelect={(k)=>setTab(k)} id="uncontrolled-tab-example">
                    <Tab eventKey="buy" title="خرید">
                        <form action="#" method="post" name="myform" className="currency_validate">
                            <div className="mb-3">
                                <label className="form-label"style={{width:"90px"}}>بازار به :</label>
                                <div className="button-group">
                                    <button type="button" className={buySource.id===Constants.USDT_CURRENCY_ID?"active":""} onClick={e=>changeBuySource(e, Constants.USDT_CURRENCY_ID)}>تتر</button>
                                    <button type="button" className={buySource.id===Constants.IRT_CURRENCY_ID ?"active":""} onClick={e=>changeBuySource(e, Constants.IRT_CURRENCY_ID)}>تومان</button>
                                </div>
                                {buyLowCreditR.current ? <Link to="/wallet" className="form-text text-muted text-nowrap pe-2">
                                    <small className="text-danger">اعتبار ناکافی ! </small>
                                    <small className="text-success me-2">شارژ کیف پول</small></Link>:undefined}   
                            </div>

                            <div className="mb-3 d-flex align-items-center">
                                <label className="form-label text-nowrap ps-3" style={{width:"90px"}}>انتخاب ارز:</label>
                                    <Form.Control as="select"  name='currency' className=" mb-3 px-2 w-50" onChange={changeBuyDestination} >
                                    <option value={undefined}>انتخاب</option>
                                        { 
                                        currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                            return   (c.id !== Constants.USDT_CURRENCY_ID) && (c.id !== Constants.IRT_CURRENCY_ID) && <option key={idx} value={c.id}> {c.name} / {buySource.name}</option>
                                        })
                                    }
                                        
                                    </Form.Control>
                                    
                            </div>

                            <div className="mb-3">
                                <label className="form-label">مقدار 
                                    {buyDestinationR.current && buyDestinationR.current.id? 
                                        <>
                                        <i className="px-2"> {buyDestinationR.current.name}</i>    
                                        مورد نظر
                                        </>:undefined
                                }
                                </label>
                                <div className="input-group position-relative">
                                    <span className={"position-absolute icofont-close-line cursor-poitner " + (!buyConvertAmount?"d-none":"")} 
                                        style={{right: 0, top: "6px", fontWeight: 100, fontSize: "32px", zIndex: 1000}} onClick={e=>{changeBuyAmount(0)}}></span>
                                    <input type="text" name="currency_amount" className="form-control" ref={buyAmountRef} value={buyConvertAmount} onFocus={e=>{changeBuyAmount("")}}  onChange={e=>changeBuyAmount(e.target.value)}
                                        placeholder="" />
                                    <input type="text" name="usd_amount" className="form-control " value={buyConversionResultStrR.current} readOnly
                                        placeholder="" />

                                    {buySource.name ? <div className="input-group-append p-0">
                                        <span className="input-group-text">{ buySource.name }</span>
                                    </div>:undefined}
                                </div>
                                
                            </div>
                            <div className=" col-xl-12 mb-3 d-flex align-items-center p-0">
                                    <small  htmlFor="currency_amount_available">موجودی :</small>
                                <span className="text-success px-2 fs-5 pt-1" dir="ltr">{ Number(buyAvailableCurrencyR.current).toLocaleString() } {" "} { buySource.small_name_slug  }</span>
                                { buySource.id &&
                                    <div className="select-all-tooltip me-2" alt="انتخاب کل موجودی" onClick={()=>{changeBuyAmount(buyAvailableCurrencyR.current)}}>$</div>
                                }
                            </div>
                            { buyConversionResultR.current? <>
                                <div className="mb-3 d-flex justify-content-between flex-wrap">
                                    <small className="text-nowrap">
                                        <span>با پرداخت </span>
                                        <span className="text-success px-2">{buySource.name}</span>
                                        <span>{buySource.name}</span>
                                    </small>
                                    <small className="text-nowrap flex-grow-1 text-start">
                                        <span className="text-success px-2">{buyConversionResultR.current}</span>
                                        <span className="px-1">{buyDestinationR.current.name}</span>
                                        <span>دریافت میکنید</span>   
                                    </small>
                                </div>
                                 <div className="col-12 row mb-3 mx-0 ">
                                    <small className="d-flex justify-content-between px-0 flex-wrap">
                                        <label className="text-nowrap">قیمت تمام شده هر واحد 
                                            <i className="px-2">{ buyDestinationR.current.name }</i>
                                            :
                                        </label>
                                        <span className="flex-grow-1 text-start"> <span className="text-nowrap text-success px-2 fs-4 ">{ buyUnitPrice.current }</span>  <i>{ buySource.name}</i></span>
                                    </small>
                                </div>
                                </>:undefined}
                                {buyConvertErrorMessage.current.length>0?
                                    <span className="text-danger mb-3" style={{fontSize: "12px"}}> {buyConvertErrorMessage.current} </span>
                                    :undefined
                                }
                            <button type="button" name="submit" onClick={handleBuyConfirm}
                            disabled={!+buyConvertAmount || !buyDestinationR.current.id || !buySource.id || buyLowCreditR.current || _creating_order}
                                className="btn btn-success w-100 d-flex justify-content-center">
                                    خرید
                                    {_creating_order? <Loader
                                        type="ThreeDots"
                                        height={25}
                                        width={40}
                                        color="#fff"
                                    ></Loader>:undefined}
                                    </button>

                        </form>
                    </Tab>
                    <Tab eventKey="sell" title="فروش" >
                        <form method="post" name="myform" className="currency2_validate">
                        <div className="mb-3 d-flex align-items-center">
                                <label className="form-label  text-nowrap" style={{width:"90px"}}>انتخاب ارز : </label>
                                <select name='currency' className="form-control w-50" onChange={changeSellSource} >
                                    <option value={undefined}>انتخاب</option>

                                        { 
                                            currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                            return  (c.id !== Constants.USDT_CURRENCY_ID) && (c.id !== Constants.IRT_CURRENCY_ID) && <option key={idx} value={c.id}> {c.name} / {sellDestination.name}</option>
                                            })
                                        }
                                </select>
                                {sellLowCreditR.current ?<Link to="/wallet" className="form-text text-muted text-nowrap pe-2">
                                    <small className="text-danger">اعتبار ناکافی ! </small>
                                    <small className="text-success me-2">شارژ کیف پول</small></Link>: undefined} 
                                
                            </div>

                            <div className="mb-3">
                                <label className="form-label" style={{width:"90px"}}>ارز دریافتی:</label>
                                <div className="button-group">
                                    <button type="button" className={sellDestination.id===Constants.USDT_CURRENCY_ID?"active":""} onClick={e=>changeSellDestination(e, Constants.USDT_CURRENCY_ID)}>تتر</button>
                                    <button type="button" className={sellDestination.id===Constants.IRT_CURRENCY_ID ?"active":""} onClick={e=>changeSellDestination(e, Constants.IRT_CURRENCY_ID)}>تومان</button>
                                </div>
                                    
                                </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    مقدار
                                    {sellSourceR.current && sellSourceR.current.id? 
                                        <>
                                        <i className="px-2"> {sellSourceR.current.name}</i>    
                                        مورد نظر
                                        </>:undefined
                                }</label>
                                <div className="input-group">
                                    <span className={"position-absolute icofont-close-line cursor-poitner " + (!sellConvertAmount?"d-none":undefined)} 
                                        style={{right: 0, top: "6px", fontWeight: 100, fontSize: "32px", zIndex: 1000}} onClick={e=>{changeSellAmount(0)}}></span>
                                    
                                    <input type="text" name="currency_amount" className="form-control" onFocus={e=>{changeSellAmount("")}} value={sellConvertAmount} onChange={e=>changeSellAmount(e.target.value)}
                                        placeholder="" />
                                    <input type="text" name="usd_amount" className="form-control " value={sellConversionResultStrR.current} readOnly
                                        placeholder="" />
                                    {sellDestination.name? <div className="input-group-append p-0">
                                        <span className="input-group-text">{ sellDestination.name }</span>
                                    </div>:undefined}
                                </div>
                               
                            </div>
                            <div className={"col-xl-12 mb-3 d-flex align-items-center p-0" + (sellSourceR.current.id?"":" d-none")}>
                                <small  htmlFor="currency_amount_available">موجودی :</small>
                                <span className="text-success px-2 fs-5 pt-1" dir="ltr">{ Number(sellConvertAmount).toLocaleString() } {" "} { sellSourceR.current.small_name_slug  }</span>
                                { sellSourceR.current.id &&
                                    <div className="select-all-tooltip me-2" alt="انتخاب کل موجودی" onClick={()=>{changeSellAmount(sellAvailableCurrencyR.current)}}>$</div>
                                }
                            </div>
                            { sellConversionResultR.current? 
                            <>
                                <div className="mb-3 d-flex justify-content-between px-0 flex-wrap">
                                    <small className="text-nowrap">
                                        <span>با پرداخت </span>
                                        <span className="text-success px-2">{sellConvertAmount}</span>
                                        <span>{sellSourceR.current.name}</span>
                                    </small>
                                   <small className="flex-grow-1 text-start text-nowrap">
                                    <span className="text-success px-2">{sellConversionResultR.current}</span>
                                        <span className="px-1">{sellDestination.name}</span>
                                        <span>دریافت میکنید</span>   
                                   </small>
                                    
                                </div>
                                <div className="col-12 row mb-3 mx-0 ">
                                    <small className="d-flex justify-content-between px-0 flex-wrap">
                                        <label className="text-nowrap">قیمت تمام شده هر واحد 
                                            <i className="px-2">{ sellDestination.name }</i>
                                            :
                                        </label>
                                        <span className="flex-grow-1 text-start"> <span className="text-nowrap text-success px-2 fs-4 ">{ sellUnitPrice.current }</span>  <i>{ sellSourceR.current.name}</i></span>
                                    </small>
                                </div>
                            </>:undefined}
                            {sellConvertErrorMessage.current.length>0?
                                                        <span className="text-danger" style={{fontSize: "12px"}}> {sellConvertErrorMessage.current} </span>
                                                        :undefined
                                                    }
                            <button type="button" onClick={handleSellConfirm} name="submit"
                             disabled={!+sellConvertAmount || !sellDestination.small_name_slug || !sellSourceR.current.small_name_slug || sellLowCreditR.current}
                                className="btn btn-danger w-100 d-flex justify-content-center">فروش
                                {_creating_order? <Loader
                                        type="ThreeDots"
                                        height={25}
                                        width={40}
                                        color="#fff"
                                    ></Loader>:undefined}</button>
                        </form>
                    </Tab>

                  
                </Tabs>
            </div>

        </div>
    </div>
  
    )
}

export default FastBuySell
