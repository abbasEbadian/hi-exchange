import React, { useState, useEffect, useRef } from 'react';
import {  Tab, Tabs, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_currencies, creating_order, create_order } from '../../redux/actions';
import TradingViewWidget from 'react-tradingview-widget';
import { Themes } from 'react-tradingview-widget';
import qs from 'qs'
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify'
import Loader from 'react-loader-spinner'


function BuySell() {
    const dispatch = useDispatch()

    const {currencyList}  = useSelector(state => state.currencies)
    const wallet  = useSelector(state => state.wallet.wallet)
    const _creating_order  = useSelector(state => state.accounts.creating_order)
    const details = useSelector(state=>state.indexConverter.bsdetails)
    const [tab, setTab] = useState("buy")
    const [ chartOpen, setChartOpen ] = useState(true)
    const [sellAvailableCurrency, setSellAvailableCurrency] = useState(0)
    const [buyAvailableCurrency, setBuyAvailableCurrency] = useState(0)
    const [buyConvertAmount, setBuyConvertAmount] = useState(0)
    const [sellConvertAmount, setSellConvertAmount] = useState(0)
    const [buySource, setBuySource] = useState({small_name_slug: undefined})
    const [sellSource, setSellSource] = useState({small_name_slug: undefined})
    const [buyDestination, setBuyDestination] = useState({small_name_slug: undefined})
    const [sellDestination, setSellDestination] = useState({small_name_slug: undefined})
    
    const [buyConvertInvalid, setBuyConvertInvalid] = useState(true)
    const [sellConvertInvalid, setSellConvertInvalid] = useState(true)
    
    const [buyLowCredit, setBuyLowCredit] = useState(false);
    const [sellLowCredit, setSellLowCredit] = useState(false);
    const sellConvertErrorMessage = useRef("")
    const buyConvertErrorMessage = useRef("")

     
    const handleBuyConfirm = ()=>{
        dispatch(creating_order(true))
        const _wallet = wallet && wallet.length? 
                wallet.filter(item=>item&&item.service&&item.service.id === buySource.id).lenght?
                wallet.filter(item=>item&&item.service&&item.service.id === buySource.id)[0].id:undefined:undefined
        const data= {
            source_price: details.buyConversionResultStr,
            destination_price: String(buyConvertAmount),
            source_asset: String(buySource.id),
            destination_asset: String(buyDestination.id),
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
            destination_price: details.sellConversionResultStr,
            source_asset: String(sellSource.id),
            destination_asset: String(sellDestination.id),
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
        setBuySource(selectedCurrency);
        setBuyAvailableCurrency(av)
        computePrices({buySourceP:selectedCurrency, buyAvailableCurrencyP:av})
    }
    const changeBuyDestination = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]
        setBuyDestination(selectedCurrency);
        computePrices({buyDestinationP:selectedCurrency})

    }
    const changeSellDestination = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]
        setSellDestination(selectedCurrency);
        computePrices({sellDestinationP: selectedCurrency})
        
    }
    const changeSellSource = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.id===+selectedCurrency)[0]
        let av = get_available(selectedCurrency.id)
        setSellSource(selectedCurrency);
        setSellAvailableCurrency(av)
        computePrices({
            sellSourceP:selectedCurrency,
            sellAvailableCurrencyP: av
        })
    }
    const changeBuyAmount = (value)=>{
        setBuyConvertAmount(value)
        computePrices({buyConvertAmountP: +value})
    }
    const changeSellAmount = (value)=>{
        setSellConvertAmount(value)
        computePrices({sellConvertAmountP: +value})
    }
    const computePrices = ({
        buySourceP=buySource,
        buyDestinationP=buyDestination,
        sellDestinationP=sellDestination,
        sellSourceP=sellSource,
        buyConvertAmountP=buyConvertAmount,
        sellConvertAmountP=buyConvertAmount,
        buyAvailableCurrencyP=buyAvailableCurrency,
        sellAvailableCurrencyP=sellAvailableCurrency,
    })=>{
        
        if(tab === "buy"){
            let binvalid = false 
            
    
            if(!buySourceP.id || !buySourceP.id || !buyConvertAmountP || buyLowCredit){
                binvalid = true;
            } 
            if(binvalid) {
                setBuyConvertInvalid(true)
                return
            }
            
            const data = qs.stringify({
                'source': String(buySourceP.id), 
                'destination': String(buyDestinationP.id),
                'changed': 'destination',
                'source-price': '0',
                'destination-price': buyConvertAmountP
            })
            axios.post("https://hi-exchange.com/api/v2/order/calculator/", data, {
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
               
                let d ={
                    buyEndPrice: Math.round(Math.pow(10, prec2) * +data["unit_price"])/Math.pow(10,prec2),
                    buyKarmozdAmount: +data["total_fee"],
                    buyFixedKarmozd: +data["fix_fee"],
                    buyConversionResult: +data["source_price"],
                    buyConversionResultStr: data["source_price_str"],
                }
                const a = d.buyConversionResult
                const a2 = convertFeeToIrt(buyDestination.id, d.buyKarmozdAmount)
                const a3 = convertFeeToIrt(buyDestination.id, d.buyFixedKarmozd)
                
                
                d["buyTotal"] = (a+a2+a3).toLocaleString()

                dispatch({type: "UPDATE_BSDETAILS", payload: d})
                console.log(d.buyConversionResult > +buyAvailableCurrencyP);
                
                if(d.buyConversionResult > +buyAvailableCurrencyP){
                    setBuyLowCredit(true)
                    setBuyConvertInvalid(true)
                }else{
                    setBuyLowCredit(false)
                    setBuyConvertInvalid(false)
                }
           }).catch(error=>{
               console.log(error);
           })
           
            
            
            
        }else{
            let binvalid = false 
        
            if(!sellSourceP.id || !sellSourceP.id || !sellConvertAmountP || sellLowCredit){
                binvalid = true;
            } 
            if(binvalid) {
                setSellConvertInvalid(true)
                return
            }
            
            const data = qs.stringify({
                'source': String(sellSourceP.id), 
                'destination': String(sellDestinationP.id),
                'changed': 'source',
                'source-price': sellConvertAmountP,
                'destination-price': 0
            })
            axios.post("https://hi-exchange.com/api/v2/order/calculator/", data, {
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
               
                let d ={
                    sellEndPrice: Math.round(Math.pow(10, prec2) * +data["unit_price"])/Math.pow(10,prec2),
                    sellKarmozdAmount: +data["total_fee"],
                    sellFixedKarmozd: +data["fix_fee"],
                    sellConversionResult: +data["destination_price"],
                    sellConversionResultStr: data["destination_price_str"],
                }
                const a = d.sellConversionResult
                const a2 = convertFeeToIrt(sellDestination.id, d.sellKarmozdAmount)
                const a3 = convertFeeToIrt(sellDestination.id, d.sellFixedKarmozd)
                
                
                d["sellTotal"] = (a+a2+a3).toLocaleString()

                dispatch({type: "UPDATE_BSDETAILS", payload: d})
                if(d.sellConversionResult > +sellAvailableCurrencyP){
                    setSellLowCredit(true)
                    setSellConvertInvalid(true)
                }else{
                    setSellLowCredit(false)
                    setSellConvertInvalid(false)
                }
           }).catch(error=>{
               console.log(error);
               
           })
        }
    }
   useEffect(() => {
    dispatch(fetch_currencies());
   }, [dispatch])
   console.log(buyLowCredit);
   
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
                                                        <select name='currency' className="form-control" onChange={changeBuySource} value={buySource.id}>
                                                            <option value={undefined}>انتخاب</option>
                                                                { 
                                                                currencyList && currencyList.length>0 ? currencyList.map((c, idx)=>{
                                                                    return  [14, 12].includes(c.id) && (c.id !== buyDestination.id)? <option key={idx} value={c.id}> {c.name}</option>:undefined
                                                                }):undefined
                                                                }
                                                        </select>
                                                        {buyLowCredit ? <Link to="/wallet" className="form-text text-muted text-nowrap">
                                                            <small className="text-danger">اعتبار ناکافی ! </small>
                                                            <small className="text-success me-2">شارژ کیف پول</small></Link>:undefined}   
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">واحد زیر را دریافت میکنید</label>
                                                            <Form.Control as="select"  name='currency' className=" mb-3" onChange={changeBuyDestination} value={buyDestination.id}>
                                                            <option value={undefined}>انتخاب</option>
                                                                { 
                                                                currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                    return   (c.id !== buySource.id) && <option key={idx} value={c.id}> {c.name}</option>
                                                                })
                                                            }
                                                                
                                                            </Form.Control>
                                                            
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">مقدار 
                                                            {buyDestination && buyDestination.id? 
                                                                <>
                                                                <i className="px-2"> {buyDestination.name}</i>    
                                                                مورد نظر
                                                                </>:undefined
                                                        }
                                                        </label>
                                                        <div className="input-group">
                                                            <input type="text" name="currency_amount" className="form-control" value={buyConvertAmount} onChange={e=>changeBuyAmount(e.target.value)}
                                                                placeholder="" />
                                                            <input type="text" name="usd_amount" className="form-control " value={details.buyConversionResultStr} readOnly
                                                                placeholder="" />

                                                            {buySource.name ? <div className="input-group-append p-0">
                                                                <span className="input-group-text">{ buySource.name }</span>
                                                            </div>:undefined}
                                                        </div>
                                                        
                                                    </div>
                                                    <button type="button" name="submit" onClick={handleBuyConfirm}
                                                    disabled={!+buyConvertAmount || !buyDestination.id || !buySource.id || buyConvertInvalid || _creating_order}
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
                                                        <select name='currency' className="form-control " onChange={changeSellSource} value={sellSource.id}>
                                                            <option value={undefined}>انتخاب</option>

                                                                { 
                                                                    currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                        return   (c.id !== sellDestination.id) &&<option key={idx} value={c.id}> {c.name}</option>
                                                                    })
                                                                }
                                                        </select>
                                                        {sellLowCredit && <Link to="/wallet" className="form-text text-muted text-nowrap">
                                                            <small className="text-danger">اعتبار ناکافی ! </small>
                                                            <small className="text-success me-2">شارژ کیف پول</small></Link>} 
                                                        
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">واحد زیر را دریافت میکنید</label>
                                                            <select name='currency' className="form-control mb-3" onChange={changeSellDestination} value={sellDestination.id}>
                                                            <option value={undefined}>انتخاب</option>

                                                                { 
                                                                    currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                        return  [12, 14].includes(c.id) && (c.id !== sellSource.id)? <option key={idx} value={c.id}> {c.name}</option>:undefined
                                                                    })
                                                                }
                                                            </select>
                                                            
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">
                                                            مقدار
                                                            {sellSource && sellSource.id? 
                                                                <>
                                                                <i className="px-2"> {sellSource.name}</i>    
                                                                مورد نظر
                                                                </>:undefined
                                                        }</label>
                                                        <div className="input-group">
                                                            <input type="text" name="currency_amount" className="form-control" value={sellConvertAmount} onChange={e=>changeSellAmount(e.target.value)}
                                                                placeholder="" />
                                                            <input type="text" name="usd_amount" className="form-control " value={details.sellConversionResultStr} readOnly
                                                                placeholder="" />
                                                            {sellDestination.name? <div className="input-group-append p-0">
                                                                <span className="input-group-text">{ sellDestination.name }</span>
                                                            </div>:undefined}
                                                        </div>
                                                       
                                                    </div>
                                                    <button type="button" onClick={handleSellConfirm} name="submit" disabled={!+sellConvertAmount || !sellDestination.small_name_slug || !sellSource.small_name_slug || sellConvertInvalid}
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
                                            
                                            {tab === "buy" && buyDestination.small_name_slug? 
                                            <>
                                                {chartOpen ?
                                                    <span className="fa fa-arrow-up fs-3 mb-1" onClick={e=>setChartOpen(!chartOpen)}></span>
                                                    :<span className="fa fa-arrow-down fs-3 mb-1" onClick={e=>setChartOpen(!chartOpen)}></span>
                                                }
                                                <div style={{minHeight: 400+"px"}} className={!chartOpen? "d-none" : undefined}>
                                                <TradingViewWidget 
                                                    symbol={buyDestination.small_name_slug}
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
                                            }{tab === "sell" && sellSource.small_name_slug? 
                                            <>
                                             {chartOpen ?
                                                <span className="fa fa-arrow-up fs-3 mb-1" onClick={e=>setChartOpen(!chartOpen)}></span>
                                                :<span className="fa fa-arrow-down fs-3 mb-1" onClick={e=>setChartOpen(!chartOpen)}></span>
                                                }
                                            <div style={{minHeight: 400+"px"}} className={!chartOpen? "d-none" : undefined}>
                                                <TradingViewWidget 
                                                    symbol={sellSource.small_name_slug}
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
                                                        <td><span className="text-primary">{buyConvertAmount} {" "} {buyDestination.small_name_slug}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td>روش پرداخت</td>
                                                        <td>{ buySource.name || "-"}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>نسبت تبدیل</td>
                                                        <td>{ buyConvertRate } {buySource.name}</td> */}
                                                    {/* </tr> */}
                                                    <tr>
                                                        <td>فی ثابت</td>
                                                        <td>{details.buyFixedKarmozd} {" "} {buyDestination.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>فی  تراکنش</td>
                                                        <td>{details.buyKarmozdAmount} {" "} {buyDestination.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>مبلغ  تراکنش</td>
                                                        <td>{details.buyConversionResult.toLocaleString()} {" "} {buySource.name}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>وت</td>
                                                        <td>
                                                            <div className="text-danger">$25.00 USD</div>
                                                        </td>
                                                    </tr> */}
                                                    <tr>
                                                        <td> مجموع</td>
                                                        <td> {details.buyTotal|| 0 } {" "}  {buySource.name}</td>
                                                    </tr>
                                                </tbody>
                                         
                                                :
                                                <tbody>
                                                    <tr>
                                                        <td><span className="text-primary">شما فروشنده هستید</span></td>
                                                        <td><span className="text-primary">{sellConvertAmount} {" "} {sellSource.small_name_slug}</span></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>واحد دریافتی</td>
                                                        <td>{ sellDestination.name || "-"}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>نسبت تبدیل</td>
                                                        <td>{ buyConvertRate } {buySource.name}</td> */}
                                                    {/* </tr> */}
                                                    <tr>
                                                        <td>فی ثابت</td>
                                                        <td>{details.sellFixedKarmozd} {" "} {sellDestination.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>فی  تراکنش</td>
                                                        <td>{details.sellKarmozdAmount} {" "} {sellDestination.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>مبلغ  تراکنش</td>
                                                        <td>{sellConvertAmount.toLocaleString()} {" "} {sellSource.name}</td>
                                                    </tr>
                                                    {/* <tr>
                                                        <td>وت</td>
                                                        <td>
                                                            <div className="text-danger">$25.00 USD</div>
                                                        </td>
                                                    </tr> */}
                                                    <tr>
                                                        <td> مجموع</td>
                                                        <td> {details.sellTotal|| 0 } {" "}  {sellDestination.name}</td>
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