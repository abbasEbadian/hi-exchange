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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


// init redux store
const mid = [thunk]
const store = createStore(rootReducer,
    compose(
    applyMiddleware(...mid),
    (window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : a=>a)
    ));
// validate session
const validateSession = (session) => { 
    return new Promise((res, rej)=>{
        if (!session) return rej(false)
        const refresh_time = +Object.keys(session).includes("refresh_time") && session.refresh_time;
        if(!refresh_time) return  rej("time session not found");
        if(new Date().getTime() - refresh_time>60*60*12*1000) rej("session Expired");
        return res(true);
    });
}
const options = { refreshOnCheckAuth: true, redirectPath: '/signin', validateSession };
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
