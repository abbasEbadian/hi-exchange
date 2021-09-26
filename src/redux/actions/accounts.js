import axios from "axios";

export const FETCH_ACCOUNTS =  "FETCH_ACCOUNTS"
export const UPDATE_ACCOUNTS =  "UPDATE_ACCOUNTS"


const BASE = "https://hi-exchange.com"
export const fetch_accounts = ()=>{
    return dispatch =>{
        axios.get(BASE+ "/api/v2/bank/list/").then(response=>{
            const {data} = response
            dispatch(update_accounts(data))
        })
    }
}
export const add_credit_card = ({card, shaba, bank}, toast)=>{
        return dispatch=>{
            axios.post("https://hi-exchange.com/api/v2/bank/add/", {
            card,
            shaba,
            bank
        }).then(response=>{
            const {data} = response
            if(data.error === 1){
                toast.warn(data.message)
            }else{
                toast.success(data.message)
                dispatch(fetch_accounts())
            }
            if(!data.error){
                toast.success(data.message)
                dispatch(fetch_accounts())
            }
        }).catch(e=>{
            toast.error("خطا در برقراری ارتباط")
        })
        }
}  
export const update_accounts = (accounts)=>{
    return {
        type: UPDATE_ACCOUNTS,
        payload: accounts
    }
}