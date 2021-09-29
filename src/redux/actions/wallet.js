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
            setTransactionResult({status: 200, text})
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



export const generate_wallet = (service)=>{
    return dispatch=>{
        axios.post(Constants.BASE_URL + "/api/v2/wallet/generate/", {service}).then(response=>{
            const {data} = response
            dispatch(get_wallet_list()).then(wallet=>{
                return Promise.resolve(data.id)
            }).catch(error=>{
                console.log(error);
                
            })
        }).catch(err=>{
            console.log(err)
        })
    }
}