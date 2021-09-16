import React from "react";
import { Link } from "react-router-dom";

function Signin() {
    return (
        <>
            <div className="authincation section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center my-5">
                                <Link to={"./"}>
                                    <img
                                        src={require("./../../images/logo.png")}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="auth-form card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">ورود</h4>
                                </div>
                                <div className="card-body">
                                    <form
                                        method="post"
                                        name="myform"
                                        className="signin_validate"
                                        action="#"
                                    >
                                        <div className="mb-3">
                                            <label>ایمیل</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="hello@example.com"
                                                name="email"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label>رمز عبور</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                name="password"
                                            />
                                        </div>
                                        <div className="row d-flex justify-content-between mt-4 mb-2">
                                            <div className="mb-3 mb-0">
                                                <label className="toggle">
                                                    <input
                                                        className="toggle-checkbox"
                                                        type="checkbox"
                                                    />
                                                    <span className="toggle-switch"></span>
                                                    <span className="toggle-label">
                                                        مرا بخاطر بسپار
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="mb-3 mb-0">
                                                <Link href="reset.html">
                                                    فراموش رمز عبور
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Link
                                                to={"./otp-1"}
                                                type="submit"
                                                className="btn btn-success w-100"
                                            >
                                                ورود
                                            </Link>
                                        </div>
                                    </form>
                                    <div className="new-account mt-3">
                                        <p>
                                            حساب جدید نیاز دارید؟{" "}
                                            <Link
                                                className="text-primary"
                                                to={"./signup"}
                                            >
                                                ثبت نام
                                            </Link>
                                        </p>
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

export default Signin;
