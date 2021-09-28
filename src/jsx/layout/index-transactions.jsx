import React, { useState, useEffect } from 'react'
import axios from 'axios';

function IndexTransactions({visibleTrancactionCount}) {
    const [transactions ,setTransactions ] = useState([])
    const [ visibleCount, setVisibleCount ] = useState(visibleTrancactionCount)
    
    const increaseVisible = ()=>{
        const max = Math.min(transactions.length, visibleCount+visibleTrancactionCount)
        setVisibleCount(max);
    }
    useEffect(() => {
       axios.get("https://hi-exchange.com/api/v2/transaction/list/").then(res=>{
           const {data} = res
           setTransactions(data)
       }).catch(e=>{
           console.log(e);
           
       })
    }, [])
    return (
        <>
            <div className="card">
                <div className="card-header border-0">
                    <h4 className="card-title"> تراکنش ها</h4>
                </div>
                <div className="card-body pt-0">
                    <div className="transaction-table">
                        <div className="table-responsive">
                        {transactions.length > 0?
                            <>
                            <table className="table mb-0 table-responsive-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>شماره تراکنش</th>
                                        <th>نوع تراکنش</th>
                                        <th>مقدار تراکنش</th>
                                        <th>وضعیت تراکنش</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((item, idx)=>{
                                        return (idx+1) <= visibleCount && <tr key={idx}>
                                                <td>{idx+1}</td>
                                                <td>{item["id"]}</td>
                                                <td>
                                                    <span className="badge badge-danger">{item["type"]}</span>
                                                </td>
                                                <td>{item["amount"]}</td>
                                                
                                                <td className={
                                                    (item["status"] === "pending" ? "text-warning": undefined) ||
                                                    (item["status"] === "registered" ? "text-info": undefined) ||
                                                    (item["status"] === "cancel" ? "text-danger": undefined) ||
                                                    (item["status"] === "accepted" ? "text-success": undefined) 
                                                    }>{item["status"]}</td>
                                                
                                            </tr>
                                    })}
                                    
                                </tbody>
                            </table>
                                {visibleCount < transactions.length && 
                                    <button className="bg-transparent text-success border-0" onClick={increaseVisible}>مشاهده بیشتر </button>
                                    
                                }
                                </>
                            :
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
