import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from './pages/index';
import BuySell from './pages/buy-sell';
import Accounts from './pages/accounts';
import Settings from './pages/settings';
import Preferences from './pages/settings-preferences';
import SettingsSecurity from './pages/settings-security';
import SettingsAccount from './pages/settings-account';
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
import { fetch_currencies, get_wallet_list, fetch_accounts } from '../redux/actions'
// Set token to axios requestss
axios.interceptors.request.use(request=>{
    return new Promise((resolve, reject)=>{
        sessionService.loadSession().then(session=>{
            if (!session.token.length 
                || request.url.indexOf("/api/v2/service/list/")>-1
                || request.url.indexOf("coinmarketcap")>-1
                ) return resolve(request)
            request.headers.Authorization = "Bearer " + session.token
            return resolve(request)
        }).catch(err=>{
            if(String(err).indexOf("Session") > -1)
             return resolve(request)
            return reject(request)
        })
    })
})



const Index = ()=> {
    const checked = useSelector(state => state.session.checked)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(get_wallet_list())
        dispatch(fetch_currencies())
        dispatch(fetch_accounts())
       
    }, [])

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
                        <AuthRoute  exact path='/add-bank-acc'> <AddBankAccount/> </AuthRoute>
                        <AuthRoute  exact path='/add-debit-card'> <AddDebitCard/> </AuthRoute>
                        <AuthRoute  exact path='/lock'> <Locked/> </AuthRoute>
                        <AuthRoute  exact path='/privacy-policy'> <PrivacyPolicy/> </AuthRoute>
                        <AuthRoute  exact path='/reset'> <Reset/> </AuthRoute>
                        <AuthRoute  exact path='/terms-condition'> <TermsCondition/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-1'> <VerifyStep1/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-2'> <VerifyStep2/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-3'> <VerifyStep3/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-4'> <VerifyStep4/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-5'> <VerifyStep5/> </AuthRoute>
                        <AuthRoute  exact path='/verify-step-6'> <VerifyStep6/> </AuthRoute>
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