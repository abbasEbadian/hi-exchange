import React, { useContext } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';



function Header2() {
    const {user:currentUser } = useContext(UserContext)
    return (
        <>
            <div className="header dashboard">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <nav className="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
                                {/* <Link className="navbar-brand" to={'/'}><img src={require('./../../images/logo.png')} alt="" /></Link> */}

                                <div className="header-search d-flex align-items-center">
                                    <Link className="brand-logo me-3" to="index.html">
                                        <img src={require('./../../images/logo.png')} alt="" width="30" />
                                    </Link>
                                    <form>
                                        <div className="input-group">
                                            <input type="text" className="f form-control" placeholder="جستجو" />
                                            <div className="input-group-append">
                                                <span className="input-group-text" id="basic-addon2"><i
                                                    className="fa fa-search"></i></span>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="dashboard_log">
                                    <div className="d-flex align-items-center">
                                        <DropdownButton
                                            alignRight
                                            title={ currentUser.name }
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
                                            <Link to={'./lock'} className="dropdown-item">
                                                <i className="la la-lock"></i> قفل 
                                            </Link>
                                            <Link to={'./signin'} className="dropdown-item logout">
                                                <i className="la la-sign-out"></i> خروج
                                            </Link>
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