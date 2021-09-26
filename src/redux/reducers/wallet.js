import {
    UPDATE_WALLET_LIST,
    UPDATE_FETCHING_STATE,
    CHECKING_TRANSACTION,
    CHECKING_WITHDRAW

} from '../actions'

const init_state = {
    wallet: [ ],
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