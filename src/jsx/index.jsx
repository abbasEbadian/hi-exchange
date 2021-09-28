import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/index';
import BuySell from './pages/buy-sell';
import Accounts from './pages/accounts';
import Settings from './pages/settings';
import Preferences from './pages/settings-preferences';
import SettingsSecurity from './pages/settings-security';
import SettingsAccount from './pages/settings-account';
import SettingsInvite from './pages/settings-invite';
import AddBankAccount from './pages/add-bank-acc';
import AddDebitCard from './pages/add-debit-card';
import Locked from './pages/lock';
import Otp1 from './pages/otp-1';
import Otp2 from './pages/otp-2';
import PrivacyPolicy from './pages/privacy-policy';
import Reset from './pages/reset';
import Signup from './pages/signup';
import TermsCondition from './pages/terms-condition';
import VerifyStep1 from './pages/verify-step-1';
import VerifyStep2 from './pages/verify-step-2';
import VerifyStep3 from './pages/verify-step-3';
import VerifyStep4 from './pages/verify-step-4';
import VerifyStep5 from './pages/verify-step-5';
import VerifyStep6 from './pages/verify-step-6';
import Wallet from './pages/wallet'
import History from './pages/history';
import Demo from './pages/demo';
import Landing from './pages/landing';
import { useSelector } from 'react-redux'
import AuthRoute from './routes/AuthRoute'
import BasicRoute from './routes/BasicRoute'
import axios from 'axios'
import { sessionService } from 'redux-react-session' 
import { useDispatch }from 'react-redux'
import { fetch_currencies, get_wallet_list,fetch_accounts, fetch_orders, fetch_user_all_data } from '../redux/actions'
import { Constants } from '../Constants'
// Set token to axios requestss




axios.interceptors.request.use(
    async config => {
        try{
            const session = await sessionService.loadSession()
            if (session && session.token && config.url.indexOf("service") === -1) {
                config.headers['Authorization'] = 'Bearer ' + session.token;
            }
        }catch(err){
            console.log(err);
        }
        
        return config
        
    },
    error => {
        console.log(error);
        
        Promise.reject(error) 
    }
);


axios.interceptors.response.use((response) => {
    return response
 }, 
 async (error)=> {
     const originalRequest = error.config
     const session = await sessionService.loadSession()
    if (error.response && error.response.status === 401 && originalRequest.url
        .indexOf('refresh') >-1){
            // window.location.href = ('/otp-1');
            return Promise.reject(error);
        }
    if (error.response.status === 403  && originalRequest._retry ) {
        return Promise.reject()
    }
    if (error.response.status === 401  && !originalRequest._retry ) {
 
        originalRequest._retry = true;
        
        return axios.post(Constants.BASE_URL+'/api/v2/token/refresh/',
            {
              "refresh": session.refresh
            })
            .then(res => {
                if (res.status === 200) {
                    // 1) put token to LocalStorage
                    sessionService.saveSession({
                        token: res.data.access,
                        refresh: session.refresh,
                        refresh_time: new Date().getTime()
                    }).then(response=>{

                        // 2) Change Authorization header
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access
     
                        // 3) return originalRequest object with Axios.
                        return axios(originalRequest);
                    })

 
                }
            }).catch(err=>{
                return Promise.reject(err)
            })
    }

    
 })






const Index = ()=> {
    const {checked, authenticated} = useSelector(state => state.session)
    const dispatch = useDispatch()
    useEffect(() => {
        if(authenticated){
            dispatch(fetch_user_all_data())
            dispatch(fetch_currencies())
        }
        console.log("re rendered");
        
    }, [authenticated])

    return (
        <>  
        
            {checked?
            // Protected routes : AuthRoute
            // Basic Route : Access if not signed
            <BrowserRouter  >
                <div id="main-wrapper">
                    <Switch>
                        <AuthRoute  exact path='/buy-sell'> <BuySell/> </AuthRoute>
                        <AuthRoute  exact path='/accounts'> <Accounts/> </AuthRoute>
                        <AuthRoute  exact path='/settings'> <Settings/> </AuthRoute>
                        <AuthRoute  exact path='/settings-preferences'> <Preferences/> </AuthRoute>
                        <AuthRoute  exact path='/settings-security'> <SettingsSecurity/> </AuthRoute>
                        <AuthRoute  exact path='/settings-account'> <SettingsAccount/> </AuthRoute>
                        <AuthRoute  exact path='/settings-invite'> <SettingsInvite/> </AuthRoute>
                        <AuthRoute  exact path='/add-bank-acc'> <AddBankAccount/> </AuthRoute>
                        <AuthRoute  exact path='/add-debit-card'> <AddDebitCard/> </AuthRoute>
                        <AuthRoute  exact path='/lock'> <Locked/> </AuthRoute>
                        <AuthRoute  exact path='/privacy-policy'> <PrivacyPolicy/> </AuthRoute>
                        <AuthRoute  exact path='/reset'> <Reset/> </AuthRoute>
                        <AuthRoute  exact path='/terms-condition'> <TermsCondition/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-1'> <VerifyStep1/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-2'> <VerifyStep2/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-3'> <Redirect to="/verify-step-2"/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-4'> <VerifyStep4/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-5'> <Redirect to="/verify-step-2"/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-6'> <Redirect to="/verify-step-2"/> </AuthRoute>
                        <AuthRoute  exact path='/history'> <History/> </AuthRoute>
                        <AuthRoute  exact path='/landing'> <Landing/> </AuthRoute>
                        <AuthRoute  exact path='/demo'> <Demo/> </AuthRoute>
                        <AuthRoute  exact path='/wallet'><Wallet></Wallet></AuthRoute>
                        <AuthRoute  exact path='/'><Dashboard></Dashboard></AuthRoute>
                        <BasicRoute exact path='/signin'> <Redirect to="/otp-1"></Redirect> </BasicRoute>
                        <BasicRoute exact path='/signup'> <Signup/> </BasicRoute>
                        <BasicRoute exact path='/otp-1'> <Otp1/> </BasicRoute>
                        <BasicRoute exact path='/otp-2'> <Otp2/> </BasicRoute>
                        <Route render={()=>
                            <h1>404</h1>
                        
                        }></Route>
                    </Switch>
                </div>
            </BrowserRouter>
           :
            <section></section> 
           }
        </>
    );
    
}
export default Index;