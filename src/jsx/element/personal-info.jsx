
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { userUpdatePersonal, userUpdateDetail } from '../../redux/actions'
import {ToastContainer} from 'react-toastify'


const PersonalInfo = () => {
    const currentUser = useSelector(state=>state.session.user)
    const [ ncode, setNcode ] = useState("")
    const [ phnumber, setPhnumber ] = useState("")
    const [ postal, setPostal ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ birth, setBirth ] = useState("")
    const [ address, setAddress ] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        if(currentUser.personal_data){

            setNcode(currentUser.personal_data.national_id)
            setPhnumber(currentUser.personal_data.address.phone)
            setPostal(currentUser.personal_data.address.post_code)
            setAddress(currentUser.personal_data.address.address)
        }
        setEmail(currentUser.email)
        setBirth(currentUser.birthday)

    }, [currentUser])
    const submitForm = (e)=>{
        if(!email &&  !birth && !address) return;
        const data = {
            email,
            birthday: birth,
            address,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            phone: phnumber,
            card_id: ncode,
            birth_certificate_id: "12345",
            post_code: postal
        }
        dispatch(userUpdatePersonal(data)).then(e=>{
            setTimeout(() => {
                dispatch(userUpdateDetail())
            }, 2000);
        })
    }
    return (
        <>
       {currentUser && currentUser.personal_data? <div className="card">
            <div className="card-header">
                <h4 className="card-title">اطلاعات شخصی</h4>
            </div>
            <div className="card-body">
                <form method="post" name="myform" className="personal_validate">
                    <div className="row">
                        
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">کدملی</label>
                            <input type="text" className="form-control" value={ncode || ""} onChange={(e)=>setNcode(e.target.value)}
                                placeholder="136..." name="ncode" />
                        </div>
                        <div className="mb-3 col-xl-6">
                            <label className="form-label">تلفن ثابت</label>
                            <input type="text" className="form-control" value={phnumber || ""} onChange={(e)=>setPhnumber(e.target.value)}
                                placeholder="تلفن ثابت به همراه کد شهر" name="phnumber" />
                        </div>
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
                            <label className="form-label">کدپستی</label>
                            <input type="text" className="form-control disabled pointer-events-none" placeholder="51867..." value={postal} 
                                name="postal"   onChange={(e)=>setPostal(e.target.value)}/>
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
          
        </div>:undefined} 
        </>               
    )
}

export default PersonalInfo
