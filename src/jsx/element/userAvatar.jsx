import React from 'react'

import {useSelector} from 'react-redux'
import {Constants} from '../../Constants'
const  UserAvatar= ({width="65px"})=> {
    const local = "http://127.0.0.1"
    const user = useSelector(state=>state.session.user)
    return (
        <>
            {user && user.avatar? 
                <img
                    className="rounded-circle ms-0 ms-sm-3"
                    style={{borderRadius: "50%", width, height:"65px" }}
                    src={user.avatar.replace(local, Constants.BASE_URL)}
                    alt="userAvatar"
                />:
                <img
                    className="rounded-circle ms-0 ms-sm-3"
                    src={require("../../images/profile/2.png")}
                    alt="userAvatar"
                />

            }
        </>
    )
}


export default UserAvatar

