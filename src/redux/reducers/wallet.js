import {
    UPDATE_WALLET_LIST

} from '../actions'

const init_state = {
    wallet: {}
}
export const wallet = (state=init_state, action)=>{
    switch (action.type) {
        case UPDATE_WALLET_LIST:
            return {
                ...state,
                wallet: action.payload
            };

        default:
            return state;
    }
}