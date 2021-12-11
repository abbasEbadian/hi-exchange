import React, { useEffect, useState, useRef} from 'react';
import Header2 from './../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap' 
import {Constants}  from '../../Constants'
import { useDispatch } from 'react-redux'
import Loader from 'react-loader-spinner';
import { check_transaction, check_withdraw, check_withdraw_irt, get_wallet_list, fetch_accounts } from '../../redux/actions'
import { toast, ToastContainer} from 'react-toastify'
import { Link } from 'react-router-dom'
import OrderList from '../element/orderList';
import axios from 'axios';
import {fill} from 'lodash'
import {FiChevronDown} from 'react-icons/fi'

function Wallet(props) {
    
    const dispatch = useDispatch() 
    const {wallet, checking_transaction, is_fetching, checking_irt_deposit } = useSelector(state => state.wallet)
    const { networks } = useSelector(state => state.accounts)
    const user  = useSelector(state => state.session.user)
    const [copying, setCopying] = useState(false)
    const cards = useSelector(state => state.accounts.cards)
    const orders = useSelector(state => state.accounts.orders)
    const [address, setAddress] = useState("")
    const [withdrawalNetwork, setWithdrawalNetwork] = useState("")
    const [depositNetwork, setDepositNetwork] = useState("")
    const [generatingWallet, setGeneratingWallet] = useState(false)
    const [fetchingAddress, setFetchingAddress] = useState(false)
    const [transactionResult, setTransactionResult] = useState({status:undefined, text: undefined})
    const [validateModalDetails, setValidateModalDetails] = useState({status_text:undefined, track_id: undefined})
    const [validCards, setValidCards] = useState([])
    const [currencyID, setCurrencyID] = useState(undefined)
    const [selectedCurrency, setSelectedCurrency] = useState(undefined)
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const [withdrawWallet, setWithdrawWallet] = useState(0)
    const [withdrawCard, setWithdrawCard] = useState(0)
    const [withdrawWalletText, setWithdrawWalletText] = useState("")
    const [depositCard, setDepositCard] = useState(undefined)
    const [depositWallet, setDepositWallet] = useState(undefined)
    const [depositTxID, setDepositTxID] = useState("")
    const [depositTxAmount, setDepositTxAmount] = useState("لطفا مبلغ را به تومان وارد نمایید")
    const [depositModalOpen, setDepositModalOpen] = useState(false)
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
    const [nocardsModalOpen, setNocardsModalOpen] = useState(false)
    const [summaryModalOpen, setSummaryModalOpen] = useState(false)
    const [preDepositModalOpen, setPreDepositModalOpen] = useState(false)
    const [validateModalOpen, setValidateModalOpen] = useState(false)
    const [syncStates, setSyncStates] = useState(fill(Array(20), false))
    const [historyOrders, setHistoyOrders] = useState([])
    const [showNotVerifiedModal, setShowNotVerifiedModal] = useState(false)
    const depositRef = useRef(0)
    const [showVerify, setShowVerify] = useState("")
    const [verifyCode, setVerifyCode] = useState("")


    /** 
     *  Predeposit :  displaying currency wallet address
     *  Nocards Modal : when user has no cards
     *  DepositModal : Depositing for all currencies
     *  WithdrawModalL: withdrawal info
     *  SummaryModal : history of selected currency
     *  confirmIRTDeposit : when user clicks "PAY" 
    */
    const openNotVerifiedModal = ()=>setShowNotVerifiedModal(true)
    const closeNotVerifiedModal = ()=>setShowNotVerifiedModal(false)
    const closePreDepositModal = () => {
        setAddress("")
        setPreDepositModalOpen(false)
    }
    const openPreDepositModal = (currency_id) => {
        setDepositNetwork("")
        setAddress("")
        if(user&&user.authentication_status !== "accepted"){
            openNotVerifiedModal()
            return
        }
        const _wallet = wallet.filter(item=>{
            return item && item.service.id === currency_id
        })
        if (!_wallet.length) return
        setCurrencyID(currency_id)
        if(currency_id === Constants.IRT_CURRENCY_ID){
            openDepositModal(currency_id)
            return
        }
        setDepositWallet(_wallet[0])
        setPreDepositModalOpen(true)
    }
    const changeDepositNetwork = (network_id)=>{
        
        setFetchingAddress(true)
        axios.post(Constants.BASE_URL+"/api/v2/wallet/deposit/address/", {
            wallet:depositWallet.id,
            network: +network_id
        }).then(response=>{
            if(!response) throw Error(401)
            const {data} = response 
            setAddress(data.address)
            setSelectedCurrency(depositWallet)
        }).catch(err=>{
        }).finally(f=>{
            setFetchingAddress(false)
        })
        setDepositNetwork(network_id)
    }
    const openVerify = (e) => {
        e.preventDefault()
        e.stopPropagation()
        axios.get(Constants.BASE_URL+"/api/v2/wallet/withdrawal/otp/")
        .then(resp=>{
            const {data} = resp
            if (data.error === 1){
                toast.error(data.message)
            }else{
                setWithdrawModalOpen(false)
                toast.info(data.message)
                setTimeout(() => {
                setShowVerify(true) 
                }, 2000);
            }
        })
        .catch(err=>console.log(err))
        .finally(f=>{  
        })
    }
    const verifyTheCode = ()=>{
       confirmWithdraw()
    }

    const closeNocardsModal = () => setNocardsModalOpen(false)
    const openNocardsModal = () => setNocardsModalOpen(true)

    const closeDepositModal = () => setDepositModalOpen(false)
    const closeWithdrawModal = () => setWithdrawModalOpen(false)

    const openSummaryModal = (currency_id) => {    
        const o = orders.filter(item=>{
            return item.destination_asset === currency_id || item.source_asset === currency_id
        })
        setHistoyOrders(o)
        setSummaryModalOpen(true)
    }

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
        if(!newWindow || newWindow.closed || typeof newWindow.closed=='undefined') {
            toast.info("پنجره های پاپ آپ مرورگر غیر فعال شده است.لطفا ابتدا آن را فعال کنید.")
        }

      }

    // Create a payment link by calling  /create_payment_link in mini server 'proxy.js' 
    // which has been described before `validateIRTDeposit` function
    const confirmIRTDeposit = ()=>{
        const FormData = require('form-data');
        let data = new FormData();
        data.append('type', '1');
        data.append('amount', String(depositTxAmount));
        data.append('bank_id', depositRef.current.value);

        axios.post(Constants.BASE_URL + "/api/v2/wallet/manage/", data, {headers: {"Content-Type": "application/form-data"}}).then(response=>{
            
            const {data} = response
            if(data.error===1){
                toast.error(data.message)
            }else{
                if (data.link) openInNewTab(data.link)
            }
        }).catch(error=>{
            toast.error("با خطا مواجه شد")
        }).finally(f=>{
            closeDepositModal(false)
        })
    }


    const openDepositModal = (currency_id) => {
        if(validCards.length === 0 && currency_id === Constants.IRT_CURRENCY_ID){
            openNocardsModal()
            return 
        }
        if(currency_id === Constants.IRT_CURRENCY_ID)
            setDepositTxAmount("لطفا مبلغ را به تومان وارد نمایید")
        else
            setDepositTxAmount(0)
        if(preDepositModalOpen) closePreDepositModal()
        setDepositModalOpen(true)
    };



    const openWithdrawModal = (currency_id) => {
        if(user&&user.authentication_status !== "accepted"){
            openNotVerifiedModal()
            return
        }
        if(validCards.length === 0 && currency_id === Constants.IRT_CURRENCY_ID){
            openNocardsModal()
            return 
        }
        const _wallet = wallet.filter((item)=>{return item&&item.service.id===currency_id})[0]
        setWithdrawWallet(_wallet)
        setWithdrawAmount(0)
        setWithdrawModalOpen(true)
        setCurrencyID(currency_id)
    };
    

    const confirmWithdraw= ()=>{
        
        if(currencyID === Constants.IRT_CURRENCY_ID){
            dispatch(check_withdraw_irt({
                card_id: withdrawCard.id, 
                wallet: withdrawWallet.id,
                amount: withdrawAmount,
                otp: verifyCode
            }, setShowVerify, toast))
        }else{

            dispatch(check_withdraw({
                sourceWallet: withdrawWallet.id,
                Destwallet: withdrawWalletText, 
                amount: withdrawAmount,
                otp: verifyCode,
                network: withdrawalNetwork
            }, setShowVerify, toast))
        }
    }


    const confirmDeposit= ()=>{
        if(currencyID !== Constants.IRT_CURRENCY_ID){
            const _wallet = wallet.filter(item=>{
                return item && item.service.id === currencyID
            })
            dispatch(check_transaction({depositTxID, wallet: _wallet[0].id })).then(({status, text})=>{
                setTransactionResult({status, text})
            }).catch(err=>{
                console.log(err);

            })
        }
    }

    const changeDepositCard = (e)=>{
        const selected = e.target.value
        localStorage.setItem("deposit_card_id", selected)
        setDepositCard(cards.filter(item=>item.id === selected)[0])
    }
    const changeWithdrawCard = (e)=>{
        const selected = e.target.value
        const sel = cards.filter(item=>+item.id === +selected)[0]
        setWithdrawCard(sel)        
        
    }


   
    /**
    * When mounted, setValidCards and trigger `validateIRTDeposit` function if 
    * there are some params
    * but show it if it has been not shown before
    * i.e. when user refreshes the page.
    * but its not trusty.
    * user can delete localstorage.
    * And also removes params from url.
    * so on refresh wont get triggered again
    * Its must get saved in DB.
    */
    useEffect(() => {
        const vc = cards.filter((item, idx)=>{
           return item.status === "confirmed"
        })
        setValidCards(vc)
        dispatch(get_wallet_list())
  
   }, [cards]
   )
   // Load wallets and cards 
   useEffect(() => {
    dispatch(get_wallet_list())
    dispatch(fetch_accounts())
    
   }, [])

    const copyToClipboard = (event)=>{
        setCopying(true)
        if (window.clipboardData && window.clipboardData.setData) {
            // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
            return window.clipboardData.setData("Text", address);
    
        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = address;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            }
            catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            }
            finally {
                document.body.removeChild(textarea);
                setTimeout(() => {
                    setCopying(false)
                }, 2000);
            }
        }
        
        
    }
    const syncWallet = (event, idx)=>{
        setSyncStates(s => {
            let new_s = [...syncStates]
            new_s[idx] = 'syncing'
            return new_s
        })
        dispatch(get_wallet_list()).then(e=>{

        }).catch(e=>console.log(e)
        ).finally(f=>{
            setSyncStates(s => {
                let new_s = [...syncStates]
                new_s[idx] = true
                return new_s
            })
            setTimeout(() => {
                setSyncStates(s => {
                    let new_s = [...syncStates]
                    new_s[idx] = false
                    return new_s
                })
            }, 2000);
        })
    }
    return (
        <>
            <Header2 />
            <Sidebar></Sidebar>
            <div className="content-body px-3" id="wallet-page">
            <div className="card">
                <div className="card-header border-0">
                    <h4 className="card-title"> دارایی ها</h4>
                </div>
                <div className="card-body pt-0">
                    <div className="transaction-table">
                        <div className="table-responsive">
                        {wallet && wallet.length > 0?
                            <>
                            <table className="table mb-0 table-responsive-sm">
                                <thead>
                                    <tr>
                                        <th>نماد</th>
                                        <th>نام</th>
                                        <th>کل دارایی</th>
                                        <th>عملیات</th>
                                        <th>بروزرسانی</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {wallet&& wallet.length ? wallet.map((item, idx)=>{
                                        return item && <tr key={idx}> 
                                            <td><img className="icon"src={item.service.image} alt="coin"></img> <span> { item.service.small_name } </span></td>
                                            <td> { item.service.name } </td>
                                            
                                            <td>{Number(Number(item.balance).toFixed()).toLocaleString()}</td>
                                            <td>
                                                <button className="text-success  border-0 bg-transparent fs-5 py-0"
                                                    onClick={e=>openPreDepositModal(item.service.id)}
                                                >واریز</button>
                                                <button className="text-danger  border-0 bg-transparent fs-5 py-0"
                                                    onClick={e=>openWithdrawModal(item.service.id)}
                                                >برداشت</button>
                                                <button className="text-warning  border-0 bg-transparent fs-5 py-0"
                                                    onClick={e=>openSummaryModal(item.service.id)}
                                                >تاریخچه</button>
                                            </td>
                                            <td style={{width: 50+"px"}} className="text-center cursor-pointer position-relative">
                                                <span onClick={e=>syncWallet(e, idx)} className={"icofont-refresh  " +(syncStates[idx]==="syncing"?"spin":"")}>
                                                </span>
                                                {syncStates[idx]===true ? <span className={"icofont-check text-success px-2  position-absolute"}></span>:undefined}

                                            </td>
                                            
                                        </tr>
                                    }):undefined}
                                    
                                </tbody>
                            </table>
                                </>
                            :
                            is_fetching?
                            <Loader type="Oval" color="#00BFFF" height={50} width={50} />
                            :<p>
                                    کیف پول شما خالی است
                                </p>
                            }
                            
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
           <Modal show={depositModalOpen} onHide={closeDepositModal} className="convert-detail-modal">
                <Modal.Header closeButton>
                <Modal.Title>واریز به کیف پول</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { currencyID === Constants.IRT_CURRENCY_ID ?
                        <>
                            <label htmlFor="card-select" className="form-label">انتخاب کارت</label>
                            <select ref={depositRef } className="form-control" name="card-select" value={depositCard} onChange={changeDepositCard}>
                                {validCards.map((item, idx)=>{
                                    return <option value={item.id} key={idx}>{item.card} {"-"} {item.bank}</option>
                                })}
                            </select>
                            <label htmlFor="" className="d-flex justify-content-between form-label mt-3">مقدار  </label>
                            <input type="text" className="form-control"  onFocus={e=>setDepositTxAmount("")} value={depositTxAmount} onChange={e=>setDepositTxAmount(Number(String(e.target.value).replace(/,/g,"")).toLocaleString())}/>
                        
                        </>:
                        <div className="col-12">
                            <p>لطفا شماره تراکنش واریز را به همراه مبلغ تراکنش وارد نمایید</p>
                            <label htmlFor="" className="d-flex justify-content-between form-label">
                                <span>شماره تراکنش</span>
                                <span>tx_id</span>
                            </label>
                            <input type="text" className="form-control" value={depositTxID} onChange={e=>setDepositTxID(e.target.value)}/>

                            <label htmlFor="" className="d-flex justify-content-between form-label mt-3">مبلغ تراکنش </label>
                            <input type="text" className="form-control" onFocus={e=>setDepositTxAmount("")} value={depositTxAmount} onChange={e=>setDepositTxAmount(e.target.value)}/>


                            {transactionResult.status?
                                transactionResult.status === 200?
                                   <p className="text-success my-3">{transactionResult.text}</p>
                                :
                                   <p className="text-danger my-3">{transactionResult.text}</p>
                            :undefined 
                        }
                        </div>
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                
                { currencyID === Constants.IRT_CURRENCY_ID ?<>
                    <button className="btn-success btn-sm"  onClick={confirmIRTDeposit} disabled={checking_transaction || !depositTxAmount}>
                        <span>پرداخت</span>
                        
                    </button>
                    {generatingWallet? 
                        <Loader type="Oval" color="#fff" width={25} height={25}></Loader>:undefined }
                </>:<button className="btn-success btn-sm"  onClick={confirmDeposit} disabled={checking_transaction}>
                    <span>بررسی تراکنش</span>
                </button>}


                {checking_transaction  &&
                        <Loader type="Oval" color="#999" height={25} width={25} />
                    }
                </Modal.Footer>
            </Modal>

           <Modal show={withdrawModalOpen} onHide={closeWithdrawModal} className="convert-detail-modal">
                <Modal.Header closeButton>
                <Modal.Title>برداشت از کیف پول </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currencyID !== Constants.IRT_CURRENCY_ID ?<>
                        <div className="col-12 mb-3">
                            <label htmlFor="card-select" className="form-label">آدرس کیف پول  مقصد</label>
                            <input type="text" className="form-control mb-2" value={withdrawWalletText} onChange={e=>setWithdrawWalletText(e.target.value)}/>
                            {withdrawWallet.service && withdrawWallet.service.network && withdrawWallet.service.network.realName? <small className="form-text mt-4 mb-5">
                                <span className="text-danger">توجه : </span>
                                <span>کیف پول وارد شده الزاما باید در شبکه </span>
                                <span className="text-success px-2">{withdrawWallet.service.network.realName} {"("}{withdrawWallet.service.network.name}{")"}</span>
                                <span>باشد.</span>
                                <br/>
                                در غیر اینصورت ، امکان از بین رفتن دارایی شما وجود دارد.
                            </small>:undefined}
                        </div>
                        <div className="col-12 mb-3 position-relative">
                            <label htmlFor="card-select" className="form-label">شبکه</label>
                            <select type="text" className="form-control mb-2" value={withdrawalNetwork} onChange={e=>setWithdrawalNetwork(e.target.value)}>
                                {withdrawWallet&& withdrawWallet.service? withdrawWallet.service.network.map((item, idx)=>{
                                    return <option key={idx} value={item.id}>{item.name} {" "}({item.realName})</option>
                                }):undefined}
                            </select>
                            <FiChevronDown className="position-absolute" style={{left: "18px", bottom: "12px"}}/>

                        </div>
                        </>
                    :
                        <>
                            <label htmlFor="card-select" className="form-label">انتخاب کارت</label>
                            <select className="form-control" name="card-select" value={withdrawCard.id} onChange={changeWithdrawCard}>
                                <option value="0">انتخاب کارت</option>
                                {validCards.map((item, idx)=>{
                                    return <option value={item.id} key={idx}>{item.card} {"-"} {item.bank}</option>
                                })}
                            </select>
                        </>
                    }
                    <div className="col-12 mt-5 pt-4">
                        <label htmlFor="card-select" className="form-label">مقدار برداشت از 
                        <span className="px-2 text-success fs-5">{withdrawWallet?withdrawWallet.service.name:undefined}</span>
                        </label>
                        {currencyID == Constants.IRT_CURRENCY_ID ?
                        <input type="text" className="form-control" onFocus={e=>setWithdrawAmount("")} value={withdrawAmount} onChange={e=>setWithdrawAmount(Number(String(e.target.value).replace(/,/g,"")).toLocaleString())}/>
                        :<input type="text" className="form-control" onFocus={e=>setWithdrawAmount("")} value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)}/>}
                        <div>
                            <small className='cursor-pointer' onClick={e=>setWithdrawAmount(withdrawWallet.balance)}>انتخاب کل موجودی</small>
                            :
                            <small>{withdrawWallet.balance}</small>
                        </div>
                        

                    </div>
                    
                    
                </Modal.Body>
                <Modal.Footer>
               
                <button className="btn-success btn-sm d-flex justify-content-center" size="sm" onClick={openVerify} disabled={!withdrawAmount || withdrawWallet.balance===0}>
                    برداشت
                    {checking_transaction?<Loader type="Oval" color="#fff" height={25} width={25}></Loader> :undefined}

                </button>
                </Modal.Footer>
            </Modal>
                            
            <Modal show={nocardsModalOpen} onHide={closeNocardsModal} className="convert-detail-modal">
                <Modal.Header closeButton>
                <Modal.Title>عدم وجود کارت فعال</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <p>شما کارت  تایید شده ای ندارید</p>
                        <p className="text-success">
                            <Link to="/settings-account">
                                <span className="text-success">افزودن حساب</span>
                            </Link>
                        </p>
                    
                </Modal.Body>
                <Modal.Footer>
                <Link className="btn btn-sm btn-success " to="/settings-account">افزودن کارت </Link>
                
                </Modal.Footer>
            </Modal>
            <Modal show={showNotVerifiedModal} onHide={closeNotVerifiedModal} className="convert-detail-modal">
                <Modal.Header closeButton>
                <Modal.Title>حساب احراز هویت نشده</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <p>برای انجام واریز و برداشت لطفا ابتدا نسبت به احراز هویت حساب خود اقدام نمایید.</p>
                </Modal.Body>
                <Modal.Footer>
                <Link className="btn btn-sm btn-success " to="/verify-step-1">
                    احراز هویت
                </Link>
                
                </Modal.Footer>
            </Modal>
            <Modal dialogClassName="modal-90w mx-auto" contentClassName="dark" show={summaryModalOpen} onHide={() => setSummaryModalOpen(false)}>
                <Modal.Header closeButton>
                <Modal.Title>تاریخچه</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderList orders={historyOrders}></OrderList>
                </Modal.Body>
               
            </Modal>
           
            <Modal  contentClassName="dark" show={validateModalOpen} onHide={() => setValidateModalOpen(false)}>
                <Modal.Header closeButton>
                <Modal.Title>تاریخچه</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {checking_irt_deposit? 
                        <Loader type="Circles" height={70} width={70} color="#fff"/>
                        :
                        validateModalDetails.status && validateModalDetails.status === 200 ?
                            <div className="identity-content">
                                <span className="icon icon-primary">
                                    <i className="fa fa-check"></i>
                                </span>
                                <h4>پرداخت با موفقیت انجام شد</h4>
                                <p className="mt5">
                                    با تشکر از حسن اعتماد شما
                                    <br/>
                                    مبلغ واریز شده در کمترین زمان به کیف پول شما افزوده خواهد شد.
                                </p>
                                <p>شماره پیگیری:</p>
                                <h2 className="text-warning">{validateModalDetails.track_id}</h2>
                            </div>
    
                        :
                            <div className="identity-content">
                                <span className="icon icon-warning">
                                    <i className="fa fa-exclamation"></i>
                                </span>
                                <h4>{validateModalDetails.status_text}</h4>
                                <p>شماره پیگیری:</p>
                                <h2 className="text-warning">{validateModalDetails.track_id}</h2>
                            </div>
                        }
                    
                    
                </Modal.Body>
               
            </Modal>

            <Modal contentClassName="dark" show={preDepositModalOpen} onHide={() => setPreDepositModalOpen(false)}>
                <Modal.Header closeButton>
                <Modal.Title>واریز</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!depositNetwork?
                        <>
                            <div className="col-12 mb-3 position-relative">
                            <label htmlFor="card-select" className="form-label">شبکه</label>
                            <select type="text" className="form-control mb-2" value={depositNetwork} onChange={e=>changeDepositNetwork(e.target.value)}>
                                <option value={""}>انتخاب</option>
                                
                                {depositWallet&&depositWallet.service ? depositWallet.service.network.map((item, idx)=>{
                                    return <option value={item.id}>{item.name} {" "}({item.realName})</option>
                                }):undefined}
                            </select>
                            <FiChevronDown className="position-absolute" style={{left: "18px", bottom: "12px"}}/>

                        </div>
                        </>
                    :(fetchingAddress && !address?
                        <>
                            <p>در حال دریافت اطلاعات ...</p>
                        </>
                    :
                    (selectedCurrency && selectedCurrency.service && address?
                        <>
                            <p>
                            کاربر گرامی ، لطفا ابتدا میزان مورد نظر ارز 
                            <span className="px-2 text-success">{selectedCurrency.service.name}</span>
                            را به کیف پول  
                            </p>
                            <p className="px-2 text-success mt-5  rounded border-success border">
                                <span className=" px-2  wallet-address">{address}</span>
                                <br/>
                                
                            </p>
                                <button class=" btn-sm btn-danger fs-6 my-3 d-block"
                                   onClick={copyToClipboard}
                                >
                                    {copying? 
                                    <>
                                        کپی شد !
                                        <i className="fa fa-check me-2 text-white"></i>
                                    </> 
                                    : "کپی کن !"}
                                    
                                    </button>
                                در شبکه
                                {depositWallet.service && depositWallet.service.network && depositWallet.service.network.realName?
                                <span className="px-2 fs-5 text-warning" >{depositWallet.service.network.realName} {"("}{depositWallet.service.network.name}{")"}</span>
                                :undefined}
                                    
                                <span>واریز نموده سپس  دکمه «واریز کردم» را  کلیک کنید.</span>

                        </>:
                            <>
                            <p>مشکلی در دریافت آدرس کیف پول مربوطه پیش آمد.</p> 
                          <button onClick={e=>openPreDepositModal(selectedCurrency)} className="btn-simple text-warning d-flex justify-content-center">
                              تلاش دوباره 
                                {fetchingAddress? <Loader className="mx-3" type="Oval" color="#fff" width={25} height={25}></Loader>:undefined}
                                </button>
                            </>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                <button className="btn btn-sm btn-success " disabled={!address || !depositNetwork} onClick={openDepositModal}>
                {!depositNetwork? 
                    "شبکه  را انتخاب کنید"
                :fetchingAddress && !address ?
                    <Loader type="Oval" color="#fff" height={25} width={25}></Loader> 
                    :
                    "واریز کردم"
                }
                </button>
                
                </Modal.Footer>
            </Modal>
             <Modal  contentClassName="dark" show={showVerify} onHide={() => setShowVerify(false)} backdrop='static'>
                    <Modal.Header closeButton>
                    <Modal.Title>کد تایید</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>لطفا کد تایید ارسال شده را وارد نمایید.</p>
                        <div className="mb-4">
                            <label htmlFor="code" className="pb-2">کد تایید</label>
                            <input type="text" name="code" value={verifyCode} onChange={e=>setVerifyCode(e.target.value)} className="form-control"/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            onClick={verifyTheCode}
                            className={"btn btn-success ps-5 pe-5 " + (!verifyCode?"disabled":"")}
                            disabled={!verifyCode}
                            type="button"
                        >
                            {checking_transaction?
                                <Loader  type="ThreeDots" color="#fff" height={25} width={35} />:
                            <span> بررسی </span>}
                        </button>
                    </Modal.Footer>
               
                 </Modal>
        </>
    )
}

export default Wallet;