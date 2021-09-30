import {
    UPDATE_UNREAD_NOTIFICATION_LIST,
    UPDATE_NOTIFICATION_LIST,
    UPDATING_NOTIFICATIONS,
}

from '../actions'

const init_state ={
    notificationList: [],
    unreadNotificationList: [],
    updating_notifications: false
}
export const notificationReducer = (state=init_state, action)=>{
    switch (action.type) {
        case UPDATE_NOTIFICATION_LIST:
            return {
                ...state,
                notificationList: action.payload
            }
        case UPDATE_UNREAD_NOTIFICATION_LIST:
            return {
                ...state,
                unreadNotificationList: action.payload
            }
    
        case UPDATING_NOTIFICATIONS:
            return {
                ...state,
                updating_notifications: action.payload
            }
    
        default:
            return state
    }
}