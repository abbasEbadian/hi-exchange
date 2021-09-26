import {LOADER_ON, LOADER_OFF} from '../actions'

const init_state = {
    loading: false
}

// to toggle on and off preloader screen when needed.
// LOADER_ON mostly gets called before axios calls
// LOADER_OFF mostly gets called inside `finally` block of axios calls
export const preloaderReducer = (state=init_state, action)=>{
    switch (action.type) {
        case LOADER_ON:
            return {loading: true}
        case LOADER_OFF:
            return {loading: false}
        default:
            return state
    }
}