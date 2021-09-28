import {
    UPDATE_CONVERT_AMOUNT,
    UPDATE_CURRENCY_FROM,
    UPDATE_CURRENCY_TO,
    UPDATE_AVAILABLE_CURRENCY,
    UPDATE_DETAIL_MODAL,
    UPDATE_NEXT_REFRESH,
} from '../actionTypes';

const initial_state = {
   
    convertAmount: 0,
    currencyTo: {small_name_slug:undefined},
    currencyFrom: {small_name_slug:undefined},
    currencyAvailable: 0,
    showDetailModal: false,
    nextRefreshTime: "00:00:00",
    details: { convertInvalid:true,
        karmozdAmount: 0,
        fixedKarmozd: 0,
        endPrice: 0,
        convertResult: 0,

    }
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
        case UPDATE_NEXT_REFRESH:
            return {
                ...state,
                nextRefreshTime: action.payload
            }
        case "UPDATE_DETAILS":
            
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.payload
                }
            }
    
        default: return state
    }
}