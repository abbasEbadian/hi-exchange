import React from "react";
import PageTitle from "../element/page-title";
import SettingsNav from "../element/settings-nav";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";

import {useSelector } from 'react-redux'
function SettingsSecurity() {
    const user = useSelector(state => state.session.user)
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
                                    <h4 className="card-title">امنیت حساب</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-xl-4">
                                            <div className="id_card">
                                                <img
                                                    src={require("./../../images/id.png")}
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="id_info">
                                                <h3>{user.first_name + " " + user.last_name} </h3>
                                                
                                                <p className="mb-1">
                                                    وضعیت:{" "}
                                                    <span className="font-weight-bold">
                                                        {user.authentication_status==="confirmation"?
                                                            <small>در انتظار تایید</small>
                                                        :user.authentication_status==="pending"?
                                                            <small>درانتظار تکمیل اطلاعات</small>
                                                        :user.authentication_status==="rejected"?
                                                            <small>مدارک شما رد شده است</small>
                                                        :user.authentication_status==="accepted"?
                                                            <small>ثبت/احراز شده</small>
                                                        :undefined}
                                                    </span>
                                                </p>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="phone_verify">
                                                <h4 className="card-title mb-3">
                                                    ایمیل
                                                </h4>
                                                <form >
                                                    <div className="row align-items-center">
                                                        <div className="mb-3 col-xl-6">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="hello@example.com"
                                                                value={user.email}
                                                            />
                                                            <button className="btn btn-success mt-4">
                                                                افزودن
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="phone_verified">
                                                <h5>
                                                    {" "}
                                                    <span>
                                                        <i className="fa fa-envelope"></i>
                                                    </span>{" "}
                                                   { user.email}
                                                </h5>
                                                {user.is_email_accepted?
                                                    <div className="verify">
                                                        <div className="verified">
                                                            <span>
                                                                <i className="la la-check"></i>
                                                            </span>
                                                            <p className="mb-0">تایید شده</p>
                                                        </div>
                                                    </div>:
                                                        <div className="not-verify">
                                                        <div className="verified">
                                                            <span>
                                                                <i className="la la-times"></i>
                                                            </span>
                                                            <p className="mb-0">در انتظار تایید</p>
                                                        </div>
                                                    </div>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="phone_verify">
                                                <h4 className="card-title mb-3">
                                                    افزودن شماره موبایل:
                                                </h4>
                                                <form action="otp-2.html">
                                                    <div className="row align-items-center">
                                                        <div className="mb-3 col-xl-6">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="+98... "
                                                            />
                                                            <button className="btn btn-success mt-4">
                                                                افزدون
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="phone_verified">
                                                <h5>
                                                    {" "}
                                                    <span>
                                                        <i className="fa fa-phone"></i>
                                                    </span>{" "}
                                                    <small dir="ltr" className="L" style={{whiteSpace:"nowrap"}}>
                                                    {user.phone}
                                                    </small>
                                                </h5>
                                                {user.is_phone_accepted?
                                                    <div className="verify">
                                                        <div className="verified">
                                                            <span>
                                                                <i className="la la-check"></i>
                                                            </span>
                                                            <p className="mb-0">تایید شده</p>
                                                        </div>
                                                    </div>:
                                                        <div className="not-verify">
                                                        <div className="verified">
                                                            <span>
                                                                <i className="la la-times"></i>
                                                            </span>
                                                            <p className="mb-0">در انتظار تایید</p>
                                                        </div>
                                                    </div>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SettingsSecurity;
