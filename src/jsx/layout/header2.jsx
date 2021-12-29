import React, {useState} from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Link, useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../redux/actions';
import NotificationWidget from '../element/notificationWidget' 
import { Constants } from '../../Constants';
import FastBuySell from '../element/fast-buy-sell'
import { Modal } from 'react-bootstrap';

function Header2() {
    const currentUser = useSelector(state=>state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    const [fastModal, setFastModal] = useState(false)

    
    return (
        <>
        
            <div className="header dashboard ">

                {currentUser&&currentUser.is_phone_accepted && currentUser.authentication_status !=="accepted"?<div className="in-progress">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                        <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                        <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
                        </svg>
                        حساب شما در حال بررسی می باشد.
                    </div>:undefined}
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <nav className="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
                                <a className="navbar-brand" href={'https://www.hi-exchange.com'}><img src={require('./../../images/logo.png')} alt="" /></a>

                                <div className="d-md-flex d-none   align-items-center justify-contetn-center mx-auto">
                                    <a className="ms-4 text-white" href="http://www.panel.hi-exchange.com">صفحه اصلی</a>
                                    <Link to="/" className="ms-4 text-white">تبدیل ارز</Link>
                                    <Link to="/buy-sell" className="ms-4 text-white">خرید و فروش</Link>
                                    <Link to="#FastOrder" className="ms-4 text-white"  onClick={e=>setFastModal(true)}>
                                         سفارش سریع
                                    </Link>
                                    <Link to="/wallet" className="text-white ms-4">واریز و برداشت</Link>
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
                                           
                                            <Link to={'/history'} className="dropdown-item">
                                                <i className="la la-book"></i> تاریخچه واریز و برداشت
                                            </Link>
                                            <Link to={'/accounts'} className="dropdown-item">
                                                <i className="la la-history"></i> تاریخچه معاملات
                                            </Link>
                                            <Link to={'/settings'} className="dropdown-item">
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
            <Modal dialogClassName="mx-auto" contentClassName="dark" show={fastModal} onHide={() => setFastModal(false)}>
                        <Modal.Header closeButton>
                        <Modal.Title>سفارش سریع</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <FastBuySell></FastBuySell>
                        </Modal.Body>

                    </Modal>
        
        </>
    )
}
export default Header2;