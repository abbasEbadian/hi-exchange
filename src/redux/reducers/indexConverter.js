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
        karmozd:0,
        endPrice: 0,
        convertResult: 0,

    },
    bsdetails:{
        buyConversionResult: 0,
        buyConversionResultStr: 0,
        buyEndPrice:0,
        buyKarmozdAmount: 0,
        buyFixedKarmozd: 0,
        buyTotal:0,
        sellConversionResult: 0,
        sellConversionResultStr: 0,
        sellEndPrice:0,
        sellKarmozdAmount: 0,
        sellFixedKarmozd: 0,
        sellTotal:0,

       



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
        case "UPDATE_BSDETAILS":

            return {
                ...state,
                bsdetails: {
                    ...state.bsdetails,
                    ...action.payload
                }
            }
    
        default: return state
    }
}