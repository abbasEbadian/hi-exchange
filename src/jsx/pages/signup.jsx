import React, { useState, useRef } from "react";
import { Link, useHistory, useLocation} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
// import {userSignup} from '../../redux/actions'
import axios from "axios";
import Loader from "react-loader-spinner";
import qs from 'qs'
import { Constants } from "../../Constants";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

function Signup() {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [submitted, setSubmitted] = useState(false); 
    const referralRef = useRef("")
    
    const [passVisible, setPassVisible] = useState(false)
    const history = useHistory();

    const handleSignup =(e)=>{
        e.preventDefault();
        e.stopPropagation();
         let user_captcha = document.getElementById('user_captcha_input').value;

        if (!validateCaptcha(user_captcha)) {
            toast.warning("کد امنیتی وارد شده صحیح نمی باشد")
            loadCaptchaEnginge(4,'white','#216846','numbers')
            document.getElementById('user_captcha_input').value = "";
            return
        }

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
            const d = qs.stringify({
                first_name,
                last_name,
                mobile,
                password,
                ref_mobile: referralRef.current.value
            })
            axios.post(Constants.BASE_URL + "/api/v2/token/register/", d , {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then(response=>{
                const {data} = response
                if(data.error!==1){
                    setSubmitted(true)
                    toast.success('کد یک بار مصرف ارسال شد.', {
                        autoClose: 2000,
                        onClose: ()=>{
                            localStorage.setItem("otp_type", "signup")
                            localStorage.setItem("otp_phone", mobile )
                            history.push('/otp-2')
                        }
                    });
                }else{
                    toast.warn(data.message)
                }
            }).catch(error=>{
                console.log(error);
                toast.error(error);
            }).finally(e=>{ 
                setIsSubmitting(false) 
            })
            
        
        
        // dispatch(userSignup(creds, history))
    }

    React.useEffect(() => {
        loadCaptchaEnginge(4,'white','#216846','numbers')
        referralRef.current.value = window.location.search.split("=")[1]
    }, [])
    return (
        <>
            <div className="authincation ">
            <style JSX>{`
                    #main-wrapper{
                        margin-top: 0;
                    }
                `}</style>
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
                                        ثبت نام در وبسایت
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
                                                autoFocus
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
                                                name="username"
                                                value={mobile}
                                                onChange={e=>setMobile(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">کد معرف</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="number"
                                                ref={referralRef}
                                            />
                                        </div>
                                        <div className="mb-3 visibility">
                                            <label className="form-label">رمز عبور</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder=""
                                                name="password"
                                                value={password}
                                                onChange={e=>setPassword(e.target.value)}
                                                type={passVisible? "text": "password"} 
                                            />
                                            <span  className={"visible icofont-" + (passVisible? "eye-blocked": "eye")} onClick={e=>setPassVisible(s=>!s)} ></span>

                                        </div>
                                         <div className="d-flex flex-wrap">
                                            <label className="col-12 " htmlFor="user_captcha_input"><small>کد امنیتی</small></label>
                                            <div className="col-md-9 col-8">
                                                <div>
                                                
                                                <input placeholder="" 
                                                style={{height: "30px", }} className="w-100 form-control" 
                                                id="user_captcha_input"  name="user_captcha_input" type="text"></input>
                                                </div>
                                            </div>
                                             <div className="col-md-3 col-4 ">
                                                <LoadCanvasTemplateNoReload  />
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            {!isSubmitting ? 
                                                <button  type="submit" className="btn btn-success w-100 bg-transparent text-primary" disabled={  submitted } >
                                                    {submitted ? "ارسال شد" : "ثبت نام"}
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
                                                to={"/signin"}
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
