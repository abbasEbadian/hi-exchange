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
import ResetPassword from '../element/ResetPassword';
import { Constants } from '../../Constants';
import ProfileImages from '../layout/profile-images';


function Settings() {
    const [name, setName] = useState("");
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
            axios.post(Constants.BASE_URL + "/api/v2/account/manage/", bodyFormData,
                {headers: {Authorization: "Bearer "+ token }}
            ).then(res=>{
                const {data} = res;
                if (data.error === 1)
                toast.error(data.message)
                else {
                    axios.get(Constants.BASE_URL + "/api/v2/account/details/", {
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
                                        <ProfileImages source="settting"/>
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