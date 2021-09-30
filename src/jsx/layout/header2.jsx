import React, {useState} from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../redux/actions';
import NotificationWidget from '../element/notificationWidget' 

function Header2() {
    const currentUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    
    return (
        <>
        
            <div className="header dashboard">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <nav className="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
                                <Link className="navbar-brand" to={'/'}><img src={require('./../../images/logo.png')} alt="" /></Link>

                                <div className="d-md-flex d-none   align-items-center justify-contetn-center mx-auto">
                                    <a className="ms-4 text-white" href="https://hi-exchange.com">صفحه اصلی</a>
                                    <Link to="/" className="ms-4 text-white">تبدیل</Link>
                                    <Link to="/buy-sell" className="ms-4 text-white">خرید و فروش</Link>
                                    <Link to="/settings-invite" className="text-white">معرفی دوستان</Link>
                                </div>
                                <div className="dashboard_log">
                                    <div className="d-flex align-items-center">

                                        <NotificationWidget></NotificationWidget>

                                        <DropdownButton
                                            alignRight
                                            title={ currentUser.first_name + " " + currentUser.last_name }
                                            className="profile_log"
                                        >
                                            <Link to={'./accounts'} className="dropdown-item">
                                                <i className="la la-user"></i> حساب کاربری
                                            </Link>
                                            <Link to={'./history'} className="dropdown-item">
                                                <i className="la la-book"></i> تاریخچه
                                            </Link>
                                            <Link to={'./settings'} className="dropdown-item">
                                                <i className="la la-cog"></i> تنظیمات
                                            </Link>
                                            <button onClick={()=>dispatch(userLogout(history))} className="dropdown-item logout">
                                            <i className="la la-sign-out"></i> خروج
                                            </button>

                                        </DropdownButton>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}
export default Header2;