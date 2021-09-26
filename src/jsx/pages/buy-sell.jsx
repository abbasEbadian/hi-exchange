import React, { useState, useEffect } from 'react';
import {  Tab, Tabs, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_currencies } from '../../redux/actions';
import TradingViewWidget from 'react-tradingview-widget';
import { Themes } from 'react-tradingview-widget';

Number.prototype.R =function(){
    return Math.round(100000* this.valueOf())/100000
}

function BuySell() {
    const {currencyList, convertRates}  = useSelector(state => state.currencies)
    const wallet  = useSelector(state => state.wallet.wallet)
    const [tab, setTab] = useState("buy")
    const [ chartOpen, setChartOpen ] = useState(true)
    const [buyConvertRate, setBuyConvertRate] = useState(0)
    let sellConvertRate = 0
    const [sellAvailableCurrency, setSellAvailableCurrency] = useState(0)
    const [buyAvailableCurrency, setBuyAvailableCurrency] = useState(0)
    const [buyConvertAmount, setBuyConvertAmount] = useState(0)
    const [sellConvertAmount, setSellConvertAmount] = useState(0)
    const [buySource, setBuySource] = useState({small_name_slug: undefined})
    const [sellSource, setSellSource] = useState({small_name_slug: undefined})
    const [buyDestination, setBuyDestination] = useState({small_name_slug: undefined})
    const [sellDestination, setSellDestination] = useState({small_name_slug: undefined})
    const dispatch = useDispatch()
    const karmozd = 0.01;
    let karmozdAmount = 0;
    let buyConversionResult = 0;
    let buyEndPrice = 0;
    let buyConvertInvalid = true;
    let buyLowCredit = false;
    let buyConvertErrorMessage = ""

    let sellConversionResult = 0;
    let sellEndPrice = 0;
    let sellConvertInvalid = true;
    let sellLowCredit = false;
    let sellConvertErrorMessage = ""

    const get_available = (symbol)=>{
        const target = wallet.filter((item, i)=>{
            return item["service"]["small_name_slug"] === symbol
        })
         return target.length > 0 ? target[0]["balance"] : 0
    }

    const changeBuySource = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.small_name_slug==selectedCurrency)[0]
        let sym = selectedCurrency.small_name_slug;
        let av = get_available(sym)
        setBuySource(selectedCurrency);
        setBuyAvailableCurrency(av)
    }
    const changeBuyDestination = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.small_name_slug==selectedCurrency)[0]
        setBuyDestination(selectedCurrency);
    }
    const changeSellDestination = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.small_name_slug==selectedCurrency)[0]
        setSellDestination(selectedCurrency);
        
    }
    const changeSellSource = (e)=>{
        let selectedCurrency = e.target.value;
        if (!selectedCurrency || selectedCurrency.indexOf("انتخاب") >-1) return;
        selectedCurrency = currencyList.filter((c, idx)=>c.small_name_slug==selectedCurrency)[0]
        setSellSource(selectedCurrency);
        let sym = selectedCurrency.small_name_slug;
        let av = get_available(sym)
        setSellSource(selectedCurrency);
        setSellAvailableCurrency(av)
    }
    const computePrices = e=>{
       console.log("Came");
       
        if(tab === "buy"){
            console.log("buy");
            if(buyConvertAmount && buySource.small_name_slug ){
                buyLowCredit =  buyConvertAmount > buyAvailableCurrency ;
                if(buyLowCredit) buyConvertInvalid = true;
            }
    
            if(!buySource.small_name_slug || !buySource.small_name_slug || !buyConvertAmount || buyLowCredit){
                buyConvertInvalid = true;
                return;
            } 
            buyConvertInvalid = false;
            buyConvertErrorMessage = ""
            
            
            let key = `${buySource.small_name_slug}/${buyDestination.small_name_slug}`
            let rate = convertRates[key];
            const RR = Math.pow(10,Math.max(buySource.decimal, buyDestination.decimal) || 3)
            const CR = Math.pow(10, 8)
            
            
            buyConversionResult = Math.round(RR*(rate * buyConvertAmount) || 0)/RR;
            karmozdAmount =  Math.round(RR* karmozd * buyConversionResult)/ RR || 0;
            buyEndPrice = Math.round(CR * buyConvertAmount/buyConversionResult)/ CR || 0 + buySource.name;
            setBuyConvertRate(rate)
        }else{
            console.log("sell");
            if(sellConvertAmount && sellSource.small_name_slug ){
                sellLowCredit =  sellConvertAmount > sellAvailableCurrency ;
                if(sellLowCredit) sellConvertInvalid = true;
            }
            console.log(sellConvertAmount, sellAvailableCurrency);
            
            console.log(sellLowCredit, sellConvertInvalid);
            
            if(!sellSource.small_name_slug || !sellDestination.small_name_slug || !sellConvertAmount || sellLowCredit){
                sellConvertInvalid = true;
                return;
            } 
            sellConvertInvalid = false;
            sellConvertErrorMessage = ""
            let key = `${sellDestination.small_name_slug}/${sellSource.small_name_slug}`
            let rate = convertRates[key];
            const RR = Math.pow(10,Math.max(sellDestination.decimal, sellSource.decimal) || 3)
            const CR = Math.pow(10, 8)
            
            
            sellConversionResult =  Math.round(RR*(rate * sellConvertAmount) )/RR;
            karmozdAmount =  Math.round(RR* karmozd * sellConversionResult)/ RR || 0;
            sellEndPrice = Math.round(CR * sellConvertAmount/sellConversionResult)/ CR || 0 
            sellConvertRate = Number(rate).R()
            
        }
    }
    computePrices()
   useEffect(() => {
    dispatch(fetch_currencies());
    

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
                                                        <select name='currency' className="form-control" onChange={changeBuySource} value={buySource.small_name_slug}>
                                                            <option value={undefined}>انتخاب</option>
                                                                { 
                                                                currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                    return  idx>0&&["IRT", "USDT"].includes(c.small_name_slug) ? <option key={idx} value={c.small_name_slug}> {c.name}</option>:undefined
                                                                })
                                                                }
                                                        </select>
                                                        {buyLowCredit && <a href="wallet" className="form-text text-muted text-nowrap">
                                                            <small className="text-danger">اعتبار ناکافی ! </small>
                                                            <small className="text-success me-2">شارژ کیف پول</small></a>}   
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">واحد زیر را دریافت میکنید</label>
                                                            <Form.Control as="select"  name='currency' className=" mb-3" onChange={changeBuyDestination} value={buyDestination.small_name_slug}>
                                                            <option value={undefined}>انتخاب</option>
                                                                { 
                                                                currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                    return  <option key={idx} value={c.small_name_slug}> {c.name}</option>
                                                                })
                                                            }
                                                                
                                                            </Form.Control>
                                                            
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">مقدار</label>
                                                        <div className="input-group">
                                                            <input type="text" name="currency_amount" className="form-control" value={buyConvertAmount} onChange={e=>setBuyConvertAmount(e.target.value)}
                                                                placeholder="" />
                                                            <input type="text" name="usd_amount" className="form-control " value={buyEndPrice} readOnly
                                                                placeholder="" />

                                                            {buySource.name ? <div class="input-group-append p-0">
                                                                <span class="input-group-text">{ buySource.name }</span>
                                                            </div>:undefined}
                                                        </div>
                                                        
                                                    </div>
                                                    <button type="submit" name="submit" disabled={!+buyConvertAmount || !buyDestination.small_name_slug || !buySource.small_name_slug || buyConvertInvalid}
                                                        className="btn btn-success w-100">بخرید</button>

                                                </form>
                                            </Tab>
                                            <Tab eventKey="sell" title="فروش" >
                                                <form method="post" name="myform" className="currency2_validate">
                                                <div className="mb-3">
                                                        <label className="form-label">ارز دیجیتال زیر را می فروشید</label>
                                                        <select name='currency' className="form-control " onChange={changeSellSource} value={sellSource.small_name_slug}>
                                                            <option value={undefined}>انتخاب</option>

                                                                { 
                                                                    currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                        return  <option key={idx} value={c.small_name_slug}> {c.name}</option>
                                                                    })
                                                                }
                                                        </select>
                                                        {sellLowCredit && <a href="wallet" className="form-text text-muted text-nowrap">
                                                            <small className="text-danger">اعتبار ناکافی ! </small>
                                                            <small className="text-success me-2">شارژ کیف پول</small></a>} 
                                                        
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">واحد زیر را دریافت میکنید</label>
                                                            <select name='currency' className="form-control mb-3" onChange={changeSellDestination} value={sellDestination.small_name_slug}>
                                                            <option value={undefined}>انتخاب</option>

                                                                { 
                                                                    currencyList && currencyList.length && currencyList.map((c, idx)=>{
                                                                        return idx>0&& ["IRT", "USDT"].includes(c.small_name_slug) ? <option key={idx} value={c.small_name_slug}> {c.name}</option>:undefined
                                                                    })
                                                                }
                                                            </select>
                                                            
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">مقدار</label>
                                                        <div className="input-group">
                                                            <input type="text" name="currency_amount" className="form-control" value={sellConvertAmount} onChange={e=>setSellConvertAmount(e.target.value)}
                                                                placeholder="" />
                                                            <input type="text" name="usd_amount" className="form-control " value={sellConversionResult} readOnly
                                                                placeholder="" />
                                                            {sellDestination.name? <div className="input-group-append p-0">
                                                                <span className="input-group-text">{ sellDestination.name }</span>
                                                            </div>:undefined}
                                                        </div>
                                                        {/* <div className="d-flex justify-content-between mt-3">
                                                            <p className="mb-0">سقف ماهانه: </p>
                                                            <h6 className="mb-0">$49750 باقیمانده</h6>
                                                        </div> */}
                                                    </div>
                                                    <button type="submit" name="submit" disabled={!+sellConvertAmount || !sellDestination.small_name_slug || !sellSource.small_name_slug || sellConvertInvalid}
                                                        className="btn btn-danger w-100">بفروشید!</button>
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
                                                    hide_top_toolbar={true}
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
                                                    hide_top_toolbar={true}
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
                                                    <tr>
                                                        <td>نسبت تبدیل</td>
                                                        <td>{ buyConvertRate } {buySource.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>فی</td>
                                                        <td>$28.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>جمع</td>
                                                        <td>$854.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>وت</td>
                                                        <td>
                                                            <div className="text-danger">$25.00 USD</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td> مجموع</td>
                                                        <td> $1232.00 USD</td>
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
                                                        <td>{ sellDestination.name || "-" }</td>
                                                    </tr>
                                                    <tr>
                                                        <td>نسبت تبدیل</td>
                                                        <td>{ sellConvertRate } {sellDestination.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>فی</td>
                                                        <td>$28.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>جمع</td>
                                                        <td>$854.00 USD</td>
                                                    </tr>
                                                    <tr>
                                                        <td>وت</td>
                                                        <td>
                                                            <div className="text-danger">$25.00 USD</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td> مجموع</td>
                                                        <td> $1232.00 USD</td>
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
            </div>

            
        </>
    )
}

export default BuySell;