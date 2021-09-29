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

const initial_state = {
    isLogged: false,
    detail: {},
    profile: {},
    wallet: {},
    authID: undefined,
    updating_avatar: false,
    login:{
        access: "",
        refresh: ""
    }
}
export const userManager = (state= initial_state, action)=>{
    switch (action.type) {
        case UPDATE_USER_DETAIL:
            return {
                ...state, 
                detail: action.payload
            }
        case UPDATE_USER_PROFILE:
            return {
                ...state, 
                profile: action.payload
            }
        case UPDATE_USER_WALLET:
            return {
                ...state, 
                wallet: action.payload
            }
        case UPDATE_AUTH_ID:
            return {
                ...state, 
                authID: action.payload
            }
        case UPDATE_LOG_STATUS:
            return {
                ...state, 
                isLogged: action.payload
            }
        case UPDATE_LOG_INFO:
            return {
                ...state, 
                login: action.payload
            }
        case UPDATING_USER_AVATAR:
            return {
                ...state, 
                updating_avatar: action.payload
            }
        case USER_LOGOUT:
            return initial_state
        default: return state;
    }
}
