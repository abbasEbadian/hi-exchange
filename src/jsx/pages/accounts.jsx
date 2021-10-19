import React, {useEffect} from 'react';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import OrderList  from '../element/orderList'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_user_all_data } from '../../redux/actions';
import UserAvatar from '../element/userAvatar';


function Accounts() {
    const orders = useSelector(state=>state.accounts.orders)
    const user = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetch_user_all_data())
    }, [])
    
    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="card profile_card">
                                <div className="card-body">
                                    <div className="d-flex border-0 mb-0 pb-0">
                                        <UserAvatar width={"70px"}></UserAvatar>
                                           
                                        <div className="pe-4">
                                            <h4 className="mb-2">{user.first_name + " " + user.last_name}</h4>
                                            <p className="mb-1"> <span><i className="fa fa-phone ms-2 text-primary"></i></span>
                                            <span dir="ltr">{user.mobile}</span>
                                            </p>
                                            <p className="mb-1"> <span><i className="fa fa-envelope ms-2 text-primary"></i></span>
                                                {user.email}
                                        </p>
                                        </div>
                                    </div>

                                   
                                    
                                </div>
                            </div>
                        </div>
                       </div>
                    <div className="row">
                        <div className="col-xl-12">
                        <OrderList orders={orders}></OrderList>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    )
}

export default Accounts;