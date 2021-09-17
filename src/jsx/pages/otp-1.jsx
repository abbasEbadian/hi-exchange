
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

function Otp1() {
    const [phone, setPhone] = useState("");
    const {userID, setUserId } = useContext(UserContext);
    const history = useHistory();
    const changePhone = e=>{
        setPhone(e.target.value)
    }
    const sendCode = e=>{
        if (phone.length == 11){
            axios.post("https://hi-exchange.com/api/v2/token/otp/", {
                mobile: phone
            }).then(data=>{
                console.log(data);
                if(data.data.id){
                    setUserId(data.data.id);
                    history.push("opt-2");
                }
            }).catch(e=>{
                console.log(e);
            });
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
                                    <Link
                                        className="page-back text-muted"
                                        to={"./signin"}
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
                                        به شماره وارد شده یک کد ارسال خواهد شد.
                                    </p>
                                    <form action="#">
                                        <div className="mb-3">
                                            <label>شماره همراه</label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text ps-4 pe-4">
                                                        <i className="fa fa-phone"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="09...."
                                                    value={phone}
                                                    onChange={ changePhone}
                                                />
                                            </div>
                                        </div>
                                        <div className="text-center mt-4">
                                            <button className="btn btn-success w-100" onClick={sendCode}>ارسال</button>
                                           
                                        </div>
                                    </form>
                                    <div className="new-account mt-3 d-flex justify-content-between">
                                        <p>
                                            دریافت نکردید؟?{" "}
                                            <Link
                                                className="text-primary"
                                                to={"./otp-1"}
                                            >
                                                ارسال دوباره
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
