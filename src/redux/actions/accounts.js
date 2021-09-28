import axios from "axios";
import {Constants} from '../../Constants'
import generate from "@babel/generator";
import { generate_wallet } from "./wallet";
import { assertTSExpressionWithTypeArguments } from "@babel/types";

export const FETCH_ACCOUNTS =  "FETCH_ACCOUNTS"
export const UPDATE_ACCOUNTS =  "UPDATE_ACCOUNTS"
export const UPDATE_ORDERS =  "UPDATE_ORDERS"
export const GETTING_ORDERS =  "GETTING_ORDERS"
export const CREATING_ORDER =  "CREATING_ORDER"


const BASE = Constants.BASE_URL
export const fetch_accounts = ()=>{
    return dispatch =>{
        axios.get(BASE+ "/api/v2/bank/list/").then(response=>{
            
            if(!response) throw Error
            const {data} = response
            dispatch(update_accounts(data))
        }).catch(error=>{
            console.log(error);
        })
    }
}
export const fetch_orders = ()=>{
    return dispatch =>{
        dispatch(getting_orders(true))
        axios.get(BASE+ "/api/v2/order/list/").then(response=>{
            const {data} = response
            dispatch(update_orders(data))
        }).catch(error=>{
            console.log(error);
        }).finally(f=>{
            dispatch(getting_orders(false))
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
export const update_orders = (orders)=>{
    return {
        type: UPDATE_ORDERS,
        payload: orders
    }
}
export const getting_orders = (status)=>{
    return {
        type: GETTING_ORDERS,
        payload: status
    }
}



export const create_order = ({
        source_price = 0,
        destination_price=0,
        source_asset=0,
        destination_asset=0,
        wallet="",
        description="",
        pmethod="wallet",
        changed="destination"}, toast, setShowDetailModal)=>{
            return async (dispatch)=>{

               if(!wallet){
                    wallet = await dispatch(generate_wallet(destination_asset))
                }

                axios.post(Constants.BASE_URL+"/api/v2/order/create/", {
                    source_price,
                    destination_price,
                    source_asset,
                    destination_asset,
                    wallet,
                    description,
                    pmethod,
                    changed
                }).then(response=>{
                    const {data} = response
                    toast.success("درخواست شما ثبت شد.بعد از تایید کارشناسان ، اعمال خواهد شد.")
                }).catch(err=>{
                    toast.error("با خطا مواجه شد لطفا بعدا تلاش کنید")

                }).finally(f=>{
                    dispatch(creating_order(false))
                    setShowDetailModal(false)
                })
            }

}
export const creating_order = (status)=>{
    return {
        type: CREATING_ORDER,
        payload: status
    }
}