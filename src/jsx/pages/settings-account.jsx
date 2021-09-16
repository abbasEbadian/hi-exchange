import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../element/page-title';
import SettingsNav from '../element/settings-nav';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';




function SettingsAccount() {

    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-3 col-md-4">
                        <SettingsNav />
                    </div>
                    <div className="col-xl-9 col-md-8">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">حساب یا کارت های متصل</h4>
                            </div>
                            <div className="card-body">
                                <div className="form">
                                    <ul className="linked_account">
                                        <li>
                                            <div className="row">
                                                <div className="col-9">
                                                    <div className="d-flex">
                                                        <span className="ms-3"><i className="fa fa-bank"></i></span>
                                                        <div>
                                                            <h5 className="mt-0 mb-1">بانک ملی</h5>
                                                            <p>بانک ************5892</p>
                                                        </div>
                                                        <div className="edit-option">
                                                            <Link to={'#'}><i className="fa fa-eye"></i></Link>
                                                            <Link to={'#'}><i className="fa fa-pencil"></i></Link>
                                                            <Link to={'#'}><i className="fa fa-trash"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="verify">
                                                        <div className="verified">
                                                            <span><i className="la la-check"></i></span>
                                                            <Link to={'#'}>تایید شده</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div className="col-9">
                                                    <div className="d-flex my-4">
                                                        <span className="ms-3"><i className="fa fa-cc-mastercard"></i></span>
                                                        <div>
                                                            <h5 className="mt-0 mb-1">کارت اعتباری</h5>
                                                            <p>بانک ************5892</p>
                                                        </div>
                                                        <div className="edit-option">
                                                            <Link to={'#'}><i className="fa fa-eye"></i></Link>
                                                            <Link to={'#'}><i className="fa fa-pencil"></i></Link>
                                                            <Link to={'#'}><i className="fa fa-trash"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="verify">
                                                        <div className="verified">
                                                            <span><i className="la la-check"></i></span>
                                                            <Link to={'#'}>تایید شده</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div className="col-9">
                                                    <div className="d-flex">
                                                        <span className="ms-3"><i className="fa fa-credit-card"></i></span>
                                                        <div>
                                                            <h5 className="mt-0 mb-1">کارت اعتباری</h5>
                                                            <p>بانک ************5892</p>
                                                        </div>
                                                        <div className="edit-option">
                                                            <Link to={'#'}><i className="fa fa-eye"></i></Link>
                                                            <Link to={'#'}><i className="fa fa-pencil"></i></Link>
                                                            <Link to={'#'}><i className="fa fa-trash"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="verify">
                                                        <div className="not-verify">
                                                            <span><i className="la la-close"></i></span>
                                                            <Link to={'#'}>تایید نشده</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>

                                    <div className="mt-5">
                                        <Link to={'./verify-step-5'} className="btn btn-primary px-4 ms-3">افزودن شماره حساب</Link>
                                        <Link to={'././verify-step-1'} className="btn btn-success px-4">افزودن کارت اعتباری</Link>
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

export default SettingsAccount;