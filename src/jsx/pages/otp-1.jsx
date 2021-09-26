
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from "react-redux";
import Loader from 'react-loader-spinner'
function Otp1() {
    const [phone, setPhone] = useState("");
    // const dispatch = useDispatch()
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
    const phone_valid = phone.length === 11; 
    const changePhone = e=>{
        setPhone(e.target.value)
    }
    const sendCode = e=>{
        if (phone_valid){
            setIsSubmitting(true);
            axios.post("https://hi-exchange.com/api/v2/token/otp/", {
                mobile: phone
            }).then(data=>{
                if(Object.keys(data).includes("data")){
                    setSubmitted(true)
                    toast.success('کد یک بار مصرف ارسال شد.', {
                        ...toastOpt,
                        autoClose: 2000,
                        onClose: ()=>{
                            localStorage.setItem("hiexchange_authID",data.data.id )
                            history.push('/otp-2')
                        }
                    });
                }else{
                    toast.warn(' برای این شماره همراه ، حسابی وجود ندارد.', toastOpt);
                }
            }).catch(error=>{
                toast.error(' برای این شماره همراه ، حسابی وجود ندارد.', toastOpt);
            }).finally(e=>{ 
                setIsSubmitting(false) 
            })
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
                                    {/* <Link
                                        className="page-back text-muted"
                                        to={"./signin"}
                                    >
                                        <span>
                                            <i className="fa fa-angle-left"></i>
                                        </span>{" "}
                                        بازگشت
                                    </Link> */}
                                    <h3 className="text-center">
                                        احراز هویت با رمز یکبار مصرف
                                    </h3>
                                    <p className="text-center mb-5">
                                        به شماره وارد شده یک کد ارسال خواهد شد.
                                    </p>
                                    <form action="#">
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
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            {!isSubmitting ? 
                                                <button type="button" className="btn btn-success w-100 bg-transparent text-primary" disabled={ !phone_valid || submitted } onClick={sendCode}>
                                                    
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
