import {
    UPDATE_USER_DETAIL,
    UPDATE_USER_PROFILE,
    UPDATE_AUTH_ID,
    UPDATE_LOG_STATUS,
    UPDATE_LOG_INFO,
    UPDATE_USER_WALLET,
    USER_LOGOUT,
    UPDATING_USER_AVATAR
} from '../actionTypes'

import { sessionService } from 'redux-react-session'
import axios from 'axios';
import {toast } from 'react-toastify'
import { toggle_loader_on, toggle_loader_off } from '../actions'
import {Constants} from '../../Constants'
import qs from 'qs'
var fs = require('fs');
const toastOpt = {
    position: "bottom-left",
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    autoClose: 5000,
}


const BASE = Constants.BASE_URL


export const userLogout = (_history)=>{
    return (dispatch)=>{
        dispatch(toggle_loader_on())
        sessionService.deleteUser().then(e=>{
            sessionService.deleteSession().then(e=>{
            }).catch(err=>{
                console.log(err);
            });
        }).catch(err=>{
            console.log(err)
        }).finally(e=>{
            window.location.href = "https://Hi-exchange.com"
        });
    }
}
export const userUpdateDetail = ( _history=undefined)=>{
    return dispatch=>{
        if(_history)
        dispatch(toggle_loader_on())
        axios.get(BASE + "/api/v2/account/details/")
        .then(data=>{
            if (!data) throw Error("401")
            sessionService.saveUser({ ...data.data }).then(e=>{
                if(_history)
                    _history.push({pathname: "/"});
            }).catch(err=>{console.log(err);
            })
        }).catch(err=>{
            console.log("user update detail",401);
        }).finally(e=>{
            setTimeout(() => {
                if(_history)
                dispatch(toggle_loader_off())
            }, 800);
        })
    }
}
export const userLogin = (credentias, _history ,setIsSubmitting)=>{
    return dispatch=>{
        axios.post(BASE+"/api/v2/token/verify/", credentias)
            .then(response=>{
                dispatch(toggle_loader_on())
                const {data} = response
                const {access:token, refresh} = data;
                sessionService
                .saveSession({ token, refresh, refresh_time: new Date().getTime() }).then(e=>{
                    dispatch(userUpdateDetail(token, _history))
                    
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(err=>{
                if (err.non_field_errors)
                    toast.error(err.non_field_errors[0], toastOpt)
                else
                    toast.error("کد وارد شده صحیح نمی باشد.", toastOpt)
            }).finally(e=>{
                setIsSubmitting(false);
                setTimeout(() => {
                    dispatch(toggle_loader_off())
                }, 800);
            })
    }
}
export const userForget = ({mobile,code},_history ,setIsSubmitting)=>{
    return dispatch=>{
        const d = qs.stringify({
            mobile, code
        })
        axios.post(BASE+"/api/v2/token/password/verify/", d,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
            .then(response=>{
                const {data} = response
                if(data.error === 1){
                    toast.error(data.message)
                }else{
                    toast.success(data.message, {
                        onClose: ()=>{
                            _history.push("/signin")
                        }
                    })
                }
            }).catch(err=>{
                toast.error("کد وارد شده صحیح نمی باشد.")
            }).finally(e=>{
                setIsSubmitting(false);
            })
    }
}
export const userSignup = (credentias, _history ,setIsSubmitting)=>{
    return dispatch=>{
        axios.post(BASE+"/api/v2/token/register/verify/", credentias)
            .then(response=>{
                if(response.data.error === 1){
                    toast.error(response.data.message, toastOpt)
                }else{
                    toast.success(response.data.message + " در حال انتقال به صفحه ورود...", {
                        ...toastOpt,
                        onClose: ()=>{
                            _history.push("/signin")
                        },
                    })
                }
            }).catch(err=>{
                toast.error("کد وارد شده صحیح نمی باشد.", toastOpt)
            }).finally(e=>{
                setIsSubmitting(false);
                setTimeout(() => {
                    dispatch(toggle_loader_off())
                }, 800);
            })
    }
}
export const userUpdateName =  (name)=>{
    return dispatch=>{
        sessionService.loadSession().then(session=>{
            axios.post(BASE + "/api/v2/account/verify/", {
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
        }).catch(err=>{console.log(err);
        })
    }
}
export const userUpdateImage =  (data, toastOpt=0)=>{
    return dispatch=>{
        return new Promise((resolve, reject)=>{
            axios.post(BASE+"/api/v2/account/document/", data,
            ).then(response=>{
                const {data} = response 
                
                if (+data.error === 1){
                    return resolve({status:400, message:data.message})}
                else{
                    return resolve({status:200, message:data.message}) 
                }
            }).catch(err=>{
                return resolve({status:400,message: "با خطا مواجه شد."})
            })
        })
    }
}
export const userUpdateAvatar =  (image, toast=0, toastOpt=0)=>{
   const data = new  FormData()
   data.append('file', image);
    
    return dispatch=>{

        return new Promise((resolve, reject)=>{
            dispatch(uploading_avatar(true))
            axios.post(BASE+"/api/v2/account/avatar/", data,{
                header:{
                    "Content-Type": "application/form-data"
                }
            }
            ).then(data=>{
                if(data.data.error === 1){
                    if(toast) toast.error(data.data.message, toastOpt); 
                }else{
                    if(toast) toast.success(data.data.message, toastOpt); 
                    dispatch(userUpdateDetail())
                }
                return resolve(200) 
            }).catch(err=>{
                console.log(err);
                if(toast) toast.error("با خطا مواجه شد.")
                return reject(400)
            }).finally(f=>{
                dispatch(uploading_avatar(false))
            })
        })
    }
}

export const userUpdatePersonal = (info)=>{
    return dispatch=>{
        
       return new Promise((resolve, reject)=>{

            axios.post(BASE+"/api/v2/account/manage/", {
                action: "profile",
                ...info
            }).then(response=>{
                const {data} = response;
                if (data.error === 1){
                    toast.warning(data.message, toastOpt);
                }else{
                    toast.success(data.message, toastOpt)
                    resolve("sent")
                }
            }).catch(error=>{
                toast.error("با خطا مواجه شد.", toastOpt)
                console.log(error)
            })
        }) 
    }
}

export const uploading_avatar = (is_updating)=>{
    return {
        type: UPDATING_USER_AVATAR,
        payload: is_updating
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
        axios.get(BASE + "/api/v2/account/details/", {
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
        axios.post(BASE + "/api/v2/account/manage/", {
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

