import { indexConverter } from './indexConverter'
import { currencies } from './currencies'
import { userManager } from './user'
import { wallet } from './wallet'
import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session'
import { preloaderReducer } from './preloader';
import { accountsReducer } from './accounts';
import { notificationReducer } from './notificatios';

const rootReducer = combineReducers({
    indexConverter,
    currencies,
    userManager,
    session: sessionReducer,
    wallet, 
    preloader: preloaderReducer,
    accounts:accountsReducer,
    notifications: notificationReducer
});
export default rootReducer;