import axios from "axios";
import {Constants} from '../../Constants'
import { generate_wallet, get_wallet_list, update_fetching_state, get_network_list } from "./wallet";
import { userUpdateDetail } from "./user";
import { get_notifications, get_unread_notifications } from "./notifications";
import { fetch_currencies } from "./currencies";
import {toast} from 'react-toastify'
export const FETCH_ACCOUNTS =  "FETCH_ACCOUNTS"
export const UPDATE_ACCOUNTS =  "UPDATE_ACCOUNTS"
export const UPDATE_ORDERS =  "UPDATE_ORDERS"
export const GETTING_ORDERS =  "GETTING_ORDERS"
export const CREATING_ORDER =  "CREATING_ORDER"
export const UPDATE_TRANSACTIONS =  "UPDATE_TRANSACTIONS"
export const UPDATE_NETWORKS =  "UPDATE_NETWORKS"
export const UPDATE_SCHEDULES =  "UPDATE_SCHEDULES"
export const UPDATE_BANK_LIST =  "UPDATE_BANK_LIST"


const BASE = Constants.BASE_URL

export const fetch_user_all_data = ()=>{
    return dispatch=>{
        dispatch(get_wallet_list())
        dispatch(get_network_list())
        dispatch(fetch_accounts())
        dispatch(fetch_orders())
        dispatch(fetch_networks())
        dispatch(fetch_transactions())
        dispatch(userUpdateDetail())
        dispatch(get_unread_notifications())
        dispatch(get_notifications())
        dispatch(fetch_schedules())
        dispatch(fetch_bank_list())
        
        // Generate wallets if not aleady have them
        dispatch(get_wallet_list()).then(wallet=>{
            dispatch(fetch_currencies()).then(currencyList=>{
                if(currencyList === 400) throw new Error(400)
                setTimeout(() => {
                    
                    dispatch(update_fetching_state(true))
                    for(let service of currencyList) 
                        if(wallet.filter(item=>item.service.id ===service.id).length === 0){
                            dispatch(generate_wallet(service.id))
                        }    
                    dispatch(get_wallet_list())
                    dispatch(update_fetching_state(false))
                    
                }, 1000);
            }).catch(err=>{
                console.log(err);
            })
        }).catch(err=>{
            console.log(400);
        })
    }
}

export const fetch_bank_list = ()=>{
    return dispatch =>{
        axios.get(BASE+ "/api/v2/bank/name/list/").then(response=>{
            
            if(!response) throw Error(401)
            const {data} = response
            dispatch(update_bank_list(data))
        }).catch(error=>{
            console.log("fetch accounts", 401);
        })
    }
}
export const fetch_networks = ()=>{
    return dispatch =>{
        axios.get(BASE+ "/api/v2/network/list/").then(response=>{
            
            if(!response) throw Error(401)
            const {data} = response
            dispatch(update_networks(data))
        }).catch(error=>{
            console.log("fetch accounts", 401);
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
        axios.get(Constants.BASE_URL + "/api/v2/transaction/list/").then(res=>{
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
export const fetch_schedules = ()=>{
    return dispatch =>{
        dispatch(getting_orders(true))
        axios.get(BASE+ "/api/v2/order/list/?schedule=True").then(response=>{
            if(!response) throw Error(401)
            const {data} = response
            dispatch(update_schedules(data))
        }).catch(error=>{
            console.log("fetch ord", 401);
        }).finally(f=>{
            dispatch(getting_orders(false))
        })
    }
}
export const add_credit_card = ({card, shaba, bank}, history)=>{
        return dispatch=>{
            axios.post(Constants.BASE_URL + "/api/v2/bank/add/", {
            card,
            shaba,
            bank
        }).then(response=>{
            const {data} = response
            if(data.error === 1){
                toast.warn(data.message)
            }else{
                toast.success("کارت شما ثبت شد و بعد از تایید، به لیست کارت ها اضافه خواهد شد.")
                dispatch(fetch_accounts())
                history.push("/settings-account")
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
export const update_bank_list = (list)=>{
    return {
        type: UPDATE_BANK_LIST,
        payload: list
    }
}
export const update_accounts = (accounts)=>{
    return {
        type: UPDATE_ACCOUNTS,
        payload: accounts
    }
}
export const update_schedules = (schedules)=>{
    return {
        type: UPDATE_SCHEDULES,
        payload: schedules
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
export const update_networks = (trans)=>{
    return {
        type: UPDATE_NETWORKS,
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
                    source_price: String(source_price).replace(/,/g, ""),
                    destination_price: String(destination_price).replace(/,/g, ""),
                    source_asset,
                    destination_asset,
                    wallet,
                    description,
                    pmethod,
                    changed,
                    type
                }).then(response=>{
                    if(!response) throw Error(401)
                    if(response.data.error === 1)
                        toast.info("سفارش شما ثبت شد.")
                    else {
                        if(type === "buy")
                            toast.success("سفارش  شما با موفقیت ثبت شد.")
                        else
                            toast.success("سفارش  شما با موفقیت ثبت شد.")
                    }
                    dispatch(fetch_user_all_data())
                }).catch(err=>{
                    if (err === 401){
                        console.log(401);
                    }else{
                        toast.error("با خطا مواجه شد لطفا بعدا تلاش کنید")
                    }

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