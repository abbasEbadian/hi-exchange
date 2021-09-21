import { indexConverter } from './indexConverter'
import { currencies } from './currencies'
import { userManager } from './user'
import { wallet } from './wallet'
import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session'

const rootReducer = combineReducers({
    indexConverter,
    currencies,
    userManager,
    session: sessionReducer,
    wallet
});
export default rootReducer;