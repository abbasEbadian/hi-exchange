import React, { useEffect, useState, useRef } from 'react';
import Header2 from './../layout/header2';
import Sidebar from '../layout/sidebar';
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap' 
import {Constants}  from '../../Constants'
import { useDispatch } from 'react-redux'
import Loader from 'react-loader-spinner';
import { check_transaction, check_withdraw, get_wallet_list, fetch_accounts } from '../../redux/actions'
import { toast, ToastContainer} from 'react-toastify'
import { Link } from 'react-router-dom'
import OrderList from '../element/orderList';
import axios from 'axios';
function Wallet() {
    const dispatch = useDispatch() 
    
    const {wallet, checking_transaction, is_fetching } = useSelector(state => state.wallet)
    const cards = useSelector(state => state.accounts.cards)
    const orders = useSelector(state => state.accounts.orders)
    const [validCards, setValidCards] = useState([])
    const [currencyID, setCurrencyID] = useState(undefined)
    const [selectedCurrency, setSelectedCurrency] = useState(undefined)
    const [withdrawAmount, setWithdrawAmount] = useState(undefined)
    const [withdrawCard, setWithdrawCard] = useState(undefined)
    const [depositCard, setDepositCard] = useState(undefined)
    const [depositTxID, setDepositTxID] = useState(undefined)
    const [depositTxAmount, setDepositTxAmount] = useState("")
    const [depositModalOpen, setDepositModalOpen] = useState(false)
    const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
    const [nocardsModalOpen, setNocardsModalOpen] = useState(false)
    const [summaryModalOpen, setSummaryModalOpen] = useState(false)
    const [historyOrders, setHistoyOrders] = useState([])

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

    const openDepositModal = (currency_id) => {
        if(validCards.length === 0){
            openNocardsModal()
            return 
        }
        const _wallet = wallet.filter(item=>{
            return item.service.id === currency_id
        })
        if (!_wallet.length) return
        console.log(_wallet);
        
        axios.post(Constants.BASE_URL+"/api/v2/wallet/deposit/address/", {
            wallet:_wallet[0].id
        }).then(response=>{
            if(!response) throw Error
            const {data} = response 
            console.log(data);
            
        }).catch(err=>{
            console.log(err);
        })
        setSelectedCurrency(_wallet[0])
        setDepositModalOpen(true)
        setCurrencyID(currency_id)
    };
    const openWithdrawModal = (currency_id) => {
        if(validCards.length === 0){
            openNocardsModal()
            return 
        }
        setSelectedCurrency(wallet.filter((item)=>{return item.service.id===currency_id})[0])
        setWithdrawModalOpen(true)
        setCurrencyID(currency_id)
    };
    
    const confirmWithdraw= ()=>{
        dispatch(check_withdraw({card_id: withdrawCard.id}, setWithdrawModalOpen, toast))
    }
    const confirmDeposit= ()=>{
        if(currencyID !== Constants.IRT_CURRENCY_ID){
           
            dispatch(check_transaction({depositTxID }, setDepositModalOpen, toast))
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
        setWithdrawCard(vc.length ? vc[0]: undefined)
        
        
        
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
                                                        onClick={e=>openDepositModal(item.service.id)}
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
                            <label htmlFor="" className="d-flex justify-content-between form-label">
                                <span>شماره تراکنش</span>
                                <span>tx_id</span>
                            </label>
                            <input type="text" className="form-control" value={depositTxID} onChange={e=>setDepositTxID(e.target.value)}/>

                            <label htmlFor="" className="d-flex justify-content-between form-label mt-3">مبلغ تراکنش </label>
                            <input type="text" className="form-control" value={depositTxAmount} onChange={e=>setDepositTxAmount(e.target.value)}/>
                        </div>
                    }
                    
                </Modal.Body>
                <Modal.Footer>
                <button className="text-danger bg-transparent border-0"  onClick={closeDepositModal}>
                    لغو
                </button>
                
                <button className="btn-success btn-sm"  onClick={confirmDeposit} disabled={checking_transaction}>
                    <span>بررسی تراکنش</span>
                    
                </button>
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
                    <div className="col-12 mb-3">
                        <label htmlFor="card-select" className="form-label">انتخاب کارت</label>
                        {validCards? <select className="form-control" name="card-select" value={withdrawCard} onChange={changeWithdrawCard}>
                            {validCards.map((item, idx)=>{
                                return item.status === "confirmed" ? <option value={item.id} key={idx} >{item.card} {"-"} {item.bank}</option>: undefined
                            })}
                        </select>:undefined}
                    </div>
                    <div className="col-12">
                        <label htmlFor="card-select" className="form-label">مقدار برداشت از 
                        <span className="px-2 text-success fs-5">{selectedCurrency?selectedCurrency.service.name:undefined}</span>
                        </label>
                        <input type="text" className="form-control" value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)}/>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                <button className="text-danger bg-transparent border-0" onClick={closeWithdrawModal}>
                    لغو
                </button>
                <button className="btn-success btn-sm" size="sm" onClick={confirmWithdraw}>
                بررسی تراکنش
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
       
        </>
    )
}

export default Wallet;