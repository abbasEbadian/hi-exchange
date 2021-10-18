import React from 'react'
import { useSelector }from 'react-redux'
import Loader from 'react-loader-spinner'
function OrderList({orders}) {
    const currencyList = useSelector(state => state.currencies.currencyList)
    const {getting_orders} = useSelector(state => state.accounts)
    
    return (
        <>
        <div className="card mb-0">
        <div className="card-header border-0">
            <h4 className="card-title">تاریخچه معاملات</h4>
        </div>
        <div className="card-body pt-0">
            <div className="transaction-table">
                <div className="table-responsive">
                {currencyList.length && orders && orders.length?
                    <table className="table mb-0 table-responsive-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>نوع معامله</th>
                                <th>مبدا</th>
                                <th>مقصد</th>
                                <th>وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {orders.map((order, idx)=>{
                                    
                                    return  <tr key={idx}>
                                        {order.type === "purchase"?
                                            <>
                                                <td><span className="buy-thumb"><i className="la la-arrow-up"></i></span>
                                                </td>
                                                <td>
                                                    <span className="badge badge-success">خرید</span>
                                                </td>
                                                
                                                <td dir="ltr" className="text-end">{Number(order.source_amount).toLocaleString()} {" "} {currencyList.filter(i=>i.id===order.source_asset)[0].small_name_slug}</td>
                                                <td dir="ltr" className="text-success  text-end">{Number(order.destination_amount).toLocaleString()} {" "} {currencyList.filter(i=>i.id===order.destination_asset)[0].small_name_slug}</td>
                                            </>
                                        :order.type ==="sell"?
                                            <>
                                            <td><span className="sold-thumb"><i className="la la-arrow-down"></i>
                                                </span>
                                            </td>
                                            

                                            <td>
                                                <span className="badge badge-danger">فروش</span>
                                            </td>
                                            <td dir="ltr"className="text-danger  text-end">{Number(order.source_amount).toLocaleString()} {" "} {currencyList.filter(i=>+i.id===+order.source_asset)[0].small_name_slug}</td>
                                            <td dir="ltr" className=" text-end">{Number(order.destination_amount).toLocaleString()} {" "} {currencyList.filter(i=>+i.id===+order.destination_asset)[0].small_name_slug}</td>
                                          </>
                                        :
                                            <>
                                            <td><span className="swap-thumb"><i className="icofont-exchange"></i>
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge badge-warning">تبدیل</span>
                                            </td>
                                           
                                            <td dir="ltr" className=" text-end">{Number(order.source_amount).toLocaleString()} {" "} {currencyList.filter(i=>+i.id===+order.source_asset)[0].small_name_slug}</td>
                                            <td dir="ltr"className="text-success text-end">{Number(order.destination_amount).toLocaleString()} {" "} {currencyList.filter(i=>+i.id===+order.destination_asset)[0].small_name_slug}</td>
                                          </>
                                        
                                        }
                                        
                                        {order.status==="pending"? 
                                            <td ><span className="badge badge-warning"> درانتظار تکمیل اطلاعات</span></td>
                                        :order.status==="unpaid"?
                                            <td ><span className="badge badge-dager">پرداخت نشده</span></td>
                                        :order.status==="accepted"?
                                            <td ><span className="badge badge-success"> ثبت/احراز شده</span></td>
                                        :order.status==="delivered"?
                                            <td ><span className="badge badge-info"> موفق</span></td>
                                        :order.status==="suspended"?
                                            <td ><span className="badge badge-danger"> لغو شده</span></td>
                                        :order.status==="canceled"?
                                            <td ><span className="badge badge-danger"> ناموفق</span></td>
                                        :order.status==="deposit"?
                                            <td ><span className="badge badge-danger">درانتظار واریز</span></td>
                                        :order.status==="deposited"?
                                            <td ><span className="badge badge-info">واریز شده</span></td>
                                        :<td ><span className="badge badge-warning"> درانتظار تکمیل اطلاعات</span></td>
                                        }
                                       
                                       
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>: getting_orders?
                    <Loader type="Oval" color="#00BFFF" height={50} width={50} />:
                    <p>فعالیتی ندارید</p>

                }
                </div>
            </div>
        </div>
    </div>
    </>             
    )
}

export default OrderList
