import React, { useState, useEffect, useRef } from 'react';
import {  Tab, Tabs, Form } from 'react-bootstrap';
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

function BuySell() {
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


    const sellConvertErrorMessage = useRef("")
    const buyConvertErrorMessage = useRef("")

    const sellAvailableCurrencyR = useRef(0)
    const buyAvailableCurrencyR = useRef(0)
    const buySourceR = useRef({small_name_slug: undefined})
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

    const buyConvertValidR = useRef(false)
    const sellConvertValidR = useRef(false)

    const buyAmountRef = useRef(0)
    // const sellConvertValidR = useRef(false)



    const handleBuyConfirm = ()=>{
        dispatch(creating_order(true))
        const _wallet = wallet && wallet.length? 
                wallet.filter(item=>item&&item.service&&item.service.id === buySourceR.current.id).lenght?
                wallet.filter(item=>item&&item.service&&item.service.id === buySourceR.current.id)[0].id:undefined:undefined
        const data= {
            source_price: buyConversionResultStrR.current,
            destination_price: String(buyConvertAmount),
            source_asset: String(buySourceR.current.id),
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
                wallet.filter(item=>item&&item.service&&item.service.id === buySourceR.current.id).lenght?
                wallet.filter(item=>item&&item.service&&item.service.id === buySourceR.current.id)[0].id:undefined:undefined
        const data= {
            source_price: String(sellConvertAmount),
            destination_price: sellConversionResultStrR.current,
            source_asset: String(sellSourceR.current.id),
            destination_asset: String(sellDestinationR.current.id),
            wallet: _wallet,
            changed:"source",
            description: "" ,
            type:"sell"
        }
        dispatch(create_order(data, toast))
    }
    
    const convertFeeToIrt=(id, amount)=>{
        if(!currencyList || !currencyList.length) return 0;
        else{
            const c = currencyList.filter((item)=>{return item&&item.id===id})
            return c && c.length ?amount * (+c[0].show_price_irt): 0
        }
    }

    const get_available = (symbolid)=>{
        if (!wallet || !wallet.length )return 0
        const target = wallet.filter((item, i)=>{
            return item&&item["service"]&&item["service"]["id"] === symbolid
        })
         return target.length > 0 ? target[0]["balance"] : 0
    }

    const changeBuySource = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]
        let av = get_available(selectedCurrency.id)
        buySourceR.current = selectedCurrency;
        buyAvailableCurrencyR.current = av
        buyLowCreditR.current = false
        setBuyConvertAmount(0)
        computePrices({buyConvertAmountP: 0})
    }
    const changeBuyDestination = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]
        buyDestinationR.current = selectedCurrency;
        buyLowCreditR.current = false
        setBuyConvertAmount(0)
        computePrices({buyConvertAmountP: 0})

    }
    const changeSellDestination = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]
        sellDestinationR.current = selectedCurrency;
        sellLowCreditR.current = false
        setSellConvertAmount(0)
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
        computePrices({sellConvertAmountP: 0})
    }

    const changeBuyAmount = (value)=>{    
      computePrices({buyConvertAmountP: value})
      setBuyConvertAmount(value)
    }
    const changeSellAmount = (value)=>{
        setSellConvertAmount(value)
        computePrices({sellConvertAmountP: value})
    }
    const computePrices = ({
        buyConvertAmountP= buyConvertAmount,
        sellConvertAmountP= sellConvertAmount,
    })=>{
        
        if(tab === "buy"){
            
            if(!buyConvertAmountP){
                buyEndPriceR.current =0
                buyKarmozdAmountR.current =0
                buyFixedKarmozdR.current =0
                buyConversionResultR.current =0
                buyConversionResultStrR.current = 0
                buyTotalR.current = 0
                buyLowCreditR.current = false
                setBuyConvertInvalid(true)
                return

            }
            const data = qs.stringify({
                'source': String(buySourceR.current.id), 
                'destination': String(buyDestinationR.current.id),
                'changed': 'destination',
                'source-price': '0',
                'destination-price': buyConvertAmountP
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
                }
                const prec2 = Math.max(8, +data["source_decimal"] , +data["destination_decimal"])
               
                buyEndPriceR.current =  Math.round(Math.pow(10, prec2) * +data["unit_price"])/Math.pow(10,prec2)
                buyKarmozdAmountR.current =  +data["total_fee"] || 0
                buyFixedKarmozdR.current =  +data["fix_fee"] || 0
                buyConversionResultR.current =  buyConvertAmountP? +data["source_price"]: 0
                buyConversionResultStrR.current =  buyConvertAmountP? data["source_price_str"]: 0
                
                const a = buyConversionResultR.current
                const a2 = buyDestinationR.current.show_price_irt * buyKarmozdAmountR.current
                const a3 = buyDestinationR.current.show_price_irt * buyFixedKarmozdR.current
                
                buyTotalR.current = (a+a2+a3).toLocaleString()

                
                // setBuyConvertAmount(buyConvertAmountP)
                buyLowCreditR.current = buyConversionResultR.current > +buyAvailableCurrencyR.current
                setBuyConvertInvalid(Math.random())
               
           }).catch(error=>{
               console.log(error);
           })
        }else{
            if(!sellConvertAmountP){
                sellEndPriceR.current =0
                sellKarmozdAmountR.current =0
                sellFixedKarmozdR.current =0
                sellConversionResultR.current =0
                sellConversionResultStrR.current = 0
                sellTotalR.current = 0
                sellLowCreditR.current = false
                setSellConvertInvalid(true)
                return

            }
            const data = qs.stringify({
                'source': String(sellSourceR.current.id), 
                'destination': String(sellDestinationR.current.id),
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
                }
                const prec2 = Math.max(8, +data["source_decimal"] , +data["destination_decimal"])
               
                sellEndPriceR.current =  Math.round(Math.pow(10, prec2) * +data["unit_price"])/Math.pow(10,prec2)
                sellKarmozdAmountR.current =  +data["total_fee"] || 0
                sellFixedKarmozdR.current =  +data["fix_fee"] || 0
                sellConversionResultR.current =  sellConvertAmountP? +data["destination_price"]: 0
                sellConversionResultStrR.current =  sellConvertAmountP? data["destination_price_str"]: 0
                
                const a = sellConversionResultR.current
                const a2 = sellDestinationR.current.show_price_irt * sellKarmozdAmountR.current
                const a3 = sellDestinationR.current.show_price_irt * sellFixedKarmozdR.current
                
                sellTotalR.current = (a+a2+a3).toLocaleString()

                
                // setsellConvertAmount(sellConvertAmountP)
                sellLowCreditR.current = !sellConvertAmount || sellConvertAmount > +sellAvailableCurrencyR.current
                console.log(sellLowCreditR,sellConvertAmount , sellAvailableCurrencyR.current, )
                setSellConvertInvalid(Math.random())
               
           }).catch(error=>{
               console.log(error);
           })
        }
    }
   useEffect(() => {
        // dispatch(fetch_currencies());
        // computePrices({})
        // consoelog
   }, [])
   
    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body buy-sell-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-5 col-lg-5 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="buy-sell-widget">

                                        <Tabs activeKey={tab} onSelect={(k)=>setTab(k)} id="uncontrolled-tab-example">
                                            <Tab eventKey="buy" title="خرید">
                                                <form method="post" name="myform" className="currency_validate">
                                                    <div className="mb-3">
                                                        <label className="form-label">ارز زیر را پرداخت میکنید</label>
                                                        <select name='currency' className="form-control" onChange={changeBuySource}>
                                                            <option value={undefined}>انتخاب</option>
                                                                { 
                                                                currencyList && currencyList.length>0 ? currencyList.map((c, idx)=>{
                                                                    return  [14, 12].includes(c.id) && (c.id !== buyDestinationR.current.id)? <option key={idx} value={c.id}> {c.name}</option>:undefined
                                                                }):undefined
                                                                }
                                                        </select>
                                                        {buyLowCreditR.current ? <Link to="/wallet" className="form-text text-muted text-nowrap">
                                                            <small className="text-danger">اعتبار ناکافی ! </small>
                                                            <small className="text-success me-2">شارژ کیف پول</small></Link>:undefined}   
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">واحد زیر را دریافت میکنید</label>
                                                            <Form.Control as="select"  name='currency' className=" mb-3" onChange={changeBuyDestination} >
                                                            <option value={undefined}>انتخاب</option>
                                                                { 
                                                                currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                    return   (c.id !== buySourceR.current.id) && <option key={idx} value={c.id}> {c.name}</option>
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
                                                            <span className={"position-absolute icofont-close-line cursor-poitner " + (!buyConvertAmount?"d-none":undefined)} 
                                                                style={{right: 0, top: "6px", fontWeight: 100, fontSize: "32px", zIndex: 1000}} onClick={e=>{changeBuyAmount(0)}}></span>
                                                            <input type="text" name="currency_amount" className="form-control" ref={buyAmountRef} value={buyConvertAmount} onFocus={e=>{changeBuyAmount("")}}  onChange={e=>changeBuyAmount(e.target.value)}
                                                                placeholder="" />
                                                            <input type="text" name="usd_amount" className="form-control " value={buyConversionResultStrR.current} readOnly
                                                                placeholder="" />

                                                            {buySourceR.current.name ? <div className="input-group-append p-0">
                                                                <span className="input-group-text">{ buySourceR.current.name }</span>
                                                            </div>:undefined}
                                                        </div>
                                                        
                                                    </div>
                                                    <button type="button" name="submit" onClick={handleBuyConfirm}
                                                    disabled={!+buyConvertAmount || !buyDestinationR.current.id || !buySourceR.current.id || buyLowCreditR.current || _creating_order}
                                                        className="btn btn-success w-100 d-flex justify-content-center">
                                                            بخرید
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
                                                <div className="mb-3">
                                                        <label className="form-label">ارز دیجیتال زیر را می فروشید</label>
                                                        <select name='currency' className="form-control " onChange={changeSellSource} >
                                                            <option value={undefined}>انتخاب</option>

                                                                { 
                                                                    currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                        return   (c.id !== sellDestinationR.current.id) && <option key={idx} value={c.id}> {c.name}</option>
                                                                    })
                                                                }
                                                        </select>
                                                        {sellLowCreditR.current ?<Link to="/wallet" className="form-text text-muted text-nowrap">
                                                            <small className="text-danger">اعتبار ناکافی ! </small>
                                                            <small className="text-success me-2">شارژ کیف پول</small></Link>: undefined} 
                                                        
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">واحد زیر را دریافت میکنید</label>
                                                            <select name='currency' className="form-control mb-3" onChange={changeSellDestination} >
                                                            <option value={undefined}>انتخاب</option>

                                                                { 
                                                                    currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                        return  [12, 14].includes(c.id) && (c.id !== sellSourceR.current.id)? <option key={idx} value={c.id}> {c.name}</option>:undefined
                                                                    })
                                                                }
                                                            </select>
                                                            
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
                                                            {sellDestinationR.current.name? <div className="input-group-append p-0">
                                                                <span className="input-group-text">{ sellDestinationR.current.name }</span>
                                                            </div>:undefined}
                                                        </div>
                                                       
                                                    </div>
                                                    <button type="button" onClick={handleSellConfirm} name="submit" disabled={!+sellConvertAmount || !sellDestinationR.current.small_name_slug || !sellSourceR.current.small_name_slug || sellLowCreditR.current}
                                                        className="btn btn-danger w-100 d-flex justify-content-center">بفروشید!
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
                            <p className="p-4">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                        </div>
                        <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="buyer-seller">
                                        <div className="d-flex flex-column mb-3">
                                            
                                            {tab === "buy" && buyDestinationR.current.small_name_slug? 
                                            <>
                                                {chartOpen ?
                                                    <span className="fa fa-arrow-up fs-3 mb-1" onClick={e=>setChartOpen(!chartOpen)}></span>
                                                    :<span className="fa fa-arrow-down fs-3 mb-1" onClick={e=>setChartOpen(!chartOpen)}></span>
                                                }
                                                <div style={{minHeight: 400+"px"}} className={!chartOpen? "d-none" : undefined}>
                                                <TradingViewWidget 
                                                    symbol={Constants.TW_SYMBOL[buyDestinationR.current.small_name_slug]}
                                                    theme={Themes.DARK}
                                                    locale="fa_IR"
                                                    width={"100%"}
                                                    height={400}
                                                    hide_top_toolbar={false}
                                                    hide_side_toolbar={false}
                                                    allow_symbol_change={false}
                                                    withdateranges={true}
                                                    />
                                                </div>
                                                    </>
                                                :
                                                undefined
                                            }{tab === "sell" && sellSourceR.current.small_name_slug? 
                                            <>
                                             {chartOpen ?
                                                <span className="fa fa-arrow-up fs-3 mb-1" onClick={e=>setChartOpen(!chartOpen)}></span>
                                                :<span className="fa fa-arrow-down fs-3 mb-1" onClick={e=>setChartOpen(!chartOpen)}></span>
                                                }
                                            <div style={{minHeight: 400+"px"}} className={!chartOpen? "d-none" : undefined}>
                                                <TradingViewWidget 
                                                    symbol={Constants.TW_SYMBOL[sellSourceR.current.small_name_slug]}
                                                    theme={Themes.DARK}
                                                    locale="fa_IR"
                                                    width={"100%"}
                                                    height={400}
                                                    hide_top_toolbar={false}
                                                    hide_side_toolbar={false}
                                                    allow_symbol_change={false}
                                                    withdateranges={true}
                                                    />
                                                </div> </>:
                                                undefined
                                            }
                                            

                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                {tab==="buy"?
                                                 <tbody>
                                                    <tr>
                                                        <td><span className="text-primary">شما خریدار هستید</span></td>
                                                        <td><span className="text-primary">{buyConvertAmount || 0} {" "} {buyDestinationR.current.small_name_slug}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>روش پرداخت</td>
                                                        <td>{ buySourceR.current.name || "-"}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>نسبت تبدیل</td>
                                                        <td>{ buyConvertRate } {buySource.name}</td> */}
                                                    {/* </tr> */}
                                                    <tr>
                                                        <td>فی ثابت</td>
                                                        <td>{buyFixedKarmozdR.current || 0} {" "} {buyDestinationR.current.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>فی  تراکنش</td>
                                                        <td>{buyKarmozdAmountR.current || 0} {" "} {buyDestinationR.current.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>مبلغ  تراکنش</td>
                                                        <td>{buyConversionResultR.current.toLocaleString() || 0} {" "} {buySourceR.current.name}</td>
                                                    </tr>
                                                   
                                                    <tr>
                                                        <td> مجموع</td>
                                                        <td> {buyTotalR.current} {" "}  {buySourceR.current.name}</td>
                                                    </tr>
                                                </tbody>
                                         
                                                :
                                                <tbody>
                                                    <tr>
                                                        <td><span className="text-primary">شما فروشنده هستید</span></td>
                                                        <td><span className="text-primary">{sellConvertAmount} {" "} {sellSourceR.current.small_name_slug}</span></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>واحد دریافتی</td>
                                                        <td>{ sellDestinationR.current.name || "-"}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>نسبت تبدیل</td>
                                                        <td>{ buyConvertRate } {buySource.name}</td> */}
                                                    {/* </tr> */}
                                                    <tr>
                                                        <td>فی ثابت</td>
                                                        <td>{sellFixedKarmozdR.current || 0} {" "} {sellDestinationR.current.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>فی  تراکنش</td>
                                                        <td>{sellKarmozdAmountR.current || 0} {" "} {sellDestinationR.current.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>مبلغ  تراکنش</td>
                                                        <td>{sellConvertAmount.toLocaleString()|| 0}  {" "} {sellSourceR.current.name}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>وت</td>
                                                        <td>
                                                            <div className="text-danger">$25.00 USD</div>
                                                        </td>
                                                    </tr> */}
                                                    <tr>
                                                        <td> مجموع</td>
                                                        <td> {sellTotalR.current} {" "}  {sellDestinationR.current.name}</td>
                                                    </tr>
                                                </tbody>}
                                               </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                  
                </div>
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
            </div>

            
        </>
    )
}

export default BuySell;