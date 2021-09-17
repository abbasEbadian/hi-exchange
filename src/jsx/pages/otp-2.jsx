import React, { useState, useContext,  } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function Otp2() {
    const [code, setCode]= useState("");
    const {userID} = useContext(UserContext);

    const history = useHistory();

    const verifyCode = e=>{
        if(code.length != 5) return
        axios.post("https://hi-exchange.com/api/v2/token/verify/", {
            id: userID,
            otp: code,
        })
        .then(data=>{
            console.log(data);
        })
    }
// "access: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMxODAwODc0LCJqdGkiOiI0YmRjYmU5MmMxZTg0ZmYzODdkN2QwNGNjYzA1MmM3NiIsInVzZXJfaWQiOjIzfQ.U4ZsR6M44R_uJGthS3bQGGEqz-0LreMBViudd_MDIfc"
//     "refresh: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYzMTg4NTQ3NCwianRpIjoiMzg5NWIzOGFhMTNjNDExMWE0OTMwZGIzY2NlOWY1ZGMiLCJ1c2VyX2lkIjoyM30.dKPTdaw2AwrXrBL-VxCo-t7N6RtVYdS70Llqt7d9mNY"
//     "otp_id: 23"
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
                                <div className="card-body">
                                    <Link
                                        className="page-back text-muted"
                                        to={"./otp-1"}
                                    >
                                        <span>
                                            <i className="fa fa-angle-left"></i>
                                        </span>{" "}
                                        بازگشت
                                    </Link>
                                    <h3 className="text-center">
                                        احراز هویت با رمز یکبار مصرف
                                    </h3>
                                    <p className="text-center mb-5">
                                        لطفا در صورت ارسال کد ، آن را وارد کنید
                                    </p>
                                    <form action="#">
                                        <div className="mb-3">
                                            <label>رمز یکبار مصرف:</label>
                                            <input
                                                type="text"
                                                className="form-control text-center font-weight-bold"
                                                placeholder="11 22 33"
                                                value={code}
                                                onChange={e => setCode(e.target.value)}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button onClick={verifyCode} className="btn btn-success w-100">تایید</button>          
                                        </div>
                                    </form>
                                    <div className="info mt-3">
                                        <p className="text-muted">
                                            You dont recommended to save
                                            password to browsers!
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

export default Otp2;
