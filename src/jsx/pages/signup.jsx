import React, { useState } from "react";
import { Link, useHistory} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import {userSignup} from '../../redux/actions'
import axios from "axios";
import Loader from "react-loader-spinner";
function Signup() {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [submitted, setSubmitted] = useState(false); 
    
    const history = useHistory();
    const handleSignup =(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const validate = (data)=>{
            if(!first_name) return "نام نمیتواند خالی باشد"
            if(!last_name) return "نام خانوادگی نمیتواند خالی باشد"
            if(!mobile) return "موبایل نمیتواند خالی باشد"
            if(mobile.length !== 11) return "موبایل باید 11 رقمی باشد"
            if(!password) return "رمز عبور نمیتواند خالی باشد"
            if(password.length < 8) return "رمز عبور حداقل 8 کاراکتر"
            return undefined
        }
        const creds = {
            first_name,
            last_name,
            mobile,
            password
        }
        let errors = validate(creds)
        if (errors) {
            console.log(errors);
            
            toast.warn(errors)
            return
        }
            setIsSubmitting(true);
            axios.post("https://hi-exchange.com/api/v2/token/register/", {
                first_name,
                last_name,
                mobile,
                password
            }).then(response=>{
                const {data} = response
                if(data.error!==1){

                    setSubmitted(true)
                    toast.success('کد یک بار مصرف ارسال شد.', {
                        autoClose: 2000,
                        onClose: ()=>{
                            localStorage.setItem("hiexchange_register_mobile", mobile )
                            history.push('/otp-2')
                        }
                    });
                }else{
                    toast.warn(data.message)
                }
            }).catch(error=>{
                console.log(error.data);
                toast.error(error);
            }).finally(e=>{ 
                setIsSubmitting(false) 
            })
            
        
        
        // dispatch(userSignup(creds, history))
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
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <div className="auth-form card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">
                                        عضویت در وبسایت
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <form
                                        onSubmit={handleSignup}
                                        method="post"
                                        name="myform"
                                        className="signup_validate row"
                                    >
                                        <div className="mb-3 col-6">
                                            <label className="form-label">نام</label>
                                            <input
                                                type="text"
                                                className="form-control f"
                                                // placeholder="نام"
                                                name="fist_name"
                                                value={first_name}
                                                onChange={e=>setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 col-6">
                                            <label className="form-label">نام خانوادگی</label>
                                            <input
                                                type="text"
                                                className="form-control f"
                                                // placeholder="نام  خانوادگی"
                                                name="last_name"
                                                value={last_name}
                                                onChange={e=>setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">شماره موبایل</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="09...."
                                                name="number"
                                                autoComplete="false"
                                                value={mobile}
                                                onChange={e=>setMobile(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">رمز عبور</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder=""
                                                name="password"
                                                autoComplete="new-password"
                                                value={password}
                                                onChange={e=>setPassword(e.target.value)}

                                            />
                                        </div>
                                        <div className="text-center mt-4">
                                            {!isSubmitting ? 
                                                <button  type="submit" className="btn btn-success w-100 bg-transparent text-primary" disabled={  submitted } >
                                                    {submitted ? "ارسال شد" : "عضویت"}
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
                                            حساب کاربری دارید؟{" "}
                                            <Link
                                                className="text-primary"
                                                to={"otp-1"}
                                            >
                                                ورود
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-left"
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
        </>
    );
}

export default Signup;
