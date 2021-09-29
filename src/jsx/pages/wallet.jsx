import React, { useEffect, useState} from 'react';
import Header2 from './../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap' 
import {Constants}  from '../../Constants'
import { useDispatch } from 'react-redux'
import Loader from 'react-loader-spinner';
import { check_transaction, check_withdraw, check_withdraw_irt } from '../../redux/actions'
import { toast, ToastContainer} from 'react-toastify'
import { Link } from 'react-router-dom'
import OrderList from '../element/orderList';
import axios from 'axios';

function Wallet() {
    const dispatch = useDispatch() 
    
    const {wallet, checking_transaction, is_fetching } = useSelector(state => state.wallet)
    const user = useSelector(state => state.session.user)
    const cards = useSelector(state => state.accounts.cards)
    const orders = useSelector(state => state.accounts.orders)
    const [address, setAddress] = useState("")
    const [fetchingAddress, setFetchingAddress] = useState(false)
    const [transactionResult, setTransactionResult] = useState({status:undefined, text: undefined})
    const [validCards, setValidCards] = useState([])
    const [currencyID, setCurrencyID] = useState(undefined)
    const [selectedCurrency, setSelectedCurrency] = useState(undefined)
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const [withdrawWallet, setWithdrawWallet] = useState(0)
    const [withdrawCard, setWithdrawCard] = useState(0)
    const [withdrawWalletText, setWithdrawWalletText] = useState("")
    const [depositCard, setDepositCard] = useState(undefined)
    const [depositTxID, setDepositTxID] = useState("")
    const [depositTxAmount, setDepositTxAmount] = useState("")
    const [depositModalOpen, setDepositModalOpen] = useState(false)
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
    const [nocardsModalOpen, setNocardsModalOpen] = useState(false)
    const [summaryModalOpen, setSummaryModalOpen] = useState(false)
    const [preDepositModalOpen, setPreDepositModalOpen] = useState(false)
    
    
    const [historyOrders, setHistoyOrders] = useState([])

    const closePreDepositModal = () => {
        setAddress("")
        setPreDepositModalOpen(false)
    }
    const openPreDepositModal = (currency_id) => {
        if(validCards.length === 0){
            openNocardsModal()
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
        setPreDepositModalOpen(true)
        setFetchingAddress(true)
        axios.post(Constants.BASE_URL+"/api/v2/wallet/deposit/address/", {
            wallet:_wallet[0].id
        }).then(response=>{
            if(!response) throw Error(401)
            const {data} = response 
            setAddress(data.address)
            setSelectedCurrency(_wallet[0])
        }).catch(err=>{
        }).finally(f=>{
            setFetchingAddress(false)

        })

    }

    const closeNocardsModal = () => setNocardsModalOpen(false)
    const openNocardsModal = () => setNocardsModalOpen(true)

    const closeDepositModal = () => setDepositModalOpen(false)
    const closeWithdrawModal = () => setWithdrawModalOpen(false)

    const closeSummaryModal = () => setSummaryModalOpen(false)
    const openSummaryModal = (currency_id) => {    
        const o = orders.filter(item=>{
            return item.destination_asset === currency_id || item.source_asset === currency_id
        })
        setHistoyOrders(o)
        setSummaryModalOpen(true)
    }


    const confirmIRTDeposit = ()=>{
       
        axios.post("http://127.0.0.1:5000/create_payment_link", {
            order_id: "HiEx-"+Math.round(100000*(Math.random())),
            amount: depositTxAmount,
            name: (user.first_name + " " + user.last_name) || 'کاربر های ایکسچنج',
            phone: user.phone || user.mobile || "",
            mail: user.email || "",
            desc: "شارژ کیف پول تومانی"
        }).then(response=>{
            const {data} = response
            console.log(data);
        }).catch(error=>{
            console.log(error)
        })
    }


    const openDepositModal = (currency_id) => {
        setDepositTxAmount(0)
        if(preDepositModalOpen) closePreDepositModal()
        setDepositModalOpen(true)
    };



    const openWithdrawModal = (currency_id) => {
        if(validCards.length === 0){
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
                amount: withdrawAmount
            }, setWithdrawModalOpen, toast))
        }else{

            dispatch(check_withdraw({
                sourceWallet: withdrawWallet.id,
                Destwallet: withdrawWalletText, 
                amount: withdrawAmount
            }, setWithdrawModalOpen, toast))
        }
    }


    const confirmDeposit= ()=>{
        if(currencyID !== Constants.IRT_CURRENCY_ID){
            const _wallet = wallet.filter(item=>{
                return item && item.service.id === currencyID
            })
            dispatch(check_transaction({depositTxID, wallet: _wallet[0].id }, setTransactionResult))
        }
    }

    const changeDepositCard = (e)=>{
        const selected = e.target.value
        setDepositCard(cards.filter(item=>item.id === selected))
    }
    const changeWithdrawCard = (e)=>{
        const selected = e.target.value
        setWithdrawCard(cards.filter(item=>item.id === selected))
    }



   useEffect(() => {
        const vc = cards.filter((item, idx)=>{
           return item.status === "confirmed"
        })
        setValidCards(vc)
        
        
        
        
   }, [cards])
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
                                            <td> { item.service.small_name } <i className={"me-2 fs-3 cc "+ item.service.small_name_slug}/></td>
                                            <td> { item.service.name } </td>
                                            
                                            <td>{item.balance}</td>
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
                                            <td style={{width: 50+"px"}} className="text-center cursor-pointer"><span className="icofont-refresh"></span></td>
                                            
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
                            <select className="form-control" name="card-select" value={depositCard} onChange={changeDepositCard}>
                                {validCards.map((item, idx)=>{
                                    return <option value={item.id} key={idx}>{item.card} {"-"} {item.bank}</option>
                                })}
                            </select>
                            <label htmlFor="" className="d-flex justify-content-between form-label mt-3">مقدار  </label>
                            <input type="text" className="form-control" value={depositTxAmount} onChange={e=>setDepositTxAmount(e.target.value)}/>
                        
                        </>:
                        <div className="col-12">
                            <p>لطفا شماره تراکنش واریز را به همراه مبلغ تراکنش وارد نمایید</p>
                            <label htmlFor="" className="d-flex justify-content-between form-label">
                                <span>شماره تراکنش</span>
                                <span>tx_id</span>
                            </label>
                            <input type="text" className="form-control" value={depositTxID} onChange={e=>setDepositTxID(e.target.value)}/>

                            <label htmlFor="" className="d-flex justify-content-between form-label mt-3">مبلغ تراکنش </label>
                            <input type="text" className="form-control" value={depositTxAmount} onChange={e=>setDepositTxAmount(e.target.value)}/>


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
                <button className="text-danger bg-transparent border-0"  onClick={closeDepositModal}>
                    لغو
                </button>
                { currencyID === Constants.IRT_CURRENCY_ID ?
                    <button className="btn-success btn-sm"  onClick={confirmIRTDeposit} disabled={checking_transaction || !depositTxAmount}>
                        <span>پرداخت</span>
                    </button>
                :<button className="btn-success btn-sm"  onClick={confirmDeposit} disabled={checking_transaction}>
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
                    {currencyID !== Constants.IRT_CURRENCY_ID ?
                        <div className="col-12 mb-3">
                            <label htmlFor="card-select" className="form-label">آدرس کیف پول  مقصد</label>
                            <input type="text" className="form-control mb-2" value={withdrawWalletText} onChange={e=>setWithdrawWalletText(e.target.value)}/>
                            {withdrawWallet.service && withdrawWallet.service.network && withdrawWallet.service.network.realName? <small className="form-text mt-4 mb-5">
                                <span className="text-danger">توجه : </span>
                                <span>کیف پول وارد شده الزاما باید در شبکه </span>
                                <span className="text-success px-2">{withdrawWallet.service.network.realName} {"("}{withdrawWallet.service.network.name}{")"}</span>
                                <span>باشد.در غیر اینصورت ، امکان از بین رفتن دارایی شما وجود دارد.</span>
                            </small>:undefined}
                        </div>
                    :
                        <>
                            <label htmlFor="card-select" className="form-label">انتخاب کارت</label>
                            <select className="form-control" name="card-select" value={withdrawCard} onChange={changeWithdrawCard}>
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
                        <input type="text" className="form-control" value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)}/>
                    </div>
                    
                    
                </Modal.Body>
                <Modal.Footer>
                <button className="text-danger bg-transparent border-0" onClick={closeWithdrawModal}>
                    لغو
                </button>
                <button className="btn-success btn-sm d-flex justify-content-center" size="sm" onClick={confirmWithdraw} disabled={!withdrawAmount}>
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
                <button className="text-danger bg-transparent border-0" onClick={closeNocardsModal}>
                    بستن
                </button>
                <Link className="btn btn-sm btn-success " to="/verify-step-1">احراز هویت</Link>
                
                </Modal.Footer>
            </Modal>
            <Modal dialogClassName="modal-90w mx-auto" contentClassName="dark" show={summaryModalOpen} onHide={() => setSummaryModalOpen(false)}>
                <Modal.Header closeButton>
                <Modal.Title>تاریخچه</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OrderList orders={historyOrders}></OrderList>
                </Modal.Body>
                <Modal.Footer>
                <button className="text-danger bg-transparent border-0" onClick={closeSummaryModal}>
                    بستن
                </button>
                
                </Modal.Footer>
            </Modal>

            <Modal contentClassName="dark" show={preDepositModalOpen} onHide={() => setPreDepositModalOpen(false)}>
                <Modal.Header closeButton>
                <Modal.Title>واریز</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {fetchingAddress && !address?
                        <>
                            <p>در حال دریافت اطلاعات ...</p>
                        </>
                    :
                    selectedCurrency && selectedCurrency.service && address?
                        <>
                            <p>
                            کاربر گرامی ، لطفا ابتدا میزان مورد نظر ارز 
                            <span className="px-2 text-success">{selectedCurrency.service.name}</span>
                            را به کیف پول  
                            </p>
                            <p className="px-2 text-success my-5">{address}</p>
                                در وبسایت
                            <a className="px-2 fs-5 text-warning" href="https://www.binance.com/">بایننس</a>
                            واریز نموده سپس  دکمه «واریز کردم» را  کلیک کنید.

                        </>:
                            <>
                            <p>مشکلی در دریافت آدرس کیف پول مربوطه پیش آمد.</p> 
                          <button onClick={e=>openPreDepositModal(selectedCurrency)} className="btn-simple text-warning d-flex justify-content-center">
                              تلاش دوباره 
                                {fetchingAddress? <Loader className="mx-3" type="Oval" color="#fff" width={25} height={25}></Loader>:undefined}
                                </button>
                            </>
                    }
                </Modal.Body>
                <Modal.Footer>
                <button className="text-danger bg-transparent border-0" onClick={closePreDepositModal}>
                    بستن
                </button>
                <button className="btn btn-sm btn-success " disabled={!address} onClick={openDepositModal}>
                {fetchingAddress && !address?
                    <Loader type="Oval" color="#fff" height={25} width={25}></Loader> 
                    :
                    "واریز کردم"
                }
                </button>
                
                </Modal.Footer>
            </Modal>
       
        </>
    )
}

export default Wallet;