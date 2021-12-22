import React, {useRef, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner'
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {Constants} from '../../Constants'
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";

function Signin() {

    const phoneRef = useRef("")
    const passRef = useRef("")
    const rememberRef = useRef(false)

    const _history = useHistory()
    const dispatch = useDispatch()

    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [submitted, setSubmitted] = useState(false); 
    const [passVisible, setPassVisible] = useState(false)
    const submit = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        setIsSubmitting(true)
        const data = {
            mobile: phoneRef.current.value,
            password: passRef.current.value,
            remember: rememberRef.current.value,
        }
        axios.post(Constants.BASE_URL + "/api/v2/token/otp/", data).then(response=>{
            const {data} = response
            if(data.error === 1){
                toast.error(data.message)
            }else{
                
                setSubmitted(true)
            
                localStorage.setItem('otp_type', 'login')
                localStorage.setItem('otp_id', data.id)
                toast.success("در حال انتقال", {
                    onClose: ()=>{
                        _history.push("/otp-2")
                    }
                })
            }
        }).catch(error=>{
            if (error.non_field_errors)
                    toast.error(error.non_field_errors[0])
            else if(error.password)
                toast.error(error.password[0])
            else if(error.message){
                for(let m of error.message)
                    toast.error(m)
            }

        }).finally(f=>{
            setIsSubmitting(false)
        })
    }
    useEffect(() => {
        phoneRef.current.focus()
        document.body.classList.toggle('signin', true);
    }, [])

    return (
        <>
            <div className="authincation ">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center my-2 my-md-4">
                                <Link to={"./"}>
                                    <img
                                        src={require("./../../images/logo.png")}
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="auth-form card mb-2">
                                <div className="card-header justify-content-center py-2 py-md-4">
                                    <h4 className="card-title">ورود</h4>
                                </div>
                                <div className="card-body">
                                    <form
                                    onSubmit={submit}
                                        method="post"
                                        name="myform"
                                        className="signin_validate"
                                        action="#"
                                    >
                                        <div className="mb-3">
                                            <label>شماره همراه</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="09..."
                                                name="phone"
                                                ref={phoneRef}
                                                autoFocus
                                            />
                                        </div>
                                        <div className="mb-3 visibility">
                                            <label>رمز عبور</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                ref={passRef}
                                                name="password"
                                                type={passVisible? "text": "password"} 
                                            />
                                            <span  className={"visible icofont-" + (passVisible? "eye-blocked": "eye")} onClick={e=>setPassVisible(s=>!s)} ></span>
                      
                                        </div>
                                        <div className="row d-flex justify-content-between mt-4">
                                            <div className=" ">
                                                <label className="toggle">
                                                    <input
                                                        ref={rememberRef}
                                                        className="toggle-checkbox"
                                                        type="checkbox"
                                                    />
                                                    <span className="toggle-switch"></span>
                                                    <span className="toggle-label">
                                                        مرا بخاطر بسپار
                                                    </span>
                                                </label>
                                            </div>
                                           
                                        </div>
                                        <div className="text-center mt-1">
                                            {!isSubmitting ? 
                                                <button  type="submit" className="btn btn-success w-100 bg-transparent text-primary" disabled={  submitted } >
                                                    {submitted ? "ارسال شد" : "ورود"}
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
                                    <div className="forget-password mt-3">
                                        <Link
                                                className="text-gray"
                                                to={"./forget"}
                                            >
                                                رمز عبور خود را فراموش کردم
                                            </Link>
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
