import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from "react-redux" 
const AuthRoute = ({children, ...rest}) =>{
    const authenticated = useSelector(state=>state.session.authenticated)
    return (
        <Route
            {...rest}
            render={
                ({location})=> authenticated ? (children):(
                    <Redirect 
                        to={{
                            pathname: "/signin",
                            state: {from: location}
                        }}
                    ></Redirect>
                )
            }
        ></Route>
    )
}

export default AuthRoute
