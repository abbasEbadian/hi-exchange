import {
    UPDATE_CONVERT_AMOUNT,
    UPDATE_CURRENCY_FROM,
    UPDATE_CURRENCY_TO,
    UPDATE_AVAILABLE_CURRENCY,
    UPDATE_DETAIL_MODAL,
    UPDATE_NEXT_REFRESH
} from '../actionTypes';

export const update_convert_amount = (value)=>{
    return {
        type:UPDATE_CONVERT_AMOUNT,
        payload: value 
    }
}
export const update_currency_from = (currencyObject)=>{
    return {
        type:UPDATE_CURRENCY_FROM,
        payload: currencyObject 
    }
}
export const update_currency_to = (currencyObject)=>{
    return {
        type:UPDATE_CURRENCY_TO,
        payload: currencyObject 
    }
}
export const update_available_currency = (value)=>{
    return {
        type:UPDATE_AVAILABLE_CURRENCY,
        payload: value 
    }
}
export const update_detail_modal = (modal_state)=>{
    return {
        type:UPDATE_DETAIL_MODAL,
        payload: modal_state 
    }
}
export const update_next_refresh = (time)=>{
    return {
        type: UPDATE_NEXT_REFRESH,
        payload: time 
    }
}