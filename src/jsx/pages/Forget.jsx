
import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner'
import { useDispatch } from "react-redux";
import { Constants } from '../../Constants'

function Forget() {
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [submitted, setSubmitted] = useState(false); 
    const history = useHistory()
    const ref = useRef()
    const phone_valid = phone.length === 11; 
    const sendCode = e=>{
        e.preventDefault()
        e.stopPropagation()
        if (phone_valid){
            setIsSubmitting(true);
            axios.post(Constants.BASE_URL + "/api/v2/token/password/", {
                mobile: phone
            }).then(response=>{
                const {data} = response
                if(data.error === 0){
                    setSubmitted(true)
                    localStorage.setItem('otp_type', 'forget')
                    localStorage.setItem('otp_id', data.id)
                    toast.success('کد یک بار مصرف ارسال شد.', {
                        autoClose: 2000,
                        onClose: ()=>{
                            history.push('/otp-2')
                        }
                    });
                }else{
                    toast.warn(' برای این شماره همراه ، حسابی وجود ندارد.');
                }
            }).catch(error=>{
                console.log(error);
                
                toast.error(' برای این شماره همراه ، حسابی وجود ندارد.');
            }).finally(()=>{ 
                setIsSubmitting(false) 
            })
        }
    }
    
    useEffect(()=>ref.current.focus())
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
                                        فراموشی رمز عبور
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
                                                    onChange={ e=>setPhone(e.target.value)}
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

export default Forget;
