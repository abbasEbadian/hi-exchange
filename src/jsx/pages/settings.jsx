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