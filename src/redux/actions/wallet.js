import axios from "axios";
import { sessionService } from 'redux-react-session' 
import { Constants } from '../../Constants'


export const UPDATE_WALLET_LIST = "UPDATE_WALLET_LIST"
export const UPDATE_FETCHING_STATE = "UPDATE_FETCHING_STATE"
export const CHECKING_TRANSACTION = "CHECKING_TRANSACTION"
export const CHECKING_WITHDRAW = "CHECKING_WITHDRAW"



export const get_wallet_list = ()=>{
    return dispatch=>{
        dispatch(update_fetching_state(true))
        return new Promise((resolve, reject)=>{
            sessionService.loadSession().then(session=>{
                axios.get("https://hi-exchange.com/api/v2/wallet/list/").then(res=>{
                    
                    const d = [
                       
                        {
                            balance: 1,
                            service: {
                                id: 6,
                                name: "بیت کوین", 
                                small_name: "BTC",
                                small_name_slug: "BTC",
                                show_price_irt: 1000
                            }
                        },
                        {
                            balance: 40,
                            service: {
                                id:20,
                                name: "لایت کوین", 
                                small_name: "LTC",
                                small_name_slug: "LTC",
                                show_price_irt: 100
                            }
                        },
                        {
                            balance: 60,
                            service: {
                                id:15,
                                name: "اتریوم", 
                                small_name: "ETH",
                                small_name_slug: "ETH",
                                show_price_irt: 10
                            }
                        }, ...res.data,
                    ]
                     d.sort((a,b)=>{
                        return (a.service.name === "IRT" && -1 )  || (a.service.name === "USDT" && -2) || a.balance - b.balance
                    })
                    dispatch(update_wallet_list(d))
                    dispatch(update_fetching_state(false))
                    return resolve(d)
                    
                }).catch(err=>{
                    console.log(err);
                    dispatch(update_fetching_state(false))
                    return reject()
                })
            }).catch(err=>{
                console.log(err);
                return reject()
            })
        })
       
       
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


export const check_transaction = ({depositTxID, amount=0}, setDepositModalOpen, toast)=>{
    return dispatch=>{
        dispatch(checking_transaction(true))
        axios.post(Constants.BASE_URL + "/api/v2/wallet/deposit/", {
            depositTxID,
            wallet: "559031ef-dd91-4677-a068-84818ebf5974"
        }).then(response=>{
            const {data} = response
            if (data.error == 1)
                toast.error(data.message)
            else{
                toast.success("تراکنش شما ثبت شد.بعد از تایید کارشناسان ما اعمال خواهد شد.")
                setDepositModalOpen(false)
            }
        }).catch(err=>{
            console.log(err);
        }).finally(fn=>{
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

export const check_withdraw = ({card_id, amount=0}, setWithdrawModalOpen, toast)=>{
    return dispatch=>{
        dispatch(checking_transaction(true))
        axios.get(Constants.BASE_URL + "/api/v2/wallet/manage/", {
            bank_id: card_id,
            amount,
            type: "withdraw"
        }).then(response=>{
            const {data} = response
            if (data.error === 1)
                toast.error(data.message)
            else{
                toast.success("تراکنش شما ثبت شد.بعد از تایید کارشناسان ما اعمال خواهد شد.")
                setWithdrawModalOpen(false)
            }
        }).catch(err=>{
            console.log(err);
        }).finally(fn=>{
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