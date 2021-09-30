import React, { useState, useEffect, useRef} from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userLogin, userSignup } from '../../redux/actions'
import Loader from 'react-loader-spinner'
import { connect, useDispatch } from 'react-redux'
function Otp2({userLogin}) {
    const dispatch = useDispatch()
    const [code, setCode]= useState("");
    const [authID, setAuthID] = useState("")
    const [registerMobileID, setRegisterMobileID] = useState("")
    const [timer, setTimer] = useState(60)
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const _history = useHistory()
    const ref = useRef()
    useEffect(()=>{
        ref.current.focus()
        setAuthID(localStorage.getItem('hiexchange_authID'))
        setRegisterMobileID(localStorage.getItem('hiexchange_register_mobile'))
    }, [authID])
    
    setTimeout(e=>{
        if(timer > 0 ) 
        setTimer(timer-1)
    }, 1000)
    

    const resetAuth = e=>{
        localStorage.clear("hiexchange_authID");
        localStorage.clear("hiexchange_register_mobile");
        if(authID)
            _history.push('/')
        else
            _history.push("/signup")
    }
    const verifyCode = e=>{
        e.preventDefault()
        e.stopPropagation()
        if(code.length !== 5) return
        setIsSubmitting(true);
        if (authID) {
            userLogin( {
                id: authID,
                otp: code,
            }, _history, setIsSubmitting )    
        }
        else{
            dispatch(userSignup({
                mobile: registerMobileID, 
                code: code
            }, _history, setIsSubmitting))
        }
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
                                    <h3 className="text-center">
                                        احراز هویت با رمز یکبار مصرف
                                    </h3>
                                    <p className="text-center mb-5">
                                        لطفا در صورت ارسال کد ، آن را وارد کنید
                                    </p>
                                    <form action="#" onSubmit={verifyCode}>
                                        <div className="mb-3">
                                            <label className="form-label">رمز یکبار مصرف:</label>
                                            <input
                                                type="text"
                                                className="form-control text-center font-weight-bold"
                                                placeholder="1 2 3 4 5"
                                                value={code}
                                                onChange={e => setCode(e.target.value)}
                                                ref={ref}
                                            />
                                        </div>
                                        <div className="text-center">
                                            {!isSubmitting ?
                                                <button type="submit"  className="btn btn-success w-100">تایید</button>          
                                                :
                                                <Loader
                                                    type="ThreeDots"
                                                    height={48}
                                                ></Loader>
                                            }
                                        </div>
                                    </form>
                                    <div className="new-account mt-3 d-flex justify-content-between">
                                        {timer > 0?
                                            <small>امکان ارسال دوباره بعد از 
                                                <span className="text-primary px-2">{timer}</span>    
                                            ثانیه</small>
                                            :
                                            <p>
                                                دریافت نکردید؟{" "}
                                            
                                                <button  className="text-primary bg-transparent border-0"
                                                    onClick={resetAuth}>ارسال دوباره</button>
                                            </p>    
                                        }
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
