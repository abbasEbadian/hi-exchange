import axios from "axios";
import { Constants } from '../../Constants'
import {fetch_schedules} from './accounts'

export const UPDATE_WALLET_LIST = "UPDATE_WALLET_LIST"
export const UPDATE_FETCHING_STATE = "UPDATE_FETCHING_STATE"
export const UPDATE_NETWORK_LIST = "UPDATE_NETWORK_LIST"
export const CHECKING_TRANSACTION = "CHECKING_TRANSACTION"
export const CHECKING_WITHDRAW = "CHECKING_WITHDRAW"
export const CHECKING_IRT_DEPOSIT = "CHECKING_IRT_DEPOSIT"
export const CREATING_SCHEDULE = "CREATING_SCHEDULE"
export const GENERATING_IRT_DEPOSIT_LINK = "GENERATING_IRT_DEPOSIT_LINK"




export const get_network_list = ()=>{
    return dispatch=>{
        axios.get(Constants.BASE_URL+"/api/v2/network/list/").then(res=>{
                if(!res) throw Error(401)
                dispatch(update_network_list(res.datad))
            }).catch(err=>{
                console.log("network401");
                dispatch(update_network_list(["TEST1", "TEST2", "Test3"]))
            })
    }
}
export const get_wallet_list = ()=>{
    return dispatch=>{
        dispatch(update_fetching_state(true))
        return new Promise((resolve, reject)=>{
            axios.get(Constants.BASE_URL+"/api/v2/wallet/list/").then(res=>{
                if(!res) throw Error(401)
                
                const d = res.data.filter(item=>item&&item.service)                
                let newData = [
                    d.find(item => item.service.id === Constants.IRT_CURRENCY_ID),
                    d.find(item => item.service.id === Constants.USDT_CURRENCY_ID),
                    ...d.filter(item => ![Constants.IRT_CURRENCY_ID,
                            Constants.USDT_CURRENCY_ID].includes(item.service.id)).sort((a,b)=>b.balance*b.service.show_price_irt-a.balance*a.service.show_price_irt),
                ]
                dispatch(update_wallet_list(newData))
                dispatch(update_fetching_state(false))
                return resolve(d)
                
            }).catch(err=>{
                console.log("wallet401", err);
            }).finally(f=>{
                dispatch(update_fetching_state(false))
            })
        })
       
       
    }
}
export const update_network_list = (networkList)=>{
    return {
        type: UPDATE_NETWORK_LIST,
        payload: networkList
    }
}
export const update_wallet_list = (wallet_object)=>{
    return {
        type: UPDATE_WALLET_LIST,
        payload: wallet_object
    }
}
export const update_fetching_state = (is_fetching)=>{
    return {
        type: UPDATE_FETCHING_STATE,
        payload: is_fetching
    }
}
export const update_checking_irt_deposit = (is_checking)=>{
    return {
        type: UPDATE_FETCHING_STATE,
        payload: is_checking
    }
}
export const generating_irt_deposit_link = (is_generating)=>{
    return {
        type: GENERATING_IRT_DEPOSIT_LINK,
        payload: is_generating
    }
}
export const create_schedule = ({asset, pair, amount, price, type})=>{
    return dispatch=>{
        return new Promise((resolve, reject)=>{
            dispatch(creating_schedule(true))
            
            axios.post(Constants.BASE_URL + "/api/v2/schedule/create/", {
                        asset,
                        pair,
                        amount,
                        price,
                        type
                    }).then(response=>{
                    const {data} = response 
                    dispatch(fetch_schedules())
                    dispatch(get_wallet_list())
                    if(data.error === 0)
                        return resolve({result: "success", message: data.message})                    
                    
                    return resolve({result: "fail", message: data.message})                    
                }).catch(error=>{
                    return reject({result:"fail", message: "خطا در تایید تراکنش "})
                }).finally(e=>{
                    
                    dispatch(creating_schedule(false))
                })
            
           
        })
    }
}
export const cancel_schedule = ({id})=>{
    return dispatch=>{
        return new Promise((resolve, reject)=>{            
            axios.post(Constants.BASE_URL + "/api/v2/schedule/cancel/", {
                      id
                    }).then(response=>{
                    const {data} = response 
                    dispatch(fetch_schedules())
                    if(data.error === 0)
                        return resolve({result: "success", message: data.message})                    
                    
                    return resolve({result: "fail", message: data.message})                    
                }).catch(error=>{
                    return reject({result:"fail", message: "خطا در تایید تراکنش "})
                })
            
           
        })
    }
}
export const check_irt_deposit = ({bank_id, order_id, id})=>{
    return dispatch=>{
        return new Promise((resolve, reject)=>{
            dispatch(update_checking_irt_deposit(true))
            axios.post("https://api.idpay.ir/v1.1/payment/verify", {
                    id,
                    order_id
                }).then(response=>{
                    const {data} = response
                    const amount = data.amount
                    if(data.status === 200){
                        axios.post(Constants.BASE_URL+"/api/v2/wallet/manage/", {
                            amount,
                            bank_id,
                            type:"1"
                        }).then(response=>{
                            const {data} = response
                            if(data.error === 1){
                                return reject({result: "fail", cause:data.message})
                            }else{
                                return resolve({result: "success"})
                            }
                        }).catch(error=>{
                            return reject({result:"fail", cause: error})
                        })
                        
                    }else{
                        return reject({result: "fail", cause: "خطا در تایید تراکنش"})
                    }
                }).catch(error=>{
                    return reject({result:"fail", cause: "خطا در تایید تراکنش "})
                }).finally(e=>{
                    dispatch(update_checking_irt_deposit(false))
                })
            
           
        })
    }
}
export const check_transaction = ({depositTxID, wallet}, setTransactionResult)=>{
    return dispatch=>{
        return new Promise((resolve, reject)=>{
            dispatch(checking_transaction(true))
            axios.post(Constants.BASE_URL + "/api/v2/wallet/deposit/", {
                tx_id: depositTxID,
                wallet: wallet
            }).then(response=>{
                const {data} = response
                if (data.error === 1){
                    return resolve({status:400, text: data.message})
                }
                else{
                    let text = data.message
                    return resolve({status:200, text})
                }
            }).catch(err=>{
                console.log(err);
                return resolve({status:400, text:'بررسی با خطا مواجه شد'})
            }).finally(fn=>{
                dispatch(checking_transaction(false))
            })
        })
       
        
    }
}
export const checking_transaction = (is_checking)=>{
    return {
        type: CHECKING_TRANSACTION,
        payload: is_checking
    }
}

export const check_withdraw = ({sourceWallet, Destwallet, amount, otp, network}, setShowVerify, toast)=>{
    return dispatch=>{
        dispatch(checking_transaction(true))
        axios.post(Constants.BASE_URL + "/api/v2/wallet/withdrawal/", {
            id: sourceWallet,
            wallet: Destwallet,
            amount: String(amount),
            otp,
            network
        }).then(response=>{
            const {data} = response
            if (data.error === 1)
                toast.error(data.message)
            else{
                setShowVerify(false)
                toast.success(data.message)
            }
        }).catch(err=>{
            console.log(err);
            toast.error("خطا هنگام ثبت درخواست .لطفا بعدا تلاش نمایید.")
        }).finally(fn=>{
            dispatch(checking_transaction(false))
        })
    }
}
export const check_withdraw_irt = ({card_id, otp, amount=0}, setWithdrawModalOpen, toast)=>{
    return dispatch=>{
        dispatch(checking_transaction(true))
        axios.post(Constants.BASE_URL + "/api/v2/wallet/manage/", {
            bank_id: String(card_id),
            amount: String(amount),
            type: "2",
            otp
        }).then(response=>{
            const {data} = response
            if (data.error === 1)
                toast.error(data.message)
            else{
                toast.success(data.message)
            }
        }).catch(err=>{
            console.log(err);
            toast.error("خطا هنگام ثبت درخواست .لطفا بعدا تلاش نمایید.")
        }).finally(fn=>{
            setWithdrawModalOpen(false)
            dispatch(checking_transaction(false))
        })
    }
}

export const checking_withdraw = (is_checking)=>{
    return {
        type: CHECKING_WITHDRAW,
        payload: is_checking
    }
}
export const creating_schedule = (is_updating)=>{
    return {
        type: CREATING_SCHEDULE,
        payload: is_updating
    }
}



export const generate_wallet = (service)=>{
    return dispatch=>{
        axios.post(Constants.BASE_URL + "/api/v2/wallet/generate/", {service}).then(response=>{
            const {data} = response
            return Promise.resolve(data.id)
        }).catch(err=>{
            console.log(err)
        })
    }
}