import axios from "axios";
import { Constants } from '../../Constants'


export const UPDATE_WALLET_LIST = "UPDATE_WALLET_LIST"
export const UPDATE_FETCHING_STATE = "UPDATE_FETCHING_STATE"
export const UPDATE_NETWORK_LIST = "UPDATE_NETWORK_LIST"
export const CHECKING_TRANSACTION = "CHECKING_TRANSACTION"
export const CHECKING_WITHDRAW = "CHECKING_WITHDRAW"
export const CHECKING_IRT_DEPOSIT = "CHECKING_IRT_DEPOSIT"
export const GENERATING_IRT_DEPOSIT_LINK = "GENERATING_IRT_DEPOSIT_LINK"




export const get_network_list = ()=>{
    return dispatch=>{
        axios.get("https://hi-exchange.com/api/v2/wallet/list/").then(res=>{
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
            axios.get("https://hi-exchange.com/api/v2/wallet/list/").then(res=>{
                if(!res) throw Error(401)
                
                const d = res.data                
                const newData = [
                    d.find(item => item.service.id === Constants.IRT_CURRENCY_ID),
                    d.find(item => item.service.id === Constants.USDT_CURRENCY_ID),
                    ...d.filter(item => ![Constants.IRT_CURRENCY_ID,
                            Constants.USDT_CURRENCY_ID].includes(item.service.id)).sort((a,b)=>b.balance*b.service.show_price_irt-a.balance*a.service.show_price_irt),
                ]
                dispatch(update_wallet_list(newData))
                dispatch(update_fetching_state(false))
                return resolve(d)
                
            }).catch(err=>{
                console.log("wallet401");
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
                                return reject({result: "fail", cause: "خطا در قبت تراکنش در سیستم"})
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
    return async dispatch=>{
        dispatch(checking_transaction(true))
        let status, text;
        axios.post(Constants.BASE_URL + "/api/v2/wallet/deposit/", {
            tx_id: depositTxID,
            wallet: wallet
        }).then(response=>{
            const {data} = response
            if (data.error === 1){
                text = data.message
                status = 400
            }
            else{
                let text = "تراکنش شما ثبت شد.بعد از تایید کارشناسان ما اعمال خواهد شد."
                text = text
                status = 200
            }
        }).catch(err=>{
            console.log(err);
            text = 'بررسی با خطا مواجه شد'
            status = 400
        }).finally(fn=>{
            setTransactionResult({status: status, text})
            dispatch(checking_transaction(false))
        })
        
    }
}
export const checking_transaction = (is_checking)=>{
    return {
        type: CHECKING_TRANSACTION,
        payload: is_checking
    }
}

export const check_withdraw = ({sourceWallet, Destwallet, amount}, setWithdrawModalOpen, toast)=>{
    return dispatch=>{
        dispatch(checking_transaction(true))
        axios.post(Constants.BASE_URL + "/api/v2/wallet/withdrawal/", {
            id: sourceWallet,
            wallet: Destwallet,
            amount: String(amount)
        }).then(response=>{
            const {data} = response
            if (data.error === 1)
                toast.error(data.message)
            else{
                toast.success("تراکنش شما ثبت شد.بعد از تایید کارشناسان ما اعمال خواهد شد.")
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
export const check_withdraw_irt = ({card_id, amount=0}, setWithdrawModalOpen, toast)=>{
    return dispatch=>{
        dispatch(checking_transaction(true))
        axios.post(Constants.BASE_URL + "/api/v2/wallet/manage/", {
            bank_id: String(card_id),
            amount: String(amount),
            type: "2"
        }).then(response=>{
            const {data} = response
            if (data.error === 1)
                toast.error(data.message)
            else{
                toast.success("تراکنش شما ثبت شد.بعد از تایید کارشناسان ما اعمال خواهد شد.")
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