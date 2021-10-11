import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function IndexTransactions({visibleTrancactionCount}) {
    const transactions = useSelector(state=>state.accounts.transactions)
    const wallet = useSelector(state=>state.accounts.wallet)
    const [ visibleCount, setVisibleCount ] = useState(visibleTrancactionCount)
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
                                            <th>#</th>
                                            <th>شماره تراکنش</th>
                                            <th>تاریخ تراکنش</th>
                                            <th>نوع تراکنش</th>
                                            <th>مقدار تراکنش</th>
                                            {/* <th>ارز مبدا</th>
                                            <th>ارز مقصد</th> */}
                                            <th>شماره پیگیری </th>
                                            <th>وضعیت تراکنش</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((item, idx)=>{
                                            return (idx+1) <= visibleCount && <tr key={idx}>
                                                    <td>{idx+1}</td>
                                                    <td>{item["id"]}</td>
                                                    <td>{new Date(item["published"]).toLocaleString("fa-IR")}</td>
                                                    <td>
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
                                                    </td>
                                                    <td>{Number(item["amount"]).toLocaleString()} {" "} {item.service ?item.service .small_name_slug: ""}</td>
                                                    <td>{item["tx_id"]}</td>
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
        </>
    )
}

export default IndexTransactions
