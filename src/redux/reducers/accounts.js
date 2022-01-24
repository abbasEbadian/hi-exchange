import { 
    UPDATE_ACCOUNTS,
    UPDATE_ORDERS,
    GETTING_ORDERS,
    CREATING_ORDER,
    UPDATE_TRANSACTIONS,
    UPDATE_NETWORKS,
    UPDATE_SCHEDULES,
    UPDATE_BANK_LIST
} from "../actions/accounts";

const init_state = {
    cards: [],
    orders: [],
    transactions:[],
    networks: [],
    schedules: [],
    bankList: [],
    getting_orders: false,
    creating_order: false
}

export const accountsReducer = (state=init_state, action) => {
    switch (action.type) {
        case UPDATE_ACCOUNTS:
            return {
                ...state,
                cards : action.payload
            }
        case UPDATE_ORDERS:
            return {
                ...state, 
                orders : action.payload
            }
        case GETTING_ORDERS:
            return {
                ...state, 
                getting_orders : action.payload
            }
        case CREATING_ORDER:
            return {
                ...state, 
                creating_order : action.payload
            }
        case UPDATE_NETWORKS:
            return {
                ...state, 
                networks: action.payload
            }
        case UPDATE_SCHEDULES:
            return {
                ...state, 
                schedules: action.payload
            }
        case UPDATE_TRANSACTIONS:
            return {
                ...state, 
                transactions : action.payload
            }
        case UPDATE_BANK_LIST:
            return {
                ...state, 
                bankList : action.payload
            }
        default:
            return state;
    }
}