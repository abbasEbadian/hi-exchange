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
import {toast } from 'react-toastify'
import { toggle_loader_on, toggle_loader_off } from '../actions'
import { generate_wallet } from './wallet';

const toastOpt = {
    position: "bottom-left",
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    autoClose: 5000,
}


const BASE = "https://hi-exchange.com"


export const userLogout = (_history)=>{
    return (dispatch)=>{
        dispatch(toggle_loader_on())
        sessionService.deleteUser().then(e=>{
            sessionService.deleteSession().then(e=>{
                _history.push("/otp-1")
            }).catch(err=>{
                console.log(err);
            });
        }).catch(err=>{
            console.log(err)
        }).finally(e=>{
            setTimeout(() => {
                dispatch(toggle_loader_off());
            }, 2000);
        });
    }
}
export const userUpdateDetail = ( _history=undefined)=>{
    return dispatch=>{
        if(_history)
        dispatch(toggle_loader_on())
        axios.get(BASE + "/api/v2/account/details/")
        .then(data=>{
            sessionService.saveUser({ ...data.data }).then(e=>{
                if(_history)
                    _history.push({pathname: "/"});
            }).catch(err=>{console.log(err);
            })
        }).catch(err=>{
                console.log(err);
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
                toast.error("کد وارد شده صحیح نمی باشد.", toastOpt)
            }).finally(e=>{
                setIsSubmitting(false);
                setTimeout(() => {
                    dispatch(toggle_loader_off())
                }, 800);
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
                            _history.push("/otp-1")
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
        }).catch(err=>{console.log(err);
        })
    }
}
export const userUpdateImage =  (image, toast=0, toastOpt=0)=>{
    return dispatch=>{
        return new Promise((resolve, reject)=>{
            axios.post("https://hi-exchange.com/api/v2/account/verify/", {
                image
            },
            ).then(data=>{
                if(toast) toast.success(data.data.message, toastOpt); 
                return resolve(200) 
            }).catch(err=>{
                console.log(err);
                if(toast) toast.error("با خطا مواجه شد.")
                return reject(400)
            }).catch(err=>{
                console.log(err)
                return reject(400)
            })
        })
    }
}
export const userUpdatePersonal = (info)=>{
    return dispatch=>{
        
        sessionService.loadSession().then(session=>{
            axios.post(BASE+"/api/v2/account/manage/", {
                action: "profile",
                ...info
            },{
                headers:{
                    Authorization: "Bearer " + session.token
                }
            }).then(response=>{
                const {data} = response;
                if (data.error === 1){
                    toast.warning(data.message, toastOpt);
                }else{
                    toast.success(data.message, toastOpt)
                }
            }).catch(error=>{
                toast.error("با خطا مواجه شد.", toastOpt)
                console.log(error)
            })
        }).catch(err=>{console.log(err);
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

