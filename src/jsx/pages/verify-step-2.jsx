import React , {useState } from "react";
import {  useHistory} from "react-router-dom";
import Header2 from "../layout/header2";
import Sidebar from "../layout/sidebar";
import {useDispatch } from 'react-redux'
import {userUpdateImage} from '../../redux/actions'
import Loader from 'react-loader-spinner'
import { toast, ToastContainer  } from "react-toastify";
import ProfileImages from "../layout/profile-images";

function VerifyStep2() {
   
    return (
        <>
            <Header2 />
            <Sidebar />
            <ProfileImages/>
        </>
    );
}

export default VerifyStep2;
