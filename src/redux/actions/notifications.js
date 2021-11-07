import axios from "axios";
import { Constants } from '../../Constants'


export const UPDATE_NOTIFICATION_LIST = "UPDATE_NOTIFICATION_LIST "
export const UPDATE_UNREAD_NOTIFICATION_LIST = "UPDATE_UNREAD_NOTIFICATION_LIST "
export const UPDATING_NOTIFICATIONS = "UPDATING_NOTIFICATIONS "


export const get_notifications = ()=>{
    return dispatch=>{
        dispatch(updating_notifications(true))
        axios.get(Constants.BASE_URL + "/api/v2/notification/list/").then(response=>{
            if (!response) throw new Error(401)
            const {data} = response 
            dispatch(update_notification_list(data))
            dispatch(updating_notifications(false))
        }).catch(error=>{
            console.log(error);
            dispatch(updating_notifications(false))
        }).finally(f=>{
        })
    }
}

export const get_unread_notifications = ()=>{
    return dispatch=>{
        axios.get(Constants.BASE_URL + "/api/v2/notification/unread_list/").then(response=>{
            if (!response) throw new Error(401)
            const {data} = response 
            dispatch(update_unread_notification_list(data))

        }).catch(error=>{
            console.log(error);
            
        })
    }
}
export const mark_notifications_asread = ()=>{
    return dispatch=>{
        axios.post(Constants.BASE_URL + "/api/v2/notification/readAll/").then(response=>{
            if (!response) throw new Error(401)
            const {data} = response 
            dispatch(get_unread_notifications())
        }).catch(error=>{
            console.log(error);
            
        })
    }
}


const update_notification_list = (list)=>{
    return {
        type: UPDATE_NOTIFICATION_LIST,
        payload: list
    }
}
const update_unread_notification_list = (list)=>{
    return {
        type: UPDATE_UNREAD_NOTIFICATION_LIST,
        payload: list
    }
}
const updating_notifications = (is_updating)=>{
    return {
        type: UPDATING_NOTIFICATIONS,
        payload: is_updating
    }
}