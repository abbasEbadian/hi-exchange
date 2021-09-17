import { UPDATE_CONVERT_RATES, UPDATE_CURRENCIES } from '../actionTypes' 

export const update_convert_rates = (rates)=>{
    return {
        type: UPDATE_CONVERT_RATES,
        payload: rates 
    }
}
export const update_currencies = (currencies)=>{
    return {
        type: UPDATE_CURRENCIES,
        payload: currencies 
    }
}