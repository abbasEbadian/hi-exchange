import axios from "axios";
import { sessionService } from 'redux-react-session' 

export const UPDATE_WALLET_LIST = "UPDATE_WALLET_LIST"
export const get_wallet_list = ()=>{
    return dispatch=>{
        sessionService.loadSession().then(session=>{
            axios.get("https://hi-exchange.com/api/v2/wallet/list/", {
                headers: {
                    Authorization: "Bearer " + session.token 
                }
            }).then(res=>{
                const {data} = res ;
                dispatch(update_wallet_list(data))
            }).catch(err=>{
                console.log(err);
                
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