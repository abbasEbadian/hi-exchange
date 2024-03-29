
import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner'
import {Constants} from '../../Constants'
import { useDispatch } from "react-redux";
function Otp1() {
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [submitted, setSubmitted] = useState(false); 
    const history = useHistory()
    const toastOpt = {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        autoClose: 5000,
    }
    const ref = useRef()
    const phone_valid = phone.length === 11; 
    const changePhone = e=>{
        setPhone(e.target.value)
    }
    const sendCode = e=>{
        e.preventDefault()
        e.stopPropagation()
        if (phone_valid){
            setIsSubmitting(true);
            axios.post(Constants.BASE_URL + "/api/v2/token/otp/", {
                mobile: phone
            }).then(data=>{
                if(Object.keys(data).includes("data")){
                    setSubmitted(true)
                    toast.success('کد یک بار مصرف ارسال شد.', {
                        ...toastOpt,
                        autoClose: 2000,
                        onClose: ()=>{
                            dispatch({"type": "UPDATE_TYPE", payload: "login"})
                            dispatch({"type": "UPDATE_ID", payload: data.id})
                            history.push('/otp-2')
                        }
                    });
                }else{
                    toast.warn(' برای این شماره همراه ، حسابی وجود ندارد.', toastOpt);
                }
            }).catch(error=>{
                console.log(error);
                
                toast.error(' برای این شماره همراه ، حسابی وجود ندارد.', toastOpt);
            }).finally(()=>{ 
                setIsSubmitting(false) 
            })
        }
    }
    
    useEffect(()=>ref.current.focus())
    return (
        <>
            <div className="authincation ">
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
                                        به شماره وارد شده یک کد ارسال خواهد شد.
                                    </p>
                                    <form action="#" onSubmit={sendCode}>
                                        <div className="mb-3">
                                            <label className="form-label">شماره همراه</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text ps-4 pe-4">
                                                        <i className="fa fa-phone"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="09...."
                                                    maxLength="11"
                                                    value={phone}
                                                    onChange={ changePhone}
                                                    ref={ref}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            {!isSubmitting ? 
                                                <button type="submit" className="btn btn-success w-100 bg-transparent text-primary" disabled={ !phone_valid || submitted } >
                                                    
                                                    {submitted ? "ارسال شد" : "ارسال"}
                                                    </button>
                                                :
                                                <Loader
                                                    type="ThreeDots"
                                                    height={48}
                                                ></Loader>
                                            }
                                           
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

export default Otp1;
