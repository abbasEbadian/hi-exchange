import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore,  applyMiddleware, compose } from 'redux'
import rootReducer from './redux/reducers'
import {sessionService} from 'redux-react-session'
import axios from 'axios';
 

const mid = [thunk]
const store = createStore(rootReducer,
    compose(
    applyMiddleware(...mid),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );

const validateSession = (session) => { 
    return new Promise((res, rej)=>{
        const start = +Object.keys(session).includes("time") && session.time;
        if(!start) rej("time session not found");
        if(new Date().getTime() - start > 60*60*1000) rej("session Expired");
        res(true);
    });
}
const options = { refreshOnCheckAuth: false, redirectPath: '/opt-1', validateSession };
sessionService.initSessionService(store, options)
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
