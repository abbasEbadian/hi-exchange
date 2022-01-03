import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {Modal} from 'react-bootstrap'

function IndexTransactions({visibleTrancactionCount}) {
    const transactions = useSelector(state=>state.accounts.transactions)
    const wallet = useSelector(state=>state.accounts.wallet)
    const [ visibleCount, setVisibleCount ] = useState(visibleTrancactionCount)

    const [modalDetail, setModalDetail] = useState({type: "deposit", tx_id: "", address:"" })
    const [detailModalOpen, setDetailModalOpen] = useState(false)

    const openModal = (id)=>{
        const tr = transactions.filter((item)=>item&&item.id === id)
        if (tr && tr.length > 0) 
            setModalDetail({type: tr[0].type, tx_id: tr[0].tx_id, address:tr[0].wallet_address})
        setDetailModalOpen(true);
    }
    // const transactions = useRef([])
    const increaseVisible = ()=>{
        const max = Math.min(transactions.length, visibleCount+visibleTrancactionCount)
        setVisibleCount(max);
    }
    // useEffect(() => {
    //    transactions.current = Transactions
    // }, [Transactions])
    return (
        <>
            <div className="card">
                <div className="card-header border-0">
                    <h4 className="card-title"> تراکنش ها</h4>
                </div>
                <div className="card-body pt-0">
                    <div className="transaction-table">
                        <div className="table-responsive">
                        {transactions && transactions.length > 0?
                            <>
                                <table className="table mb-0 table-responsive-sm">
                                    <thead>
                                        <tr>
                                            <th>شماره تراکنش</th>
                                            <th>تاریخ تراکنش</th>
                                            <th>نوع تراکنش</th>
                                            <th>مقدار تراکنش</th>
                                            {/* <th>ارز مبدا</th>
                                            <th>ارز مقصد</th> */}
                                            <th>وضعیت تراکنش</th>
                                            <th>توضیحات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((item, idx)=>{
                                            return (idx+1) <= visibleCount && <tr key={idx}>
                                                    <td>{item["id"]}</td>
                                                    <td dir="ltr" className="text-end">{new Date(item["published"]).toLocaleString("fa-IR")}</td>
                                                    <td className="text-nowrap">
                                                        {item["type"] === "deposit"?
                                                            <span className="badge badge-success">
                                                                واریز
                                                            </span>
                                                                :item["type"] === "swap"?
                                                            <span className="badge badge-warning">
                                                                تبدیل
                                                            </span>:
                                                            <span className="badge badge-danger">
                                                                برداشت
                                                            </span>
                                                        }
                                                        {item.service?
                                                            (item.service.small_name==='IRT'?
                                                                <span className="badge badge-info mx-2">ریالی</span>
                                                                :
                                                                <span className="badge badge-info mx-2">رمزارز</span>
                                                            )
                                                            :undefined
                                                        }
                                                    </td>
                                                    <td dir="ltr" className='text-end'>{Number(item["amount"]).toLocaleString()} {" "} {item.service ?item.service .small_name_slug: ""}</td>
                                                    
                                                    {/* <td>{wallet && wallet.filter(c=>c.id===+item["source"])[0].name}</td>
                                                    <td>{wallet && wallet.filter(c=>c.id===+item["destination"])[0].name}</td> */}
                                                    
                                                    <td className={
                                                        (item["status"] === "pending" ? "text-warning": undefined) ||
                                                        (item["status"] === "registered" ? "text-info": undefined) ||
                                                        (item["status"] === "cancel" ? "text-danger": undefined) ||
                                                        (item["status"] === "paying" ? "text-info": undefined) ||
                                                        (item["status"] === "accepted" ? "text-success": undefined) 
                                                        }>{
                                                            (item["status"] === "pending" ? "در انتظار تایید": undefined) ||
                                                            (item["status"] === "registered" ? "ارسال شده": undefined) ||
                                                            (item["status"] === "cancel" ? "لغو شده": undefined) ||
                                                            (item["status"] === "paying" ? "در حال پرداخت": undefined) ||
                                                            (item["status"] === "accepted" ? "ثبت شده": undefined) 
                                                            }</td>
                                                    <td className="show" onClick={e=>openModal(item.id)}>مشاهده</td>
                                                    
                                                </tr>
                                        })}
                                        
                                    </tbody>
                                </table>

                                {visibleCount < transactions.length && 
                                    <button className="bg-transparent text-success border-0" onClick={increaseVisible}>مشاهده بیشتر </button>
                                }
                            </>:
                                <p>
                                    تراکنشی یافت نشد
                                </p>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <Modal dialogClassName="mx-auto" contentClassName="dark" show={detailModalOpen} onHide={() => setDetailModalOpen(false)}>
                <Modal.Header closeButton>
                <Modal.Title>توضیحات</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>شناسه یکتا: </p>
                    <p className="text-success">{modalDetail.tx_id}</p>
                    {modalDetail.type === 'withdraw'?
                        <>
                        <br/>
                          <p> دریافت کننده: </p>
                            <p className="text-success">{modalDetail.address}</p>  
                        </>
                    :
                        undefined
                    
                    }
                </Modal.Body>
            </Modal>
           
        </>
    )
}

export default IndexTransactions
