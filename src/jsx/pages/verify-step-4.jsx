import React from "react";
import { Link } from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";

function VerifyStep4() {
    return (
        <>
            <Header2 />
            <Sidebar />

            <div className="verification section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="auth-form card">
                                <div className="card-body">
                                    <form
                                        action="#"
                                        className="identity-upload"
                                    >
                                        <div className="identity-content">
                                            <span className="icon icon-success">
                                                <i className="fa fa-check"></i>
                                            </span>
                                            <h4>تصویر با موفقیت  بارگذاری شد</h4>
                                            <p>
                                                کارشناسان ما در اسرع وقت وضعیت حساب کاربری شما را بررسی خواهند نمود.
                                                با تشکر از شکیبای شما
                                            </p>
                                        </div>

                                        <div className="text-center mb-4">
                                            <Link
                                                to={"./settings-account"}
                                                type="submit"
                                                className="btn btn-success ps-5 pe-5"
                                            >
                                                ادامه
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyStep4;
