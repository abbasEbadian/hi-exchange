import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "../element/page-title";
import SettingsNav from "../element/settings-nav";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";

function SettingsSecurity() {
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
                                                <h3>علی علیپور </h3>
                                                <p className="mb-1 mt-3">
                                                    شناسه : 0024 5687 2254 3698{" "}
                                                </p>
                                                <p className="mb-1">
                                                    وضعیت:{" "}
                                                    <span className="font-weight-bold">
                                                        تایید شده
                                                    </span>
                                                </p>
                                                <Link
                                                    href="verify-step-2.html"
                                                    className="btn btn-success mt-3"
                                                >
                                                    شناسه جدید
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-xl-12">
                                            <div className="phone_verify">
                                                <h4 className="card-title mb-3">
                                                    ایمیل
                                                </h4>
                                                <form action="otp-2.html">
                                                    <div className="row align-items-center">
                                                        <div className="mb-3 col-xl-6">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="hello@example.com "
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
                                                    hello@example.com
                                                </h5>
                                                <div className="verify">
                                                    <div className="verified">
                                                        <span>
                                                            <i className="la la-check"></i>
                                                        </span>
                                                        <Link to={"#"}>
                                                            تایید شده
                                                        </Link>
                                                    </div>
                                                </div>
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
                                                    +98 936 704 8788
                                                    </small>
                                                </h5>
                                                <div className="verify">
                                                    <div className="verified">
                                                        <span>
                                                            <i className="la la-check"></i>
                                                        </span>
                                                        <Link to={"#"}>
                                                            تایید شده
                                                        </Link>
                                                    </div>
                                                </div>
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
