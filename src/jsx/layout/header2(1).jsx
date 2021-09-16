import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Header2() {

    return (
        <>
            <div className="header dashboard">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12">
                            <nav className="navbar navbar-expand-lg navbar-light px-0 justify-content-between">
                                {/* <Link className="navbar-brand" to={'/'}><img src={require('./../../images/logo.png')} alt="" /></Link> */}

                                <div class="header-search d-flex align-items-center">
                                    <Link class="brand-logo me-3" href="index.html">
                                        <img src={require('./../../images/logo.png')} alt="" width="30" />
                                    </Link>
                                    <form>
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search" />
                                            <div class="input-group-append">
                                                <span class="input-group-text" id="basic-addon2"><i
                                                    class="fa fa-search"></i></span>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="dashboard_log">
                                    <div className="d-flex align-items-center">
                                        <DropdownButton
                                            alignRight
                                            title="Maria Pascle"
                                            className="profile_log"
                                        >
                                            <Link to={'./accounts'} className="dropdown-item">
                                                <i className="la la-user"></i> Account
                                            </Link>
                                            <Link to={'./history'} className="dropdown-item">
                                                <i className="la la-book"></i> History
                                            </Link>
                                            <Link to={'./settings'} className="dropdown-item">
                                                <i className="la la-cog"></i> Setting
                                            </Link>
                                            <Link to={'./lock'} className="dropdown-item">
                                                <i className="la la-lock"></i> Lock
                                            </Link>
                                            <Link to={'./signin'} className="dropdown-item logout">
                                                <i className="la la-sign-out"></i> Logout
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