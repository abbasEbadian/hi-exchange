import React, {useState, useRef} from 'react'
import axios from 'axios';

function ResetPassword() {
    const [pass1Visible, setPass1Visible] = useState(false)
    const [pass2Visible, setPass2Visible] = useState(false)
    const [pass3Visible, setPass3Visible] = useState(false)
    const pass1 = useRef("")
    const pass2 = useRef("")
    const pass3 = useRef("")
    const resetPassword = (e)=>{
        e.preventDefault()
        e.stopPropagation()

        axios.post()
    }
    return (
        <div className="card reset-password">
            <div className="card-header">
                <h4 className="card-title">تغییر رمز عبور</h4>
            </div>
            <div className="card-body">
                <form action="#" onSubmit={resetPassword}>
                    <div className="row">
                        <div className="mb-3 col-xl-12 reset-row">
                            <label className="form-label">رمز عبور کنونی</label>
                            <input ref={pass1} type={pass1Visible? "text": "password"} className="form-control" />
                            <span className={"visible icofont-" + (pass1Visible? "eye-blocked": "eye")} onClick={e=>setPass1Visible(s=>!s)} ></span>
                        </div>
                        <div className="mb-3 col-xl-12 reset-row">
                            <label className="form-label">رمز جدید</label>
                            <input ref={pass2} type={pass2Visible? "text": "password"} className="form-control"  />
                            <span className={"visible icofont-" + (pass2Visible? "eye-blocked": "eye")} onClick={e=>setPass2Visible(s=>!s)} ></span>
                        </div>
                        <div className="mb-3 col-xl-12 reset-row">
                            <label className="form-label">تکرار رمز جدید</label>
                            <input ref={pass3} type={pass3Visible? "text": "password"} className="form-control" />
                            <span  className={"visible icofont-" + (pass3Visible? "eye-blocked": "eye")} onClick={e=>setPass3Visible(s=>!s)} ></span>
                        </div>
                        <div className="col-12  text-start">
                            <button className="btn btn-success waves-effect">تغییر پسورد</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
