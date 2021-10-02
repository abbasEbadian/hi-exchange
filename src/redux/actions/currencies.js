import { UPDATE_CONVERT_RATES, UPDATE_CURRENCIES } from '../actionTypes' 
import axios from 'axios';
import { Constants } from '../../Constants';
import { resolveTxt } from 'dns';
function convertToRates(cl){
    /* 
    *   @param cl : currencyList fetched from server api/v2/service/list/
    *   @type : object
    * 
    *   @retruns rates: object
    *   containing two way rates
    *   {"BTC/ETH" : 50, "ETH/BTH": 1/50 }
    */

    let rates = {}
    for(let i=0; i<cl.length ; i++)
        for(let j=i+1; j< cl.length; j++){
            let cur1 = cl[i], cur2 = cl[j];
            let key1 = cur1["small_name_slug"] + "/" + cur2["small_name_slug"]
            let key2 = cur2["small_name_slug"] + "/" + cur1["small_name_slug"]
            let rate1 = cur1["buyPrice"] / cur2["buyPrice"];

            rates[key1] = rate1; 
            rates[key2] = 1/rate1; 
        }
    return rates
}
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
export const fetch_currencies = ()=>{
    return  dispatch=>{
        return new Promise((resolve, reject)=>{
            axios.get(Constants.BASE_URL + "/api/v2/service/list/", {})
            .then(data=>{
                dispatch(update_currencies(data.data))
                dispatch(update_convert_rates(convertToRates(data.data)));
                return resolve(data.data)
            }).catch(error=>{
                console.log(error);
                return reject(400)
            })
        })
    }
}