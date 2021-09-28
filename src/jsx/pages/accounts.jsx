import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import OrderList  from '../element/orderList'
import { useSelector } from 'react-redux'


function Accounts() {
    const orders = useSelector(state=>state.accounts.orders)
    const user = useSelector(state=>state.session.user)
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
                                    <div className="d-flex">
                                        <img className="me-3 rounded-circle me-0 me-sm-3" src={require('./../../images/profile/2.png')} width="60"
                                            height="60" alt="" />
                                        <div className="pe-4">
                                            <h4 className="mb-2">{user.first_name + " " + user.last_name}</h4>
                                            <p className="mb-1"> <span><i className="fa fa-phone ms-2 text-primary"></i></span>
                                            <span dir="ltr">{user.phone}</span>
                                            </p>
                                            <p className="mb-1"> <span><i className="fa fa-envelope ms-2 text-primary"></i></span>
                                                {user.email}
                                        </p>
                                        </div>
                                    </div>

                                    <ul className="card-profile__info">
                                        
                                        
                                        <li>
                                            <h5 className="text-danger ms-4">آخرین ورود</h5>
                                            <span className="text-danger">3 بهمن 1400 ، ساعت 10</span>
                                        </li>
                                    </ul>
                                    
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