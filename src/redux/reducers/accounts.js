import { UPDATE_ACCOUNTS } from "../actions/accounts";

const init_state = {
    cards: []
}

export const accountsReducer = (state=init_state, action) => {
    switch (action.type) {
        case UPDATE_ACCOUNTS:
            return {
                cards : action.payload
            }
        default:
            return state;
    }
}