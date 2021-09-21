import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userLogin } from '../../redux/actions'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
function Otp2({userLogin}) {
    const [code, setCode]= useState("");
    const [authID, setAuthID] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const history = useHistory()

    useEffect(()=>{
        setAuthID(localStorage.getItem('hiexchange_authID'))
    }, [authID])
    const resetAuth = e=>{
        localStorage.clear("hiexchange_authID");
        history.push('/')
    }
    const verifyCode = e=>{
        if(code.length !== 5) return
        setIsSubmitting(true);
        userLogin( {
            id: authID,
            otp: code,
        }, history, setIsSubmitting )
        
    }

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
                                            <label className="form-label">رمز یکبار مصرف:</label>
                                            <input
                                                type="text"
                                                className="form-control text-center font-weight-bold"
                                                placeholder="1 2 3 4 5"
                                                value={code}
                                                onChange={e => setCode(e.target.value)}
                                            />
                                        </div>
                                        <div className="text-center">
                                            {!isSubmitting ?
                                                <button type="button" onClick={verifyCode} className="btn btn-success w-100">تایید</button>          
                                                :
                                                <Loader
                                                    type="ThreeDots"
                                                    height={48}
                                                ></Loader>
                                            }
                                        </div>
                                    </form>
                                    <div className="new-account mt-3 d-flex justify-content-between">
                                        <p>
                                            دریافت نکردید؟{" "}
                                            <Link
                                                className="text-primary"
                                                to={"./otp-1"}
                                            >
                                                <button 
                                                onClick={resetAuth}>ارسال دوباره</button>
                                            </Link>
                                        </p>
                                    </div>
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={true}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default connect(null,{userLogin})(Otp2);
