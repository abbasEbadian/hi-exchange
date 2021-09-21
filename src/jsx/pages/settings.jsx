import React, { useState } from 'react';
import PageTitle from '../element/page-title';
import SettingsNav from '../element/settings-nav';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import ProfileImage from '../element/profile-image.jsx'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { sessionService } from 'redux-react-session'
import { updateUserImage, userUpdateImage } from '../../redux/actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { totalmem } from 'os';


function Settings() {
    const [name, setName] = useState("");
    const [image, setImage ] = useState("")
    const currentUser = useSelector(state=>state.session.user)
    const dispatch = useDispatch()
    let token = ""
    sessionService.loadSession()
    .then(currentSession => token=currentSession.token)
    .catch(err => console.log(err))
    const toastOpt = {
        position: "bottom-left",
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        autoClose: 5000,
    }
    const changeImage =  e=>{
    let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    const submitName =async  e=>{
        e.preventDefault();
        e.stopPropagation();
        if (name){
            var bodyFormData = new FormData();
            bodyFormData.append("first_name", name);
            bodyFormData.append("action", "profile");
            axios.post("https://hi-exchange.com/api/v2/account/manage/", bodyFormData,
                {headers: {Authorization: "Bearer "+ token }}
            ).then(res=>{
                const {data} = res;
                if (data.error == 1)
                toast.error(data.message)
                else {
                    axios.get("https://hi-exchange.com/api/v2/account/details/", {
                        headers: {
                            "Authorization": "Bearer "+token,
                        }
                    }).then(data=>{
                        sessionService.saveUser(data.data).then(e=>{
                            console.log("updated")
                        })
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            })
        
        }
        if (image){
            dispatch(userUpdateImage(image, toast, toastOpt)); 
        }
        return false;
    }
    return (
        <>
            <Header2 />
            <Sidebar />
            <PageTitle />

            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-md-4">
                            <SettingsNav/>                            
                        </div>
                        <div className="col-xl-9 col-md-8">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">پروفایل کاربر</h4>
                                        </div>
                                        <div className="card-body">
                                            <form action="#" onSubmit={submitName}>
                                                <div className="row">
                                                    
                                                    <div className="mb-3 col-xl-12">
                                                         <div className="d-flex align-items-center mb-3">
                                                            <img className="rounded-circle ms-0 ms-sm-3"
                                                                src={require('./../../images/profile/2.png')} width="55" height="55" alt="" />
                                                            <div className="d-flex w-100">
                                                                {currentUser && <h4 className="mb-0">{currentUser.first_name} {" "}  {currentUser.last_name}</h4>}
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 ">
                                                            <label className="form-label">نام و نام خانوادگی</label>
                                                            <input type="text" className="form-control f" placeholder="نام" value={name} onChange={e=>setName(e.target.value)} />
                                                        </div>
                                                       
                                                        <div className="file-upload-wrapper" data-text="تغییر تصویر">
                                                            <input name="file-upload-field" type="file" onChange={changeImage}
                                                                className="file-upload-field position-relative"  aria-describedby="imagedHelpBlock"></input>
                                                            <small id="imagedHelpBlock" className="form-text" style={{fontSize:0.7+'em'}}>حداکثر سایز مجاز برای فایل 20mb
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 text-start">
                                                        <button className="btn btn-success waves-effect">ذخیره</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">حساب کاربر</h4>
                                        </div>
                                        <div className="card-body">
                                            <form action="#">
                                                <div className="row">
                                                    <div className="mb-3 col-xl-12">
                                                        <label className="form-label">ایمیل جدید</label>
                                                        <input type="email" className="form-control" placeholder="Email" />
                                                    </div>
                                                    <div className="mb-3 col-xl-12">
                                                        <label className="form-label">رمز عبور جدید</label>
                                                        <input type="password" className="form-control"
                                                            placeholder="**********" />
                                                        <small className="mt-2 mb-0">فعالسازی هویت سنجی دو مرحله ای 
                                                        </small>
                                                    </div>
                                                    <div className="col-12  text-start">
                                                        <button className="btn btn-success waves-effect">ذخیره</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-12">
                                    <ProfileImage></ProfileImage>
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
    )
}

export default Settings;