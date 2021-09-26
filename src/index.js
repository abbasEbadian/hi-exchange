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
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axios from 'axios';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";



// init redux store
const mid = [thunk]
const store = createStore(rootReducer,
    compose(
    applyMiddleware(...mid),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );


//validate session
const validateSession = (session) => { 
    return new Promise((res, rej)=>{
        if (!session) return rej(false)
        const refresh_time = +Object.keys(session).includes("refresh_time") && session.refresh_time;
        if(!refresh_time) return  rej("time session not found");
        if(new Date().getTime() - refresh_time>60*60*1000) rej("session Expired");
        return res(true);
    });
}
const options = { refreshOnCheckAuth: true, redirectPath: '/opt-1' };
sessionService.initSessionService(store, options)
 


axios.interceptors.response.use((response) => {
    return response
  }, async function (error) {
      console.log("CAME");
      
    const originalRequest = error.config;
    if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
        sessionService.loadSession().then(session=>{
            axios.post("https://hi-exchange.com/api/v2/token/refresh/", {
                refresh: session.refresh
            }).then(data=>{
                sessionService.saveSession({
                    token: data.data.access,
                    refresh: session.refresh,
                    refresh_time: new Date().getTime()
                }).then(e=>{
                    // failedRequest.response.config.headers['Authorization'] = 'Bearer ' + data.data.access;
                    originalRequest._retry = false;
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.data.access;
                    return axios(originalRequest);
                }).catch(e=>{
                    return Promise.reject(e);
                })
                return Promise.reject(error);
            }).catch(err=>{
                console.log(err);
                
            })
   
        });
    }
})

const refreshAuthLogic = failedRequest => 
sessionService.loadSession().then(session=>{
    axios.post("https://hi-exchange.com/api/v2/token/refresh/", {
        refresh: session.refresh
    }).then(data=>{
        sessionService.saveSession({
            token: data.data.access,
            refresh: session.refresh,
            refresh_time: new Date().getTime()
        }).then(e=>{
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + data.data.access;
            
            return Promise.resolve()
        }).catch(e=>{
            return Promise.reject()
        })
        return Promise.reject()
    }).catch(err=>{
        console.log(err);
        
    })

}).catch(err=>{console.log(err);
})

// bind axios to auth refresher
// createAuthRefreshInterceptor(axios, refreshAuthLogic)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
