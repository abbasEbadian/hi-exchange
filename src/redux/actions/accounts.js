import axios from "axios";
import {Constants} from '../../Constants'
import generate from "@babel/generator";
import { generate_wallet, get_wallet_list } from "./wallet";
import { assertTSExpressionWithTypeArguments } from "@babel/types";

export const FETCH_ACCOUNTS =  "FETCH_ACCOUNTS"
export const UPDATE_ACCOUNTS =  "UPDATE_ACCOUNTS"
export const UPDATE_ORDERS =  "UPDATE_ORDERS"
export const GETTING_ORDERS =  "GETTING_ORDERS"
export const CREATING_ORDER =  "CREATING_ORDER"
export const UPDATE_TRANSACTIONS =  "UPDATE_TRANSACTIONS"


const BASE = Constants.BASE_URL

export const fetch_user_all_data = ()=>{
    return dispatch=>{
        dispatch(get_wallet_list())
        dispatch(fetch_accounts())
        dispatch(fetch_orders())
        dispatch(fetch_transactions())
        dispatch(get_wallet_list()).then(wallet=>{
            if(!wallet || wallet.length == 0 || wallet.filter(item=>item&&item.id===12).length===0){
                dispatch(generate_wallet(Constants.IRT_CURRENCY_ID))
                dispatch(generate_wallet(Constants.USDT_CURRENCY_ID))
                dispatch(get_wallet_list())
            }
        })
    }
}
export const fetch_accounts = ()=>{
    return dispatch =>{
        axios.get(BASE+ "/api/v2/bank/list/").then(response=>{
            
            if(!response) throw Error(401)
            const {data} = response
            dispatch(update_accounts(data))
        }).catch(error=>{
            console.log("fetch accounts", 401);
        })
    }
}
export const fetch_transactions = ()=>{
    return dispatch =>{
        axios.get("https://hi-exchange.com/api/v2/transaction/list/").then(res=>{
        if (!res) throw Error(401)   
        const {data} = res

           dispatch(update_transactions(data))
       }).catch(e=>{
           console.log("Err");
       })
    }
}
export const fetch_orders = ()=>{
    return dispatch =>{
        dispatch(getting_orders(true))
        axios.get(BASE+ "/api/v2/order/list/").then(response=>{
            if(!response) throw Error(401)
            const {data} = response
            dispatch(update_orders(data))
        }).catch(error=>{
            console.log("fetch ord", 401);
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
export const update_transactions = (trans)=>{
    return {
        type: UPDATE_TRANSACTIONS,
        payload: trans
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
        changed="destination",
        type="swap"}, toast, setShowDetailModal=undefined)=>{
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
                    changed,
                    type
                }).then(response=>{
                    const {data} = response
                    toast.success("درخواست شما ثبت شد.بعد از تایید کارشناسان ، اعمال خواهد شد.")
                    dispatch(fetch_user_all_data())
                }).catch(err=>{
                    toast.error("با خطا مواجه شد لطفا بعدا تلاش کنید")

                }).finally(f=>{
                    dispatch(creating_order(false))
                    if(setShowDetailModal)
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