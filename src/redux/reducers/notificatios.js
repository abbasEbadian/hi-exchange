import {
    UPDATE_UNREAD_NOTIFICATION_LIST,
    UPDATE_NOTIFICATION_LIST,
}

from '../actions'

const init_state ={
    notificationList: [],
    unreadNotificationList: []
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
    
        default:
            return state
    }
}