import {
    UPDATE_CONVERT_AMOUNT,
    UPDATE_CURRENCY_FROM,
    UPDATE_CURRENCY_TO,
    UPDATE_AVAILABLE_CURRENCY,
    UPDATE_DETAIL_MODAL,
} from '../actionTypes';

const initial_state = {
    convertAmount: 0,
    currencyTo: {},
    currencyFrom: {},
    currencyAvailable: 0,
    showDetailModal: false
}
export const indexConverter = (state=initial_state, action)=>{
    switch (action.type) {
        case UPDATE_CONVERT_AMOUNT:
            return {
                ...state,
                convertAmount: action.payload
            }
        case UPDATE_CURRENCY_FROM:
            return {
                ...state,
                currencyFrom: action.payload
            }
        case UPDATE_CURRENCY_TO:
            return {
                ...state,
                currencyTo: action.payload
            }
        case UPDATE_AVAILABLE_CURRENCY:
            return {
                ...state,
                currencyAvailable: action.payload
            }
        case UPDATE_DETAIL_MODAL:
            return {
                ...state,
                showDetailModal: action.payload
            }
    
        default: return state
    }
}