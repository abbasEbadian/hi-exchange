import React, {useEffect} from 'react';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import OrderList  from '../element/orderList'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_user_all_data, mark_notifications_asread } from '../../redux/actions';
import Loader from 'react-loader-spinner'
import TimeAgo from 'react-timeago'
import farsiStrings from 'react-timeago/lib/language-strings/fa'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
 
function Notifications() {
    const formatter = buildFormatter(farsiStrings)
    const orders = useSelector(state=>state.accounts.orders)
    const {notificationList:notifications, updating_notifications} = useSelector(state=>state.notifications)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetch_user_all_data())
        dispatch(mark_notifications_asread())
    }, [])
    
    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body">
                <div className="container-fluid">
                   <div className="row">
                        <div className="col-xl-12">
                        <div className="card mb-0">
                                <div className="card-header border-0">
                                    <h4 className="card-title">اعلان ها</h4>
                                </div>
                                <div className="card-body pt-0">
                                    <div className="transaction-table">
                                        <div className="table-responsive">
                                        {notifications && notifications.length?
                                            <table className="table mb-0 table-responsive-sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>متن </th>
                                                        <th>نوع</th>
                                                        <th>تاریخ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                        {notifications.map((notif, idx)=>{
                                                            return  <tr key={idx}>
                                                                <>
                                                                    <td>{idx+1}</td>
                                                                    <td>{notif.text}</td>
                                                                   
                                                                    <td>
                                                                        <span className="badge badge-success">{notif.type}</span>
                                                                    </td>
                                                                    <td> <small><TimeAgo date={notif.published} formatter={formatter} /> </small></td>
                                                                   
                                                                    </>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>: updating_notifications?
                                                <Loader type="Oval" color="#00BFFF" height={50} width={50} />:
                                            <p>اعلانی ندارید</p>

                                        }
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

export default Notifications;