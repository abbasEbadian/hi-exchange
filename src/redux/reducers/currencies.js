import {UPDATE_CONVERT_RATES, UPDATE_CURRENCIES} from '../actionTypes'
const initial_state = {
    convertRates: {},
    currencyList: {}
}
export const currencies = (state= initial_state, action)=>{
    switch (action.type) {
        case UPDATE_CONVERT_RATES:
            return {
                ...state, 
                convertRates: action.payload
            }
        case UPDATE_CURRENCIES:
            return {
                ...state, 
                currencyList: action.payload
            }
        default: return state;
    }
}
