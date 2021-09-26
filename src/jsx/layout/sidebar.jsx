import React, { } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { userLogout } from '../../redux/actions'
import { useDispatch } from 'react-redux';


function Sidebar() {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <>
            <div className="sidebar">
                <Link className="brand-logo" to={"/"}>
                    <img src={require('../../images/logo.png')} alt="" />
                </Link>
                <div className="menu">
                    <ul>
                        <li>
                            <Link to={"/"} data-toggle="tooltip" data-placement="right" title="Home">
                                <span><i className="icofont-ui-home"></i></span>
                            </Link>
                        </li>
                        <li><Link to={"/buy-sell"} data-toggle="tooltip" data-placement="right" title="Buy Sale">
                            <span><i className="icofont-stack-exchange"></i></span>
                        </Link>
                        </li>
                        <li><Link to={"/accounts"} data-toggle="tooltip" data-placement="right" title="Accounts">
                            <span><i className="icofont-user-alt-4"></i></span>
                        </Link>
                        </li>
                        <li><Link to={"/wallet"} data-toggle="tooltip" data-placement="right" title="Accounts">
                            <span><i className="icofont-wallet"></i></span>
                        </Link>
                        </li>
                        <li><Link to={"/settings"} data-toggle="tooltip" data-placement="right" title="Settings">
                            <span><i className="icofont-ui-settings"></i></span>
                        </Link>
                        </li>
                        <li className="logout">
                            <button className="border-0 bg-transparent text-white fs-3" onClick={()=>dispatch(userLogout(history))} data-toggle="tooltip" data-placement="right"
                                title="Signout">
                            <span><i className="icofont-power"></i></span>
                        </button>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </>
    )
}

export default Sidebar;