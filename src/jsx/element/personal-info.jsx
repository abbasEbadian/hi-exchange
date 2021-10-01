
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { userUpdatePersonal, userUpdateDetail } from '../../redux/actions'
import {ToastContainer} from 'react-toastify'


const PersonalInfo = () => {
    const currentUser = useSelector(state=>state.session.user)
    const [ email, setEmail ] = useState(currentUser.email || "")
    const [ birth, setBirth ] = useState(currentUser.bithday || "")
    const [ address, setAddress ] = useState(currentUser.address || "")
    const dispatch = useDispatch()

    useEffect(() => {
        setEmail(currentUser.email)
        setBirth(currentUser.birthday)
        setAddress(currentUser.address)

    }, [currentUser])
    const submitForm = (e)=>{
        if(!email &&  !birth && !address) return;
        const data = {
            email,
            birthday: birth,
            address,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            phone: currentUser.mobile,
            card_id: "1361599723",
            birth_certificate_id: "12345"
        }
        dispatch(userUpdatePersonal(data))
        dispatch(userUpdateDetail())
    }
    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">اطلاعات شخصی</h4>
            </div>
            <div className="card-body">
                <form method="post" name="myform" className="personal_validate">
                    <div className="row">
                        
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">ایمیل</label>
                            <input type="email" className="form-control" value={email || ""} onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Hello@example.com" name="email" />
                        </div>
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">تاریخ تولد</label>
                            <input type="text" className="form-control" placeholder="1373/11/24" value={birth || ""} onChange={(e)=>setBirth(e.target.value)}
                                id="datepicker" autoComplete="off" name="dob" />
                        </div>
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">آدرس</label>
                            <input type="text" className="f form-control" value={address || ""} onChange={(e)=>setAddress(e.target.value)}
                                placeholder="تبریز ولیعصر" name="presentaddress" />
                        </div>
                        
                        
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">موبایل</label>
                            <input type="text" className="form-control disabled pointer-events-none" placeholder="1234567890" defaultValue={currentUser.mobile} 
                                name="mobile"  readOnly/>
                        </div>
                        
                        <div className="mb-3 col-12">
                            <button type="button" className="btn btn-success ps-5 pe-5" onClick={submitForm}>ذخیره</button>
                        </div>
                    </div>
                </form>
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
                              
    )
}

export default PersonalInfo
