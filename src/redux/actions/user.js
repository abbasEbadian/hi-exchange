import {
    UPDATE_USER_DETAIL,
    UPDATE_USER_PROFILE,
    UPDATE_AUTH_ID,
    UPDATE_LOG_STATUS,
    UPDATE_LOG_INFO,
    UPDATE_USER_WALLET,
    USER_LOGOUT,
} from '../actionTypes'
import { sessionService } from 'redux-react-session'
import axios from 'axios';

export const userLogout = (_history)=>{
    return ()=>{
        sessionService.deleteSession();
        sessionService.deleteUser();
        _history.push("/opt-1")
    }
}
export const userUpdateDetail = (token, _history)=>{
    return dispatch=>{

        axios.get("https://hi-exchange.com/api/v2/account/details/", {
            headers: {
            "Authorization": "Bearer "+token,
        }
        }).then(data=>{
            sessionService.saveUser({ ...data.data }).then(e=>{
                if(_history)
                    _history.push({pathname: "/"});
            })
        }).catch(err=>{
                console.log(err);
        })
    }
}
export const userLogin = (credentias, _history ,setIsSubmitting)=>{
    return dispatch=>{

        axios.post("https://hi-exchange.com/api/v2/token/verify/", credentias)
            .then(response=>{
                const {data} = response
                const {access:token, refresh} = data;
                sessionService.saveSession({ token, refresh, time: new Date().getTime() }).then(e=>{
                    dispatch(userUpdateDetail(token, _history))
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(err=>{
                // toast.error("کد وارد شده صحیح نمی باشد.", toastOpt)
            }).finally(e=>{
                
                setIsSubmitting(false);
            })
    }
}
export const userUpdateName =  (name, toast, toastOpt)=>{
    return dispatch=>{
        sessionService.loadSession().then(session=>{
            axios.post("https://hi-exchange.com/api/v2/account/verify/", {
                name
            },
            {headers:{
                Authorization: "Bearer " + session.token
            }}
            ).then(data=>{
                toast.success(data.data.message, toastOpt);  
            }).catch(err=>{
                console.log(err);
                toast.error("با خطا مواجه شد.")
            })
        })
    }
}
export const userUpdateImage =  (image, toast, toastOpt)=>{
    return dispatch=>{
        sessionService.loadSession().then(session=>{
            axios.post("https://hi-exchange.com/api/v2/account/verify/", {
                image
            },
            {headers:{
                Authorization: "Bearer " + session.token
            }}
            ).then(data=>{
                toast.success(data.data.message, toastOpt);  
            }).catch(err=>{
                console.log(err);
                toast.error("با خطا مواجه شد.")
            })
        })
    }
}

export const udpate_user_detail = (user)=>{
    return {
        type: UPDATE_USER_DETAIL,
        payload: user
    }
}
export const udpate_user_profile = (profile)=>{
    return {
        type: UPDATE_USER_PROFILE,
        payload: profile
    }
}

export const udpate_user_wallet = (wallet)=>{
    return {
        type: UPDATE_USER_WALLET,
        payload: wallet
    }
}
export const update_auth_id = (authID)=>{
    return {
        type: UPDATE_AUTH_ID,
        payload: authID
    }
}
export const update_log_status = (status)=>{
    return {
        type: UPDATE_LOG_STATUS,
        payload: status
    }
}
export const update_log_info = (access, refresh)=>{
    return {
        type: UPDATE_LOG_INFO,
        payload: {access, refresh}
    }
}
export const user_login = (access, refresh)=>{
    return dispatch=>{
        localStorage.setItem("hiexchange_token", access);
        localStorage.setItem("hiexchange_refresh", refresh);
        localStorage.setItem("hiexchange_refresh_time", new Date().getTime());
        dispatch(update_log_status(true))
        dispatch(update_log_info(access, refresh));
        dispatch(fetch_user_detail(access));
            // dispatch(fetch_user_profile(token));
    }
}
export const fetch_user_detail = (token)=>{
    return (dispatch) => {
        axios.get("https://hi-exchange.com/api/v2/account/details/", {
            headers: {
                "Authorization": "Bearer "+token,
            }
        }).then(data=>{
            dispatch(udpate_user_detail(data.data))
        }).catch(err=>{
            console.log(err);
        })
    }
}
export const fetch_user_profile = (token)=>{
    return (dispatch) => {
        axios.post("https://hi-exchange.com/api/v2/account/manage/", {
            headers: {
                "Authorization": "Bearer "+token
            }
        }).then(data=>{
            dispatch(udpate_user_profile(data.data))
        }).catch(error=>{
            console.log(error.response.status);
        })
    }
}
export const logout = e=>{
    return {
        type: USER_LOGOUT
    }
}
export const check_user_session = (isLogged)=>{
    return dispatch => {
        const token = localStorage.getItem("hiexchange_token");
        const refresh_time = +localStorage.getItem("hiexchange_refresh_time");
        const refresh = localStorage.getItem("hiexchange_refresh");
        if(token && refresh_time && refresh){
            const now = new Date()
            if (now.getTime() - refresh_time > 60*30*1000){
                axios.post("https://hi-exchange.com/api/v2/token/refresh/", {
                    refresh: refresh
                }).then(data=>{
                     dispatch(user_login(data.data.access, refresh));
                }) 
            }else{
                if (!isLogged)
                dispatch(user_login(token, refresh));
            }
        }else{
            console.log("CAME")
            dispatch(logout())
        }
    }
}
