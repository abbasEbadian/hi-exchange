import {
    UPDATE_WALLET_LIST,
    UPDATE_FETCHING_STATE,
    CHECKING_TRANSACTION,
    CHECKING_WITHDRAW,
    UPDATE_NETWORK_LIST

} from '../actions'

const init_state = {
    wallet: [ ],
    networks:[],
    is_fetching: false,
    checking_transaction: false,
    checking_withdraw: false,
}
export const wallet = (state=init_state, action)=>{
    switch (action.type) {
        case UPDATE_WALLET_LIST:
            return {
                ...state,
                wallet: action.payload
            };
        case UPDATE_NETWORK_LIST:
            return {
                ...state,
                netwroks : action.payload
            };
        case UPDATE_FETCHING_STATE:
            return {
                ...state,
                is_fetching: action.payload
            }

        case CHECKING_TRANSACTION:
            return {
                ...state,
                checking_transaction: action.payload
            }
        case CHECKING_WITHDRAW:
            return {
                ...state,
                checking_withdraw: action.payload
            }

        default:
            return state;
    }
}