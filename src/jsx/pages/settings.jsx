import React, { useState, useRef } from 'react';
import PageTitle from '../element/page-title';
import SettingsNav from '../element/settings-nav';
import Header2 from '../layout/header2';
import Sidebar from '../layout/sidebar';
import PersonalInfo from '../element/personal-info.jsx'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { sessionService } from 'redux-react-session'
import { userUpdateAvatar } from '../../redux/actions'
import {  toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import UserAvatar from '../element/userAvatar';
import ResetPassword from '../element/ResetPassword';


function Settings() {
    const [name, setName] = useState("");
    const currentUser = useSelector(state=>state.session.user)
    const {updaing_avatar} = useSelector(state=>state.userManager)
    const dispatch = useDispatch()
    const avatarRef = useRef(undefined)

    
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
                if (data.error === 1)
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
        if (avatarRef.current.files.length>0){
            dispatch(userUpdateAvatar(avatarRef.current.files[0], toast, toastOpt)); ;
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
                                                            <UserAvatar></UserAvatar>
                                                            <div className="d-flex w-100">
                                                                {currentUser && <h4 className="mb-0">{currentUser.first_name} {" "}  {currentUser.last_name}</h4>}
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 ">
                                                            <label className="form-label">نام و نام خانوادگی</label>
                                                            <input type="text" className="form-control f" placeholder="نام" value={name} onChange={e=>setName(e.target.value)} />
                                                        </div>
                                                       
                                                        <div className="file-upload-wrapper" data-text={avatarRef.current&&avatarRef.current.files.length>0?avatarRef.current.files[0].name:"اپلود تصویر"}>
                                                            <input name="file-upload-field" type="file" ref={avatarRef}
                                                                className="file-upload-field position-relative"  aria-describedby="imagedHelpBlock"></input>
                                                            <small id="imagedHelpBlock" className="form-text" style={{fontSize:0.7+'em'}}>حداکثر سایز مجاز برای فایل 20mb
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 text-start mt-3">
                                                        <button className="btn btn-success waves-effect">ذخیره</button>
                                                        {updaing_avatar?<Loader type="Oval" color="#fff" width={25} height={25}></Loader>:undefined}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <ResetPassword />
                                </div>
                                <div className="col-xl-12">
                                    <PersonalInfo></PersonalInfo>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
            </div>
                                                       
            
        </>
    )
}

export default Settings;