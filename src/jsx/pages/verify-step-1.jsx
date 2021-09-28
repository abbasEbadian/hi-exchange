import React from "react";
import { Link } from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";

function VerifyStep1() {
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
                                            <span className="icon">
                                                <i className="fa fa-shield"></i>
                                            </span>
                                            <h4 className="my-4">
                                                برای احراز هویت لطفا تصویر 
                                                3x4
                                                خود را آپلود کنید
                                            </h4>
                                           
                                        </div>

                                        <div className="text-center">
                                            <Link
                                                to={"./verify-step-2"}
                                                type="submit"
                                                className="btn btn-success ps-5 pe-5"
                                            >
                                                بارگذاری
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

export default VerifyStep1;
